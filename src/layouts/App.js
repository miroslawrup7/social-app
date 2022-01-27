import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

import Logo from "./Logo";
import Navigation from "./Navigation";
import Page from "./Page";
import Footer from "./Footer";

import "../styles/App.css";

function App() {
  const [username, setUsername] = useState(localStorage.getItem("login"));
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const [loginError, setLoginError] = useState(false);

  const loginSubmit = (login, pass) => {
    let logData = {
      username: login,
      password: pass,
      ttl: 3600000,
    };

    const axiosConfigLogout = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    setLoginError(false);
    axios
      .post(
        "http://akademia108.pl/api/social-app/user/login",
        JSON.stringify(logData),
        axiosConfigLogout
      )
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("login", logData.username);
          localStorage.setItem("ttl", logData.ttl);
          localStorage.setItem("jwt", res.data.jwt_token);

          setUsername(logData.username);
          setJwt(res.data.jwt_token);
        } else {
          setLoginError(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    setUsername(null);
    setJwt(null);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <header>
          {<Logo />}
          {<Navigation username={username} handleLogout={handleLogout} />}
        </header>
        <main>
          {
            <Page
              username={username}
              loginSubmit={loginSubmit}
              jwt={jwt}
              loginError={loginError}
            />
          }
        </main>

        <footer>{<Footer />}</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
