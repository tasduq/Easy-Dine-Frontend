import React from "react";
import Carousel from "react-bootstrap/Carousel";
// import "../styles/Carousal.module.css";

const Carousal = ({ image }) => {
  return (
    <div>
      <Carousel>
        {image.map((item) => (
          <Carousel.Item>
            <img
              className="d-block w-100 imgstyle img-fluid"
              src={item}
              alt="First slide"
              style={{ borderRadius: "12px" }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Carousal;
