import { ItineraryItem } from "../components/types";

export const ActionTypes = {
  UPDATE_TRIP_ID: "UPDATE_TRIP_ID",
  UPDATE_TRIP_NAME: "UPDATE_TRIP_NAME",
  UPDATE_START_DATE: "UPDATE_START_DATE",
  UPDATE_END_DATE: "UPDATE_END_DATE",
  UPDATE_ITINERARY: "UPDATE_ITINERARY",
  SET_FETCH_TRIP: "SET_FETCH_TRIP",
};

export interface UpdateTripIdAction {
  type: typeof ActionTypes.UPDATE_TRIP_ID;
  payload: string;
}

export interface UpdateTripNameAction {
  type: typeof ActionTypes.UPDATE_TRIP_NAME;
  payload: string;
}
export interface UpdateStartDateAction {
  type: typeof ActionTypes.UPDATE_START_DATE;
  payload: Date;
}

export interface UpdateEndDateAction {
  type: typeof ActionTypes.UPDATE_END_DATE;
  payload: Date;
}

export interface UpdateItineraryAction {
  type: typeof ActionTypes.UPDATE_ITINERARY;
  payload: ItineraryItem[];
}

export interface SetFetchTripAction {
  type: typeof ActionTypes.SET_FETCH_TRIP;
  payload: boolean;
}

export type Action =
  | UpdateTripIdAction
  | UpdateTripNameAction
  | UpdateStartDateAction
  | UpdateEndDateAction
  | UpdateItineraryAction
  | SetFetchTripAction;

export const updateTripId = (tripId: string): UpdateTripIdAction => {
  return {
    type: ActionTypes.UPDATE_TRIP_ID,
    payload: tripId,
  };
};

export const updateTripName = (tripName: string): UpdateTripNameAction => {
  return {
    type: ActionTypes.UPDATE_TRIP_NAME,
    payload: tripName,
  };
};

export const updateStartDate = (startDate: Date): UpdateStartDateAction => {
  return {
    type: ActionTypes.UPDATE_START_DATE,
    payload: startDate,
  };
};

export const updateEndDate = (endDate: Date): UpdateEndDateAction => {
  return {
    type: ActionTypes.UPDATE_END_DATE,
    payload: endDate,
  };
};

export const updateItinerary = (
  itinerary: ItineraryItem[]
): UpdateItineraryAction => {
  return {
    type: ActionTypes.UPDATE_ITINERARY,
    payload: itinerary,
  };
};

export const setFetchTrip = (shouldFetchTrip: boolean): SetFetchTripAction => {
  return {
    type: ActionTypes.SET_FETCH_TRIP,
    payload: shouldFetchTrip,
  };
};
