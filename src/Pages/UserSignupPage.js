import React, { Component, useState } from "react";
import { changeLanguage, signup } from "../api/apiCalls";
import { withTranslation, WithTranslation } from "react-i18next";
import Input from "../components/Input";
import ButtonWithProgressBarComponent from "../components/ButtonWithProgressBarComponent";
import { withApiProgress } from "../shared/ApiProgress";
import { connect } from "react-redux";
import { signupHandler } from "../redux/authActions";

const UserSignupPage = (props) => {
  const [form, setForm] = useState({
    username: null,
    agreeChecked: false,
    name: null,
    password: null,
    passwordRepeat: null,
  });

  const [errors, setErrors] = useState({});

  const onChange = (event) => {
    const { name, value } = event.target; // object destructing
    setErrors((previousError) => ({ ...previousError, [name]: undefined }));
    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const onChangeAgree = (event) => {
    this.setState({ agreeChecked: event.target.checked });
  };

  const onClickSignup = async (event) => {
    event.preventDefault();
    const { username, name, password } = form;
    const { history, dispatch } = props;
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
        setErrors(err.response.data.validationErrors);
      }
    }
  };

  //const { agreeChecked, errors } = this.state; // object destructing

  const {
    username: usernameError,
    name: nameError,
    password: passwordError,
    // passwordRepeat: passwordRepeatError,
  } = errors;
  const { t, pendingApiCall } = props;

  let passwordRepeatError;
  if (form.password !== form.passwordRepeat) {
    passwordRepeatError = t("Password missmatch");
  }

  return (
    <div className="container">
      <h1 className="">{t("Sign Up")}</h1>
      <form>
        <Input
          name="username"
          label={t("Username")}
          error={usernameError}
          onChange={onChange}
        />
        <Input
          name="name"
          label={t("Name")}
          error={nameError}
          onChange={onChange}
        />

        <Input
          name="password"
          label={t("Password")}
          error={passwordError}
          onChange={onChange}
          type="password"
        />

        <Input
          name="passwordRepeat"
          label={t("Password Repeat")}
          onChange={onChange}
          type="password"
          error={passwordRepeatError}
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
            disabled={pendingApiCall || passwordRepeatError !== undefined}
            onClick={onClickSignup}
            showSpinner={pendingApiCall}
            text={t("Sign Up")}
          />
        </div>
        {/* <LanguageSelector /> */}
      </form>
    </div>
  );
};

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
