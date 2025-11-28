"use client";

import Image from "next/image";
import Link from "next/link";
import ProductSkeletonCard from "./ProductSkeletonCard";
import { Product } from "@/types/slider.type";
import { commaSeperatedDigit } from "@/utils/helpers/commadSeperatedDigit";
import APP_ROUTES from "@/constants/paths";
import { BASE_IMAGE_URL } from "@/configs/globals";
import LikeComponent from "../Like";
import { useMemo, useRef } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const faeturesRef = useRef<HTMLDivElement>(null);
  const discountPercent = product.discountedPrice
    ? Math.round(
        ((product.price - product.discountedPrice) / product.price) * 100
      )
    : 0;

  const sw = faeturesRef.current?.scrollWidth ?? 0;
  const cw = faeturesRef.current?.clientWidth ?? 0;

  const widthDiffrence = useMemo(() => sw - cw, [sw, cw]);

  if (!product) return <ProductSkeletonCard />;

  return (
    <div
      key={product.id}
      className="relative w-[160px] h-[268px] md:w-[186px] md:h-[310px]"
    >
      {/* w and h are synced with slider */}
      <Link
        aria-label={`مشاهده جزئیات محصول ${product.name}`}
        href={APP_ROUTES.productDetails(product.id + "")}
      >
        <div
          dir="rtl"
          className="bg-white rounded-[10px]  h-[268px] md:h-[310px] overflow-hidden shadow-[0_2px_6px_0_rgba(0,0,0,0.32)] flex flex-col justify-between text-[#262626]"
        >
          <div>
            <div className="relative flex justify-center">
              <Image
                src={BASE_IMAGE_URL + product.thumbnailUrl}
                alt={`تصویر محصول ${product.name}`}
                title={`مشاهده جزئیات محصول ${product.name}`}
                height={186}
                width={186}
                className="place-self-center h-[160px] md:h-[186px] aspect-square object-cover"
                loading="lazy"
                priority={false}
              />
            </div>

            <div className="flex flex-col px-2">
              <div
                title={product.name}
                className={`text-[12px] md:text-[13px] h-[36px] md:h-[39px] mt-1 md:mt-2 line-clamp-2 font-bold text-start mb-1`}
                dir={/^[A-Za-z]/.test(product.name) ? "ltr" : "rtl"}
              >
                {product.name}
              </div>
              <div className="overflow-hidden rounded-lg">
                <div
                  ref={faeturesRef}
                  className={`text-xs font-medium overflow-hidden rounded-lg  flex flex-row flex-nowrap gap-1`}
                  style={{
                    display: "flex",
                  }}
                >
                  {(product.features ?? []).length > 0 && (
                    <div
                      className={`${widthDiffrence && "marquee-track"}  flex flex-row flex-nowrap overflow-visible gap-1`}
                      style={{
                        display: "flex",
                      }}
                    >
                      <div
                        className="w-fit p-0.5 px-1 text-[11px] md:p-1 md:px-2 bg-blue-100 rounded-lg text-nowrap !inline-block"
                        title={product.features?.[0].name}
                        style={{ verticalAlign: "middle" }}
                      >
                        {product.features?.[0].name}
                      </div>
                      {product.features?.[1] && (
                        <div
                          className="w-fit p-0.5 px-1 text-[11px] md:p-1 md:px-2 bg-blue-100 rounded-lg text-nowrap !inline-block"
                          title={product.features?.[1].name}
                          style={{ verticalAlign: "middle" }}
                        >
                          {product.features?.[1].name}
                        </div>
                      )}
                    </div>
                  )}

                  {/* duplicate features if it has scroll */}
                  {!!widthDiffrence && (product.features ?? []).length > 0 && (
                    <div
                      className={`${widthDiffrence && "marquee-track"}  flex flex-row flex-nowrap overflow-visible gap-1`}
                      style={{
                        display: "flex",
                      }}
                    >
                      <div
                        className="w-fit p-0.5 px-1 text-[11px] md:p-1 md:px-2 bg-blue-100 rounded-lg text-nowrap !inline-block"
                        title={product.features?.[0].name}
                        style={{ verticalAlign: "middle" }}
                      >
                        {product.features?.[0].name}
                      </div>
                      {product.features?.[1] && (
                        <div
                          className="w-fit p-0.5 px-1 text-[11px] md:p-1 md:px-2 bg-blue-100 rounded-lg text-nowrap !inline-block"
                          title={product.features?.[1].name}
                          style={{ verticalAlign: "middle" }}
                        >
                          {product.features?.[1].name}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col px-3 relative">
            {product.discountedPrice != product.price &&
              !!product.discountedPrice && (
                <div className="absolute -top-2.5 md:-top-3 left-3 text-sm text-left  font-vazirFD">
                  {+product.discountedPrice === 0 ? (
                    "رایگان"
                  ) : (
                    <>{commaSeperatedDigit(product.discountedPrice)} تومان</>
                  )}
                </div>
              )}
            <div className="flex justify-between font-vazirFD flex-row-reverse mb-1 items-center">
              <div
                className={`text-sm font-vazirFD mt-0.5 ${
                  product.discountedPrice != product.price &&
                  !!product.discountedPrice
                    ? "text-gray-500  line-through mt-2"
                    : " text-left mb-3"
                }`}
              >
                {commaSeperatedDigit(product?.price ?? 0) == "0" ? (
                  "رایگان"
                ) : (
                  <>{commaSeperatedDigit(product?.price ?? 0)} تومان</>
                )}
              </div>
              {product.discountedPrice != product.price &&
                !!product.discountedPrice && (
                  <div
                    className={`text-sm max-md:text-xs w-fit bg-red-500 pt-0.5 px-2 rounded-2xl text-white font-vazirFD`}
                  >
                    {commaSeperatedDigit(discountPercent)}٪
                  </div>
                )}
            </div>
          </div>
        </div>
      </Link>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: BASE_IMAGE_URL + product.thumbnailUrl,
            offers: {
              "@type": "Offer",
              price: product.discountedPrice ?? product.price,
              priceCurrency: "IRR",
            },
          }),
        }}
      />
      <LikeComponent
        pid={product.id as string}
        className="absolute left-0 top-0 transform rounded-full
         cursor-pointer hover:bg-[#00000011] p-1
          transition-all duration-300 ease-in-out w-[35px] h-[35px]"
      />
    </div>
  );
};

export default ProductCard;
