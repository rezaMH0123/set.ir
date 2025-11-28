import httpService from "../services/http-services";
import BACKEND_ROUTES from "../configs";
import { CartItem } from "@/types/cart.type";
import { PAYMENT_TYPE } from "@/constants/paymentOptions";
import { mutate } from "swr";
import SWR_KEYS from "../swrKeys";

export interface cartData {
  product: CartItem[];
  totalPrice: string;
  totalDiscount: string;
  finalPrice: string;
}

export const getCartData = async (
  productIds: string[],
  couponId?: string
): Promise<cartData> => {
  if (productIds.length === 0)
    return {
      finalPrice: "",
      product: [],
      totalDiscount: "",
      totalPrice: "",
    };
  const res = await httpService.get(
    `${BACKEND_ROUTES.GET_CART_DATA}?${productIds
      .map((id) => `ProductIds=${id}&`)
      .join("")}${couponId ? `DiscountId=${couponId}` : ""}`
  );

  return res.data.data;
};

export const getValidateCoupon = async (
  DiscountCode: string,
  PhoneNumber?: string
) => {
  const res = await httpService.get(`${BACKEND_ROUTES.GET_VALIDATE_COUPON}`, {
    params: {
      DiscountCode: DiscountCode,
      PhoneNumber: PhoneNumber,
    },
  });
  return res.data?.data;
};

export const postCreateOrder = async (productIds: string[], coupon: string) => {
  const body: { orderItems: { productId: string }[]; discountId?: string } = {
    orderItems: productIds.map((id) => {
      return {
        productId: id,
      };
    }),
  };

  if (!!coupon) {
    body.discountId = coupon;
  }

  const res = await httpService.post(
    `${BACKEND_ROUTES.POST_CREATE_ORDER}`,
    body,
    {
      headers: { authRequired: true },
    }
  );
  return res.data?.data as { orderId: string; status: "Completed" | "Pending" };
};

export const postCreatePaymentLink = async (
  orderId: string,
  method: string
) => {
  const res = await httpService.post(
    `${BACKEND_ROUTES.GET_PAYMENT_LINK}`,
    {
      paymentType: method,
      orderId: orderId,
    },
    {
      headers: { authRequired: true },
    }
  );

  if (method === PAYMENT_TYPE.WALLET) {
    mutate(SWR_KEYS.wallet);
  }
  return res.data?.data;
};
