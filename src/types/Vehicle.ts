export interface Vehicle {
  id: number;
  make: string;
  model: string;
  engineSize: string;
  fuelType: string;
  year: number;
  mileage: number;
  auctionDateTime: Date;
  startingBid: number;
  image: string;
  favorite: boolean;
}
