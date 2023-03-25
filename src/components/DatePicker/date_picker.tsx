import React, { useState } from "react";
import { withRouter, RouteComponentProps, useHistory } from "react-router-dom";
import { add, format, eachDayOfInterval } from "date-fns";
import { Datepicker } from "@datepicker-react/styled";

import { createNewTrip } from "../../api/api";
import { formatDate, formatDay } from "../FormatDates/format_dates";
import AddLocationForEachDay from "../AddLocationForEachDay/add_location_for_each_day";
import { ItineraryItem } from "../types";

import "./date_picker.css";

type DatePickerProps = {
  checkIsLoggedIn: (isLoggedIn: boolean) => void;
  isLoggedIn: boolean;
  tripId: string;
};

const DatePicker: React.FC<DatePickerProps & RouteComponentProps> = () => {
  const history = useHistory();

  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(add(startDate, { days: 7 }));
  const [travelDates, setTravelDates] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tripDisplay, setTripDisplay] = useState({});
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTripName(event.target.value);
  };

  const handleDatepickerClose = () => {
    setIsDatePickerOpen(false);
  };

  const handleDateSelectionChange = () => {
    setIsDatePickerOpen(true);
  };

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
      startDate,
      endDate,
      itinerary: itineraries,
    };

    await createNewTrip(newTrip);
    localStorage.removeItem("trip");

    setTripName("");
    setStartDate(new Date());
    setEndDate(add(startDate, { days: 7 }));
    setTravelDates([]);
    setTripDisplay({});

    history.push("/tripSelect");
  };

  const printDatesList = () => {
    const listDates = eachDayOfInterval({ start: startDate, end: endDate });

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

  const handleDatesChange = () => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <div data-testid={"Travel_Itinerary"} className={"itinerary_container"}>
      <h2 className="createItinerary__heading">Plan a new trip!</h2>
      <section className="createItinerary__form">
        <h3>Trip Name</h3>
        <input
          type="string"
          onChange={handleNameChange}
          value={"tripName"}
          placeholder="Trip Name"
          defaultValue="Test trip"
        />
        <h3>Trip Duration</h3>
        <button onClick={handleDateSelectionChange}>Select Dates</button>
        <div className={"set_date_container"}>
          {isDatePickerOpen ? (
            <Datepicker
              onDatesChange={handleDatesChange}
              startDate={startDate} // Date or null
              endDate={endDate} // Date or null
              focusedInput={null}
              onClose={handleDatepickerClose}
            />
          ) : (
            <></>
          )}
        </div>
        <button
          data-testid={"submitDateButton"}
          className={"submit_date_button"}
          onClick={generateItinerary}
        >
          <i className="far fa-paper-plane"></i>
        </button>
        <button onClick={saveNewTrip}>Save Trip</button>

        <div className={"createItinerary__travelDates"}>{travelDates}</div>
      </section>
    </div>
  );
};

export default withRouter(DatePicker);
