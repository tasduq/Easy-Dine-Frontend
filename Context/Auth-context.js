import React, { createContext, useState, useEffect } from "react";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState();
  const [loggedinUser, setLoggedinUser] = useState();

  useEffect(() => {
    console.log("I am ruuningf");
    setLoggedinUser({
      email: window?.localStorage.getItem("email"),
      id: window?.localStorage.getItem("id"),
      username: window?.localStorage.getItem("username"),
      accessToken: window?.localStorage.getItem("accessToken"),
      role: window?.localStorage.getItem("role"),
      loggedin: window.localStorage.getItem("loggedin"),
    });
    setLoggedIn(window.localStorage.getItem("loggedin"));
  }, []);

  const handleLogin = (status) => {
    setLoggedIn(status);
  };

  const handleLoggedinUser = (data) => {
    setLoggedinUser(data);
  };

  const handleLogout = () => {
    console.log("cliked");
    window.localStorage.clear();
    setLoggedIn(false);
    Router.push("/");
    toast.success("You are logged out", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const authContextValue = {
    loggedIn,
    handleLogin,
    loggedinUser,
    handleLoggedinUser,
    handleLogout,
    setLoggedinUser,
    setLoggedIn,
  };

  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
