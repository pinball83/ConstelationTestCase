import React from 'react';
import { Calendar, Fuel, Gauge, Settings } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Vehicle } from '../../../types/Vehicle';
import { formatMileage } from '../../../utils/formatters';
import { useTheme } from '../../../hooks/useTheme.ts';

interface VehicleDetailsGridProps {
  vehicle: Vehicle;
}

export const VehicleDetailsGrid: React.FC<VehicleDetailsGridProps> = ({
  vehicle,
}) => {
  const { colors, appStyles } = useTheme();
  return (
    <View style={styles.detailsGrid}>
      <View style={styles.detailItem}>
        <Fuel style={styles.detailIcon} color={colors.secondaryText} />
        <Text style={[appStyles.body, { color: colors.secondaryText }]}>
          {vehicle.fuelType.charAt(0).toUpperCase() + vehicle.fuelType.slice(1)}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Gauge style={styles.detailIcon} color={colors.secondaryText} />
        <Text style={[appStyles.body, { color: colors.secondaryText }]}>
          {formatMileage(vehicle.mileage)} km
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Settings style={styles.detailIcon} color={colors.secondaryText} />
        <Text style={[appStyles.body, { color: colors.secondaryText }]}>
          {vehicle.engineSize}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Calendar style={styles.detailIcon} color={colors.secondaryText} />
        <Text style={[appStyles.body, { color: colors.secondaryText }]}>
          {vehicle.year}
        </Text>
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
});
