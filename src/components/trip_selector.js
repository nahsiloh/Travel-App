import React from "react";
import DatePicker from "./date_picker";
import ExistingTrip from "./existing_trip";
import { fetchTrips } from "../api/api";

class TripSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripsData: [],
      tripName: ""
    };
  }

  componentDidMount = async () => {
    try {
      const response = await fetchTrips();
      this.setState({ tripsData: response });
    } catch (err) {
      return err.message;
    }
  };

  handleTripSelector = event => {
    this.setState({ tripName: event.target.value });
  };

  selectTrip = () => {
    if (this.state.tripName.length === 0) {
      return <DatePicker />;
    } else {
      return <ExistingTrip tripId={this.state.tripName} />;
    }
  };

  render() {
    return (
      <div>
        <p>Select Your Trip</p>
        <select value={this.state.tripName} onChange={this.handleTripSelector}>
          <option>Create a new Itinerary</option>
          {this.state.tripsData.map(trip => {
            return <option value={trip._id}>{trip.name}</option>;
          })}
        </select>
        {this.selectTrip()}
      </div>
    );
  }
}

export default TripSelector;
