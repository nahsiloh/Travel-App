import React, { useEffect, useState, useContext } from "react";
import { withRouter, RouteComponentProps, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { format } from "date-fns";

import { createNewTrip, fetchTripById, fetchTrips } from "../../api/api";
import CreateTrip from "./CreateTrip";
import DateSelector from "./DateSelector";
import GenerateItinerary from "../GenerateItinerary";
import { ItineraryItem } from "../types";

import SelectorContainer from "../../UIComponents/SelectorContainer/SelectorContainer";
import { ReducerContext } from "../App";
import {
  setFetchTrip,
  updateEndDate,
  updateItinerary,
  updateStartDate,
  updateTripId,
} from "../../reducer/actions";

type TripSelectorProps = RouteComponentProps<{ id: string }> & {
  checkTripId: (tripId: string) => void;
};

type TripData = {
  _id: string;
  name: string;
};

const TripSelector: React.FC<TripSelectorProps> = () => {
  const { state, dispatch } = useContext(ReducerContext);
  const { tripId, tripName, tripStartDate, tripEndDate, shouldFetchTrip } =
    state;

  const history = useHistory();

  const [tripList, setTripList] = useState<TripData[]>([]);
  const [isNewTrip, setIsNewTrip] = useState(true);

  useEffect(() => {
    const fetchTripList = async () => {
      try {
        const response = await fetchTrips();
        setTripList(response);
      } catch (err) {
        return err;
      }
    };

    fetchTripList();
  }, []);

  useEffect(() => {
    const fetchTripDetail = async () => {
      try {
        const response = await fetchTripById(tripId);
        const { _id, startDate, endDate, itinerary } = response;

        dispatch(updateTripId(_id));
        dispatch(updateStartDate(new Date(startDate)));
        dispatch(updateEndDate(new Date(endDate)));
        dispatch(updateItinerary(itinerary));
      } catch (err) {
        return err;
      }
    };

    if (!isNewTrip || shouldFetchTrip === true) {
      fetchTripDetail();
    }
    dispatch(setFetchTrip(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId, shouldFetchTrip]);

  const saveNewTrip = async () => {
    const tripString = localStorage.getItem("trip");
    const trip = tripString ? JSON.parse(tripString) : {};
    const itineraries: ItineraryItem[] = [];

    if (Object.keys(trip).length > 0) {
      const dates = Object.keys(trip);
      dates.forEach((date) => {
        const travelDetails = trip[date];
        travelDetails.forEach((item: ItineraryItem) => {
          itineraries.push(item);
        });
      });

      // eslint-disable-next-line array-callback-return
      itineraries.map((travelDetail) => {
        if (travelDetail.date) {
          const d = new Date(travelDetail.date);
          return format(d, "YYYY-MM-DD");
        }
      });
    }

    const newTrip = {
      name: tripName,
      startDate: String(tripStartDate),
      endDate: String(tripEndDate),
      itinerary: itineraries,
    };

    await createNewTrip(newTrip);
    localStorage.removeItem("trip");

    history.push("/tripSelect");
  };

  const handleTripSelector = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    if (value === "Create a new Itinerary") {
      setIsNewTrip(true);
      dispatch(updateTripId(""));
    } else {
      setIsNewTrip(false);
      dispatch(updateTripId(value));
    }
  };

  const generateItinerary = () => {
    localStorage.removeItem("trip");
  };

  return (
    <div>
      <SelectorContainer
        selectorHeader={"BOARDING SOON..."}
        selectorForm={
          <div>
            <h3>SELECT YOUR TRIP</h3>
            <Form.Select
              className="mb-3"
              size="lg"
              style={{ width: "100%", height: 48 }}
              onChange={handleTripSelector}
            >
              <option>Create a new Itinerary</option>
              {tripList.map((trip) => {
                return (
                  <option key={trip._id} value={trip._id}>
                    {trip.name}
                  </option>
                );
              })}
            </Form.Select>

            {isNewTrip ? <CreateTrip /> : <></>}

            <h3>Trip Duration</h3>
            <DateSelector />

            <Button
              size="lg"
              style={{
                backgroundColor: "#5f9595",
              }}
              onClick={generateItinerary}
            >
              <i className="far fa-paper-plane"></i>
            </Button>

            <Button
              size="lg"
              style={{
                backgroundColor: "#5f9595",
              }}
              onClick={saveNewTrip}
            >
              Save Trip
            </Button>
          </div>
        }
      />

      <GenerateItinerary />
    </div>
  );
};

export default withRouter(TripSelector);
