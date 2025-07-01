import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  isAfter,
  parse,
} from 'date-fns';
import { Clock } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../hooks/useTheme.ts';

export default function CountDownBadge({
  auctionStartDate,
}: {
  auctionStartDate: string;
}) {
  const [timeLeft, setTimeLeft] = useState('');
  const { colors, appStyles } = useTheme();

  useEffect(() => {
    const auctionTime = parse(
      auctionStartDate,
      'yyyy/MM/dd kk:mm:ss',
      new Date(),
    );

    const updateCountdown = () => {
      const now = new Date();

      if (isAfter(now, auctionTime)) {
        setTimeLeft('Auction started');
        return;
      }

      const days = differenceInDays(auctionTime, now);
      const hours = differenceInHours(auctionTime, now) % 24;
      const minutes = differenceInMinutes(auctionTime, now) % 60;

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${minutes}m`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);

    return () => clearInterval(interval);
  }, [auctionStartDate, timeLeft]);

  return (
    <View
      style={[styles.container, { backgroundColor: colors.buttonBackground }]}
    >
      <Clock style={styles.clockIcon} color="white" />
      <Text style={[appStyles.body, styles.timeText]}>{timeLeft}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  timeText: {
    color: 'white',
  },
});
