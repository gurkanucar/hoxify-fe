import React, { Component } from "react";

import { changeLanguage, login } from "../api/apiCalls";

import { withTranslation, WithTranslation } from "react-i18next";

import Input from "../Components/Input";
import LanguageSelector from "../Components/LanguageSelector";

class UserLoginPage extends Component {
  state = {
    username: null,
    password: null,
    pendingApiCall: false,
    errors: {},
  };

  onChange = (event) => {
    const { name, value } = event.target; // object destructing
    const errors = { ...this.state.errors };
    errors[name] = undefined;
    this.setState({ [name]: value, errors });
  };

  onClickLogin = async (event) => {
    event.preventDefault();
    const { username, name, password } = this.state;

    const body = {
      username,
      name,
      password,
    };

    this.setState({ pendingApiCall: true });

    try {
      const response = await login(body);
    } catch (err) {
      if (err.response.data.validationErrors) {
        this.setState({ errors: err.response.data.validationErrors });
      }
    }
    this.setState({ pendingApiCall: false });
  };

  render() {
    const { pendingApiCall, errors } = this.state; // object destructing
    const { username, password } = errors;
    const { t, n } = this.props;

    return (
      <div className="container">
        <h1 className="">{t("Login")}</h1>
        <form>
          <Input
            name="username"
            label={t("Username")}
            error={username}
            onChange={this.onChange}
          />
          <Input
            name="password"
            type="password"
            label={t("Password")}
            error={password}
            onChange={this.onChange}
          />

          <div className=" text-center">
            <button
              className="btn btn-primary"
              disabled={pendingApiCall}
              onClick={this.onClickLogin}
            >
              {pendingApiCall && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              {"  "}
              {t("Login")}
            </button>
          </div>
          <LanguageSelector />
        </form>
      </div>
    );
  }
}

const UserLoginPageWithTranslation = withTranslation()(UserLoginPage); // Hıgh order component

export default withTranslation()(UserLoginPage);
