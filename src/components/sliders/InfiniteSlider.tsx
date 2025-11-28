"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface InfiniteSliderProps {
  children: React.ReactNode;
}

const InfiniteSlider: React.FC<InfiniteSliderProps> = ({ children }) => {
  return (
    <div dir="rtl" className="w-full">
      <Swiper
        slidesPerView="auto"
        dir="rtl"
        spaceBetween={32}
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
        }}
        loop={true}
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index} className="!w-fit !mx-8 py-5">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default InfiniteSlider;
