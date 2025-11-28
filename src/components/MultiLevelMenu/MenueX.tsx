"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Category } from "@/types/menu";
import APP_ROUTES from "@/constants/paths";
import { translateWordToPersion } from "@/utils/helpers/translateWords";
import { useFilter } from "@/context/FilterContext";
import { handleCategoryClick } from "@/utils/helpers/handleCategoryClick";

type MenueXProps = {
  categories: Category;
};

type Item = { id: string; label: string };

export function convertTmpFiltersToCategoriesSlug(items: Item[]): string {
  const grade = items.find((i) => i.id.startsWith("grades-"));
  const lesson = items.find((i) => i.id.startsWith("lessons-"));
  const parts: string[] = [];
  if (grade) parts.push(grade.id);
  if (lesson) parts.push(lesson.id);
  return parts.join("/");
}

export default function MenueX({ categories }: MenueXProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [firstSelected, setFirstSelected] = useState(
    categories.children?.[0].id ?? ""
  );
  const [middleLayerselected, setMiddleLayerSelected] = useState("0");
  const { setSelectedFilters } = useFilter();

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  const hasMiddleLayer = useMemo(() => {
    const first = (categories.children as Category[])?.find(
      (item) => item.id === firstSelected
    );
    return !!first?.children?.[0]?.children?.length;
  }, [firstSelected, categories]);

  const lastLayer = useMemo(() => {
    const firstNode = (categories.children as Category[]).find(
      (item) => item.id === firstSelected
    );

    if (!firstNode) return [];

    if (hasMiddleLayer) {
      const middleNode = firstNode.children?.find(
        (item) => item.id === middleLayerselected
      );
      return middleNode?.children ?? [];
    } else {
      return firstNode.children ?? [];
    }
  }, [firstSelected, middleLayerselected, hasMiddleLayer, categories]);

  useEffect(() => {
    if (hasMiddleLayer) {
      setMiddleLayerSelected(
        categories.children?.find((item, index) =>
          firstSelected ? item.id === firstSelected : index === 0
        )?.children?.[0].id ?? ""
      );
    }
  }, [categories, firstSelected, hasMiddleLayer]);

  useEffect(() => {
    if (menuOpen) {
      setFirstSelected(categories.children?.[0].id ?? "");
    }
  }, [categories, menuOpen]);

  useEffect(() => {
    console.log("here");
  }, []);
  return (
    <div
      dir="rtl"
      onMouseLeave={() => {
        if (!isMobile) setMenuOpen(false);
      }}
      className="relative bg-white h-full text-Neutral-base-500"
    >
      <span
        className={`cursor-pointer font-bold inline-block transition-all w-26 duration-100 content-center hover:text-blue1 h-full text-center ${
          menuOpen ? "bg-Primary-50" : ""
        }`}
        onMouseEnter={() => {
          if (!isMobile) setMenuOpen(true);
        }}
        onClick={(e) => {
          if (isMobile) {
            e.preventDefault();
            setMenuOpen((prev) => !prev);
          }
        }}
      >
        <Link href={`${APP_ROUTES.FILTER}?categories=${categories.id}`}>
          {translateWordToPersion(`categories-${categories.id}`) ||
            categories.name}
        </Link>
      </span>

      {categories.children && menuOpen && (
        <div className="absolute right-0 z-30 transition-all duration-300 opacity-100 visible">
          <div className="bg-white h-72 w-max rounded-b-xl [box-shadow:0px_4px_4px_0px_#00000055] flex row overflow-hidden">
            {/* First Layer */}
            <div className="flex flex-col h-full bg-Primary-50">
              {categories.children.map((child) => (
                <div
                  key={child.id}
                  className={`cursor-pointer w-26 pr-3 h-12 text-right flex justify-between items-center font-bold ${
                    firstSelected === child.id
                      ? hasMiddleLayer
                        ? "bg-Bright1 text-blue1"
                        : "text-blue1 bg-white"
                      : "text-Neutral-base-500"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setFirstSelected(child.id);
                    handleCategoryClick({
                      threadId: child.threadId,
                      categories,
                      goToCategory: false,
                      setSelectedFilters,
                      router,
                    });
                  }}
                  onMouseEnter={() => {
                    if (!isMobile) setFirstSelected(child.id);
                  }}
                >
                  <div
                    className={`px-2 border-r-2 ${
                      firstSelected === child.id ? "" : "border-transparent"
                    }`}
                  >
                    {child.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Middle Layer */}
            <div className="flex flex-col h-full bg-Bright1">
              {hasMiddleLayer &&
                (categories.children as Category[])
                  .find((item) => item.id === firstSelected)
                  ?.children?.map((child) => (
                    <div
                      key={child.id}
                      className={`cursor-pointer pr-3 pl-4 h-12 text-right flex items-center font-bold w-max ${
                        middleLayerselected === child.id
                          ? "text-blue1"
                          : "text-Neutral-base-500"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setMiddleLayerSelected(child.id);
                        handleCategoryClick({
                          threadId: child.threadId,
                          categories,
                          goToCategory: false,
                          setSelectedFilters,
                          router,
                        });
                      }}
                      onMouseEnter={() => {
                        setMiddleLayerSelected(child.id);
                      }}
                    >
                      <div
                        className={`px-2 border-r-2 ${
                          middleLayerselected === child.id
                            ? ""
                            : "border-transparent"
                        }`}
                      >
                        {child.name}
                      </div>
                    </div>
                  ))}
            </div>

            {/* Final Layer */}
            <div className="flex flex-col items-center h-full flex-wrap font-base">
              {lastLayer?.map((child) => (
                <div
                  key={child.id}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick({
                      threadId: child.threadId,
                      categories,
                      goToCategory: true,
                      setSelectedFilters,
                      router,
                    });
                  }}
                  className="text-Neutral-base-500 px-6 h-12 text-right flex items-center w-max flex-wrap cursor-pointer p-2 hover:text-blue1"
                >
                  {child.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
