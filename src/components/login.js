import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const baseUrl = "http://localhost:5000";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLoggedIn: false
    };
  }

  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  loginHandler = () => {
    const url = `${baseUrl}/users/login`;
    axios
      .post(
        url,
        {
          // username: this.state.username,
          // password: this.state.password
          username: "Loma Kris",
          password: "qwertyuiop"
        },
        { withCredentials: true }
      )
      .then(() => {
        this.setState({ isLoggedIn: true });
      })
      .catch(err => {
        console.error(err);
        this.setState({ isLoggedIn: false });
      });
  };

  render() {
    return (
      <div>
        <input
          type="string"
          onChange={this.handleUsernameChange}
          value={this.state.username}
          placeholder="Username"
        />
        <input
          type="string"
          onChange={this.handlePasswordChange}
          value={this.state.username}
          placeholder="Password"
        />
        <Link to="/selecttrip">
          <button onSubmit={this.loginHandler}>Login!</button>
        </Link>
      </div>
    );
  }
}

export default Login;
