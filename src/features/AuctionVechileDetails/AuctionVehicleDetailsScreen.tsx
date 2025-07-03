import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Vehicle } from '../../types/Vehicle.ts';
import { useRoute } from '@react-navigation/native';
import { formatPrice } from '../../utils/formatters.ts';

export const AuctionVehicleDetailsScreen = () => {
  const { colors, appStyles } = useTheme();
  const route = useRoute();
  const { vehicle } = route.params as { vehicle: Vehicle };

  return (
    <View
      style={[
        appStyles.container,
        { backgroundColor: colors.secondaryBackground },
      ]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: vehicle.image }} style={styles.vehicleImage} />

        <Text style={[appStyles.h1, styles.title]}>
          {`${vehicle.make} ${vehicle.model}`}
        </Text>
        <Text style={[appStyles.body, styles.specs]}>
          Engine: {vehicle.engineSize} | Fuel: {vehicle.fuelType} | Mileage:{' '}
          {vehicle.mileage}
        </Text>

        {/* Auction Info */}
        <Text style={[appStyles.h2, styles.sectionTitle]}>
          Auction Information
        </Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Auction Date</Text>
            <Text style={styles.infoValue}>
              {vehicle.auctionDateTime.toDateString()}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Starting Bid</Text>
            <Text style={styles.infoValue}>
              {formatPrice(vehicle.startingBid)}
            </Text>
          </View>
        </View>

        <Text style={[appStyles.body, styles.description]}>
          {`This 2018 BMW 3 Series is a well-maintained vehicle with a 2.0L petrol engine and 55,000 miles on the odometer. It is currently listed for auction with a starting bid of $15,000. Additional details about the vehicle's condition and history are available upon request.`}
        </Text>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionBar}>
        <Pressable
          style={[
            styles.actionButton,
            { backgroundColor: colors.buttonBackground },
          ]}
          onPress={() => {}}
        >
          <Text style={[appStyles.h2, styles.actionButtonText]}>Place Bid</Text>
        </Pressable>
        <Pressable
          style={[
            styles.actionButton,
            {
              backgroundColor: colors.secondaryBackground,
              borderWidth: 1,
              borderColor: colors.buttonBackground,
            },
          ]}
          onPress={() => {}}
        >
          <Text style={[appStyles.h2, styles.actionButtonText]}>Favorite</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    flex: 1,
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  vehicleImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  title: {
    marginHorizontal: 16,
    marginBottom: 4,
    marginTop: 8,
    textAlign: 'left',
  },
  specs: {
    marginHorizontal: 16,
    marginBottom: 8,
    color: '#101418',
  },
  sectionTitle: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  infoGrid: {
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    gap: 0,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    color: '#5c718a',
    fontSize: 14,
  },
  infoValue: {
    color: '#101418',
    fontSize: 14,
    fontWeight: '500',
  },
  description: {
    marginHorizontal: 16,
    marginBottom: 16,
    color: '#101418',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    backgroundColor: 'transparent',
  },
  actionButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  actionButtonText: {
    color: '#101418',
    fontWeight: 'bold',
  },
});
