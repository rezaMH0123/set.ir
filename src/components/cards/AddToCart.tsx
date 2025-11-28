"use client";

import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { Product } from "@/types/product";
import {
  BookOpenText,
  File,
  FileCheck,
  ShoppingBasket,
  SquarePlus,
  Timer,
  Trash,
} from "lucide-react";
import LikeComponent from "../Like";
import {
  getExamCount,
  getSummaryNotesCount,
  getFilesCount,
  getTotalDuration,
  getTotalPages,
} from "@/utils/helpers/getCountFilesForPrduct";
import Link from "next/link";
import APP_ROUTES from "@/constants/paths";
import { commaSeperatedDigit } from "@/utils/helpers/commadSeperatedDigit";
import AuthStepController from "../auth/AuthStepController";
import { postCreateOrder } from "@/core/apiCalls/cart";
import { useState } from "react";

type AddToCartProps = {
  className?: string;
  hasPurchased: boolean;
  product: Product | undefined;
};
export default function AddToCart({
  className,
  hasPurchased,
  product,
}: AddToCartProps) {
  const { isLoggedIn } = useUser();
  const { addToCart, removeFromCart, isProductInCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addToCartHandler = () => {
    if (product) {
      addToCart(product);
    }
  };

  const handlePurchaseFreeContent = async () => {
    setIsSubmitting(true);
    const { status } = await postCreateOrder([product?.id ?? ""], "");
    setIsSubmitting(false);
    if (status == "Completed") window.location.reload();
  };

  const totalDuration = product && getTotalDuration(product);
  const filesCount = product && getFilesCount(product);
  const examsCount = product && getExamCount(product);
  const summaryNotesCount = product && getSummaryNotesCount(product);
  const totalPages = product && getTotalPages(product);

  return (
    <div
      className={`bg-white md:rounded-2xl shadow-card2  py-6 px-3 font-vazirFD ${className} ${
        isLoggedIn && hasPurchased && "hidden"
      }`}
    >
      <div className="flex flex-row-reverse items-center justify-between md:block">
        {/* قیمت و حالت های مختلف مربوط به قیمت */}
        <div>
          <div className="flex items-center justify-between w-full">
            <span className="hidden md:block text-base">قیمت محصول</span>
            <span className="flex items-center gap-x-2">
              {product?.finalPrice + "" === "0" ? (
                <span className="text-base">رایگان</span>
              ) : (
                <>
                  {commaSeperatedDigit(product?.finalPrice ?? 0) == "0" ? (
                    "رایگان"
                  ) : (
                    <>
                      {commaSeperatedDigit(product?.finalPrice ?? 0)}
                      <span className="text-base">تومان</span>
                    </>
                  )}
                </>
              )}
            </span>
          </div>
          {product?.discountAmount &&
            !(commaSeperatedDigit(product?.finalPrice ?? 0) == "0") && (
              <div className="flex  items-center w-full mt-1 justify-end gap-1">
                <span className="text-xs bg-red-600 text-white rounded-full p-1">
                  {product?.discountPercentage}٪
                </span>
                <div className="relative inline-block w-fit">
                  <span className="text-gray-400 text-xs">
                    {commaSeperatedDigit(product.price)} تومان
                  </span>
                  <div className="absolute left-0 top-1/2 w-full h-[1px] bg-gray-400 -rotate-[20deg]"></div>
                </div>
              </div>
            )}
        </div>
        {/* دکمه افزودن به سبد. محتوا و ... */}
        <div className="md:mt-4 flex md:justify-between items-center gap-x-2 flex-1">
          {commaSeperatedDigit(product?.finalPrice ?? 0) == "0" ? (
            <div className="flex flex-row gap-1 h-9 px-8 md:px-0 md:h-11 items-center flex-1">
              {isLoggedIn ? (
                <button
                  onClick={handlePurchaseFreeContent}
                  style={{ opacity: isSubmitting ? "70%" : "100%" }}
                  disabled={isSubmitting}
                  className={`bg-blue1 hover:bg-blue-700  h-9 md:h-11 w-64 md:w-full rounded-3xl flex justify-center items-center gap-x-2 cursor-pointer transition-colors duration-300`}
                >
                  <SquarePlus className="stroke-white w-4 h-4" />
                  <span className="font-semibold text-white">
                    افزودن به محتواها
                  </span>{" "}
                </button>
              ) : (
                <AuthStepController
                  id={"add-to-library"}
                  triggerButton={
                    <button
                      className={`bg-blue1 hover:bg-blue-700  h-9 md:h-11 w-64 md:w-full flex-1 rounded-3xl flex justify-center items-center gap-x-2 cursor-pointer transition-colors duration-300`}
                    >
                      <SquarePlus className="stroke-white w-4 h-4" />
                      <span className="font-semibold text-white">
                        افزودن به محتواها
                      </span>
                    </button>
                  }
                />
              )}
            </div>
          ) : (
            <div className="flex flex-row gap-1 h-9 px-8 md:px-0  md:h-11 items-center flex-1">
              {isProductInCart(product?.id ?? "") ? (
                <>
                  <Trash
                    onClick={() => product && removeFromCart(product.id)}
                    className="rounded-xl p-2 stroke-white w-9 h-9 md:h-11 md:w-11 bg-red-500 hover:bg-red-600 cursor-pointer transition-colors duration-300"
                  />
                  <Link
                    href={APP_ROUTES.BASKET}
                    className={`rounded-xl whitespace-nowrap flex-1 h-full bg-white hover:bg-gray-100 border-blue1 border-2 text-blue1 px-4 flex justify-center items-center gap-x-2 cursor-pointer transition-colors duration-300`}
                  >
                    مشاهده سبد خرید
                  </Link>
                </>
              ) : (
                <button
                  onClick={addToCartHandler}
                  className={`bg-blue1 hover:bg-blue-700 w-[200px] h-full flex-1 rounded-3xl flex justify-center items-center gap-x-2 cursor-pointer transition-colors duration-300`}
                >
                  <ShoppingBasket className="stroke-white w-4 h-4" />
                  <span className="font-semibold text-white">
                    افزودن به سبد
                  </span>
                </button>
              )}
            </div>
          )}
          {product?.id && (
            <LikeComponent
              pid={product.id}
              className="rounded-full cursor-pointer hover:bg-[#00000011] 
              p-1 transition-all duration-300 ease-in-out w-[40px] h-[40px]"
            />
          )}
        </div>
      </div>

      {/* خصوصیات محصول که فقط در حالت دسکتاپ نشون میدیم */}
      <div className="mt-8 hidden md:block">
        {totalDuration !== 0 && (
          <div className="flex justify-between items-center w-full">
            <span className="flex justify-center gap-x-2 items-center  text-xs ">
              <Timer className="w-5 h-5" />
              مدت زمان دوره
            </span>
            <span className="flex  items-center  text-sm">{totalDuration}</span>
          </div>
        )}
        {filesCount !== 0 && (
          <div className="flex justify-between items-center w-full mt-5">
            <span className="flex justify-center items-center gap-x-2 text-xs ">
              <File className="w-5 h-5" />
              تعداد فایل ها
            </span>
            <span className="flex items-center  text-sm">
              {filesCount !== 1 ? `${filesCount} عدد` : 1}
            </span>
          </div>
        )}
        {examsCount !== 0 && (
          <div className="flex justify-between items-center w-full mt-5">
            <span className="flex justify-center items-center gap-x-2 text-xs">
              <FileCheck className="w-5 h-5" />
              تعداد نمونه سوالات
            </span>
            <span className="flex  items-center  text-sm">
              {examsCount !== 1 ? `${examsCount} عدد` : 1}
            </span>
          </div>
        )}
        {summaryNotesCount !== 0 && (
          <div className="flex justify-between items-center w-full mt-5">
            <span className="flex justify-center items-center gap-x-2 text-xs">
              <FileCheck className="w-5 h-5" />
              تعداد خلاصه نکات
            </span>
            <span className="flex items-center text-sm">
              {summaryNotesCount !== 1 ? `${summaryNotesCount} عدد` : 1}
            </span>
          </div>
        )}

        {totalPages !== 0 && (
          <div className="flex justify-between items-center w-full mt-5">
            <span className="flex justify-center items-center gap-x-2 text-xs">
              <BookOpenText className="w-5 h-5" />
              تعداد صفحات
            </span>
            <span className="flex  items-center  text-sm">
              {totalPages !== 1 ? `${totalPages} صفحه` : 1}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
