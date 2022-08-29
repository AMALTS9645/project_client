import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";

const carousel = () => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    fade: true,
  };

  const style = {
    width: "100%",
    height: "50vh",
    borderRadius: "10px",
    position: "relative",
    top: "25px",
    objectFit: "cover",
    padding: "5px"
  };
  return (
    <div>
      <Slider {...settings}>
        <div>
          <img
            style={{...style}}
            src="https://wallpaperaccess.com/full/5544132.jpg"
            alt=""
            className=""
          />
        </div>
        <div>
          <img
            style={{...style}}
            src="https://images2.alphacoders.com/769/769995.jpg"
            alt=""
            className=""
          />
        </div>
        <div>
          <img
            style={{...style}}
            src="https://www.nobroker.in/blog/wp-content/uploads/2022/03/Difference-Between-Duplex-And-Townhouse.jpg"
            alt=""
            className=""
          />
        </div>
        <div>
          <img
            style={{...style}}
            src="https://images7.alphacoders.com/341/341689.jpg"
            alt=""
            className=""
          />
        </div>
        <div>
          <img
            style={{...style}}
            src="https://wallpaperaccess.com/full/203480.jpg"
            alt=""
            className=""
          />
        </div>
        <div>
          <img
            style={{...style}}
            src="https://www.nobroker.in/blog/wp-content/uploads/2022/03/The-Types-Of-Duplex-Houses.jpg"
            alt=""
            className=""
          />
        </div>
      </Slider>
    </div>
  );
};

export default carousel;
