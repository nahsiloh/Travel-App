import React from "react";
import axios from "axios";
import uuidv1 from "uuid/v1";

import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

import "../static/date_picker.css";

import { formatDate, formatDay } from "./format_dates";
import AddLocationForEachDay from "./add_location_for_each_day";
import AddInputLocationBox from "./add_input_location_box";
import SelectCountry from "./select_country";

import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);

const baseUrl = "http://localhost:5000";

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment().add(7, "days"),
      travelDates: [],
      name: "",
      tripDisplay: {}
    };
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  countDays = () => {
    const diffDay = this.state.endDate.diff(this.state.startDate, "days");
    return diffDay + 1;
  };

  saveNewTrip = () => {
    const trip = JSON.parse(localStorage.getItem("trip")) || {};

    const itineraries = [];
    const dates = Object.keys(trip);
    dates.forEach(date => {
      trip[date].forEach(travelDetail => {
        itineraries.push(travelDetail);
      });
    });

    const newTrip = {
      name: `${this.state.name}`,
      startDate: `${this.state.startDate}`,
      endDate: `${this.state.endDate}`,
      itinerary: itineraries
    };

    const url = `${baseUrl}/trips/new`;
    axios.post(url, newTrip, { withCredentials: true });

    localStorage.removeItem("trip");

    window.location = "/selecttrip";
  };

  printDatesList = () => {
    const dateRange = moment.range(this.state.startDate, this.state.endDate);
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
                  this.state.tripDisplay[day.toISOString()]
                    ? this.state.tripDisplay[day.toISOString()]
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

    localStorage.clear("trip");

    this.setState(() => {
      return {
        travelDates
      };
    });
  };

  render() {
    return (
      <div data-testid={"Travel_Itinerary"} className={"itinerary_container"}>
        <input
          type="string"
          onChange={this.handleNameChange}
          value={this.state.name}
          placeholder="Trip Name"
          defaultValue="Test trip"
        />
        <div className={"set_date_container"}>
          <DateRangePicker
            startDate={this.state.startDate}
            startDateId="departure_date"
            endDate={this.state.endDate}
            endDateId="return_date"
            onDatesChange={({ startDate, endDate }) =>
              this.setState({ startDate, endDate })
            }
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => this.setState({ focusedInput })}
          />
        </div>
        {/* <p>DESTINATION</p> */}
        {/* <SelectCountry /> */}
        <button
          data-testid={"submitDateButton"}
          className={"submit_date_button"}
          onClick={this.generateItinerary}
        >
          <i className="far fa-paper-plane"></i>
        </button>
        <button onClick={this.saveNewTrip}>Save Trip</button>

        <div className={"travel_dates"}>{this.state.travelDates}</div>
      </div>
    );
  }
}

export default DatePicker;
