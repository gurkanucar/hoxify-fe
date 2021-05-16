import React, { Component } from "react";

import { changeLanguage, signup } from "../api/apiCalls";

import { withTranslation, WithTranslation } from "react-i18next";

import Input from "../components/Input";
import LanguageSelector from "../components/LanguageSelector";
import ButtonWithProgressBarComponent from "../components/ButtonWithProgressBarComponent";
import { withApiProgress } from "../shared/ApiProgress";

import { connect } from "react-redux";
import { signupHandler } from "../redux/authActions";

class UserSignupPage extends Component {
  state = {
    username: null,
    agreeChecked: false,
    name: null,
    password: null,
    passwordRepeat: null,
    errors: {},
  };

  onChange = (event) => {
    const { name, value } = event.target; // object destructing
    const errors = { ...this.state.errors };
    errors[name] = undefined;

    if (name === "password" || name === "passwordRepeat") {
      if (name === "password" && value !== this.state.passwordRepeat) {
        errors.passwordRepeat = this.props.t("Password missmatch");
      } else if (name === "passwordRepeat" && value !== this.state.password) {
        errors.passwordRepeat = this.props.t("Password missmatch");
      } else {
        errors.passwordRepeat = undefined;
      }
    }

    this.setState({ [name]: value, errors });
  };

  onChangeAgree = (event) => {
    this.setState({ agreeChecked: event.target.checked });
  };

  onClickSignup = async (event) => {
    event.preventDefault();
    const { username, name, password } = this.state;
    const { history, dispatch } = this.props;
    const { push } = history;

    const body = {
      username,
      name,
      password,
    };

    try {
      await dispatch(signupHandler(body));
      push("/");
    } catch (err) {
      if (err.response.data.validationErrors) {
        this.setState({ errors: err.response.data.validationErrors });
      }
    }
  };

  onChangeLang = (language) => {
    const { i18n } = this.props;
    i18n.changeLanguage(language);
    changeLanguage(language);
  };

  render() {
    const { agreeChecked, errors } = this.state; // object destructing
    const { username, name, password, passwordRepeat } = errors;
    const { t, pendingApiCall } = this.props;

    return (
      <div className="container">
        <h1 className="">{t("Sign Up")}</h1>
        <form>
          <Input
            name="username"
            label={t("Username")}
            error={username}
            onChange={this.onChange}
          />
          <Input
            name="name"
            label={t("Name")}
            error={name}
            onChange={this.onChange}
          />

          <Input
            name="password"
            label={t("Password")}
            error={password}
            onChange={this.onChange}
            type="password"
          />

          <Input
            name="passwordRepeat"
            label={t("Password Repeat")}
            onChange={this.onChange}
            type="password"
            error={passwordRepeat}
          />

          {/* <div className="mb-3 form-check">
            <label for="agreeChecked" className="form-check-label">
              {t("Accept")}
            </label>
            <input
              id="agreeChecked"
              className="form-check-input"
              name="agreeChecked"
              type="checkbox"
              onChange={this.onChangeAgree}
            ></input>
          </div> */}

          <div className=" text-center">
            <ButtonWithProgressBarComponent
              name="btn"
              disabled={pendingApiCall || passwordRepeat !== undefined}
              onClick={this.onClickSignup}
              showSpinner={pendingApiCall}
              text={t("Sign Up")}
            />
          </div>
          {/* <LanguageSelector /> */}
        </form>
      </div>
    );
  }
}

const UserSignupPageWithApiProgressForSignupRequest = withApiProgress(
  UserSignupPage,
  "/api/user"
);

const UserSignupPageWithApiProgressForLoginRequest = withApiProgress(
  UserSignupPageWithApiProgressForSignupRequest,
  "/api/user/login"
);

const UserSignupPageWithTranslation = withTranslation()(
  UserSignupPageWithApiProgressForLoginRequest
); // Hıgh order component

export default connect()(UserSignupPageWithTranslation);
