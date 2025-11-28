"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getCookie, deleteCookie } from "cookies-next";
import httpService from "@/core/services/http-services";
import { setCookie } from "cookies-next";
import APP_ROUTES from "@/constants/paths";
import { preparegetExpierTimeToken } from "@/utils/helpers/jwtCookies";
import { useGetWallet, useUserProfile } from "@/core/swrHooks/dashboard";
import { User } from "@/types/user.type";
import { walletType } from "@/types/dashboard.type";
import { useRouter } from "next/navigation";

type UserContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (userData?: User) => void;
  logout: () => void;
  wallet: walletType | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const login = () => {
    setIsLoggedIn(true);
  };
  const { profile } = useUserProfile(isLoggedIn);
  const { wallet } = useGetWallet(isLoggedIn);
  const router = useRouter();

  const logout = useCallback(() => {
    deleteCookie("token");
    deleteCookie("refreshToken");
    setIsLoggedIn(false);
    router.push(APP_ROUTES.LANDING);
  }, [router]);

  useEffect(() => {
    const token = getCookie("token");
    const refreshToken = getCookie("refreshToken");

    const checkAuth = async () => {
      if (!token && refreshToken) {
        try {
          const res = await httpService.post("Authentication/RefreshToken", {
            refreshToken: refreshToken,
          });

          if (res.data.success && res.data.data) {
            setCookie("token", res.data.data.token, {
              maxAge: preparegetExpierTimeToken(res.data.data.accessExpiresAt),
              path: APP_ROUTES.LANDING,
            });
            setCookie("refreshToken", res.data.data.refreshToken, {
              maxAge: preparegetExpierTimeToken(res.data.data.refreshExpiresAt),
              path: APP_ROUTES.LANDING,
            });
            login();
          } else {
            logout();
          }
        } catch {
          logout();
        }
      } else if (token) {
        login();
      }
      setIsLoading(false);
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = useMemo(
    () => ({
      user: isLoggedIn ? profile : null,
      isLoggedIn,
      isLoading,
      login,
      logout,
      wallet: isLoggedIn ? wallet : null,
    }),
    [isLoggedIn, isLoading, profile, wallet, logout]
  );

  return <UserContext value={contextValue}>{children}</UserContext>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser باید داخل UserProvider استفاده شود");
  }
  return context;
};
