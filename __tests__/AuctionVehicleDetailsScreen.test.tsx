import React from 'react';
import { render } from '@testing-library/react-native';
import { useRoute } from '@react-navigation/native';
import { AuctionVehicleDetailsScreen } from '../src/features/AuctionVechileDetails/AuctionVehicleDetailsScreen.tsx';

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
}));

jest.mock('../src/hooks/useTheme', () => ({
  useTheme: () => ({
    colors: {
      secondaryBackground: '#fff',
      buttonBackground: '#000',
    },
    appStyles: {
      h1: {},
      h2: {},
      body: {},
    },
  }),
}));

jest.mock('../src//utils/formatters.ts', () => ({
  formatPrice: (price: number) => `$${price}`,
}));

const mockVehicle = {
  id: 1,
  make: 'BMW',
  model: '3 Series',
  engineSize: '2.0L',
  fuelType: 'Petrol',
  mileage: 55000,
  auctionDateTime: new Date('2024-04-15T09:00:00'),
  startingBid: 15000,
  image: 'https://example.com/car.jpg',
};

describe('AuctionVehicleDetailsScreen', () => {
  beforeEach(() => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { vehicle: mockVehicle },
    });
  });

  it('renders vehicle details', () => {
    const { getByText } = render(<AuctionVehicleDetailsScreen />);
    expect(getByText('BMW 3 Series')).toBeTruthy();
    expect(
      getByText('Engine: 2.0L | Fuel: Petrol | Mileage: 55000'),
    ).toBeTruthy();
    expect(getByText('Auction Information')).toBeTruthy();
    expect(getByText('Auction Date')).toBeTruthy();
    expect(getByText(mockVehicle.auctionDateTime.toDateString())).toBeTruthy();
    expect(getByText('Starting Bid')).toBeTruthy();
    expect(getByText('$15000')).toBeTruthy();
    expect(getByText('Place Bid')).toBeTruthy();
    expect(getByText('Favorite')).toBeTruthy();
  });
});
