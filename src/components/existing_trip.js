import React from "react";
import axios from "axios";
import uuidv1 from "uuid/v1";

import "../static/date_picker.css";

import { formatDate, formatDay } from "./format_dates";
import AddLocationForEachDay from "./add_location_for_each_day";

import Moment from "moment";
import { extendMoment } from "moment-range";
import { fetchTripById, editTrip } from "../api/api";
const moment = extendMoment(Moment);

class ExistingTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      travelDates: [],
      tripData: { name: "" },
      tripDisplay: {}
    };
  }

  componentDidMount = async () => {
    try {
      const trip = await fetchTripById(this.props.tripId);
      trip.itinerary.map(t => {
        const s = new Date(t.date);
        t.date = moment(s).format("D MMMM YYYY");
      });

      const display = trip.itinerary.reduce((acc, cur) => {
        if (Array.isArray(acc[cur.date])) {
          acc[cur.date].push(cur);
        } else {
          acc[cur.date] = [cur];
        }
        return acc;
      }, {});

      this.setState({ tripDisplay: display, tripData: trip });
      console.log(this.state.tripData);
    } catch (err) {
      return err.message;
    }
  };

  updateTrip = async () => {
    const trip = JSON.parse(localStorage.getItem("trip")) || {};
    const itineraries = [];

    const dates = Object.keys(trip);

    //to add new item
    dates.forEach(date => {
      const travelDetail = trip[date];
      // console.log(travelDetail);
      travelDetail.forEach(item => {
        //for adding a new item
        if (item._id === undefined) {
          itineraries.push(item);
        }
      });
    });

    itineraries.map(travelDetail => {
      const d = new Date(travelDetail.date);
      return moment(d).format();
    });

    const editedTrip = this.state.tripData.itinerary.concat(itineraries);
    await editTrip(this.props.tripId, editedTrip);

    localStorage.removeItem("trip");
    window.location = "/selecttrip";
  };

  printDatesList = () => {
    const dateRange = moment.range(
      this.state.tripData.startDate,
      this.state.tripData.endDate
    );

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
                dateToDisplay={formatDate(day)}
                itineraryPerDay={
                  this.state.tripDisplay[formatDate(day)]
                    ? this.state.tripDisplay[formatDate(day)]
                    : []
                }
                tripId={this.props.tripId}
              />
            </div>
          );
        })}
      </div>
    );
  };

  generateItinerary = () => {
    const travelDates = this.printDatesList();

    localStorage.removeItem("trip");

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
        <button onClick={this.updateTrip}>Save Trip</button>

        <div className={"travel_dates"}>{this.state.travelDates}</div>
      </div>
    );
  }
}

export default ExistingTrip;
