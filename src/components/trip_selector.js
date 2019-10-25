import React from "react";
import axios from "axios";
import DatePicker from "./date_picker";
import ExistingTrip from "./existing_trip";

const baseUrl = "http://localhost:5000";

class TripSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripsData: [],
      tripName: ""
    };
  }

  componentDidMount() {
    const url = `${baseUrl}/trips`;
    axios
      .get(url)
      .then(res => {
        this.setState({ tripsData: res.data });
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleTripSelector = event => {
    this.setState({ tripName: event.target.value });
  };

  selectTrip = () => {
    if (this.state.tripName.length === 0) {
      // return <DatePicker />;
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
