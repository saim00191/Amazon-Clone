"use client";
import React, { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import imageOne from "@/images/imageOne.png";
import imageTwo from "@/images/imageTwo.png";
import imageThree from "@/images/imageThree.png";
import imageFour from "@/images/imageFour.png";
import imageFive from "@/images/imageFive.png";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Banner = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: !isHovered,
    autoplaySpeed: 5000,
  };

  const nextSlide = () => {
    sliderRef.current?.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current?.slickPrev();
  };

  const images = [imageOne, imageTwo, imageThree, imageFour, imageFive];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);
  return (
    <div
      className="w-full h-full  relative  overflow-hidden z-0 m-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {" "}
      <Slider ref={sliderRef} {...settings}>
        {images.map((image, index) => (
          <div key={index} className="h-full relative ">
            <Image src={image} alt={`image${index + 1}`} />
          </div>
        ))}
      </Slider>
      <div
        className="absolute left-5 top-[20%] transform -translate-y-1/2 z-10 cursor-pointer"
        onClick={prevSlide}
      >
        <IoIosArrowBack size={75} color="black" />
      </div>
      <div
        className="absolute right-5 top-[20%] transform -translate-y-1/2 z-10 cursor-pointer"
        onClick={nextSlide}
      >
        <IoIosArrowForward size={75} color="black" />
      </div>
    </div>
  );
};

export default Banner;
