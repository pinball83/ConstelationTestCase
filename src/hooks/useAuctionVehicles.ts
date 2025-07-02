import { useEffect, useMemo, useState } from 'react';
import { vehiclesData } from '../data/vehicles';
import { Vehicle } from '../types/Vehicle';
import { parse } from 'date-fns';
import { useFavoritesVehicleStore } from '../store/favoritesVehicleStore.ts';
import { useFilterStore } from '../store/filtersStore.ts';

export function useAuctionVehicles(): {
  vehicles: Vehicle[];
  isLoading: boolean;
  error: boolean;
} {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    // Simulate async fetch
    setTimeout(() => {
      try {
        const mappedVehicles = vehiclesData.map(
          (vehicle, index) =>
            ({
              ...vehicle,
              id: index,
              fuelType: vehicle.fuel,
              image:
                'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&h=300&fit=crop"',
              auctionDateTime: parse(
                vehicle.auctionDateTime,
                'yyyy/MM/dd kk:mm:ss',
                new Date(),
              ),
              favorite: false, //todo add favorite to vehicles data from local storage
            } as Vehicle),
        );

        setVehicles(mappedVehicles);
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    }, 1000);
  }, []);

  const { vehicles: favorites } = useFavoritesVehicleStore();
  const { filters } = useFilterStore();
  const filteredVehicles: Vehicle[] = useMemo(() => {
    return vehicles.filter(vehicle => {
      if (
        filters.make &&
        vehicle.make.toLowerCase() !== filters.make.toLowerCase()
      ) {
        return false;
      }

      if (
        filters.model &&
        vehicle.model.toLowerCase() !== filters.model.toLowerCase()
      ) {
        return false;
      }

      if (filters.minBid) {
        const minBid = parseFloat(filters.minBid);
        if (isNaN(minBid) || vehicle.startingBid < minBid) {
          return false;
        }
      }

      //fixme: not working properly
      // if (!(filters.favoritesOnly && vehicle.favorite)) {
      //   return false;
      // }
      return true;
    });
  }, [vehicles, filters]);
  console.log('filteredVehicles', filteredVehicles);
  console.log('favorites', favorites);
  console.log('filters', filters);

  const merged = [
    ...favorites,
    ...filteredVehicles.filter(v => !favorites.some(f => f.id === v.id)),
  ];

  return { vehicles: merged, isLoading: loading, error };
}
