"use client";
import { baseIcons } from "@/assets/icons";
import baseImages from "@/assets/images";
import AuthStepController from "@/components/auth/AuthStepController";
import EmptyState from "@/components/EmptyState";
import TextField from "@/components/TextFild";
import APP_ROUTES from "@/constants/paths";
import { PAYMENT_TYPE } from "@/constants/paymentOptions";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import {
  getValidateCoupon,
  postCreateOrder,
  postCreatePaymentLink,
} from "@/core/apiCalls/cart";
import ProductCard from "@/sections/basket/ProductCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shapes } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import LoaderBasket from "./Loader";
import { commaSeperatedDigit } from "@/utils/helpers/commadSeperatedDigit";

const coupon = z.object({
  coupon: z.string(),
});
type CouponFormData = z.infer<typeof coupon>;

export default function Basket() {
  const methods = useForm<CouponFormData>({
    resolver: zodResolver(coupon),
    defaultValues: { coupon: "" },
  });

  const {
    totalPrice,
    cart,
    totalDiscount,
    priceToPay,
    totalItems,
    appliedCoupon,
    applyCoupon,
    clearCart,
    isLoading,
  } = useCart();
  const { isLoggedIn, wallet, user } = useUser();
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [isWalletPaymentSelected, setIsWalletPaymentSelected] = useState(false);

  const isWalletAmoutEnough = useMemo(
    () => +(wallet?.amount ?? 0) > +priceToPay,
    [priceToPay, wallet?.amount]
  );

  const handlePayment = useCallback(async () => {
    setIsSubmitting(true);

    try {
      const { orderId, status } = await postCreateOrder(
        cart.map((item) => item.id),
        appliedCoupon ? appliedCoupon.id : ""
      );

      if (status === "Completed") {
        toast.success("خرید محتوا با موفقیت انجام شد");
        router.push(APP_ROUTES.MY_CONTENT);
        clearCart();
        return;
      }

      const paymentLink = await postCreatePaymentLink(
        orderId,
        isWalletPaymentSelected ? PAYMENT_TYPE.WALLET : PAYMENT_TYPE.DIRECT
      );

      if (isWalletPaymentSelected) {
        toast.success("خرید محتوا با موفقیت انجام شد");
        router.push(APP_ROUTES.MY_CONTENT);
        clearCart();
      } else {
        window.open(paymentLink, "_blank", "noopener,noreferrer");
        clearCart();
      }

      setIsSubmitting(false);
    } catch {
      setIsSubmitting(false);
    }
  }, [cart, appliedCoupon, isWalletPaymentSelected, router, clearCart]);

  const PayButton = useCallback(
    ({ id }: { id: string }) => {
      if (isLoggedIn) {
        return (
          <button
            style={{ opacity: isSubmitting ? "70%" : "100%" }}
            disabled={isSubmitting}
            onClick={handlePayment}
            className="bg-blue1 text-white text-center w-full rounded-lg py-2 cursor-pointer"
          >
            پرداخت
            {isWalletPaymentSelected && " (از طریق کیف پول) "}
          </button>
        );
      } else {
        return (
          <AuthStepController
            id={id}
            triggerButton={
              <button
                style={{ opacity: isSubmitting ? "70%" : "100%" }}
                disabled={isSubmitting}
                className="bg-blue1 text-white text-center w-full rounded-lg py-2 cursor-pointer"
              >
                پرداخت
              </button>
            }
          />
        );
      }
    },
    [isLoggedIn, isSubmitting, handlePayment, isWalletPaymentSelected]
  );

  const validateCoupon = async ({ coupon }: CouponFormData) => {
    setLoadingCoupon(true);
    try {
      const res = await getValidateCoupon(coupon, user?.phoneNumber);
      if (res) {
        await applyCoupon({ id: res, name: coupon });
      }
    } catch {
      setLoadingCoupon(false);
    }
    setLoadingCoupon(false);
  };

  if (isLoading) return <LoaderBasket />;

  if (totalItems === 0) {
    return (
      <div
        dir="rtl"
        className="mb-40 px-2 py-6 md:p-9 mt-8 flex flex-col items-center md:flex-row md:justify-center gap-x-8 md:items-start"
      >
        <EmptyState
          imageSrc={baseImages.emptyBasket}
          title="سبد خرید شما خالیه !"
          description="شاید بتونی با رفتن به صفحه لیست محصولات محتوای مورد نظر خودت رو پیدا کنی"
          linkHref="/filter"
          linkText="رفتن به لیست محتوا ها"
          Icon={Shapes}
        />
      </div>
    );
  }

  return (
    <div
      style={{ width: "inherit" }}
      dir="rtl"
      className="pb-60 W-[-webkit-fill-available] px-2 py-6 md:p-9 max-w-[1600px] place-self-center flex flex-col items-center md:flex-row md:justify-between gap-x-8 md:items-start"
    >
      <div className="w-full md:w-[854px] ">
        <div className="w-full h-[74px] flex items-center shadow-card2 rounded-3xl px-5 text-xl font-semibold">
          سبد خرید ({totalItems} دوره)
        </div>
        <div className="mt-6 space-y-4">
          {cart.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
      <div className="w-full md:w-[436px]  bg-white shadow-card1 sticky top-24 mt-8 rounded-xl font-vazirFD py-10">
        <div className="space-y-4 px-10 md:pb-0">
          <div className="flex justify-between text-MediumGray">
            <span>قیمت دوره ها</span>
            <span>
              {commaSeperatedDigit(totalPrice) == "0" ? (
                "رایگان"
              ) : (
                <>{commaSeperatedDigit(totalPrice)} تومان</>
              )}
            </span>
          </div>
          {+totalDiscount > 0 && (
            <div className=" w-full bg-white md:pb-0">
              <div className="flex justify-between text-blue1">
                <span>سود شما از خرید</span>
                <span>{commaSeperatedDigit(totalDiscount)} تومان</span>
              </div>
            </div>
          )}
          <div className=" justify-between text-black1 hidden md:flex">
            <span>مبلغ قابل پرداخت</span>
            <span>
              {commaSeperatedDigit(
                +priceToPay === 0 && !!appliedCoupon ? totalPrice : priceToPay
              ) == "0" ? (
                "رایگان"
              ) : (
                <>
                  {commaSeperatedDigit(
                    +priceToPay === 0 && !!appliedCoupon
                      ? totalPrice
                      : priceToPay
                  )}
                  تومان
                </>
              )}
            </span>
          </div>
        </div>
        <div className="px-7">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(validateCoupon)}
              className="flex flex-col items-center mt-6"
            >
              <div className="flex items-center gap-x-3 h-10 w-full">
                {!appliedCoupon ? (
                  <>
                    <TextField
                      placeholder="کدتخفیف خود را وارد کنید"
                      name="coupon"
                      textAlign="right"
                      className="h-full !pr-5 flex-1"
                      disabled={loadingCoupon}
                    />
                    <button
                      style={{ opacity: loadingCoupon ? "50%" : "100%" }}
                      disabled={loadingCoupon}
                      className="h-full text-blue1 border border-blue1 rounded-[10px] px-4 text-sm cursor-pointer   "
                    >
                      اعمال
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col w-full text-center">
                      <label>کد تخفیف مورد نظر اعمال شد</label>
                      <div className="flex flex-row items-center">
                        {/* <label>{appliedCoupon}</label> */}
                        {/* <label>حذف کد تخفیف</label>
                        <X className="text-red-500" /> */}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </form>
          </FormProvider>

          {isLoggedIn && +(wallet?.amount ?? 0) > 0 && (
            <div
              style={{
                opacity: isWalletAmoutEnough ? 1 : 0.7,
              }}
              className={`cursor-pointer mt-5 w-full border rounded-2xl flex items-center justify-between px-4 py-3 ${
                isWalletPaymentSelected ? "border-blue1" : "border-LightGray"
              }`}
              onClick={() =>
                isWalletAmoutEnough &&
                setIsWalletPaymentSelected((prev) => !prev)
              }
            >
              <div>
                <div className="flex flex-row items-center gap-1">
                  <Image
                    alt="wallet icon"
                    src={baseIcons.walletIcon}
                    className="w-7 h-7"
                  />
                  <label className="cursor-pointer">پرداخت از کیف پول ست</label>
                </div>
                <div className="cursor-pointer mt-2 text-MediumGray mr-8">
                  {isWalletAmoutEnough ? (
                    <label className="cursor-pointer">
                      برداشت {priceToPay} از {wallet?.amount}
                    </label>
                  ) : (
                    <label>
                      موجودی ناکافی
                      {` ${wallet?.amount ?? 0} `}
                    </label>
                  )}
                </div>
              </div>
              <button
                type="button"
                className={`cursor-pointer w-10.5 h-6 rounded-full border transition-colors duration-200 flex items-center ${
                  isWalletPaymentSelected
                    ? "bg-blue1 border-blue1"
                    : "bg-gray-200 border-gray-300"
                }`}
                aria-pressed={isWalletPaymentSelected}
              >
                <span
                  className={`block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
                    isWalletPaymentSelected ? "-translate-x-5" : ""
                  }`}
                />
              </button>
            </div>
          )}

          <div className="hidden md:block mt-6">
            <PayButton id="1" />
          </div>
        </div>
      </div>

      <div className="md:hidden w-full h-[115px] bg-white z-30 fixed left-0 bottom-[70px] p-5">
        <div className="flex justify-between font-vazirFD">
          <span className="text-sm ">مبلغ قابل پرداخت</span>
          <span>
            {commaSeperatedDigit(
              +priceToPay === 0 && !!appliedCoupon ? totalPrice : priceToPay
            )}{" "}
            تومان
          </span>
        </div>
        <div className="block md:hidden mt-4">
          <PayButton id="2" />
        </div>
      </div>
    </div>
  );
}
