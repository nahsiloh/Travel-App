import React from "react";

import { createNewTrip } from "../../api/api";
import "react-dates/initialize";

import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "./date_picker.css";

import { formatDate, formatDay } from "../FormatDates/format_dates";
import AddLocationForEachDay from "../AddLocationForEachDay/add_location_for_each_day";
import { withRouter } from "react-router-dom";

import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);

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

  saveNewTrip = async () => {
    const trip = JSON.parse(localStorage.getItem("trip")) || {};
    const itineraries = [];

    const dates = Object.keys(trip);
    dates.forEach(date => {
      const travelDetail = trip[date];
      travelDetail.forEach(item => {
        itineraries.push(item);
      });
    });

    itineraries.map(travelDetail => {
      const d = new Date(travelDetail.date);
      return moment(d).format();
    });

    const newTrip = {
      name: this.state.name,
      startDate: moment(this.state.startDate).format(),
      endDate: moment(this.state.endDate).format(),
      itinerary: itineraries
    };

    await createNewTrip(newTrip);
    localStorage.removeItem("trip");

    this.setState({
      startDate: moment(),
      endDate: moment().add(7, "days"),
      travelDates: [],
      name: "",
      tripDisplay: {}
    });

    this.props.history.push("/tripSelect");
  };

  printDatesList = () => {
    const dateRange = moment.range(this.state.startDate, this.state.endDate);
    const listDates = Array.from(dateRange.by("days"));

    return (
      <div>
        {listDates.map(day => {
          return (
            <div key={day} className={"print_date"}>
              <div className={"dates"}>
                <p className={"display_dates"}>{formatDate(day)}</p>
                <p className={"display_dates"}>{formatDay(day)}</p>
              </div>
              <AddLocationForEachDay
                dateToSave={formatDate(day)}
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

export default withRouter(DatePicker);
