import React from "react";

class AddInputLocationBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleInputBoxShow: true,
      oneInputValue: "",
      oneInputCategory: "accommodation",
      oneInputCost: ""
    };
  }

  handleInputChange = event => {
    this.setState({
      oneInputValue: event.target.value
    });
  };

  handleCostInputChange = event => {
    this.setState({
      oneInputCost: event.target.value
    });
  };

  handleSelectCatagoryChange = event => {
    this.setState({ oneInputCategory: event.target.value });
  };

  saveItem = () => {
    if (this.state.oneInputValue.length === 0) {
      return;
    }
    this.setState({
      toggleInputBoxShow: false
    });
    this.props.updateLocation(
      this.state.oneInputValue,
      this.state.oneInputCategory,
      this.state.oneInputCost
    );
  };

  createInputBox = () => {
    return (
      <div>
        <select
          value={this.state.oneInputCategory}
          onChange={this.handleSelectCatagoryChange}
        >
          <option value="accommodation">Accommodation</option>
          <option value="attractions">Attractions</option>
          <option value="transportation">Transportation</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          onChange={this.handleInputChange}
          value={this.state.oneInputValue}
          placeholder={"Location"}
        />
        <input
          type="number"
          min="0"
          onChange={this.handleCostInputChange}
          value={this.state.oneInputCost}
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

  editItem = () => {
    this.setState({ toggleInputBoxShow: true });
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
    if (Number(this.state.oneInputCost) <= 0) {
      return;
    }
    return <p>{`$${this.state.oneInputCost}`}</p>;
  };

  render() {
    return (
      <div>
        {this.state.toggleInputBoxShow && <this.createInputBox />}
        {!this.state.toggleInputBoxShow && (
          <div>
            <p>{this.props.travelDetail.catagory}</p>
            <p>{this.props.travelDetail.value}</p>
            {this.printCostIfMoreThanZero()}
            <this.editAndDeleteButtons />
          </div>
        )}
      </div>
    );
  }
}
export default AddInputLocationBox;
