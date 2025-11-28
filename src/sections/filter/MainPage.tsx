"use client";

import baseImages from "@/assets/images";
import ProductCard from "@/components/cards/ProductCard";
import EmptyState from "@/components/EmptyState";
import MobileModalPortal from "@/components/MobileModalPortal";
import { useFilter } from "@/context/FilterContext";
import FilterSidebar from "@/sections/filter/FilterSidebar";
import FilterSortBy from "@/sections/filter/FilterSortBy";
import { ProductFilterdData } from "@/types/slider.type";
import useIsClient from "@/utils/hooks/useIsClient";
import usePaginatedData from "@/utils/hooks/usePaginatedData";
import { ArrowDownWideNarrow, ListFilter, Loader2, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const mergeProducts = (
  prev: ProductFilterdData | undefined,
  next: ProductFilterdData,
  pageNumber: number
): ProductFilterdData => {
  const prevProducts = Array.isArray(prev?.products) ? prev.products : [];
  const nextProducts = Array.isArray(next?.products) ? next.products : [];

  if (pageNumber === 1 || !prev) return next;

  return {
    ...next,
    products: [...prevProducts, ...nextProducts],
  };
};

function FilterContent({
  accordionData,
}: {
  accordionData: {
    title: string;
    content: {
      id: string;
      label: string;
    }[];
  }[];
  initialGrades?: string;
  initialLessons?: string;
}) {
  const searchParams = useSearchParams();
  const { finalFilters, handleRemoveFilter, initFiltersFromURL } = useFilter();
  const isClient = useIsClient();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [modalSortOpen, setModalSortOpen] = useState(false);

  const { data, loading } = usePaginatedData<ProductFilterdData>({
    endpoint: "Product/SearchProductByFilters",
    queryParams: searchParams,
    pageSize: 8,
    mergeFunction: mergeProducts,
  });

  useEffect(() => {
    document.body.style.overflow = mobileFilterOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileFilterOpen]);

  useEffect(() => {
    initFiltersFromURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isClient) return null;

  return (
    <div
      dir="rtl"
      className="px- w-full px-4 md:px-[110px] pb-20 md:pt-16 flex md:gap-x-5
      justify-between max-w-[1600px] place-self-center"
    >
      <div className="h-full pb-16 sticky top-36 mt-4">
        <FilterSidebar isMobile={false} accordionData={accordionData} />
        <MobileModalPortal>
          <FilterSidebar
            isMobile={true}
            mobileFilterOpen={mobileFilterOpen}
            setMobileFilterOpen={setMobileFilterOpen}
            accordionData={accordionData}
          />
        </MobileModalPortal>
      </div>
      <div className="w-full md:w-[1048px]">
        <div className="">
          <div className="h-[50px] flex items-end justify-between pb-2 text-black2 border-b border-MediumGray">
            <FilterSortBy
              isMobile={false}
              modalSortOpen={modalSortOpen}
              setModalSortOpen={setModalSortOpen}
            />
            <MobileModalPortal>
              <FilterSortBy
                isMobile={true}
                modalSortOpen={modalSortOpen}
                setModalSortOpen={setModalSortOpen}
              />
            </MobileModalPortal>

            <div className="flex gap-x-2 md:hidden">
              <div
                onClick={() => setModalSortOpen(true)}
                className="flex justify-center items-center gap-x-1.5 px-4 py-1 border border-Gray-base300 rounded-2xl"
              >
                <ArrowDownWideNarrow className="stroke-Gray-base300 w-4 h-4" />
                مرتب سازی
              </div>
              <div
                onClick={() => setMobileFilterOpen(true)}
                className="flex justify-center items-center gap-x-1.5 px-4 py-1 border border-Gray-base300 rounded-2xl"
              >
                <ListFilter className="stroke-Gray-base300 w-4 h-4" />
                فیلتر
              </div>
            </div>

            <div className="">
              <span className="font-vazirFD">{data?.totalCount ?? "0"}</span>{" "}
              محصول
            </div>
          </div>

          <div className="mt-4 flex items-center gap-x-4 gap-y-3 flex-wrap">
            {finalFilters
              .filter((item) => !item.id.split("-").includes("title"))
              .map((item, index) => (
                <div
                  key={index}
                  className="w-fit text-sm rounded-2xl px-4 py-1 bg-blue1 text-white flex items-center justify-center gap-x-2"
                >
                  <X
                    onClick={() => handleRemoveFilter(item.id)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  {item.name}
                </div>
              ))}
          </div>
        </div>

        <div
          className="mt-5 grid gap-2 px-8 py-5 max-xl:px-4 justify-start
        max-md:px-2 grid-cols-[repeat(auto-fit,minmax(186px,1fr))]
        max-md:grid-cols-[repeat(auto-fit,minmax(160px,1fr))]"
        >
          {data?.products?.map((item, index) => (
            <ProductCard key={index} product={item} />
          ))}

          {loading && (
            <div className="col-span-full flex justify-center items-center py-5">
              <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
            </div>
          )}

          {!loading && (!data?.products || data.products.length === 0) && (
            <div className="col-span-full flex justify-center items-center py-10 text-gray-500 text-lg">
              <EmptyState
                imageSrc={baseImages.emptyFilter}
                title="اوه! اینجا که محتوایی پیدا نشد!"
                description="به نظر می‌رسه دنبال چیزی می‌گردید که نیست. با عبارت دیگه‌ای امتحان کنید یا فیلترها رو بررسی کنید."
                hasButton={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterContent;
