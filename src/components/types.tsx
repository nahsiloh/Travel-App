export type Trips = Trip[];

export type Trip = {
  _id?: string;
  name: string;
  startDate?: string;
  endDate?: string;
  itinerary: ItineraryItem[];
};

export type ItineraryItem = {
  id: string;
  destination?: string;
  program?: string;
  cost?: number;
  date: string;
};
