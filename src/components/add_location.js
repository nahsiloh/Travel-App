import React from "react";

class AddLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: "",
      input_box: []
    };
  }

  // createInputBox = () => {
  //   [...Array(1)].map(() => <input></input>);
  // };

  handleClick = () => {
    // const clicks =
    const createInputBox = [...Array(1)].map((e, i) => <input></input>);
    console.log(createInputBox);
    // this.setState(() => {
    //   return { input_box:  };
    // });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}

export default AddLocation;
