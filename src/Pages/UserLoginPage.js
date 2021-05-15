import React, { Component } from "react";
import { login } from "../api/apiCalls";
import { withTranslation } from "react-i18next";
import Input from "../components/Input";
import AlertComponent from "../components/AlertComponent";
import ButtonWithProgressBarComponent from "../components/ButtonWithProgressBarComponent";
import { withApiProgress } from "../shared/ApiProgress";
import { loginSuccess } from "../redux/authActions";
import { connect } from "react-redux";

class UserLoginPage extends Component {
  //static contextType = Authentication;

  state = {
    username: null,
    password: null,
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
    const { push } = this.props.history;

    if (username !== null && password != null) {
      const creds = {
        username,
        password,
      };

      await login(creds)
        .then((res) => {
          const authState = {
            ...res.data,
            password,
          };
          this.props.onLoginSuccess(authState);
          push("/");
        })
        .catch((error) => {
          this.setState({ errors: error.response.data, showError: true });
        });
    }
  };

  render() {
    const { isNull, errors, showError } = this.state; // object destructing
    const { username, password } = errors;
    const { t, pendingApiCall } = this.props;

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
          {/* <LanguageSelector /> */}
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

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginSuccess: (authState) => {
      return dispatch(loginSuccess(authState));
    },
  };
};

export default connect(null, mapDispatchToProps)(UserLoginPageWithApiProgress);
