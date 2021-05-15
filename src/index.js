import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./bootstrap-override.scss";
import "./i18n";
import { Provider } from "react-redux";
import "./shared/ApiProgress";
import { createStore } from "redux";
// import AuthenticationContext, {
//   Authentication,
// } from "./shared/AuthenticationContext";

const loggedInstate = {
  isLoggedIn: true,
  username: "asd",
  name: "adqweqwe",
  image: undefined,
  password: "passs",
};

const defaultState = {
  isLoggedIn: false,
  username: undefined,
  name: undefined,
  image: undefined,
  password: undefined,
};

const reducer = (state, action) => {
  if (action.type === "logout-success") {
    return defaultState;
  }
  return state;
};

const store = createStore(reducer, loggedInstate);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
