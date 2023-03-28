import React, { useState } from "react";
import { withRouter, useHistory, RouteComponentProps } from "react-router-dom";
import { Button, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import { loginUser } from "../../api/api";
import SelectorContainer from "../../UIComponents/SelectorContainer/SelectorContainer";
import { ButtonStyles } from "../../UIComponents/styles";

interface LoginProps extends RouteComponentProps {
  checkIsLoggedIn: (isLoggedIn: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ checkIsLoggedIn }) => {
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
    <div>
      <SelectorContainer
        selectorHeader={"Login"}
        selectorForm={
          <div>
            <h3>USERNAME</h3>
            <InputGroup className="mb-4" size="lg">
              <Form.Control
                name="username"
                placeholder="Username"
                type="string"
                onChange={handleLoginChange}
              />
            </InputGroup>

            <h3>PASSWORD</h3>
            <InputGroup className="mb-4" size="lg">
              <Form.Control
                name="password"
                placeholder="Password"
                type="string"
                onChange={handleLoginChange}
              />
            </InputGroup>

            <Button
              size="lg"
              style={{ ...ButtonStyles, margin: 10 }}
              onClick={loginSubmit}
            >
              Login
            </Button>

            <Button
              size="lg"
              style={{ ...ButtonStyles, margin: 10 }}
              onClick={createNewAccount}
            >
              Create Account
            </Button>

            <p>{message}</p>
          </div>
        }
      />
    </div>
  );
};

export default withRouter(Login);
