"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductSkeletonCard from "../cards/ProductSkeletonCard";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";

interface Slide {
  link: string;
  image: StaticImport | string;
  alt?: string;
  title?: string;
}

interface SpecialSliderProps {
  slides: Slide[];
}

const SpecialSlider: React.FC<SpecialSliderProps> = ({ slides }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div
      dir="rtl"
      className="w-screen max-w-[1920px] place-self-center relative"
    >
      <button
        ref={prevRef}
        className="hidden md:block absolute top-[45%] right-2 z-10 bg-blue1/50 rounded-full w-8 h-8 shadow hover:bg-blue1 transition"
        aria-label="قبلی"
      >
        <span className="text-white text-2xl">{"‹"}</span>
      </button>

      <button
        ref={nextRef}
        className="hidden md:block absolute top-[45%] left-2 z-10 bg-blue1/50 rounded-full w-8 h-8 shadow hover:bg-blue1 transition"
        aria-label="بعدی"
      >
        <span className="text-white text-2xl">{"›"}</span>
      </button>

      <Swiper
        slidesPerView={1}
        dir="rtl"
        loop={true}
        autoplay={{ delay: 5000 }}
        modules={[Autoplay, Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          // @ts-expect-error Swiper types don't allow prevEl assignment here
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-expect-error Swiper types don't allow nextEl assignment here
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {!slides
          ? Array.from({ length: 8 }).map((_, index) => (
              <SwiperSlide key={index}>
                <ProductSkeletonCard />
              </SwiperSlide>
            ))
          : slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <Link aria-label={slide.link} href={slide.link}>
                  <Image
                    src={slide.image}
                    alt={slide.alt || `بنر تبلیغاتی شماره ${index + 1}`}
                    title={slide.title || `بنر ویژه ${index + 1}`}
                    width={1920}
                    height={800}
                    className="w-full aspect-[2] md:h-[400px] object-cover"
                    fetchPriority="high"
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    placeholder="blur"
                    quality={75}
                    blurDataURL={
                      typeof slide.image === "string" ? slide.image : undefined
                    }
                  />
                </Link>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default SpecialSlider;
