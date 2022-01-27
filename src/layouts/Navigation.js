import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../styles/Navigation.css";

const Navigation = (props) => {
  let menu = "";
  if (!props.username) {
    menu = (
      <>
        <li key="Home">
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li>
        <li key="Login">
          <NavLink to="/login">Login</NavLink>
        </li>
        <li key="Sign Up">
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
      </>
    );
  } else {
    menu = (
      <>
        <li key="Home">
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li>
        <li key="Logout">
          <Link to="/" onClick={props.handleLogout}>
            Logout
          </Link>
        </li>
      </>
    );
  }

  return (
    <nav>
      <ul className="nav">{menu}</ul>
    </nav>
  );
};

export default Navigation;
