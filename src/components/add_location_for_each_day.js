import React from "react";

import AddInputLocationBox from "./add_input_location_box";
import uuidv1 from "uuid/v1";
import "../static/add_location_for_each_day.css";

class AddLocationForEachDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itineraryPerDay: this.props.itineraryPerDay
    };
  }

  displayOneItineraryInput = () => {
    this.setState({
      itineraryPerDay: [
        ...this.state.itineraryPerDay,
        {
          id: uuidv1(),
          destination: "",
          program: "",
          cost: "",
          date: this.props.date
        }
      ]
    });
  };

  saveLocation = (travelDetail, inputDestination, inputProgram, inputCost) => {
    travelDetail.destination = inputDestination;
    travelDetail.program = inputProgram;
    travelDetail.cost = inputCost;

    this.setState({
      itineraryPerDay: [...this.state.itineraryPerDay]
    });

    const trip = JSON.parse(localStorage.getItem("trip")) || {};
    console.log(trip);
    trip[this.props.date] = this.state.itineraryPerDay;
    localStorage.setItem("trip", JSON.stringify(trip));
  };

  deleteLocation = travelDetail => {
    this.setState({
      itineraryPerDay: [
        ...this.state.itineraryPerDay.filter(item => item !== travelDetail)
      ]
    });

    const trip = JSON.parse(localStorage.getItem("trip")) || {};

    const newTripArray = trip[this.props.date].filter(trip => {
      return JSON.stringify(trip) !== JSON.stringify(travelDetail);
    });

    trip[this.props.date] = newTripArray;

    localStorage.setItem("trip", JSON.stringify(trip));
  };

  render() {
    console.log(this.state.itineraryPerDay);
    return (
      <div>
        <div className={"each_date"}>
          <button
            id={"add_button_for_each_date"}
            data-testid={"add_button_for_each_date"}
            onClick={this.displayOneItineraryInput}
          >
            <i className="fas fa-plus"></i>
          </button>

          <div className={"list_of_locations"}>
            {this.state.itineraryPerDay.map(travelDetail => {
              return (
                <AddInputLocationBox
                  key={travelDetail.id}
                  travelDetail={travelDetail}
                  saveLocation={(dest, prog, cost) =>
                    this.saveLocation(travelDetail, dest, prog, cost)
                  }
                  deleteItem={() => this.deleteLocation(travelDetail)}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default AddLocationForEachDay;
