import React from "react";

import "../styles/Error.css";
import nopage from "../images/404.png";

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h2>Strona o podanym adresie nie istnieje :( </h2>
      <img src={nopage} alt="404" />
    </div>
  );
};

export default ErrorPage;
