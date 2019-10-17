import React from "react";
import axios from "axios";

import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

import "../static/date_picker.css";

import { formatDate, formatDay } from "./format_dates";
import AddLocationForEachDay from "./add_location_for_each_day";
import SelectCountry from "./select_country";

import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);

// const baseUrl = "http://localhost:5000";

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment().add(7, "days"),
      travelDates: []
      // trip: { itinerary: [] }
    };
  }

  countDays = () => {
    const diffDay = this.state.endDate.diff(this.state.startDate, "days");
    return diffDay + 1;
  };

  // fetchItinerary = () => {
  //   const url = `${baseUrl}/trips/5da68f857e86df5654306ff7`;
  //   axios
  //     .get(url, { withCredentials: true })
  //     .then(res => {
  //       this.setState({
  //         trip: res.data
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

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
              <AddLocationForEachDay />
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

        <button onClick={this.saveItinerary}>Save itinerary</button>

        {/* <button onClick={this.fetchItinerary}>Get itinerary</button>

        <div>
          {this.state.trip.itinerary.map(i => {
            return (
              <div key={i._id}>
                <p>{i.program}</p>
                <p>{i.destination}</p>
                <p>{i.cost}</p>
                <p>{i.date}</p>
              </div>
            );
          })}
        </div> */}

        <div className={"travel_dates"}>{this.state.travelDates}</div>
      </div>
    );
  }
}

export default DatePicker;
