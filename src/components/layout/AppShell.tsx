'use client';

import { Box, useMediaQuery, useTheme } from '@mui/material';
import SideRail from './SideRail';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import Footer from './Footer';

/** Side Rail width constant */
export const SIDE_RAIL_WIDTH = 96;
/** Top bar height constant */
export const TOP_BAR_HEIGHT = 64;
/** Bottom nav height (mobile) */
export const BOTTOM_NAV_HEIGHT = 64;

interface AppShellProps {
  children: React.ReactNode;
}

/**
 * AppShell — The persistent layout shell for all pages.
 *
 * Desktop: Side Rail (left) + Top Bar (top) + content area + Footer
 * Mobile:  Top Bar (top) + content area + Footer + Bottom Nav (fixed bottom)
 *
 * Follows the MD3 "Structured Fluidity" approach from the design system.
 */
export default function AppShell({ children }: AppShellProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Side Rail — desktop only */}
      {isDesktop && <SideRail />}

      {/* Main column */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          ml: isDesktop ? `${SIDE_RAIL_WIDTH}px` : 0,
        }}
      >
        {/* Top Bar */}
        <TopBar />

        {/* Page content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            pt: `${TOP_BAR_HEIGHT}px`,
            pb: isDesktop ? 0 : `${BOTTOM_NAV_HEIGHT}px`,
          }}
        >
          {children}
        </Box>

        {/* Footer */}
        <Footer />
      </Box>

      {/* Bottom Navigation — mobile only */}
      {!isDesktop && <BottomNav />}
    </Box>
  );
}
