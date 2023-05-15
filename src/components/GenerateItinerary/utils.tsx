import { ItineraryItem } from "../types";

export const deleteItemFromList = (
  tripItineraryList: ItineraryItem[],
  tripId: string
) => {
  return tripItineraryList.filter((item) => item._id !== tripId);
};
