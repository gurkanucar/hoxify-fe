import React from "react";
import { changeLanguage } from "../api/apiCalls";

import { useTranslation } from "react-i18next";

const LanguageSelector = (props) => {
  const { i18n } = useTranslation();

  const onChangeLang = (language) => {
    i18n.changeLanguage(language);
    changeLanguage(language);
  };

  return (
    <div className="container">
      <img
        width="40"
        src="https://www.countryflags.io/tr/flat/64.png"
        alt="tr"
        onClick={() => onChangeLang("tr")}
        style={{ cursor: "pointer" }}
      />
      <img
        width="40"
        src="https://www.countryflags.io/us/flat/64.png"
        alt="en"
        onClick={() => onChangeLang("en")}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};
export default LanguageSelector;
