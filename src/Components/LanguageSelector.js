import React from "react";
import { changeLanguage } from "../api/apiCalls";

import { withTranslation } from "react-i18next";

const LanguageSelector = (props) => {
  const onChangeLang = (language) => {
    const { i18n } = props;
    i18n.changeLanguage(language);
    changeLanguage(language);
  };

  const { language } = props;
  return (
    <div className="container">
      <img
        src="https://www.countryflags.io/tr/flat/64.png"
        alt="tr"
        onClick={() => onChangeLang("tr")}
        style={{ cursor: "pointer" }}
      />
      <img
        src="https://www.countryflags.io/us/flat/64.png"
        alt="en"
        onClick={() => onChangeLang("en")}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};
export default withTranslation()(LanguageSelector);
