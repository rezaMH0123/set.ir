import { ApiResponse } from "@/types/http-service.type";
import BACKEND_ROUTES from "../configs";
import httpService from "../services/http-services";
import { NavbarMenu } from "@/types/menu";
import { API_URL } from "@/configs/globals";
import { ElkedLog } from "../elkedLogs";

export const getNavbarMenu = async (): Promise<ApiResponse<NavbarMenu[]>> => {
  try {
    const response = await httpService.get(BACKEND_ROUTES.GET_NAVBAR_MENUE);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "خطا در دریافت منو",
      errors: [error],
      data: null,
    };
  }
};

export const getNavbarMenuServerSide = async (): Promise<
  ApiResponse<NavbarMenu[]>
> => {
  ElkedLog(`Fetch NavbarMenu`, "INFO");
  try {
    const response = await fetch(API_URL + BACKEND_ROUTES.GET_NAVBAR_MENUE, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 * 60 * 24 },
      method: "GET",
    });

    if (!response.ok) {
      ElkedLog(`err in fetching navbar`, "ERROR");
      return {
        data: [],
        errors: [],
        message: "",
        success: true,
      };
    }

    const json = await response.json();
    return json;
  } catch (error) {
    ElkedLog(`err in fetching navbar`, "ERROR");
    return {
      success: false,
      message: "خطا در دریافت منو",
      errors: [error],
      data: null,
    };
  }
};

export const getFiltersMenuServerSide = async (): Promise<
  Record<string, []>
> => {
  ElkedLog(`fetch filtermenu`, "INFO");
  try {
    const response = await fetch(API_URL + "Menu/GetFilterMenuReferences", {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 * 60 * 24 },
      method: "GET",
    });

    if (!response.ok) {
      ElkedLog(`err in filtermenu`, "ERROR");
      return {};
    }

    const json = await response.json();
    return json.data;
  } catch {
    ElkedLog(`err in filtermenu`, "ERROR");
    return {};
  }
};
