import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  isBefore,
} from 'date-fns';
import { Clock } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function CountDownBadge({
  auctionStartDate,
}: {
  auctionStartDate: string;
}) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const auctionTime = new Date(auctionStartDate);

      if (isBefore(now, auctionTime)) {
        setTimeLeft('Auction started');
        return;
      }

      const days = differenceInDays(now, auctionTime);
      const hours = differenceInHours(now, auctionTime) % 24;
      const minutes = differenceInMinutes(now, auctionTime) % 60;

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${minutes}m`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 6000); //todo update every minute

    return () => clearInterval(interval);
  }, [auctionStartDate]);

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 12,
        left: 12,
        backgroundColor: '#2563EB',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 9999,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Clock style={{ width: 16, height: 16, marginRight: 4 }} color="white" />
      <Text style={{ color: 'white', fontSize: 14, fontWeight: '500' }}>
        {timeLeft}
      </Text>
    </View>
  );
}
