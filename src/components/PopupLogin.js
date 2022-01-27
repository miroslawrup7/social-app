import React from "react";
import { Link } from "react-router-dom";
import "../styles/Popup.css";
import LoginPage from "../pages/LoginPage";
import { RiCloseFill } from "react-icons/ri";

const PopupLogin = (props) => {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        {
          <RiCloseFill
            onClick={() => props.setTrigger(false)}
            className="close-icon"
          />
        }

        <div className="popup-login">
          <LoginPage
            username={props.username}
            loginSubmit={props.loginSubmit}
            loginError={props.loginError}
          />
          <Link to="/signup" className="signup-link">
            Nie masz jeszcze konta? Kliknij tu, aby przejść do rejestracji.
          </Link>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default PopupLogin;
