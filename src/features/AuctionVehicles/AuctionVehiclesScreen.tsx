import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useState, useMemo } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VehicleCard } from './components/VehicleCard.tsx';
import { VehicleFilters } from './components/VehicleFilters';
import { Vehicle } from '../../types/Vehicle.ts';
import { useAuctionVehicles } from '../../hooks/useAuctionVehicles.ts';

interface FilterState {
  make: string;
  model: string;
  minBid: string;
  maxBid: string;
  favoritesOnly: boolean;
}

export const AuctionVehiclesScreen = () => {
  const { colors, appStyles } = useTheme();
  const insets = useSafeAreaInsets();

  const { vehicles, isLoading, error } = useAuctionVehicles();
  const [filters, setFilters] = useState<FilterState>({
    make: '',
    model: '',
    minBid: '',
    maxBid: '',
    favoritesOnly: false,
  });

  // Extract unique makes and models for filter options
  const availableMakes = useMemo(() => {
    const makes = [...new Set(vehicles.map(vehicle => vehicle.make))];
    return makes.sort();
  }, [vehicles]);

  const availableModels = useMemo(() => {
    const models = [...new Set(vehicles.map(vehicle => vehicle.model))];
    return models.sort();
  }, [vehicles]);

  // Filter vehicles based on current filters
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      // Make filter
      if (
        filters.make &&
        vehicle.make.toLowerCase() !== filters.make.toLowerCase()
      ) {
        return false;
      }

      // Model filter
      if (
        filters.model &&
        vehicle.model.toLowerCase() !== filters.model.toLowerCase()
      ) {
        return false;
      }

      // Min bid filter
      if (filters.minBid) {
        const minBid = parseFloat(filters.minBid);
        if (isNaN(minBid) || vehicle.startingBid < minBid) {
          return false;
        }
      }

      // Max bid filter
      if (filters.maxBid) {
        const maxBid = parseFloat(filters.maxBid);
        if (isNaN(maxBid) || vehicle.startingBid > maxBid) {
          return false;
        }
      }

      // Favorites filter
      if (filters.favoritesOnly && !vehicle.favorite) {
        return false;
      }

      return true;
    });
  }, [vehicles, filters]);

  const handleAccommodationPress = (vehicle: Vehicle) => {
    console.log(`Vehicle press: ${vehicle}`);
  };

  function handleToggleFavorite(vehicleId: number): void {
    console.log(`Vehicle press: ${vehicleId}`);
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        appStyles.container,
        {
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          backgroundColor: colors.secondaryBackground,
        },
      ]}
    >
      <VehicleFilters
        filters={filters}
        onFiltersChange={setFilters}
        availableMakes={availableMakes}
        availableModels={availableModels}
      />

      <FlatList
        data={filteredVehicles}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <VehicleCard
              vehicle={item}
              onPress={handleAccommodationPress}
              onToggleFavorite={handleToggleFavorite}
            />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[appStyles.body, { color: colors.secondaryText }]}>
              No vehicles match your filters
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    paddingBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingHorizontal: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
});
