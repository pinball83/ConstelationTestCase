import React, { useState } from 'react';
import { Vehicle } from '../../../types/Vehicle';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { FavoriteButton } from './FavoriteButton';
import CountDownBadge from './CountDownBadge';
import { VehicleDetailsGrid } from './VehicleDetailsGrid';
import { StartingBid } from './StartingBid';
import { useTheme } from '../../../hooks/useTheme.ts';

interface VehicleCardProps {
  vehicle: Vehicle;
  onToggleFavorite: (vehicleId: number) => void;
  onPress: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onToggleFavorite,
}) => {
  const { colors, appStyles } = useTheme();
  const [isFavorite] = useState(vehicle.favorite);

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: vehicle.image }} style={styles.vehicleImage} />

        <FavoriteButton
          isFavorite={isFavorite}
          onToggleFavorite={() => onToggleFavorite(vehicle.id)}
        />

        <CountDownBadge auctionStartDate={vehicle.auctionDateTime} />
      </View>

      <View style={styles.content}>
        <Text style={[appStyles.h1, styles.title]}>
          {vehicle.year} {vehicle.make} {vehicle.model}
        </Text>

        <VehicleDetailsGrid vehicle={vehicle} />

        <StartingBid startingBid={vehicle.startingBid} />

        <Pressable
          onPress={() => {
            console.log('Press');
          }}
          style={[
            styles.viewDetailsButton,
            { backgroundColor: colors.buttonBackground },
          ]}
        >
          <Text style={[appStyles.body, { textAlign: 'center' }]}>
            View Details
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  vehicleImage: {
    width: '100%',
    height: 192,
    objectFit: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    padding: 16,
  },
  title: {
    marginBottom: 8,
  },
  viewDetailsButton: {
    paddingVertical: 12,
    borderRadius: 6,
  },
});
