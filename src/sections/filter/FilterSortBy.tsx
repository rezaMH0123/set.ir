import RadioBoxList from "@/components/RadioBoxList";
import { useFilter } from "@/context/FilterContext";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpNarrowWide, ListFilter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type FilterSortByProps = {
  isMobile: boolean;
  modalSortOpen?: boolean;
  setModalSortOpen?: (val: boolean) => void;
};

export default function FilterSortBy({
  isMobile,
  modalSortOpen,
  setModalSortOpen,
}: FilterSortByProps) {
  const { selectSortBy, setSelectSortBy } = useFilter();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortingContent = [
    { label: "بیشترین تخفیف", id: "MostDiscount" },
    { label: "گران ترین ها", id: "MostExpensive" },
    { label: "ارزان ترین ها", id: "MostCheap" },
  ];

  const [tempSelectSortBy, setTempSelectSortBy] = useState<string | null>(
    selectSortBy
  );

  useEffect(() => {
    const sortOrderFromURL = searchParams.get("SortOrder");
    if (sortOrderFromURL) {
      setTempSelectSortBy(sortOrderFromURL);
    } else {
      setTempSelectSortBy(null);
    }
  }, [searchParams]);

  const handleRadioChange = (id: string | null) => {
    setTempSelectSortBy(id);
  };

  const applyFilters = (id: string | null = null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (isMobile && modalSortOpen) {
      const newSort = tempSelectSortBy;

      if (newSort) {
        params.set("SortOrder", newSort);
      } else {
        params.delete("SortOrder");
      }

      router.push(`?${params.toString()}`);
      setSelectSortBy(newSort);
      setModalSortOpen?.(false);
    } else {
      const newSort = tempSelectSortBy === id ? null : id;

      if (newSort) {
        params.set("SortOrder", newSort);
      } else {
        params.delete("SortOrder");
      }

      router.push(`?${params.toString()}`);
      setSelectSortBy(newSort);
      setTempSelectSortBy(newSort);
    }
  };

  if (isMobile) {
    return (
      <AnimatePresence initial={false}>
        {modalSortOpen && (
          <div dir="rtl">
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setModalSortOpen?.(false)}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl px-8 pb-16 overflow-y-auto no-scrollbar"
              initial={{ height: 0 }}
              animate={{ height: "70vh" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="sticky top-0 bg-white z-10 py-4 flex justify-center">
                <div className="w-[200px] h-11 shadow-card1 flex justify-center items-center rounded-xl gap-x-2">
                  مرتب سازی
                  <ListFilter className="stroke-black1 w-5 h-5" />
                </div>
              </div>
              <RadioBoxList
                content={sortingContent}
                selectedFilter={tempSelectSortBy}
                handleRadioChange={(id) => {
                  handleRadioChange(id);
                  const params = new URLSearchParams(searchParams.toString());

                  if (typeof id === "string") {
                    params.set("SortOrder", id);
                  } else {
                    params.delete("SortOrder");
                  }

                  const queryString = params.toString();
                  router.push(`?${queryString}`);
                  setSelectSortBy(id);
                  setModalSortOpen?.(false);
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }
  return (
    <div className="hidden md:flex items-end gap-x-5">
      <div className="flex items-end gap-x-1">
        <ArrowUpNarrowWide />
        <span className="text-lg block font-bold">مرتب سازی</span>
      </div>
      <ul className="flex gap-x-5">
        {sortingContent.map((item) => (
          <li
            key={item.id}
            className={`cursor-pointer relative after:content-[''] after:absolute after:left-0 
          after:right-0 after:-bottom-2 after:h-[2px] 
          after:transition-transform after:duration-300 
          after:origin-left
          ${
            tempSelectSortBy === item.id
              ? "after:bg-blue1 after:scale-x-100"
              : "after:bg-transparent after:scale-x-0 hover:after:scale-x-100 hover:after:bg-blue-500"
          }
          `}
            onClick={() => applyFilters(item.id)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
