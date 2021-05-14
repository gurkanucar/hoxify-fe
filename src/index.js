import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./bootstrap-override.scss";
import "./i18n";

import "./shared/ApiProgress";
import ApiProgress from "./shared/ApiProgress";

ReactDOM.render(
  <React.StrictMode>
    <ApiProgress>
      <App />
    </ApiProgress>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
