"use client";

import React, { useState } from "react";
import Image from "next/image";
import baseImages from "@/assets/images";
import { BASE_IMAGE_URL } from "@/configs/globals";
import Link from "next/link";
import { Product } from "@/types/slider.type";
import APP_ROUTES from "@/constants/paths";

// interface feature {
//   name: string;
// }

interface ModalProductCardProps {
  data: Product;
}
export default function ModalProductCard({ data }: ModalProductCardProps) {
  const [imgSrc, setImgSrc] = useState<string>(
    data.thumbnailUrl || baseImages.productPlaceholder.src
  );

  const handleImgError = () => {
    setImgSrc(baseImages.productPlaceholder.src);
  };

  return (
    <Link
      aria-label="APP_ROUTES.productDetails"
      href={APP_ROUTES.productDetails(data.id)}
    >
      <div
        dir="rtl"
        className="h-24 flex items-center justify-between bg-white rounded-[12px] my-2 shadow-sm pr-5 max-sm:pr-3 pl-3 py-4 gap-4 max-sm:gap-1 border border-[#F1F1F1]"
      >
        <div className="flex gap-4">
          <Image
            src={BASE_IMAGE_URL + imgSrc}
            alt="product"
            width={80}
            height={80}
            onError={handleImgError}
            className="rounded-md h-full aspect-square object-contain"
          />
          <div className="text-right flex flex-col h-20 overflow-hidden">
            <div className="text-sm font-semibold text-[#1A1A1A]">
              {data.name}
            </div>
            <div className=" text-[#4D4D4D] text-xs mt-1">
              {data.features?.map((feature) => feature.name + " ").join(", ")}
            </div>
          </div>
        </div>

        <div className="text-sm text-[#1A1A1A] mt-2 text-center font-vazirFD">
          {data.finalPrice == "0" ? "رایگان" : <>{data.finalPrice} تومان</>}
        </div>
      </div>
    </Link>
  );
}
