import { Reducer } from "react";
import { AppState } from "./state";
import { ActionTypes } from "./actions";

export type ActionTypes = {
  type: string;
  payload: unknown;
};

const reducer: Reducer<AppState, ActionTypes> = (state, { type, payload }) => {
  switch (type) {
    case ActionTypes.UPDATE_TRIP_ID:
      return {
        ...state,
        tripId: payload as string,
      };
    case ActionTypes.UPDATE_TRIP_NAME:
      return {
        ...state,
        tripName: payload as string,
      };
    case ActionTypes.UPDATE_START_DATE:
      return {
        ...state,
        tripStartDate: payload as Date,
      };
    case ActionTypes.UPDATE_END_DATE:
      return {
        ...state,
        tripEndDate: payload as Date,
      };
    default:
      return state;
  }
};

export default reducer;
