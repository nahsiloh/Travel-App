import React from "react";

class AddInputLocationBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      inputBoxShow: true
    };
  }

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  saveItem = () => {
    if (this.state.inputValue.length === 0) {
      return;
    }
    this.setState({
      inputBoxShow: false
    });
    this.props.updateLocation(this.state.inputValue);
  };

  createInputBox = () => {
    return (
      <div>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.inputValue}
        />
        <button onClick={this.saveItem}>
          <i className="fas fa-check"></i>
        </button>
        <button onClick={this.props.deleteItem}>
          <i className="far fa-trash-alt"></i>
        </button>
      </div>
    );
  };

  editItem = () => {
    this.setState({ inputBoxShow: true });
  };

  editAndDeleteButtons = () => {
    return (
      <div>
        <button onClick={this.editItem}>
          <i className="fas fa-pen"></i>
        </button>
        <button onClick={this.props.deleteItem}>
          <i className="far fa-trash-alt"></i>
        </button>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.state.inputBoxShow && <this.createInputBox />}
        {!this.state.inputBoxShow && (
          <div>
            <p>{this.props.travelDetail.value}</p>
            <this.editAndDeleteButtons />
          </div>
        )}
      </div>
    );
  }
}
export default AddInputLocationBox;
