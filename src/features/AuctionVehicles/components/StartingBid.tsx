import React from 'react';
import { DollarSign, Euro } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { formatPrice } from '../../../utils/formatters';
import { useTheme } from '../../../hooks/useTheme.ts';

interface StartingBidProps {
  startingBid: number;
}

export const StartingBid: React.FC<StartingBidProps> = ({ startingBid }) => {
  const { colors, appStyles } = useTheme();
  return (
    <View style={styles.bidContainer}>
      <Text style={[appStyles.body, { color: colors.secondaryText }]}>
        Starting Bid:
      </Text>
      <View style={styles.bidValueContainer}>
        <Text style={[appStyles.h1, styles.bidValue]}>
          {formatPrice(startingBid)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bidContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
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
  },
});
