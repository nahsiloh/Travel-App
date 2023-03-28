import React, { useState } from "react";
import { withRouter, RouteComponentProps, useHistory } from "react-router-dom";
import { Button, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import { createUser } from "../../api/api";
import SelectorContainer from "../../UIComponents/SelectorContainer/SelectorContainer";
import { ButtonStyles } from "../../UIComponents/styles";

interface CreateUserProps extends RouteComponentProps {
  checkIsLoggedIn: (isLoggedIn: boolean) => void;
  isLoggedIn: boolean;
  tripId: string;
}

export type NewUser = {
  email: string;
  password: string;
  username: string;
};

const CreateUser: React.FC<CreateUserProps> = () => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateUserChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };

  const submitCreateUser = async () => {
    try {
      const newUser = {
        username,
        email,
        password,
      };
      await createUser(newUser);
      history.push("/");
      setMessage("New account created!");
    } catch (err) {
      setMessage("Unable to create new account :(");
    }
  };

  return (
    <SelectorContainer
      selectorHeader={"Create Account"}
      selectorForm={
        <div>
          <h3>EMAIL</h3>
          <InputGroup className="mb-4" size="lg">
            <Form.Control
              name="email"
              placeholder="Email"
              type="string"
              onChange={handleCreateUserChange}
              required
            />
          </InputGroup>

          <h3>USERNAME</h3>
          <InputGroup className="mb-4" size="lg">
            <Form.Control
              name="username"
              placeholder="Username"
              type="string"
              onChange={handleCreateUserChange}
              required
            />
          </InputGroup>

          <h3>PASSWORD</h3>
          <InputGroup className="mb-4" size="lg">
            <Form.Control
              name="password"
              placeholder="Password"
              type="string"
              onChange={handleCreateUserChange}
              required
            />
          </InputGroup>

          <Button
            size="lg"
            style={{ ...ButtonStyles, margin: 10 }}
            onClick={submitCreateUser}
          >
            Create
          </Button>

          <p>{message}</p>
        </div>
      }
    />
  );
};

export default withRouter(CreateUser);
