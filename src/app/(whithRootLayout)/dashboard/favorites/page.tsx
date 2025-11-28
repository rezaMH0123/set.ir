"use client";

import React from "react";
import ProductSkeletonCard from "@/components/cards/ProductSkeletonCard";
import ProductCard from "@/components/cards/ProductCard";
import EmptyContentDLayout from "@/components/EmptyContentDLayout";
import baseImages from "@/assets/images";
import { useFavorites } from "@/context/FavoritesContext";

export default function FavoritesPage() {
  const { favorites, isLoading } = useFavorites();

  if (isLoading) {
    return (
      <div className="grid gap-2 px-8 py-5 max-xl:px-4 max-md:px-2 grid-cols-[repeat(auto-fit,minmax(186px,1fr))] max-md:grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="py-[6px] flex justify-center items-start">
            <ProductSkeletonCard />
          </div>
        ))}
      </div>
    );
  }

  if (!isLoading && favorites.length === 0) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <EmptyContentDLayout
          className="flex flex-col items-center"
          srcImg={baseImages.emptyFavoritesImage}
          title="لیست علاقه مندی شما خالیه"
        />
      </div>
    );
  }

  return (
    <div className="grid gap-2 px-8 py-5 max-xl:px-4 justify-start max-md:px-2 grid-cols-[repeat(auto-fit,minmax(186px,1fr))] max-md:grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
      {favorites.map((product) => (
        <div
          key={product.id}
          className="py-[6px] flex justify-center items-start"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
