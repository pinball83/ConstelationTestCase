import React, { useState } from 'react';
import { DollarSign } from 'lucide-react-native';
import { Vehicle } from '../../../types/Vehicle';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { FavoriteButton } from './FavoriteButton';
import CountDownBadge from './CountDownBadge';
import { VehicleDetailsGrid } from './VehicleDetailsGrid';
import { useTheme } from '../../../hooks/useTheme.ts';
import { formatPrice } from '../../../utils/formatters';

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
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: vehicle.image }} style={styles.vehicleImage} />

        <FavoriteButton
          isFavorite={isFavorite}
          onToggleFavorite={() => onToggleFavorite(vehicle.id)}
        />

        <CountDownBadge auctionStartDate={vehicle.auctionDateTime} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={[appStyles.h1, styles.title]}>
          {vehicle.year} {vehicle.make} {vehicle.model}
        </Text>

        <VehicleDetailsGrid vehicle={vehicle} />

        {/* Starting Bid */}
        <View style={styles.bidContainer}>
          <Text style={styles.bidLabel}>Starting Bid:</Text>
          <View style={styles.bidValueContainer}>
            <DollarSign style={styles.bidIcon} color="#059669" />
            <Text style={styles.bidValue}>
              {formatPrice(vehicle.startingBid).slice(1)}
            </Text>
          </View>
        </View>

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
  },
  content: {
    padding: 16,
  },
  title: {
    marginBottom: 8,
  },
  bidContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bidLabel: {
    color: '#4B5563',
    fontSize: 14,
  },
  bidValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bidIcon: {
    width: 20,
    height: 20,
  },
  bidValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
  },
  viewDetailsButton: {
    paddingVertical: 12,
    borderRadius: 6,
  },
});
