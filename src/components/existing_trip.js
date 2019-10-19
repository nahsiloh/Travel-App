import React from "react";
import axios from "axios";
import uuidv1 from "uuid/v1";

// import "react-dates/initialize";
// import { DateRangePicker } from "react-dates";
// import "react-dates/lib/css/_datepicker.css";

import "../static/date_picker.css";

import { formatDate, formatDay, formatDateFromAPI } from "./format_dates";
import AddLocationForEachDay from "./add_location_for_each_day";
import AddInputLocationBox from "./add_input_location_box";
import SelectCountry from "./select_country";

import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);

const baseUrl = "http://localhost:5000";

class ExistingTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      travelDates: []
    };
  }

  countDays = () => {
    const diffDay = this.state.endDate.diff(this.state.startDate, "days");
    return diffDay + 1;
  };

  saveTrip = () => {
    const trip = JSON.parse(localStorage.getItem("trip")) || {};
    console.log(this.props.tripId);

    const itineraries = [];
    const dates = Object.keys(trip);
    dates.forEach(date => {
      trip[date].forEach(travelDetail => {
        itineraries.push(travelDetail);
      });
    });

    const url = `${baseUrl}/trips/${this.props.tripId}`;
    axios.patch(url, { itinerary: itineraries }, { withCredentials: true });

    localStorage.removeItem("trip");
  };

  printDatesList = () => {
    const dataStartDate = formatDateFromAPI(this.props.tripData.startDate);
    const dataEndDate = formatDateFromAPI(this.props.tripData.endDate);
    const dateRange = moment.range(dataStartDate, dataEndDate);

    const listDates = Array.from(dateRange.by("days"));

    return (
      <div>
        {listDates.map(day => {
          return (
            <div key={day} className={"print_date"}>
              {console.log("date: ", day.toISOString())}
              <div className={"dates"}>
                <p className={"display_dates"}>{formatDate(day)}</p>
                <p className={"display_dates"}>{formatDay(day)}</p>
              </div>
              <AddLocationForEachDay
                date={day.toISOString()}
                itineraryPerDay={
                  this.props.tripDisplay[day.toISOString()]
                    ? this.props.tripDisplay[day.toISOString()]
                    : []
                }
              />
            </div>
          );
        })}
      </div>
    );
  };

  generateItinerary = () => {
    const travelDates = this.printDatesList();
    this.setState(() => {
      return {
        travelDates
      };
    });
  };

  render() {
    return (
      <div data-testid={"Travel_Itinerary"} className={"itinerary_container"}>
        <button
          data-testid={"submitDateButton"}
          className={"submit_date_button"}
          onClick={this.generateItinerary}
        >
          <i className="far fa-paper-plane"></i>
        </button>
        <button onClick={this.saveTrip}>Save Trip</button>

        <div className={"travel_dates"}>{this.state.travelDates}</div>
      </div>
    );
  }
}

export default ExistingTrip;
