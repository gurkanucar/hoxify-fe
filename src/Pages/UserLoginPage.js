import React, { Component } from "react";
import { login } from "../api/apiCalls";
import { withTranslation } from "react-i18next";
import Input from "../components/Input";
import AlertComponent from "../components/AlertComponent";
import ButtonWithProgressBarComponent from "../components/ButtonWithProgressBarComponent";
import { withApiProgress } from "../shared/ApiProgress";
import { loginHandler, loginSuccess } from "../redux/authActions";
import { connect } from "react-redux";

class UserLoginPage extends Component {
  state = {
    username: null,
    password: null,
    isNull: true,
    errors: {},
    showError: false,
  };

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
    } else {
      this.setState({ isNull: false });
    }
  };

  alertOnClick = () => {
    this.setState({ showError: false });
  };

  onClickLogin = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const { history, dispatch } = this.props;
    const { push } = history;

    if (username !== null && password != null) {
      const creds = {
        username,
        password,
      };

      try {
        await dispatch(loginHandler(creds));
        push("/");
      } catch (apiError) {
        this.setState({ errors: apiError, showError: true });
      }
    }
  };

  render() {
    const { isNull, errors, showError } = this.state; // object destructing
    const { t, pendingApiCall } = this.props;

    return (
      <div className="container">
        <h1 className="">{t("Login")}</h1>
        <form>
          <Input
            name="username"
            label={t("Username")}
            onChange={this.onChange}
          />
          <Input
            name="password"
            type="password"
            label={t("Password")}
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
              message={errors?.message}
              show={showError}
              onClick={this.alertOnClick}
            />
          </div>
        </form>
      </div>
    );
  }
}

const UserLoginPageWithTranslation = withTranslation()(UserLoginPage);

const UserLoginPageWithApiProgress = withApiProgress(
  UserLoginPageWithTranslation,
  "/api/user/login"
);

export default connect()(UserLoginPageWithApiProgress);
