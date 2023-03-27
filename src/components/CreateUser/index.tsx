import React, { useState } from "react";
import { withRouter, RouteComponentProps, useHistory } from "react-router-dom";
import { createUser } from "../../api/api";

import "./CreateUser.css";

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
    <div>
      <h2 className="createUser__heading">Create an account!</h2>
      <section className="createUser__form">
        <h3>EMAIL</h3>
        <input
          name="email"
          type="string"
          onChange={handleCreateUserChange}
          value={email}
          placeholder="Email"
          required
        />
        <h3>USERNAME</h3>
        <input
          name="username"
          type="string"
          onChange={handleCreateUserChange}
          value={username}
          placeholder="Username"
          required
        />
        <h3>PASSWORD</h3>
        <input
          name="password"
          type="string"
          onChange={handleCreateUserChange}
          value={password}
          placeholder="Password"
          required
        />
        <button onClick={submitCreateUser} data-testid={"createUserButton"}>
          Create!
        </button>
        <p>{message}</p>
      </section>
    </div>
  );
};

export default withRouter(CreateUser);
