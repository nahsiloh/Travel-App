import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { loginUser } from "../api/api";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: ""
    };
  }

  handleLoginChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  loginHandler = async () => {
    try {
      const { username, password } = this.state;
      await loginUser(username, password);
      this.props.checkIsLoggedIn(true);
      this.setState({ message: "You are logged in" });
    } catch (err) {
      this.setState({ message: "Invalid username or password" });
    }
  };

  render() {
    return (
      <div>
        <input
          name="username"
          type="string"
          onChange={this.handleLoginChange}
          value={this.state.username}
          placeholder="Username"
          required
        />
        <input
          name="password"
          type="string"
          onChange={this.handleLoginChange}
          value={this.state.password}
          placeholder="Password"
          required
        />
        <button onClick={this.loginHandler}>Login!</button>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default Login;
