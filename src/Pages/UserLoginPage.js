import React, { Component } from "react";

import { login } from "../api/apiCalls";

import { withTranslation } from "react-i18next";

import Input from "../Components/Input";
import LanguageSelector from "../Components/LanguageSelector";
import AlertComponent from "../Components/AlertComponent";
import ButtonWithProgressBarComponent from "../Components/ButtonWithProgressBarComponent";

class UserLoginPage extends Component {
  state = {
    username: null,
    password: null,
    pendingApiCall: false,
    isNull: true,
    errors: {},
    showError: false,
  };

  showFormattedTimeStamp(data) {
    return new Date(data).toLocaleTimeString("en-US");
  }

  onChange = (event) => {
    const { name, value } = event.target; // object destructing
    const errors = { ...this.state.errors };
    errors[name] = undefined;
    this.setState({ [name]: value, errors, showError: false });
    if (this.state.username === null || this.state.password === null) {
      this.setState({ isNull: true });
    } else {
      this.setState({ isNull: false });
    }
  };

  alertOnClick = () => {
    console.log("test");
    this.setState({ showError: false });
  };

  onClickLogin = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    if (username !== null && password != null) {
      const creds = {
        username,
        password,
      };

      this.setState({ pendingApiCall: true, showError: false });

      try {
        const response = await login(creds);
      } catch (err) {
        this.setState({
          errors: err.response.data,
          showError: true,
        });
      }
      this.setState({ pendingApiCall: false });
    }
  };

  render() {
    const { pendingApiCall, isNull, errors, showError } = this.state; // object destructing
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

          <div className="text-center">
            <ButtonWithProgressBarComponent
              name="btn"
              disabled={pendingApiCall || isNull}
              onClick={this.onClickLogin}
              showSpinner={pendingApiCall}
              text={t("Login")}
            />

            <AlertComponent
              title="Hata"
              message={
                errors.message +
                "  " +
                this.showFormattedTimeStamp(errors.timestamp)
              }
              show={showError}
              onClick={this.alertOnClick}
            />
          </div>
          <LanguageSelector />
        </form>
      </div>
    );
  }
}

const UserLoginPageWithTranslation = withTranslation()(UserLoginPage); // Hıgh order component

export default withTranslation()(UserLoginPage);
