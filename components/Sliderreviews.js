import React, { Component, useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "../styles/Sliderreviews.module.css";
import Card from "./Card";
// import Ava1 from "../Assets/ava1.jpg";
import Avatar from "react-avatar";
import StarRatings from "react-star-ratings";
// import Avatar from "@mui/material/Avatar";

const Sliderreviews = ({ reviews }) => {
  // const [reviews, setReviwers] = useState([
  //   {
  //     name: "Ijaz Ahmed",
  //     review: "Delivered before time. Very Professional and Efficient work",
  //     image: "/static/images/ava1.jpg",
  //   },
  //   {
  //     name: "Tshibagt",
  //     review: "Great work and on time",
  //     image: "/static/images/ava2.jpg",
  //   },
  //   {
  //     name: "Alex(Doomydoom)",
  //     review: "Great Service. Highly recommended",
  //     image: "/static/images/ava3.jpg",
  //   },
  //   {
  //     name: "Tomertvc",
  //     review: "Very Good Service and Communications",
  //     image: "/static/images/ava4.jpg",
  //   },
  //   {
  //     name: "Cryptoci",
  //     review: "Great Communication and Work",
  //     image: "/static/images/ava1.jpg",
  //   },
  // ]);

  const images = [
    "/static/images/ava1.jpg",
    "/static/images/ava2.jpg",
    "/static/images/ava3.jpg",
    "/static/images/ava4.jpg",
  ];
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  // const [categories, setCategories] = useState();

  // const handleClick = async (id) => {
  //   console.log(id);
  //   let res = await getAdsByCategories({ id });
  //   console.log(res);
  //   handleCategoryAds(res.data);
  // };

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     let foundCategories = await getCategories();
  //     console.log(foundCategories);
  //     setCategories(foundCategories.data.categories);
  //   };

  //   fetchCategories();
  // }, []);
  return (
    <>
      <Carousel
        swipeable={true}
        draggable={true}
        // showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        // customTransition="all 500"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        // deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        customTransition="transform 500ms ease-in-out"
      >
        {reviews.map((obj, i) => {
          return (
            <div>
              <div
                style={{ borderRadius: "24px" }}
                className="shadow-sm d-flex "
              >
                <div className="d-flex justify-content-center">
                  <div
                    className="my-2"
                    style={{ height: "100px", borderRadius: "12px" }}
                  >
                    {/* <img
                      style={{ height: "75px", borderRadius: "18px" }}
                      className="img-fluid pt-2 px-3"
                      src={Ava1}
                    /> */}
                    {console.log(obj)}
                    <Avatar
                      className=" mx-2 "
                      round={true}
                      src={images[i > 3 ? Math.floor(Math.random() * 4) : i]}
                      // src={obj.image}
                    />
                    {/* <Avatar alt="Travis Howard" src={obj.image} /> */}
                  </div>
                </div>
                <div className=" mt-4 text-left ml-2 p-2">
                  <h5 style={{ color: "#185a9d" }}>{obj.name}</h5>
                  <span className="text-muted"> {obj.review}</span>
                  <br />
                  <StarRatings
                    rating={4}
                    starRatedColor="gold"
                    // changeRating={handleChangeRating}
                    numberOfStars={5}
                    name="rating"
                    starDimension="25px"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </>
  );
};

export default Sliderreviews;
