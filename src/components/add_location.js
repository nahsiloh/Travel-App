import React from "react";
import AddInputLocationBox from "./add_input_component";
import uuidv1 from "uuid/v1";

class AddLocationForEachDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputComponent: []
    };
  }

  // {value: ""}
  addOneLocation = () => {
    this.setState({
      inputComponent: [
        ...this.state.inputComponent,
        { id: uuidv1(), value: "" }
      ]
    });
  };

  updateLocation = (travelDetail, value) => {
    travelDetail.value = value;
    this.setState({
      inputComponent: [...this.state.inputComponent]
    });
  };

  deleteLocation = travelDetail => {
    this.setState({
      inputComponent: [
        ...this.state.inputComponent.filter(item => item !== travelDetail)
      ]
    });
  };

  render() {
    console.log(this.state.inputComponent);
    return (
      <div>
        <button onClick={this.addOneLocation}>
          <i className="fas fa-plus"></i>
        </button>
        {this.state.inputComponent.map(travelDetail => {
          return (
            <AddInputLocationBox
              key={travelDetail.id}
              travelDetail={travelDetail}
              updateLocation={val => this.updateLocation(travelDetail, val)}
              deleteItem={() => this.deleteLocation(travelDetail)}
            />
          );
        })}
      </div>
    );
  }
}

export default AddLocationForEachDay;
