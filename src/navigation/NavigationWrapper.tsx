import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuctionVehiclesScreen } from '../features/AuctionVehicles/AuctionVehiclesScreen';
import { useTheme } from '../hooks/useTheme.ts';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuctionVechileDetailsScreen } from '../features/AuctionVechileDetails/AuctionVechileDetailsScreen.tsx';

const Stack = createNativeStackNavigator();

export const NavigationWrapper = () => {
  const theme = useTheme();
  const navTheme =
    theme.colors.background === '#000' ? NavigationDarkTheme : DefaultTheme;

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="AuctionVehicles"
            component={AuctionVehiclesScreen}
          />
          <Stack.Screen
            name="Details"
            component={AuctionVechileDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
