import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "../styles/SignUpPage.css";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";
import { BiError } from "react-icons/bi";

let visited = [];

const nameInput = "name";
const mailInput = "mail";
const passInput = "pass";
const repassInput = "repass";

let nameValue = "";
let mailValue = "";
let passValue = "";
let repassValue = "";

let validatePassResult = null;
let validateRepassResult = null;

const SignUpPage = (props) => {
  const emailRegexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passRegexp = /^(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{6,}$/;

  const spaceMessage = "Spacje niedopuszczalne.";
  const lengtMessage = "Za mało znaków. Wymagane minimum ";
  const mailMessage = "E-mail nieprawidłowy.";
  const passMessage =
    "Hasło musi zawierać co najmniej 1 cyfrę i 1 znak specjalny: ! # @ $ %.";
  const errorPassComparison = "Hasła muszą być identyczne.";

  const [passEyeIcon, setPassEyeIcon] = useState(false);
  const [rePassEyeIcon, setRePassEyeIcon] = useState(false);

  const [errorName, setErrorName] = useState(null);
  const [errorMail, setErrorMail] = useState(null);
  const [errorPass, setErrorPass] = useState(null);
  const [errorRePass, setErrorRePass] = useState(null);

  const [redirect, setRedirect] = useState(false);
  const [failSignUp, setFailSignUp] = useState("");

  const handlePassEyeIconClick = () => {
    setPassEyeIcon(!passEyeIcon);
  };

  const handleRePassEyeIconClick = () => {
    setRePassEyeIcon(!rePassEyeIcon);
  };

  const handleOnChange = (e) => {
    if (e.target.name === nameInput) {
      nameValue = e.target.value;
      setErrorName(validateName(nameValue, nameInput));
    }
    if (e.target.name === mailInput) {
      mailValue = e.target.value;
      setErrorMail(validateMail(mailValue, mailInput));
    }
    if (e.target.name === passInput) {
      passValue = e.target.value;
      validatePassResult = validatePass(passValue, passInput);
      setErrorPass(validatePassResult);
    }
    if (e.target.name === repassInput) {
      repassValue = e.target.value;
      validateRepassResult = validatePass(repassValue, repassInput);
      setErrorRePass(validateRepassResult);
    }

    if (e.target.name === passInput || e.target.name === repassInput) {
      if (passValue !== "" && repassValue !== "") {
        if (passValue !== repassValue) {
          if (
            visited.indexOf(passInput) !== -1 &&
            visited.indexOf(repassInput) !== -1
          ) {
            if (validatePassResult === null) {
              validatePassResult = errorPassComparison;
              setErrorPass(errorPassComparison);
            }
            if (validateRepassResult === null) {
              validateRepassResult = errorPassComparison;
              setErrorRePass(errorPassComparison);
            }
          }
        } else {
          if (validatePassResult === errorPassComparison) {
            setErrorPass(null);
            validatePassResult = null;
          }
          if (validateRepassResult === errorPassComparison) {
            setErrorRePass(null);
            validateRepassResult = null;
          }
        }
      }
    }
  };

  const validateName = (inputValue, inputName) => {
    if (checkSpace(inputValue) !== null) {
      return checkSpace(inputValue, spaceMessage);
    }
    if (visited.indexOf(inputName) !== -1 && inputValue !== "") {
      if (checkLength(inputValue.length, 4) !== null) {
        return checkLength(inputValue.length, 4, lengtMessage);
      }
    }

    return null;
  };

  const validateMail = (inputValue, inputName) => {
    if (checkSpace(inputValue) !== null) {
      return checkSpace(inputValue, spaceMessage);
    }
    if (visited.indexOf(inputName) !== -1 && inputValue !== "") {
      if (checkPattern(inputValue, emailRegexp) !== null) {
        return checkPattern(inputValue, emailRegexp, mailMessage);
      }
    }

    return null;
  };

  const validatePass = (inputValue, inputName) => {
    if (checkSpace(inputValue) !== null) {
      return checkSpace(inputValue, spaceMessage);
    }

    if (visited.indexOf(inputName) !== -1 && inputValue !== "") {
      if (checkLength(inputValue.length, 6) !== null) {
        return checkLength(inputValue.length, 6, lengtMessage);
      }

      if (checkPattern(inputValue, passRegexp) !== null) {
        return checkPattern(inputValue, passRegexp, passMessage);
      }
    }

    return null;
  };

  const checkSpace = (value, message) => {
    if (value.indexOf(" ") !== -1) {
      return message;
    }
    return null;
  };

  const checkLength = (length, reqLength, message) => {
    if (length < reqLength) {
      return message + reqLength + ".";
    }
    return null;
  };

  const checkPattern = (value, pattern, message) => {
    if (!pattern.test(value)) {
      return message;
    }
    return null;
  };

  const handleOnBlur = (e) => {
    if (visited.indexOf(e.target.name) === -1) {
      visited = visited.concat(e.target.name);
    }

    handleOnChange(e);
  };

  const signUp = () => {
    let newUser = {
      username: nameValue,
      email: mailValue,
      password: passValue,
    };

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    axios
      .post(
        "http://akademia108.pl/api/social-app/user/signup",
        JSON.stringify(newUser),
        axiosConfig
      )
      .then((res) => {
        if (res.data.signedup === true) {
          // wyczyszczenie formularza
          props.signUpMessage(res.data.user.username);
          visited = [];
          setRedirect(true);
        } else {
          setFailSignUp(res.data.message.username[0]);
        }
      })
      .catch((error) => {
        console.error(error);
        setFailSignUp("Błąd serwera. Zgłoś administratorowi");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      errorName === null &&
      errorMail === null &&
      errorPass === null &&
      errorRePass === null &&
      nameValue !== "" &&
      mailValue !== "" &&
      passValue !== "" &&
      repassValue !== ""
    ) {
      signUp();
    } else {
      setFailSignUp(
        "Błąd! Rejestracja zakończona niepowodzeniem. Pola są puste lub zawierają błędy."
      );
    }
  };
  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="form-wrapper">
      <h2>Rejestracja</h2>
      <form>
        <input
          name={nameInput}
          className={"input-form " + (errorName && "error")}
          type="text"
          placeholder="Login"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
        <div className="error-box">
          {errorName && (
            <p>
              <BiError className="error-icon" /> {errorName}
            </p>
          )}
        </div>

        <input
          name={mailInput}
          className={"input-form " + (errorMail && "error")}
          type="mail"
          placeholder="Adres e-mail"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
        <div className="error-box">
          {errorMail && (
            <p>
              <BiError className="error-icon" /> {errorMail}
            </p>
          )}
        </div>

        <div
          className={"input-form pass-input-wrapper " + (errorPass && "error")}
        >
          <input
            name={passInput}
            type={passEyeIcon ? "text" : "password"}
            placeholder="Hasło"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
          />
          <div onClick={handlePassEyeIconClick} className="pass-icon">
            {passEyeIcon ? <FaEye /> : <FaRegEyeSlash />}
          </div>
        </div>
        <div className="error-box">
          {errorPass && (
            <p>
              <BiError className="error-icon" /> {errorPass}
            </p>
          )}
        </div>

        <div
          className={
            "input-form pass-input-wrapper " + (errorRePass && "error")
          }
        >
          <input
            name={repassInput}
            type={rePassEyeIcon ? "text" : "password"}
            placeholder="Powtórz hasło"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
          />
          <div onClick={handleRePassEyeIconClick} className="pass-icon">
            {rePassEyeIcon ? <FaEye /> : <FaRegEyeSlash />}
          </div>
        </div>
        <div className="error-box">
          {errorRePass && (
            <p>
              <BiError className="error-icon" /> {errorRePass}
            </p>
          )}
        </div>

        <input
          type="submit"
          className="submit-button"
          value="Zarejestruj"
          onClick={handleSubmit}
        />
      </form>
      {failSignUp !== "" ? <p className="error-message">{failSignUp}</p> : ""}
    </div>
  );
};

export default SignUpPage;
