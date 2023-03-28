import { add } from "date-fns";

export type State = {
  tripStartDate: Date;
  tripEndDate: Date;
};

export const initialState: State = {
  tripStartDate: new Date(),
  tripEndDate: add(new Date(), { days: 7 }),
};
