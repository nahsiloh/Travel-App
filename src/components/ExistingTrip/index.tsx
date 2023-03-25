import React, { useState, useEffect } from "react";
import { useHistory, withRouter, RouteComponentProps } from "react-router-dom";
import { add, format, eachDayOfInterval } from "date-fns";

import { formatDate, formatDay } from "../FormatDates";
import AddLocationForEachDay from "../AddLocationForEachDay/add_location_for_each_day";
import { fetchTripById, editTrip } from "../../api/api";
import { Trip, ItineraryItem } from "../types";

import "./ExistingTrip.css";

type ExistingTripProps = {
  checkIsLoggedIn: (isLoggedIn: boolean) => void;
  isLoggedIn: boolean;
  tripId: string;
};

const ExistingTrip: React.FC<ExistingTripProps & RouteComponentProps> = ({
  tripId,
}) => {
  const history = useHistory();

  const [travelDates, setTravelDates] = useState([]);
  const [tripData, setTripData] = useState<Trip>({
    name: "",
    itinerary: [{ id: "", date: "" }],
  });
  const [tripDisplay, setTripDisplay] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTripById(tripId);
        setTripData(response);
      } catch (err) {
        return err;
      }
    };

    fetchData();
  }, [tripId]);

  useEffect(() => {
    // const display = tripData.itinerary.reduce((acc, cur) => {
    //   if (Array.isArray(acc[cur.date])) {
    //     acc[cur.date].push(cur);
    //   } else {
    //     acc[cur.date] = [cur];
    //   }
    //   return acc;
    // }, {});
    // setTripDisplay(display);
    // localStorage.setItem("trip", JSON.stringify(tripDisplay));
  }, [tripData, tripDisplay]);

  const updateExistingTrip = async () => {
    const tripString = localStorage.getItem("trip");
    const trip = tripString ? JSON.parse(tripString) : {};
    const itineraries: ItineraryItem[] = [];

    const dates = Object.keys(trip);

    dates.forEach((date) => {
      const travelDetail = trip[date];
      travelDetail.forEach((item: ItineraryItem) => {
        itineraries.push(item);
      });
    });

    itineraries.map((travelDetail) => {
      const d = new Date(travelDetail.date);
      return format(d, "DD MM YYYY");
    });

    await editTrip(tripId, itineraries);

    localStorage.removeItem("trip");
    history.push("/tripSelect");
  };

  const printDatesList = () => {
    const listDates = eachDayOfInterval({
      start: tripData.startDate || new Date(),
      end: tripData.endDate || add(new Date(), { days: 7 }),
    });

    return (
      <div>
        {listDates.map((day) => {
          return (
            <div key={String(day)} className={"print_date"}>
              <div className={"dates"}>
                <p className={"display_dates"}>{formatDate(day)}</p>
                <p className={"display_dates"}>{formatDay(day)}</p>
              </div>
              <AddLocationForEachDay
                dateToSave={day}
                itineraryPerDay={[]}
                dateToDisplay={""}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const generateItinerary = () => {
    const travelDates = printDatesList();
    localStorage.removeItem("trip");

    setTripDisplay(travelDates);
  };

  return (
    <div data-testid={"Travel_Itinerary"} className={"itinerary_container"}>
      <h2 className="existingItinerary__heading">Boarding Soon!</h2>
      <section className="existingItinerary_form">
        <h3 className="existingItinerary__title">{tripData.name}</h3>
        <button
          data-testid={"submitDateButton"}
          className={"submit_date_button"}
          onClick={generateItinerary}
        >
          <i className="far fa-paper-plane"></i>
        </button>
        <button onClick={updateExistingTrip}>Save Trip</button>

        <div className="existingItinerary__travelDates">{travelDates}</div>
      </section>
    </div>
  );
};

export default withRouter(ExistingTrip);
