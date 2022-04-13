import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import validator from "validator";
import Router from "next/router";
import { useAuth } from "../Context/Auth-context";
import { loginUser } from "../Connection/Auth";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { loggedIn, handleLogin, handleLoggedinUser } = useAuth();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const testStatus = handleValidate(values.email);

    if (testStatus === false) {
      alert("Email is not valid");
      return;
    }
    console.log("I am called");

    let res = await loginUser({
      ...values,
    });
    console.log(res);
    if (res.data.success === true) {
      if (res.data.role === "user") {
        handleLogin(true);
        handleLoggedinUser(res.data);
        Router.push("/");
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        window.localStorage.setItem("username", res.data.username);
        window.localStorage.setItem("accessToken", res.data.access_token);
        window.localStorage.setItem("email", res.data.email);
        window.localStorage.setItem("id", res.data.id);
        window.localStorage.setItem("role", res.data.role);
        window.localStorage.setItem("loggedin", true);
      } else if (res.data.role === "admin") {
        Router.push("/dashboard");
        handleLogin(true);
        handleLoggedinUser(res.data);
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        window.localStorage.setItem("username", res.data.username);
        window.localStorage.setItem("accessToken", res.data.access_token);
        window.localStorage.setItem("email", res.data.email);
        window.localStorage.setItem("id", res.data.id);
        window.localStorage.setItem("loggedin", true);
        window.localStorage.setItem("role", res.data.role);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleValidate = () => {
    let test = validator.isEmail(values.email);
    return test;
  };
  return (
    <div>
      {console.log(values)}
      <div>
        <div className="row mt-5">
          <div className="col-1 col-md-3"></div>
          <div className="col-10 col-md-6 text-center mt-3">
            <p>
              Dont have an account?{" "}
              <button
                type="submit"
                class="btn btn-danger mt-2"
                style={{
                  //   borderRadius: "60px",
                  paddingTop: "15.6px",
                  paddingBottom: "15.6px",
                  paddingLeft: "39px",
                  paddingRight: "39px",
                }}
              >
                <Link style={{ textDecoration: "none" }} href="/signup">
                  Get Started
                </Link>
              </button>{" "}
            </p>
            <h3 className="mt-5">Easy Dine</h3>
            <br />
            <br />
            <h5>Sign In into Easy Dine</h5>
            <p>Enter Your Details Below</p>

            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "32ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="email"
                label="Email"
                variant="standard"
                name="email"
                value={values.email}
                onChange={handleChange}
                type="email"
              />
              <br />
              <TextField
                id="password"
                label="Password"
                variant="standard"
                name="password"
                value={values.password}
                onChange={handleChange}
                type="password"
              />
            </Box>
            <div className="text-center">
              <small id="emailHelp" class="form-text text-muted text-center">
                Password Needs to be 6 digits Long
              </small>
            </div>
            <p className="text-danger">
              {" "}
              <Link style={{ textDecoration: "none" }} href="/forgot">
                Forgot Password?
              </Link>
            </p>
            {/* <p className="text-danger">
              {" "}
              <Link style={{ textDecoration: "none" }} href="/stafflogin">
                Staff Login
              </Link>
            </p> */}

            <button
              // type="submit"
              class="btn btn-danger mt-2"
              style={{
                borderRadius: "60px",
                paddingTop: "15.6px",
                paddingBottom: "15.6px",
                paddingLeft: "39px",
                paddingRight: "39px",
              }}
              onClick={handleSubmit}
              disabled={
                values.email.length > 0 && values.password.length > 6
                  ? false
                  : true
              }
            >
              Sign In
            </button>
          </div>
          <div className="col-1 col-md-3"></div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Login;
