import React from "react";
import UserList from "../components/UserList";
import { useTranslation } from "react-i18next";
const HomePage = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <h1>{t("Home Page")}</h1>
      <UserList />
    </div>
  );
};

export default HomePage;
