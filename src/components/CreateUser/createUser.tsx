import React from "react";
import { withRouter } from "react-router-dom";
import { createUser } from "../../api/api";
import "./CreateUser.css";

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      message: ""
    };
  }

  handleCreateUserChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  submitCreateUser = async () => {
    try {
      const newUser = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      };
      await createUser(newUser);
      this.props.history.push("/");
      this.setState({ message: "New account created!" });
    } catch (err) {
      this.setState({ message: "Unable to create new account :(" });
    }
  };

  render() {
    return (
      <div>
        <h2 className="createUser__heading">Create an account!</h2>
        <section className="createUser__form">
          <h3>EMAIL</h3>
          <input
            name="email"
            type="string"
            onChange={this.handleCreateUserChange}
            value={this.state.email}
            placeholder="Email"
            required
          />
          <h3>USERNAME</h3>
          <input
            name="username"
            type="string"
            onChange={this.handleCreateUserChange}
            value={this.state.username}
            placeholder="Username"
            required
          />
          <h3>PASSWORD</h3>
          <input
            name="password"
            type="string"
            onChange={this.handleCreateUserChange}
            value={this.state.password}
            placeholder="Password"
            required
          />
          <button
            onClick={this.submitCreateUser}
            data-testid={"createUserButton"}
          >
            Create!
          </button>
          <p>{this.state.message}</p>
        </section>
      </div>
    );
  }
}

export default withRouter(CreateUser);
