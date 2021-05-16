import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import LanguageSelector from "./LanguageSelector";

import { logoutSuccess } from "../redux/authActions";

import { connect } from "react-redux";

class NavBarComponent extends Component {
  render() {
    const { t, username, isLoggedIn, onLogoutSuccess } = this.props;

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

const TopBarWithTranslation = withTranslation()(NavBarComponent);

const mapStateToProps = (store) => {
  return {
    // store,
    username: store.username,
    isLoggedIn: store.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutSuccess: () => {
      return dispatch(logoutSuccess());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBarWithTranslation);
