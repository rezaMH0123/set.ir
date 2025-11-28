"use client";

import { likeProduct, disLikeProduct } from "@/core/apiCalls/dashboard";
import { Product } from "@/types/slider.type";
import { useUser } from "./UserContext";
import { mutate } from "swr";
import SWR_KEYS from "@/core/swrKeys";
import { useGetFavoriteProducts } from "@/core/swrHooks/dashboard";
import { createContext, useContext, useMemo } from "react";
import toast from "react-hot-toast";

type FavoriteContextType = {
  favorites: Product[];
  like: (id: string) => Promise<boolean>;
  dislike: (id: string) => Promise<boolean>;
  isLoading: boolean;
  favoritesSet: Record<string, boolean>;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export const FavoriteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoggedIn } = useUser();

  const { products: favorites, isLoading } = useGetFavoriteProducts(isLoggedIn);

  const favoritesSet = useMemo(() => {
    const hash: Record<string, boolean> = {};
    favorites?.forEach((item) => {
      hash[item.id] = true;
    });
    return hash;
  }, [favorites]);

  const like = async (id: string) => {
    if (isLoggedIn) {
      const res = await likeProduct(id);
      mutate(SWR_KEYS.favorites);
      return res;
    } else {
      toast.error(
        "برای افزودن محصول به علاقه‌مندی‌ها لازم است که ابتدا وارد شوید",
        { icon: <></> }
      );
      return false;
    }
  };

  const dislike = async (id: string) => {
    const res = await disLikeProduct(id);
    mutate(SWR_KEYS.favorites);
    return res;
  };

  return (
    <FavoriteContext.Provider
      value={{ favoritesSet, favorites, like, dislike, isLoading }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoriteContext);
  if (!ctx)
    throw new Error("useFavorites must be used within a FavoriteProvider");
  return ctx;
};
