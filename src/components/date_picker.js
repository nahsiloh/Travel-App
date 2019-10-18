import React from "react";
import axios from "axios";
import uuidv1 from "uuid/v1";

import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

import "../static/date_picker.css";

import { formatDate, formatDay, formatDateFromAPI } from "./format_dates";
import AddLocationForEachDay from "./add_location_for_each_day";
import AddInputLocationBox from "./add_input_location_box";
import SelectCountry from "./select_country";

import Moment from "moment";
import { extendMoment } from "moment-range";
import { pbkdf2 } from "crypto";
const moment = extendMoment(Moment);

const baseUrl = "http://localhost:5000";

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment().add(7, "days"),
      travelDates: [],
      trip: {}
    };
  }

  countDays = () => {
    const diffDay = this.state.endDate.diff(this.state.startDate, "days");
    return diffDay + 1;
  };

  componentDidMount() {
    const url = `${baseUrl}/trips/5da87e9344a2330c94be22b0`;
    axios
      .get(url, { withCredentials: true })
      .then(res => {
        const trip = res.data;

        const display = trip.itinerary.reduce((acc, cur) => {
          if (Array.isArray(acc[cur.date])) {
            acc[cur.date].push(cur);
          } else {
            acc[cur.date] = [cur];
          }
          return acc;
        }, {});

        this.setState({ trip: display });
        console.log(this.state.trip);
      })
      .catch(err => {
        console.log(err);
      });
  }

  printDatesList = () => {
    let dateRange = {};
    if (Object.entries(this.state.trip).length === 0) {
      dateRange = moment.range(this.state.startDate, this.state.endDate);
    } else {
      const dataDate = Object.keys(this.state.trip);
      const dataStartDate = formatDateFromAPI(dataDate[0]);
      const dataEndDate = formatDateFromAPI(dataDate[dataDate.length - 1]);
      dateRange = moment.range(dataStartDate, dataEndDate);
    }

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
                itineraryPerDay={
                  this.state.trip[day.toISOString()]
                    ? this.state.trip[day.toISOString()]
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
        <button onClick={this.saveTrip}>Save Trip</button>

        <div className={"travel_dates"}>{this.state.travelDates}</div>
      </div>
    );
  }
}

export default DatePicker;
