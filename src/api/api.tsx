import axios from "./axios";

import { Trip, ItineraryItem } from "../components/types";
import { NewUser } from "../components/CreateUser";

export const fetchTrips = async () => {
  const response = await axios.get("/trips");
  return response.data;
};

export const fetchTripById = async (tripId: string) => {
  const response = await axios.get(`/trips/${tripId}`);
  return response.data;
};

export const createNewTrip = async (newTrip: Trip) => {
  await axios.post("/trips/new", newTrip, { withCredentials: true });
};

export const editTrip = async (tripId: string, editedTrip: ItineraryItem[]) => {
  await axios.put(
    `/trips/${tripId}`,
    { itinerary: editedTrip },
    { withCredentials: true }
  );
};

export const loginUser = async (username: string, password: string) => {
  const loginDetails = { username, password };
  const login = await axios.post("/users/login", loginDetails, {
    withCredentials: true,
  });
  return login.data;
};

export const logoutUser = async () => {
  await axios.post("/users/logout", {}, { withCredentials: true });
};

export const createUser = async (newUser: NewUser) => {
  await axios.post("/users/new", newUser, { withCredentials: true });
};
