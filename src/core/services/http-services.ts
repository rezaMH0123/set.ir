/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "@/configs/globals";
import axios, { AxiosError } from "axios";
import { errorHandler, networkErrorStrategy } from "./http.errors";
import { ApiError } from "@/types/http-errors.type";
import { getCookie, setCookie } from "cookies-next";
import toast from "react-hot-toast";
import APP_ROUTES from "@/constants/paths";
import { preparegetExpierTimeToken } from "@/utils/helpers/jwtCookies";
import statusCodes from "./status-codes.json"; // adjust the path if needed

const httpService = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Flag to prevent infinite loop
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

function toEnglishDigits(str: string) {
  return str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
}

httpService.interceptors.request.use(
  async (config) => {
    // Example: normalize phone number in request data
    if (config.data && typeof config.data === "object") {
      for (const key in config.data) {
        if (typeof config.data[key] === "string") {
          config.data[key] = toEnglishDigits(config.data[key]);
        }
      }
    }

    const token = getCookie("token");
    const refreshToken = getCookie("refreshToken");

    if (config?.headers?.authRequired) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else if (refreshToken) {
        if (!isRefreshing) {
          isRefreshing = true;

          axios
            .post(`${API_URL}Authentication/RefreshToken`, { refreshToken })
            .then((response) => {
              const newToken = response.data?.data.token;
              setCookie("token", newToken, {
                maxAge: preparegetExpierTimeToken(
                  response.data.data.accessExpiresAt
                ),
                path: APP_ROUTES.LANDING,
              });
              setCookie("refreshToken", response.data?.data.refreshToken, {
                maxAge: preparegetExpierTimeToken(
                  response.data.data.refreshExpiresAt
                ),
                path: APP_ROUTES.LANDING,
              });
              processQueue(null, newToken);
            })
            .catch((err) => {
              processQueue(err, null);
              toast.error("لطفاً وارد حساب کاربری خود شوید");
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        // همیشه promise بده به درخواست اصلی:
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              if (config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
              }
              resolve(config);
            },
            reject: (err: any) => {
              reject(err);
            },
          });
        });
      } else {
        toast.error("لطفاً وارد حساب کاربری خود شوید");
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

httpService.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) {
      networkErrorStrategy();
    }

    const statusCode = error.response?.status || 500;
    const errorData = (error.response?.data || {}) as ApiError;

    const handler = errorHandler[statusCode];

    let faMessage = "";
    if (statusCode < 500) {
      const errorMessageCode = (error.response?.data as ApiError)?.message;
      faMessage = (statusCodes as Record<string, { en: string; fa: string }>)[
        errorMessageCode
      ]?.fa;

      if (!!faMessage) {
        toast.error(faMessage);
      }
    }

    if (statusCode > 299)
      if (handler) {
        handler(errorData);
      } else {
        throw {
          ...errorData,
          message: "خطای پیش‌بینی نشده‌ای رخ داده است",
        };
      }
  }
);

export default httpService;
