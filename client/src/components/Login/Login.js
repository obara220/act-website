import React, { useState } from "react";
import axios from "axios";
import "./Login.scss";
import { getBaseURL } from "../apiConfig";
import TokenRefresher from "../Utils/token";

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
  from 'mdb-react-ui-kit';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";

function Login(props) {
  let [uname, setUname] = useState("");
  let [password, setPass] = useState("");
  let [error, setError] = useState("");

  // Adding click handler
  function handleClick() {
    if (validateInputs()) {
      const user = {
        email: uname,
        password: password,
      };
      let url = `${getBaseURL()}api/users/login`;
      axios
        .post(url, { ...user })
        .then((res) => {
          console.log(res);
          if (res.data.length > 0) {
            console.log("Logged in successfully");
            sessionStorage.setItem("isUserAuthenticated", true);
            const user = res.data[0].isAdmin;
            sessionStorage.setItem("customerId", res.data[0].userId);
            sessionStorage.setItem("isAdmin", user ? true : false);
            sessionStorage.setItem("jwt_token", res.data[0].token);
            sessionStorage.setItem("jwt_refresh_token", res.data[0].refreshToken);
            TokenRefresher(res.data[0].refreshToken);
            props.setUserAuthenticatedStatus(user ? true : false, res.data[0].userId);
          } else {
            console.log("User not available");
          }
        })
        .catch((err) => {
          console.log(err);
          console.log("error");
        });
    }
  }

  // Function to validate email format
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Function to validate password length
  function validatePassword(password) {
    return password.length >= 6;
  }

  // Function to validate inputs
  function validateInputs() {
    if (!validateEmail(uname)) {
      setError("Please provide a valid email address.");
      return false;
    } else if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    setError("");
    return true;
  }

  // Function to handle changes in email input
  function changeName(event) {
    setUname(event.target.value);
  }

  // Function to handle changes in password input
  function changePass(event) {
    setPass(event.target.value);
  }

  return (
    <>
      <div className="login-container" style={{ paddingBottom: error ? '0px' : '22px' }}>
        <h1>CREW LOG IN</h1>
        <p>Welcome back!</p>
        {/* <div>
          <label>User ID</label>
          <input type="text" value={uname} onChange={changeName}></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={changePass}
          ></input>
        </div> */}
        <MDBInput wrapperClass='mb-4' label='User ID' id='form1' type='text' value={uname} onChange={changeName} />
        <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' value={password} onChange={changePass} />

        {error && <div className="error-message">{error}</div>}
        <MDBBtn
          className={`w-100 mb-4 ${error ? 'custom-btn' : ''}`}

          size='md'
          onClick={handleClick}
        >
          Sign In
        </MDBBtn>
        {/* <button className="green-blue-btn" onClick={handleClick}>Sign In</button> */}
        {/* <div className="register-link" onClick={() => props.navigateToRegisterPage()}>
          Is New User
        </div> */}
      </div>
    </>
  );
}

export default Login;
