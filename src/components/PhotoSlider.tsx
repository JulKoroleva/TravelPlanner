import React from "react";
import SimpleImageSlider from "react-simple-image-slider";

import oneImg from "../images/default/slider/1.jpg";
// import twoImg from '../images/default/slider/2.jpg'
import threeImg from "../images/default/slider/3.jpg";
import fourImg from "../images/default/slider/4.jpg";
import fiveImg from "../images/default/slider/5.jpg";
import sixImg from "../images/default/slider/6.jpg";
import sevenImg from "../images/default/slider/7.jpg";
import eightImg from "../images/default/slider/8.jpg";
import foreground from "../images/default/slider/slider.png";

interface PhotoSliderProps {
  isMobile: boolean;
}

const PhotoSlider: React.FC<PhotoSliderProps> = ({isMobile}) => {
  console.log('isMobile', isMobile)
  const images = [
    { url: oneImg },
    // { url: twoImg },
    { url: threeImg },
    { url: fourImg },
    { url: fiveImg },
    { url: sixImg },
    { url: sevenImg },
    { url: eightImg },
  ];

  return (
    <div className="slider">
      <img src={foreground} className="slider__foreground"></img>
      <div className="slider__container">
      <h2 className="slider__container_title">
        Время <strong style={{ color: "#315278" }}>путешествий</strong>{" "}
      </h2>
      <p className="slider__container_description">
        {" "}
        Вершины гор, мистические джунгли, бескрайние пляжи — все это ждет твоего
        открытия. Здесь ты можешь составить свой уникальный
        маршрут.
      </p>
      </div>
      {!isMobile ? (
        <SimpleImageSlider
          width={"100vw"}
          height={"60vh"}
          images={images}
          showBullets={true}
          showNavs={true}
          autoPlay={true}
          autoPlayDelay={3.0}
        />
      ) : (
        <SimpleImageSlider
          width={"100vw"}
          height={"40vh"}
          images={images}
          showBullets={true}
          showNavs={true}
          autoPlay={true}
          autoPlayDelay={3.0}
        />
      )}
    </div>
  );
};

export default PhotoSlider;
