import React from "react";
import "./add_input_location_box.css";

class AddInputLocationBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // shouldDisplayItinerary: true,
      shouldShowInputBoxForEdit: false,
      destination: "",
      program: "accommodation",
      cost: ""
    };
  }

  handleDestinationChange = event => {
    this.setState({
      destination: event.target.value
    });
  };

  handleCostChange = event => {
    this.setState({
      cost: event.target.value
    });
  };

  handleProgramChange = event => {
    this.setState({ program: event.target.value });
  };

  saveItem = () => {
    if (this.state.destination.length === 0) {
      return;
    }

    this.setState({ shouldShowInputBoxForEdit: false });

    this.props.saveLocation(
      this.state.destination,
      this.state.program,
      this.state.cost
    );
  };

  createInputBox = () => {
    return (
      <div className={"input_box_container"} data-testid="input_box">
        <select
          value={this.state.program || this.props.travelDetail.program}
          onChange={this.handleProgramChange}
        >
          <option value="accommodation">Accommodation</option>
          <option value="attractions">Attractions</option>
          <option value="transportation">Transportation</option>
          <option value="other">Other</option>
        </select>
        <textarea
          type="text"
          aria-label="location_input_box"
          onChange={this.handleDestinationChange}
          value={this.state.destination || this.props.travelDetail.destination}
          placeholder={"Location"}
        />
        <input
          type="number"
          aria-label="cost_input_box"
          min="0"
          onChange={this.handleCostChange}
          value={this.state.cost || this.props.travelDetail.cost}
          placeholder={"Cost"}
        />
        <button data-testid={"save_item"} onClick={this.saveItem}>
          <i className="fas fa-check"></i>
        </button>
        <button data-testid={"delete_item"} onClick={this.props.deleteItem}>
          <i className="far fa-trash-alt"></i>
        </button>
      </div>
    );
  };

  editAndDeleteButtons = () => {
    return (
      <div>
        <button data-testid={"edit_item"} onClick={this.editItem}>
          <i className="fas fa-pen"></i>
        </button>
        <button data-testid={"delete_item"} onClick={this.props.deleteItem}>
          <i className="far fa-trash-alt"></i>
        </button>
      </div>
    );
  };

  printCostIfMoreThanZero = () => {
    if (Number(this.props.travelDetail.cost) <= 0) {
      return;
    }
    return <p>{`$${this.props.travelDetail.cost}`}</p>;
  };

  displayExistingTravelDetail = () => {
    return (
      <div data-testid="saved_input">
        <p>{this.props.travelDetail.program}</p>
        <p>{this.props.travelDetail.destination}</p>
        {this.printCostIfMoreThanZero()}
        <this.editAndDeleteButtons />
      </div>
    );
  };

  displayTravelDetailOrInputBox = () => {
    if (
      this.props.travelDetail.destination.length > 0 &&
      !this.state.shouldShowInputBoxForEdit
    ) {
      return this.displayExistingTravelDetail();
    } else if (
      this.props.travelDetail.destination.length === 0 ||
      this.state.shouldShowInputBoxForEdit
    ) {
      return this.createInputBox();
    }
  };

  editItem = () => {
    this.setState({
      destination: this.props.travelDetail.destination,
      program: this.props.travelDetail.program,
      cost: this.props.travelDetail.cost,
      shouldShowInputBoxForEdit: true
    });
  };

  render() {
    return (
      <div className={"input_display_container"}>
        <this.displayTravelDetailOrInputBox />
      </div>
    );
  }
}
export default AddInputLocationBox;
