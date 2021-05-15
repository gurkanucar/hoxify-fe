import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./bootstrap-override.scss";
import "./i18n";

import "./shared/ApiProgress";
import AuthenticationContext, {
  Authentication,
} from "./shared/AuthenticationContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthenticationContext>
      <App />
    </AuthenticationContext>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
