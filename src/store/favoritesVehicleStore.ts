import { create } from 'zustand';
import { Vehicle } from '../types/Vehicle';
import { persist } from 'zustand/middleware';

interface FavoritesVehicleStore {
  // State
  vehicles: Vehicle[];

  // Actions
  toggleFavorite: (vehicle: Vehicle) => void;
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
        else updatedVehicles.push({ ...vehicle, favorite: !vehicle.favorite });
        set({ vehicles: updatedVehicles });
      },
    }),
    { name: 'favorites-vehicle-storage' },
  ),
);
