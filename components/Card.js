import React from "react";
import "../Styles/Card.module.css";

const Card = ({ img, text }) => {
  return (
    <div
      class="card mx-2"
      style={{ width: "25rem", marginTop: "35px", height: "200px" }}
    >
      {/* {console.log(img)} */}
      <img
        src={img}
        class="card-img-top img-fluid rounded-lg imgstylecategory"
        alt="..."
      />
      {/* <div style={{ padding: "15px" }} class="shadow">
        <h3
          style={{
            WebkitTextStrokeWidth: "0.5px",
            WebkitTextStrokeColor: "#FF6E14",
          }}
          className="card-text text-white"
        >
          Hellodfvbdfbedbetb
        </h3>
      </div> */}
    </div>
  );
};

export default Card;
