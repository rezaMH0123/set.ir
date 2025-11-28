import useSWR from "swr";
import SWR_KEYS from "../swrKeys";
import { fetchSliderProducts } from "../apiCalls/landing";

export const useSliderProducts = (apiUrl: string | null) => {
    const { data = [], isLoading } = useSWR(
      apiUrl ? SWR_KEYS.sliderProducts(apiUrl) : null,
      () => fetchSliderProducts(apiUrl!)
    );
    return { products: data, isLoading };
  };