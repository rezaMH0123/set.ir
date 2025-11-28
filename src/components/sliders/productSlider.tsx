"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../cards/ProductCard";
import ProductSkeletonCard from "../cards/ProductSkeletonCard";
import { Product } from "@/types/slider.type";
import "swiper/css";
import useIsMobile from "@/utils/hooks/useIsMobile";
import { FreeMode } from "swiper/modules";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import APP_ROUTES from "@/constants/paths";

export interface ProductSliderProps {
  products: Product[];
  filtersString?: string;
}

const ProductSlider: React.FC<ProductSliderProps> = ({
  products,
  filtersString,
}) => {
  const { isMobile } = useIsMobile();
  const CARD_WIDTH = isMobile ? 160 : 186;
  const CARD_HEIGHT = isMobile ? 268 : 310;

  const filtersStringWithoutPagination = (filtersString ?? "")
    .replace(/([&?])PageNumber=\d+&?/, "$1")
    .replace(/([&?])PageSize=\d+&?/, "$1")
    .replace(/[&?]$/, "");

  return (
    <div
      dir="rtl"
      className="w-full px-2"
      style={{ minHeight: `${CARD_HEIGHT}px` }}
    >
      {products?.length === 0 && (
        <div className="flex flex-row py-3 overflow-hidden gap-4">
          {Array.from({ length: 10 }).map((_, idx) => (
            <ProductSkeletonCard key={idx} />
          ))}
        </div>
      )}
      <section aria-label="اسلایدر محصولات پیشنهادی">
        <Swiper
          slidesPerView="auto"
          dir="rtl"
          spaceBetween={20}
          className="!py-3 !px-3"
          freeMode={true}
          modules={[FreeMode]}
        >
          {products?.length !== 0 &&
            products.map((product) => (
              <SwiperSlide
                key={product.id}
                style={{
                  width: `${CARD_WIDTH}px`,
                  height: `${CARD_HEIGHT}px`,
                }}
              >
                <article aria-label={`محصول ${product.name}`}>
                  <ProductCard product={product} />
                </article>
              </SwiperSlide>
            ))}

          {filtersStringWithoutPagination && (
            <SwiperSlide
              style={{
                width: `${CARD_WIDTH}px`,
                height: `${CARD_HEIGHT}px`,
              }}
            >
              <Link
                aria-label="مشاهده همه محصولات بیشتر"
                href={APP_ROUTES.FILTER + filtersStringWithoutPagination}
              >
                <div
                  className="cursor-pointer hover:bg-gray-200 flex flex-row gap-x-2 items-center
               justify-center bg-white rounded-[10px]  h-[268px] md:h-[310px] overflow-hidden shadow-[0_2px_6px_0_rgba(0,0,0,0.32)] text-[#262626]"
                >
                  <label className="text-lg cursor-pointer">مشاهده بیشتر</label>
                  <ArrowLeftIcon />
                </div>
              </Link>
            </SwiperSlide>
          )}
        </Swiper>
      </section>
    </div>
  );
};

export default ProductSlider;
