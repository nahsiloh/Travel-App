import React from "react";
import AddInputLocationBox from "./add_input_component";
import uuidv1 from "uuid/v1";

class AddLocationForEachDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfLocationsPerDay: []
    };
  }

  // {value: ""}
  addOneLocation = () => {
    this.setState({
      listOfLocationsPerDay: [
        ...this.state.listOfLocationsPerDay,
        { id: uuidv1(), value: "", catagory: "", cost: "" }
      ]
    });
  };

  updateLocation = (travelDetail, inputValue, inputCategory, inputCost) => {
    travelDetail.value = inputValue;
    travelDetail.catagory = inputCategory;
    travelDetail.cost = inputCost;
    this.setState({
      listOfLocationsPerDay: [...this.state.listOfLocationsPerDay]
    });
  };

  deleteLocation = travelDetail => {
    this.setState({
      listOfLocationsPerDay: [
        ...this.state.listOfLocationsPerDay.filter(
          item => item !== travelDetail
        )
      ]
    });
  };

  render() {
    // console.log(this.state.listOfLocationsPerDay);
    return (
      <div>
        <button
          data-testid={"add_button_for_each_date"}
          onClick={this.addOneLocation}
        >
          <i className="fas fa-plus"></i>
        </button>
        {this.state.listOfLocationsPerDay.map(travelDetail => {
          return (
            <AddInputLocationBox
              key={travelDetail.id}
              travelDetail={travelDetail}
              updateLocation={(val, cat, cost) =>
                this.updateLocation(travelDetail, val, cat, cost)
              }
              deleteItem={() => this.deleteLocation(travelDetail)}
            />
          );
        })}
      </div>
    );
  }
}

export default AddLocationForEachDay;
