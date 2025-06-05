// components/MainBanner.tsx
'use client';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MainBanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="main-banner">
      <Slider {...settings}>
        <div className="item item-1">
          <div className="header-text">
            <span className="category">Toronto, <em>Canada</em></span>
            <h2>Hurry!<br />Get the Best Villa for you</h2>
          </div>
        </div>
        <div className="item item-2">
          <div className="header-text">
            <span className="category">Melbourne, <em>Australia</em></span>
            <h2>Be Quick!<br />Get the best villa in town</h2>
          </div>
        </div>
        <div className="item item-3">
          <div className="header-text">
            <span className="category">Miami, <em>South Florida</em></span>
            <h2>Act Now!<br />Get the highest level penthouse</h2>
          </div>
        </div>
      </Slider>
    </div>
  );
}
