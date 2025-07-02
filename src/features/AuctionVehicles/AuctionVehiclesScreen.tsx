import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VehicleCard } from './components/VehicleCard.tsx';
import { VehicleFilters } from './components/VehicleFilters';
import { Vehicle } from '../../types/Vehicle.ts';
import { useFavoritesVehicleStore } from '../../store/favoritesVehicleStore.ts';
import { useAuctionVehicles } from '../../hooks/useAuctionVehicles.ts';

export const AuctionVehiclesScreen = () => {
  const { colors, appStyles } = useTheme();
  const insets = useSafeAreaInsets();

  const { vehicles, isLoading, error } = useAuctionVehicles();
  const { toggleFavorite } = useFavoritesVehicleStore();

  const handleAuctionDetailsPress = (vehicle: Vehicle) => {
    console.log(`Vehicle press: ${vehicle}`);
  };

  const handleToggleFavorite = (vehicle: Vehicle): void => {
    toggleFavorite(vehicle);
  };

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
      <VehicleFilters />

      <FlatList
        data={vehicles}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <VehicleCard
              vehicle={item}
              onPress={handleAuctionDetailsPress}
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
