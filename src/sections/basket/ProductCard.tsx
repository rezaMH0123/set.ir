import { BASE_IMAGE_URL } from "@/configs/globals";
import APP_ROUTES from "@/constants/paths";
import { useCart } from "@/context/CartContext";
import { CartItem } from "@/types/cart.type";
import { commaSeperatedDigit } from "@/utils/helpers/commadSeperatedDigit";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

type ProductCardProps = {
  className?: string;
  product: CartItem;
};

export default function ProductCard({
  className = "",
  product,
}: ProductCardProps) {
  const { removeFromCart } = useCart();

  return (
    <div
      className={`flex items-center w-full shadow-card3 px-3 py-2 md:px-4 rounded-2xl bg-Neutral-background-100 ${className} h-auto`}
    >
      <div className="flex items-center gap-4 w-full">
        <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
          <Link
            aria-label="APP_ROUTES.productDetails"
            href={APP_ROUTES.productDetails(product.id)}
          >
            <Image
              src={BASE_IMAGE_URL + product.thumbnailUrl}
              alt="product-image"
              width={100}
              height={100}
              className="object-cover aspect-square"
            />
          </Link>
        </div>

        <div className="flex flex-col justify-between flex-grow overflow-hidden">
          {/* Title */}
          <h2 className="text-black1 text-sm md:text-lg font-medium truncate">
            {product.name.length <= 66
              ? product.name
              : product.name.slice(0, 60) + "..."}
          </h2>

          <div className="relative md:max-h-24 max-h-16 pt-2 opacity-80 overflow-hidden">
            <div className="pt-2">
              <Markdown>{product.description}</Markdown>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </div>

          <div className="flex md:hidden flex-row justify-between items-center mt-4 font-vazirFD text-sm">
            <span className="">
              {" "}
              {commaSeperatedDigit(product.price) == "0" ? (
                "رایگان"
              ) : (
                <>{commaSeperatedDigit(product.price)} تومان</>
              )}
            </span>
            {product.discountAmount ? (
              <span className="text-red-500 text-sm">
                {Math.floor((product.discountAmount / product.price) * 100)}%
                تخفیف
              </span>
            ) : null}
          </div>
        </div>

        <div className="hidden md:flex flex-col items-end justify-center gap-y-1 font-vazirFD min-w-[120px] text-sm">
          <span>
            {commaSeperatedDigit(product.price) == "0" ? (
              "رایگان"
            ) : (
              <>{commaSeperatedDigit(product.price)} تومان</>
            )}
          </span>
          {product.discountAmount ? (
            <span className="text-red-500 text-sm">
              {Math.floor((product.discountAmount / product.price) * 100)}%
              تخفیف
            </span>
          ) : null}
        </div>

        <div className="pl-2 md:pl-4 self-start md:self-center">
          <X
            className="stroke-Neutral-base-500 cursor-pointer w-5 h-5 md:w-6 md:h-6"
            onClick={() => removeFromCart(product.id)}
          />
        </div>
      </div>
    </div>
  );
}
