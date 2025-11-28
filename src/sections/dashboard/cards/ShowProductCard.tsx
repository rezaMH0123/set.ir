"use client";

import Image from "next/image";
import Link from "next/link";
import ShowSkeletonCard from "./ShowSkeletonCard";
import APP_ROUTES from "@/constants/paths";
import { BASE_IMAGE_URL } from "@/configs/globals";

interface feature {
  name: string;
  label: string;
}

interface product {
  id: string;
  link: string;
  thumbnailUrl: string;
  CurrentPrice: number;
  prevPrice: number;
  discount: string;
  name: string;
  features: feature[];
  isLiked: boolean;
}

interface ShowProductCardProps {
  product: product;
}

const ShowProductCard: React.FC<ShowProductCardProps> = ({ product }) => {
  if (!product) {
    return <ShowSkeletonCard />;
  }

  return (
    <Link
      aria-label="APP_ROUTES.productDetails"
      href={APP_ROUTES.productDetails(product.id)}
    >
      <div
        key={product.id}
        dir="rtl"
        className="w-[186px] max-md:w-[160px] h-fit text-[#262626] bg-white rounded-[10px] gap-2 overflow-hidden shadow-[0_2px_6px_0_rgba(0,0,0,0.32)] flex flex-col"
      >
        <div className="relative flex justify-center">
          <Image
            src={BASE_IMAGE_URL + product.thumbnailUrl}
            alt="product-image"
            width={160}
            height={160}
            className="place-self-center w-full aspect-square object-cover"
          />
        </div>

        <div className="flex flex-col">
          <div
            className="text-[13px] h-[39px] place-content-center max-md:text-xs font-bold mb-1 mx-1 text-justify"
            title={product.name}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
            }}
          >
            {product.name}
          </div>
          <div className="text-xs font-medium mx-1">
            <div className="text-xs font-medium flex flex-row flex-nowrap overflow-auto gap-1">
              {!!product.features && (
                <>
                  <span
                    className="p-0.5 px-1 text-[11px] md:p-1 md:px-2 bg-blue-100 rounded-lg whitespace-nowrap inline-block"
                    title={product.features?.[0].name}
                    style={{ verticalAlign: "middle" }}
                  >
                    {product.features?.[0].name}
                  </span>
                  {product.features?.[1] && (
                    <span
                      className="p-0.5 px-1 text-[11px] md:p-1 md:px-2 bg-blue-100 rounded-lg whitespace-nowrap overflow-hidden text-ellipsis max-w-[80px] inline-block"
                      title={product.features?.[1].name}
                      style={{ verticalAlign: "middle" }}
                    >
                      {product.features?.[1].name}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mx-3 mb-3 text-center cursor-pointer bg-[#224CDF] text-white rounded-lg py-1 font-medium">
          مشاهده
        </div>
      </div>
    </Link>
  );
};

export default ShowProductCard;
