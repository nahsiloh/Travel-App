import { format } from "date-fns";
import { ItineraryByDate, ItineraryItem } from "./types";

export const formatDate = (date: Date) => {
  return format(date, "d LLL yyyy");
};

export const formatDay = (date: Date) => {
  return format(date, "dddd");
};

export const formatStringToDate = (date: string) => {
  return new Date(date);
};

export const formatItinerary = (itinerary: ItineraryItem[]) => {
  const formattedItinerary: ItineraryByDate = {};

  itinerary.forEach((item) => {
    const { date } = item;
    const formattedDate = formatDate(new Date(date));
    if (formattedItinerary[formattedDate] === undefined) {
      formattedItinerary[formattedDate] = [item];
    } else {
      formattedItinerary[formattedDate].push(item);
    }
  });

  return formattedItinerary;
};
