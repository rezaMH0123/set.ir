import { AppearanceJsonType } from "@/types/appearcne";
import BACKEND_ROUTES from "../configs";
import httpService from "../services/http-services";
import { cache } from "react";
import { API_URL } from "@/configs/globals";
import { Product } from "@/types/slider.type";

export const fetchSliderProducts = async (apiAddress: string) => {
  const response = await httpService.get(apiAddress);
  return response.data?.products || [];
};

export const getCachedAppearance = cache<() => Promise<AppearanceJsonType>>(
  async () => {
    // return fake.data;
    const res = await fetch(API_URL + BACKEND_ROUTES.GET_APPEARANCE, {
      next: { revalidate: 300 },
    });

    try {
      if (res.status) return (await res?.json())?.data ?? {};
      else return {};
    } catch {
      return {};
    }
  }
);

export async function getServerSideProductByFilter(
  apiAddress: string
): Promise<Product[]> {
  const res = await fetch(API_URL + apiAddress, {
    method: "GET",
    next: { revalidate: 300 },
  });

  return (await res?.json())?.products ?? [];
}
