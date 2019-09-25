import React from "react";

class AddLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_box: []
    };
  }

  createInputBox = () => {
    [...Array(1)].map(() => <input></input>);
  };

  onClick = () => {
    this.setState(() => {
      return { input_box: this.createInputBox };
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.onClick}>+</button>
        <this.createInputBox />
      </div>
    );
  }
}

export default AddLocation;
