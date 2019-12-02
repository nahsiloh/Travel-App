import React from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../api/api";

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

  loginSubmit = async () => {
    try {
      const { username, password } = this.state;
      await loginUser(username, password);
      this.props.checkIsLoggedIn(true);
      this.props.history.push("/tripSelect");
      this.setState({ message: "You are logged in" });
    } catch (err) {
      this.setState({ message: "Invalid username or password" });
    }
  };

  createNewAccount = () => {
    this.props.history.push("/createUser");
  };

  render() {
    return (
      <div data-testid="loginForm">
        <h2>Login</h2>
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
        <button onClick={this.loginSubmit}>Login!</button>
        <button onClick={this.createNewAccount}>Create new Accout!</button>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default withRouter(Login);
