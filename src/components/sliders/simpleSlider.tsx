"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SimpleSliderProps {
  children: React.ReactNode;
}

const SimpleSlider: React.FC<SimpleSliderProps> = ({ children }) => {
  return (
    <div dir="rtl" className="w-full">
      <Swiper
        slidesPerView="auto"
        dir="rtl"
        spaceBetween={16}
        modules={[Autoplay]} 
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide 
            key={index} 
            className="!w-fit !mx-4 py-5"
          >
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SimpleSlider;