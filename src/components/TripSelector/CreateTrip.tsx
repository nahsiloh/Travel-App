import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import { updateTripName } from "../../reducer/actions";
import { ReducerContext } from "../App";

const CreateTrip: React.FC = () => {
  const { dispatch } = useContext(ReducerContext);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTripName(event.target.value));
  };

  return (
    <div>
      <h3>Trip Name</h3>
      <InputGroup className="mb-4" size="lg">
        <Form.Control
          placeholder="Name Your Trip!"
          type="string"
          onChange={handleNameChange}
        />
      </InputGroup>
    </div>
  );
};

export default withRouter(CreateTrip);
