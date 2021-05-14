import React, { Component } from "react";

import { login } from "../api/apiCalls";

import { withTranslation } from "react-i18next";

import Input from "../components/Input";
import LanguageSelector from "../components/LanguageSelector";
import AlertComponent from "../components/AlertComponent";
import ButtonWithProgressBarComponent from "../components/ButtonWithProgressBarComponent";
import axios from "axios";

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

  onChange = async (event) => {
    const { name, value } = event.target; // object destructing
    const errors = { ...this.state.errors };
    errors[name] = undefined;
    await this.setState({ [name]: value, errors, showError: false });
    const { username, password } = this.state;
    if (
      username === null ||
      username === "" ||
      password === "" ||
      password === null
    ) {
      this.setState({ isNull: true });
      console.log("bos");
      console.log("Data", username, password);
    } else {
      this.setState({ isNull: false });
      console.log("dolu");
    }
  };

  alertOnClick = () => {
    console.log("test");
    this.setState({ showError: false });
  };

  componentDidMount() {
    axios.interceptors.request.use((request) => {
      this.setState({ pendingApiCall: true, showError: false });
      return request;
    });

    axios.interceptors.response.use(
      (response) => {
        this.setState({ pendingApiCall: false });
        return response;
      },
      (error) => {
        this.setState({
          pendingApiCall: false,
          errors: error.response.data,
          showError: true,
        });
        throw error;
      }
    );
  }

  onClickLogin = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    if (username !== null && password != null) {
      const creds = {
        username,
        password,
      };

      const response = await login(creds);

      /*  try {
        const response = await login(creds);
      } catch (err) {
        this.setState({
          errors: err.response.data,
          showError: true,
        });
      }
      this.setState({ pendingApiCall: false });*/
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
