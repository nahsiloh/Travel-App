import React from "react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      depart_date: "",
      return_date: ""
    };
  }

  handleChangeDepart = event => {
    this.setState({ depart_date: event.target.value });
  };

  handleChangeReturn = event => {
    this.setState({ return_date: event.target.value });
  };

  render() {
    return (
      <div>
        <h2>Depart</h2>
        <input
          type="date"
          onChange={this.handleChangeDepart}
          value={this.state.depart_date}
        ></input>
        {/* <h3>{this.state.depart_date}</h3> */}
        <h2>Return</h2>
        <input
          type="date"
          onChange={this.handleChangeReturn}
          value={this.state.return_date}
        ></input>
      </div>
    );
  }
}

export default Home;
