import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

describe("App Set Redux Store", () => {
  const initialState = { answered: [] };
  const mockStore = configureStore();
  it("Should have the initital state on Redux", () => {
    render(
      <Provider store={mockStore(initialState)}>
        <App />
      </Provider>
    );
  });
});
