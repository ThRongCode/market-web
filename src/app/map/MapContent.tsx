'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import {
  Box,
  Paper,
  Typography,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { SearchFilters } from '@/components/property';
import { Property, PaginatedResponse } from '@/types';
import { formatCurrency, buildQueryString } from '@/lib/utils';
import { useSearchStore } from '@/lib/store';
import 'leaflet/dist/leaflet.css';

const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

async function fetchPropertiesWithLocation(params: Record<string, unknown>): Promise<PaginatedResponse<Property>> {
  const queryString = buildQueryString({ ...params, pageSize: 100 });
  const response = await fetch(`/api/properties?${queryString}`);
  if (!response.ok) throw new Error('Failed to fetch properties');
  return response.json();
}

export default function MapContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const { filters } = useSearchStore();

  const { data } = useQuery({
    queryKey: ['properties-map', filters],
    queryFn: () => fetchPropertiesWithLocation(filters as unknown as Record<string, unknown>),
  });

  const propertiesWithLocation = data?.data.filter(
    (p) => p.latitude && p.longitude
  ) || [];

  const defaultCenter: [number, number] = [16.0544, 108.2022];
  const defaultZoom = 6;

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      {/* Sidebar with filters */}
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          width: drawerOpen ? 350 : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 350,
            position: 'relative',
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Bộ lọc</Typography>
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(false)}>
                <CloseIcon />
              </IconButton>
            )}
          </Box>
          <SearchFilters variant="vertical" />
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Hiển thị {propertiesWithLocation.length} tin đăng trên bản đồ
          </Typography>
        </Box>
      </Drawer>

      {/* Map */}
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        {isMobile && !drawerOpen && (
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              zIndex: 1000,
              bgcolor: 'white',
              boxShadow: 2,
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <MapContainer
          center={defaultCenter}
          zoom={defaultZoom}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {propertiesWithLocation.map((property) => (
            <Marker
              key={property.id}
              position={[property.latitude!, property.longitude!]}
              icon={defaultIcon}
            >
              <Popup>
                <Box sx={{ minWidth: 200 }}>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.5 }}>
                    {property.title}
                  </Typography>
                  <Typography variant="body2" color="primary" fontWeight="bold">
                    {formatCurrency(property.price)}
                    {property.listingType === 'RENT' && '/tháng'}
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                    {property.district}, {property.city}
                  </Typography>
                  <Link href={`/properties/${property.id}`} style={{ color: '#1976d2' }}>
                    Xem chi tiết →
                  </Link>
                </Box>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>
    </Box>
  );
}
