import { add } from "date-fns";
import { ItineraryByDate, ItineraryItem } from "../components/types";

export type AppState = {
  tripId: string;
  tripName: string;
  tripStartDate: Date;
  tripEndDate: Date;
  tripItineraryList: ItineraryItem[];
  tripItineraryByDate: ItineraryByDate;
  shouldFetchTrip: boolean;
};

export const initialState: AppState = {
  tripId: "",
  tripName: "",
  tripStartDate: new Date(),
  tripEndDate: add(new Date(), { days: 7 }),
  tripItineraryList: [],
  tripItineraryByDate: {},
  shouldFetchTrip: false,
};
