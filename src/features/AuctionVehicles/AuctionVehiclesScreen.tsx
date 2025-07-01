import { FlatList, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../../hooks/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VehicleCard } from './components/VehicleCard.tsx';
import { Vehicle } from '../../types/Vehicle.ts';
import { useAuctionVehicles } from '../../hooks/useAuctionVehicles.ts';

export const AuctionVehiclesScreen = () => {
  const { appStyles } = useTheme();
  const insets = useSafeAreaInsets();

  const { vehicles, isLoading, error } = useAuctionVehicles();

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
        },
      ]}
    >
      <FlatList
        data={vehicles}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <VehicleCard
            vehicle={item}
            onPress={handleAccommodationPress}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
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
});
