import { create } from 'zustand';
import { Vehicle } from '../types/Vehicle';

interface FilterState {
  make: string;
  model: string;
  minBid: string;
  maxBid: string;
  favoritesOnly: boolean;
}

interface FilterStore {
  // State
  vehicles: Vehicle[];
  filters: FilterState;

  // Actions
  setFilters: (filters: FilterState) => void;
  clearFilters: () => void;
  getFilters: () => FilterState;
}

const defaultFilters: FilterState = {
  make: '',
  model: '',
  minBid: '',
  maxBid: '',
  favoritesOnly: false,
};

export const useFilterStore = create<FilterStore>((set, get) => ({
  vehicles: [],
  filters: defaultFilters,

  // Set filters and update filtered vehicles
  setFilters: (filters: FilterState) => {
    set({ filters });
  },

  getFilters: () => {
    const { filters } = get();
    return filters;
  },

  // Clear all filters
  clearFilters: () => {
    set({ filters: defaultFilters });
  },
}));
