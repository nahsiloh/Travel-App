import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const baseUrl = "http://localhost:5000";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginField: {
        username: "",
        password: ""
      },
      isLoggedIn: false
    };
  }

  handleLoginChange = event => {
    const loginField = this.state.loginField;
    loginField[event.target.name] = event.target.value;
    this.setState({ loginField });
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
          name="username"
          type="string"
          onChange={this.handleLoginChange}
          value={this.state.username}
          placeholder="Username"
        />
        <input
          name="password"
          type="string"
          onChange={this.handleLoginChange}
          value={this.state.password}
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
