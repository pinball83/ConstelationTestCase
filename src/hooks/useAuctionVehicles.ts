import { useEffect, useState } from 'react';
import { vehiclesData } from '../data/vehicles';
import { Vehicle } from '../types/Vehicle';
import { parse } from 'date-fns';

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

  return { vehicles, isLoading: loading, error };
}
