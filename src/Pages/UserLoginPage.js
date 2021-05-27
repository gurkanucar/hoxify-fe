import React, { useState, useEffect } from "react";
import { login } from "../api/apiCalls";
import { withTranslation } from "react-i18next";
import Input from "../components/Input";
import { withApiProgress } from "../shared/ApiProgress";
import { loginHandler, loginSuccess } from "../redux/authActions";
import { connect } from "react-redux";
import ButtonWithProgressBarComponent from "../components/ButtonWithProgressBarComponent";

const UserLoginPage = (props) => {
  // static contextType = Authentication;

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setError(undefined);
  }, [username, password]);

  const onClickLogin = async (event) => {
    event.preventDefault();
    const creds = {
      username,
      password,
    };

    const { history, dispatch } = props;
    const { push } = history;

    setError(undefined);
    try {
      await dispatch(loginHandler(creds));
      push("/");
    } catch (apiError) {
      setError(apiError.response.data.message);
    }
  };

  const { t, pendingApiCall } = props;

  const buttonEnabled = username && password;

  return (
    <div className="container">
      <form>
        <h1 className="text-center">{t("Login")}</h1>
        <Input
          label={t("Username")}
          onChange={(event) => setUsername(event.target.value)}
        />
        <Input
          label={t("Password")}
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="text-center">
          <ButtonWithProgressBarComponent
            onClick={onClickLogin}
            disabled={!buttonEnabled || pendingApiCall}
            pendingApiCall={pendingApiCall}
            text={t("Login")}
          />
        </div>
      </form>
    </div>
  );
};
const UserLoginPageWithTranslation = withTranslation()(UserLoginPage);

export default connect()(
  withApiProgress(UserLoginPageWithTranslation, "/api/user/login")
);
