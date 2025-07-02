import { create } from 'zustand';
import { Vehicle } from '../types/Vehicle';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesVehicleStore {
  // State
  vehicles: Vehicle[];

  // Actions
  toggleFavorite: (vehicle: Vehicle) => void;
  getFavorites: () => Vehicle[];
}

export const useFavoritesVehicleStore = create<FavoritesVehicleStore>()(
  persist(
    (set, get) => ({
      // Initial state
      vehicles: [],

      toggleFavorite: (vehicle: Vehicle) => {
        const { vehicles } = get();
        let updatedVehicles: Vehicle[] = vehicles;

        if (vehicle.favorite)
          updatedVehicles = vehicles.filter(v => v.id !== vehicle.id);
        else updatedVehicles.push({ ...vehicle, favorite: true });
        set({ vehicles: updatedVehicles });
      },

      getFavorites: () => {
        const { vehicles } = get();
        return vehicles;
      },
    }),
    {
      name: 'favorites-vehicle-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
