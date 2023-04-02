import { Reducer } from "react";
import { AppState } from "./state";
import { ActionTypes } from "./actions";
import { ItineraryByDate, ItineraryItem } from "../components/types";
import { formatItinerary } from "../components/utils";

export type ActionTypes = {
  type: string;
  payload: unknown;
};

const {
  UPDATE_TRIP_ID,
  UPDATE_TRIP_NAME,
  UPDATE_START_DATE,
  UPDATE_END_DATE,
  UPDATE_ITINERARY,
  SET_FETCH_TRIP,
} = ActionTypes;

const reducer: Reducer<AppState, ActionTypes> = (state, { type, payload }) => {
  switch (type) {
    case UPDATE_TRIP_ID:
      return {
        ...state,
        tripId: payload as string,
      };
    case UPDATE_TRIP_NAME:
      return {
        ...state,
        tripName: payload as string,
      };
    case UPDATE_START_DATE:
      return {
        ...state,
        tripStartDate: payload as Date,
      };
    case UPDATE_END_DATE:
      return {
        ...state,
        tripEndDate: payload as Date,
      };
    case UPDATE_ITINERARY:
      const formattedItinerary = formatItinerary(payload as ItineraryItem[]);

      return {
        ...state,
        tripItineraryList: payload as ItineraryItem[],
        tripItineraryByDate: formattedItinerary as ItineraryByDate,
      };
    case SET_FETCH_TRIP:
      return {
        ...state,
        shouldFetchTrip: payload as boolean,
      };
    default:
      return state;
  }
};

export default reducer;
