import React from "react";
import Views from "./views";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import store from "./store";

const App = () => (
  <Provider store={store}>
    <CssBaseline />
    <Views />
  </Provider>
);

export default App;
