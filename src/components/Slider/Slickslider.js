import React, { Component, useState } from "react";
import Slider from "react-slick";  
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Slickslider({data}) { 
  const [sdata, setData] = useState(data); 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500, 
    centerMode: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1, 
        }
      } 
    ]
  } 
  return (
    <>
      <section className="slider">
        <div className="">
          <div className="slider1">
            <Slider className="cat" {...settings}>
              {sdata.map((curElem) => { 
                return(
                  <>
                    <div className="cat-item" key={curElem.id}> 
                        <img src={curElem.image} alt="" /> 
                    </div> 
                  </>
                )
              })} 
            </Slider>
          </div>
        </div>
      </section> 
    </>
  );
}