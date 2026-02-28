import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language } from './i18n';

// Theme mode type
type ThemeMode = 'light' | 'dark' | 'system';

// Settings store (theme and language)
interface SettingsState {
  themeMode: ThemeMode;
  language: Language;
  setThemeMode: (mode: ThemeMode) => void;
  setLanguage: (lang: Language) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      themeMode: 'light',
      language: 'vi',
      setThemeMode: (mode) => set({ themeMode: mode }),
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'settings-storage',
    }
  )
);

// View mode store
interface ViewModeState {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

export const useViewModeStore = create<ViewModeState>()(
  persist(
    (set) => ({
      viewMode: 'grid',
      setViewMode: (mode) => set({ viewMode: mode }),
    }),
    {
      name: 'view-mode-storage',
    }
  )
);

// Search filters store
interface SearchFilters {
  keyword: string;
  category: string;
  city: string;
  district: string;
  propertyType: string;
  listingType: string;
  condition: string;
  minPrice: number | null;
  maxPrice: number | null;
  minArea: number | null;
  maxArea: number | null;
  bedrooms: number | null;
}

interface SearchState {
  filters: SearchFilters;
  setFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
}

const initialFilters: SearchFilters = {
  keyword: '',
  category: '',
  city: '',
  district: '',
  propertyType: '',
  listingType: '',
  condition: '',
  minPrice: null,
  maxPrice: null,
  minArea: null,
  maxArea: null,
  bedrooms: null,
};

export const useSearchStore = create<SearchState>()((set) => ({
  filters: initialFilters,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  resetFilters: () => set({ filters: initialFilters }),
}));

// Favorites store (for optimistic UI updates)
interface FavoritesState {
  favoriteIds: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  setFavorites: (ids: string[]) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      addFavorite: (id) =>
        set((state) => ({
          favoriteIds: [...state.favoriteIds, id],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.filter((fid) => fid !== id),
        })),
      setFavorites: (ids) => set({ favoriteIds: ids }),
      isFavorite: (id) => get().favoriteIds.includes(id),
    }),
    {
      name: 'favorites-storage',
    }
  )
);

// UI State store
interface UIState {
  isSidebarOpen: boolean;
  isSearchDrawerOpen: boolean;
  toggleSidebar: () => void;
  toggleSearchDrawer: () => void;
  setSearchDrawerOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isSidebarOpen: false,
  isSearchDrawerOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleSearchDrawer: () =>
    set((state) => ({ isSearchDrawerOpen: !state.isSearchDrawerOpen })),
  setSearchDrawerOpen: (open) => set({ isSearchDrawerOpen: open }),
}));
