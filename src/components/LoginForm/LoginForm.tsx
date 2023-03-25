import React, { useState } from "react";
import { withRouter, useHistory, RouteComponentProps } from "react-router-dom";
import { loginUser } from "../../api/api";
import "./LoginForm.css";

interface LoginProps extends RouteComponentProps {
  checkIsLoggedIn: (isLoggedIn: boolean) => void;
  isLoggedIn: boolean;
  tripId: string;
}

const Login: React.FC<LoginProps> = ({
  checkIsLoggedIn,
  isLoggedIn,
  tripId,
}) => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };

  const loginSubmit = async () => {
    try {
      await loginUser(username, password);
      checkIsLoggedIn(true);
      history.push("/tripSelect");
      setMessage("You are logged in");
    } catch (err) {
      setMessage("Invalid username or password");
    }
  };

  const createNewAccount = () => {
    history.push("/createUser");
  };

  return (
    <div data-testid="loginForm">
      <h2 className="loginForm__heading">Login</h2>
      <section className="loginForm__form">
        <h3>USERNAME</h3>
        <input
          name="username"
          type="string"
          onChange={handleLoginChange}
          value={username}
          placeholder="Username"
          required
        />
        <h3>PASSWORD</h3>
        <input
          name="password"
          type="string"
          onChange={handleLoginChange}
          value={password}
          placeholder="Password"
          required
        />
        <button onClick={loginSubmit}>Login!</button>
        <button onClick={createNewAccount}>Create new Accout!</button>
        <p>{message}</p>
      </section>
    </div>
  );
};

export default withRouter(Login);
