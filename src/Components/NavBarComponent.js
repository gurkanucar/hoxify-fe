import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Authentication } from "../shared/AuthenticationContext";
import LanguageSelector from "./LanguageSelector";

class NavBarComponent extends Component {
  static contextType = Authentication;

  render() {
    const { t } = this.props;

    {
      const { state, onLogoutSuccess } = this.context;
      const { isLoggedIn, username } = state;

      let Links = (
        <ul className="navbar-nav ml-auto">
          <Link className="nav-link" to="/login">
            <li>{t("Login")}</li>
          </Link>
          <Link className="nav-link" to="/signup">
            <li>{t("Sign Up")}</li>
          </Link>
        </ul>
      );

      if (isLoggedIn) {
        Links = (
          <ul className="navbar-nav ml-auto">
            <Link className="nav-link" to={`/user/${username}`}>
              <li>{username}</li>
            </Link>
            <Link className="nav-link" to="/">
              <li onClick={onLogoutSuccess}>{t("Log Out")}</li>
            </Link>
          </ul>
        );
      }

      return (
        <div className="shadow-sm bg-light mb-2">
          <nav className="navbar navbar-light container navbar-expand">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                <img
                  src={logo}
                  width="50"
                  style={{ marginRight: 20 }}
                  alt="logo"
                />
                Hoaxify
              </Link>
              <div>
                <LanguageSelector />
              </div>
              {Links}
            </div>
          </nav>
        </div>
      );
    }
  }
}

export default withTranslation()(NavBarComponent);
