import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CreateUser from "./CreateUser";
import { BrowserRouter as Router } from "react-router-dom";
import * as data from "../../api/api";

const mockPost = jest.spyOn(data, "createUser");

describe("Create User", () => {
  describe("should render input boxes and button", () => {
    it("should be able to see the email, username, password input fields and button ", () => {
      const { getByPlaceholderText, getByTestId } = render(
        <Router>
          <CreateUser />
        </Router>
      );
      expect(getByPlaceholderText(/username/i)).toBeInTheDocument();
      expect(getByPlaceholderText(/email/i)).toBeInTheDocument();
      expect(getByPlaceholderText(/password/i)).toBeInTheDocument();
      expect(getByTestId("createUserButton")).toBeInTheDocument();
    });
  });

  it("should display error message if failed to create", async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <Router>
        <CreateUser />
      </Router>
    );
    const getUsernameInput = getByPlaceholderText(/username/i);
    const getCreateButton = getByTestId("createUserButton");

    fireEvent.change(getUsernameInput, { target: { value: "bob" } });
    fireEvent.click(getCreateButton);

    const failureMessage = await waitForElement(() =>
      getByText("Unable to create new account :(")
    );
    expect(failureMessage).toBeInTheDocument();
  });

  it("should display success message upon user created", async () => {
    mockPost.mockReturnValueOnce("");

    const { getByPlaceholderText, getByTestId, getByText } = render(
      <Router>
        <CreateUser history={history} />
      </Router>
    );

    const getUsernameInput = getByPlaceholderText(/username/i);
    const getCreateButton = getByTestId("createUserButton");

    fireEvent.change(getUsernameInput, { target: { value: "bob" } });
    fireEvent.click(getCreateButton);

    const successMessage = await waitForElement(() =>
      getByText("New account created!")
    );
    expect(successMessage).toBeInTheDocument();
  });
});
