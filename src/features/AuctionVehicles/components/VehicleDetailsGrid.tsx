import React from 'react';
import { Calendar, Fuel } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Vehicle } from '../../../types/Vehicle';
import { formatMileage } from '../../../utils/formatters';

interface VehicleDetailsGridProps {
  vehicle: Vehicle;
}

export const VehicleDetailsGrid: React.FC<VehicleDetailsGridProps> = ({
  vehicle,
}) => {
  return (
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
  );
};

const styles = StyleSheet.create({
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
});
