import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div style={{ width: "100%", height: "75px", backgroundColor: "#E6034D" }}>
      <div className="container text-light">
        <div className="row ">
          <div className="col-6 mt-2">
            <h4>Easy Dine</h4>
          </div>
          <div className="col-6 mt-2">
            <Link style={{ textDecoration: "none" }} href="/stafflogin">
              Restaurant Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
