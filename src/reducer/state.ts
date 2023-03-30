import { add } from "date-fns";

export type AppState = {
  tripId: string;
  tripName: string;
  tripStartDate: Date;
  tripEndDate: Date;
};

export const initialState: AppState = {
  tripId: "",
  tripName: "",
  tripStartDate: new Date(),
  tripEndDate: add(new Date(), { days: 7 }),
};
