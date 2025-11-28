"use client";

import { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { Entity, ProductData, UserViewData } from "@/types/userTracker";

export function useUserViewTracker(productData?: ProductData) {
  const { user, isLoggedIn, isLoading } = useUser();

  useEffect(() => {
    if (isLoading) return;
    if (!productData) return;

    const storageKey =
      isLoggedIn && user?.id ? `userViewData_${user.id}` : `userViewData_guest`;

    const now = new Date().toISOString();

    let storedData: UserViewData = {
      viewedProducts: [],
      categoriesStats: [],
      gradesStats: [],
      majorsStats: [],
    };

    try {
      const localData = localStorage.getItem(storageKey);
      if (localData) {
        storedData = { ...storedData, ...JSON.parse(localData) };
      }
    } catch (e) {
      console.error("خطا در خواندن localStorage:", e);
    }

    // --- 1. ثبت محصول ---
    const existingProductIndex = storedData.viewedProducts.findIndex(
      (p) => p.id === productData.id
    );

    let isNewProduct = false;

    if (existingProductIndex === -1) {
      storedData.viewedProducts.push({
        id: productData.id,
        name: productData.name,
        viewedAt: now,
        categories: productData.categories || [],
        majors: productData.majors || [],
        lessons: productData.lessons || [],
        type: productData.type || "Unknown",
      });
      isNewProduct = true;
    } else {
      storedData.viewedProducts[existingProductIndex] = {
        ...storedData.viewedProducts[existingProductIndex],
        viewedAt: now,
        categories: productData.categories || [],
        majors: productData.majors || [],
        lessons: productData.lessons || [],
        type: productData.type || "Unknown",
      };
    }

    // --- 2. تابع برای بروزرسانی آمار ---
    const updateStats = (
      key: "categoriesStats" | "gradesStats" | "majorsStats",
      items: Entity[]
    ) => {
      items.forEach((item) => {
        const itemId = item.id.toString(); // ✅ تبدیل id به string
        const existing = storedData[key].find((i) => i.id === itemId);
        if (existing) {
          if (isNewProduct) existing.score += 1;
        } else {
          storedData[key].push({ ...item, id: itemId, score: 1 });
        }
      });
    };

    updateStats("categoriesStats", productData.categories || []);
    updateStats("gradesStats", productData.grades || []);
    updateStats("majorsStats", productData.majors || []);

    try {
      localStorage.setItem(storageKey, JSON.stringify(storedData));
    } catch (e) {
      console.error("خطا در ذخیره localStorage:", e);
    }
  }, [productData, user, isLoggedIn, isLoading]);
}
