import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import closeIcon from "@/assets/icons/close.svg";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import ProductSliderContainer from "./ProductSliderContainer";
import BACKEND_ROUTES from "@/core/configs";

interface FilterSliderProps {
  title: string;
  filters: string[];
  image: StaticImport | null;
}

const FilterSlider: React.FC<FilterSliderProps> = ({
  title,
  //filters,
  image,
}) => {
  // const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // const toggleFilter = (filter: string) => {
  //   setActiveFilters((prev) =>
  //     prev.includes(filter)
  //       ? prev.filter((f) => f !== filter)
  //       : [filter, ...prev]
  //   );
  // };

  return (
    <div
      dir="rtl"
      className="w-full h-fit relative my-8 min-sm:px-1 place-self-center min-sm:rounded-[20px] bg-gradient-to-bl from-[#E463A2] from-20% via-[#2437e6] to-100% to-[#072a57]"
    >
      {image && (
        <Image
          className="absolute max-md:hidden -top-[70px] left-6"
          src={image}
          alt="تصویر تخفیف‌های ویژه و محصولات پربازدید"
          title="تخفیف‌های شگفت‌انگیز و محصولات پیشنهادی"
          width={200}
          height={200}
        />
      )}
      <div className="mx-auto text-white font-bold text-2xl max-sm:text-xl pt-6 px-10">
        {title}
      </div>
      {/* <div className="flex overflow-auto text-base max-sm:text-xs h-fit items-center mt-2 gap-2 px-4 max-sm:px-3">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => toggleFilter(filter)}
            className={`min-w-fit px-4 py-2 flex justify-center rounded-full max-sm:mb-1 text-white cursor-pointer ${
              activeFilters.includes(filter)
                ? "bg-[#ffffff24]"
                : "bg-[#00000024]"
            }`}
          >
            {activeFilters.includes(filter) && (
              <Image
                className="ml-2"
                src={closeIcon}
                width={14}
                height={14}
                alt="close"
              />
            )}
            <span
              className={` ${
                activeFilters.includes(filter) ? "font-semibold" : "font-normal"
              }`}
            >
              {filter}
            </span>
          </button>
        ))}
      </div> */}
      <ProductSliderContainer
        apiAddress={`${BACKEND_ROUTES.PRODUCTS_SEARCH_BY_FILTER}?SortOrder=MostDiscount&PageNumber=1&PageSize=16`}
        filterString="?SortOrder=MostDiscount&PageNumber=1&PageSize=16"
      />
    </div>
  );
};

export default FilterSlider;
