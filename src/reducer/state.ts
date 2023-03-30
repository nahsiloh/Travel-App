import { add } from "date-fns";
import { ItineraryItem } from "../components/types";

export type AppState = {
  tripId: string;
  tripName: string;
  tripStartDate: Date;
  tripEndDate: Date;
  tripItinerary: ItineraryItem[];
};

export const initialState: AppState = {
  tripId: "",
  tripName: "",
  tripStartDate: new Date(),
  tripEndDate: add(new Date(), { days: 7 }),
  tripItinerary: [],
};
