import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Input from "../components/Input";
import { useApiProgress } from "../shared/ApiProgress";
import { loginHandler } from "../redux/authActions";
import { useDispatch } from "react-redux";
import ButtonWithProgressBarComponent from "../components/ButtonWithProgressBarComponent";

const UserLoginPage = (props) => {
  // static contextType = Authentication;
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    setError(undefined);
  }, [username, password]);

  const onClickLogin = async (event) => {
    event.preventDefault();
    const creds = {
      username,
      password,
    };

    const { history } = props;
    const { push } = history;

    setError(undefined);
    try {
      await dispatch(loginHandler(creds));
      push("/");
    } catch (apiError) {
      setError(apiError.response.data.message);
    }
  };

  const { t } = useTranslation();

  const pendingApiCall = useApiProgress("/api/user/login");

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
            showSpinner={pendingApiCall}
          />
        </div>
      </form>
    </div>
  );
};

export default UserLoginPage;
