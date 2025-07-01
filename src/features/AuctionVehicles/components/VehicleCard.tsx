import React, { useState } from 'react';
import { Calendar, DollarSign, Fuel } from 'lucide-react-native';
import { Vehicle } from '../../../types/Vehicle';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { FavoriteButton } from './FavoriteButton';
import CountDownBadge from './CountDownBadge';
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
  const locale = 'en-GB';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat(locale).format(mileage);
  };

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

        {/* Details Grid */}
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Fuel style={styles.detailIcon} color="#4B5563" />
            <Text style={styles.detailText}>{vehicle.fuelType}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.emojiIcon}>🛣️</Text>
            <Text style={styles.detailText}>
              {formatMileage(vehicle.mileage)} mi
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.emojiIcon}>⚙️</Text>
            <Text style={styles.detailText}>{vehicle.engineSize}</Text>
          </View>
          <View style={styles.detailItem}>
            <Calendar style={styles.detailIcon} color="#4B5563" />
            <Text style={styles.detailText}>{vehicle.year}</Text>
          </View>
        </View>

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
    fontSize: 20,
    marginBottom: 8,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  detailItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  emojiIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
    textAlign: 'center',
  },
  detailText: {
    color: '#4B5563',
    fontSize: 14,
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
  viewDetailsText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});
