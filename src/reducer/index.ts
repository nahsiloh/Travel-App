import { Reducer } from "react";
import { State } from "./state";

export type ActionTypes = {
  type: string;
  payload: unknown;
};

const reducer: Reducer<State, ActionTypes> = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_START_DATE":
      return {
        ...state,
        tripStartDate: payload as Date,
      };
    case "UPDATE_END_DATE":
      return {
        ...state,
        tripEndDate: payload as Date,
      };
    default:
      return state;
  }
};

export default reducer;
