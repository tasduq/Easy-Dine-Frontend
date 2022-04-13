import React, { useEffect } from "react";
import { useAuth } from "../Context/Auth-context";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  const { loggedIn, setLoggedinUser, setLoggedIn } = useAuth();
  console.log(loggedIn);

  useEffect(() => {
    console.log("Layout is running");
  }, []);

  // useEffect(() => {
  //   console.log("I am ruuningf");

  // }, []);

  return (
    <div>
      <Navbar />
      <ToastContainer
        style={{
          width: "400px",
          textAlign: "center",
          fontSize: "1.3em",
        }}
      />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
