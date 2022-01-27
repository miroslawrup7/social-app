import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "../styles/LoginPage.css";

import { FaRegEyeSlash, FaEye } from "react-icons/fa";

const LoginPage = (props) => {
  const [login, setLogin] = useState(null);
  const [pass, setPass] = useState(null);
  const [passEyeIcon, setPassEyeIcon] = useState(false);

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };
  const handlePassChange = (e) => {
    setPass(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    props.loginSubmit(login, pass);
  };

  if (props.username) {
    return <Redirect to="/" />;
  }

  const handlePassEyeIconClick = () => {
    setPassEyeIcon(!passEyeIcon);
  };

  return (
    <div className="form-wrapper">
      <h2>Logowanie</h2>
      <form>
        <input
          name="login"
          className="input-form"
          type="text"
          placeholder="Login"
          onChange={handleLoginChange}
        />
        <div className="input-form pass-input-wrapper">
          <input
            name="password"
            type={passEyeIcon ? "text" : "password"}
            placeholder="Hasło"
            onChange={handlePassChange}
          />
          <div onClick={handlePassEyeIconClick} className="pass-icon">
            {passEyeIcon ? <FaEye /> : <FaRegEyeSlash />}
          </div>
        </div>
        <input
          className="submit-button"
          type="submit"
          value="Zaloguj"
          onClick={handleLoginSubmit}
        />
      </form>
      {props.signUpMessage && (
        <p className="success-message">
          Gratulacje {props.signUpMessage}! Rejestracja przebiegła pomyślnie.
          Teraz możesz się zalogować.
        </p>
      )}
      {props.loginError && (
        <p className="error-message">
          Logowanie nie powiodło się. Login i/lub hasło są niepoprawne.
        </p>
      )}
    </div>
  );
};

export default LoginPage;
