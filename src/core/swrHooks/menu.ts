import { ApiResponse } from "@/types/http-service.type";
import { NavbarMenu } from "@/types/menu";
import useSWR from "swr";
import SWR_KEYS from "../swrKeys";
import { getNavbarMenu } from "../apiCalls/menu";

export const useNavbarMenu = () => {
  const { data, error, isLoading } = useSWR<ApiResponse<NavbarMenu[]>>(
    SWR_KEYS.navbarMenue,
    getNavbarMenu
  );

  return {
    menu: data?.data ?? [],
    isLoading,
    isError: !!error,
    error,
    rawResponse: data,
  };
};
