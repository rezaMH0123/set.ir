"use client";

import Accordion from "@/components/Accordion";
import CheckboxList from "@/components/CheckboxList";
import { AnimatePresence, motion } from "framer-motion";
import { ListFilter, X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useFilter } from "@/context/FilterContext";

type ContentItem = {
  id: string;
  label: string;
};

type filterSidebarProps = {
  isMobile: boolean;
  mobileFilterOpen?: boolean;
  setMobileFilterOpen?: (val: boolean) => void;
  accordionData: { title: string; content: ContentItem[] }[];
};

export default function FilterSidebar({
  isMobile,
  mobileFilterOpen,
  setMobileFilterOpen,
  accordionData,
}: filterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { selectedFilters, setSelectedFilters } = useFilter();

  const [tempSelectedFilters, setTempSelectedFilters] =
    useState(selectedFilters);

  const [searchedItem, setSearchedItem] = useState<Record<string, string>>({});

  useEffect(() => {
    setTempSelectedFilters(selectedFilters);
  }, [selectedFilters]);

  const applyFiltersToUrl = () => {
    setSelectedFilters(tempSelectedFilters);

    const params = new URLSearchParams(searchParams.toString());

    accordionData.forEach((section) => {
      section.content.forEach((item) => {
        const [key] = item.id.split("-");
        params.delete(key);
      });
    });

    tempSelectedFilters.forEach((item) => {
      const [key, value] = item.id.split("-");
      if (key && value) {
        params.append(key, value);
      }
    });

    router.push(`?${params.toString()}`);
    setMobileFilterOpen?.(false);
  };

  const deleteAllFilter = () => {
    setTempSelectedFilters([]);
    setSelectedFilters([]);
    router.push("/filter");
  };

  const handleTempCheckboxChange = (id: string, label: string) => {
    const normalizedId = id.toLowerCase();

    let newFilters: { id: string; label: string }[] = [];

    if (
      tempSelectedFilters.some((item) => item.id.toLowerCase() === normalizedId)
    ) {
      newFilters = tempSelectedFilters.filter(
        (item) => item.id.toLowerCase() !== normalizedId
      );
    } else {
      newFilters = [...tempSelectedFilters, { id: normalizedId, label }];
    }

    setTempSelectedFilters(newFilters);

    // فقط برای دسکتاپ: اعمال فوری
    if (!isMobile) {
      setSelectedFilters(newFilters);

      const params = new URLSearchParams(searchParams.toString());

      // همه‌ی فیلترهای قبلی رو پاک کن (بدون توجه به حروف)
      accordionData.forEach((section) => {
        section.content.forEach((item) => {
          const [key] = item.id.split("-");
          if (key) {
            // حذف همه‌ی key هایی که با ignoreCase برابر هستن
            for (const k of Array.from(params.keys())) {
              if (k.toLowerCase() === key.toLowerCase()) {
                params.delete(k);
              }
            }
          }
        });
      });

      // فیلترهای جدید رو اضافه کن (به صورت lowercase)
      newFilters.forEach((item) => {
        const [key, value] = item.id.split("-");
        if (key && value) {
          params.append(key.toLowerCase(), value.toLowerCase());
        }
      });

      router.push(`?${params.toString()}`);
    }
  };

  if (isMobile) {
    return (
      <AnimatePresence initial={false}>
        {mobileFilterOpen && (
          <div dir="rtl">
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileFilterOpen?.(false)}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl px-4 pb-16 overflow-y-auto no-scrollbar"
              initial={{ height: 0 }}
              animate={{ height: "80vh" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="sticky top-0 bg-white z-10 py-4 flex justify-center">
                <div className="w-[200px] h-11 shadow-card1 flex justify-center items-center rounded-xl gap-x-2">
                  فیلتر ها
                  <ListFilter className="stroke-black1 w-5 h-5" />
                </div>
              </div>
              <Accordion
                withCloseAll={false}
                className="shadow-none"
                insideEachDrowpDownClassName="bg-white text-sm px-4"
                items={accordionData}
                renderContent={(content, title) => (
                  <>
                    {title && content.length > 12 && (
                      <div className="relative my-1">
                        <input
                          placeholder={"جستجو در " + title}
                          className={`w-full h-11 shadow-[0_0px_4px_0_rgba(0,0,0,0.25)] rounded-lg bg-[#F6F6F6] pr-4 focus:outline-0`}
                          onChange={(e) =>
                            setSearchedItem((si) => {
                              return { ...si, [title ?? ""]: e.target.value };
                            })
                          }
                          value={searchedItem[title ?? ""] ?? ""}
                        />
                        <X
                          className="absolute left-2 h-4 w-4 top-3.5 z-50 cursor-pointer opacity-80"
                          onClick={() => {
                            setSearchedItem((si) => {
                              return { ...si, [title ?? ""]: "" };
                            });
                          }}
                        />
                      </div>
                    )}
                    <CheckboxList
                      content={
                        searchedItem[title ?? ""]
                          ? content.filter((c) =>
                              c.label.includes(searchedItem[title ?? ""])
                            )
                          : content
                      }
                      selectedFilters={tempSelectedFilters}
                      handleCheckboxChange={handleTempCheckboxChange}
                    />
                  </>
                )}
              />
              <div className="w-full bg-white flex justify-center pb-2 fixed bottom-0 left-0 z-60">
                <motion.button
                  onClick={applyFiltersToUrl}
                  className="w-10/12 bg-blue1 text-white py-2 rounded-xl z-60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  اعمال فیلتر
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <div className="w-[318px] min-h-[340px] max-h-[480px] md:flex flex-col items-center shadow-card1 rounded-xl relative px-2 hidden">
      <div className="overflow-y-auto no-scrollbar py-4 px-1 w-full h-full">
        <div
          onClick={deleteAllFilter}
          className="shadow-card2 w-[254px] py-2 rounded-lg flex justify-center items-center gap-x-1 mb-4 mt-3 cursor-pointer mx-auto"
        >
          {selectedFilters?.length > 0 ? (
            <>
              <X className="stroke-black1 w-5 h-5" />
              حذف فیلتر ها
            </>
          ) : (
            "فیلتر ها"
          )}
        </div>
        <div className="w-[226px] mx-auto">
          <Accordion
            withCloseAll={false}
            className="shadow-none"
            insideEachDrowpDownClassName="bg-white text-sm px-4"
            items={accordionData}
            renderContent={(content, title) => {
              return (
                <>
                  {title && content.length > 12 && (
                    <div className="relative my-1">
                      <input
                        placeholder={"جستجو در " + title}
                        className={`w-full h-11 shadow-[0_0px_4px_0_rgba(0,0,0,0.25)] rounded-lg bg-[#F6F6F6] pr-4 focus:outline-0`}
                        onChange={(e) =>
                          setSearchedItem((si) => {
                            return { ...si, [title ?? ""]: e.target.value };
                          })
                        }
                        value={searchedItem[title ?? ""] ?? ""}
                      />
                      {searchedItem[title ?? ""] && (
                        <X
                          className="absolute left-2 h-4 w-4 top-3.5 z-50 cursor-pointer opacity-80"
                          onClick={() => {
                            setSearchedItem((si) => {
                              return { ...si, [title ?? ""]: "" };
                            });
                          }}
                        />
                      )}
                    </div>
                  )}

                  <CheckboxList
                    content={
                      searchedItem[title ?? ""]
                        ? content.filter((c) =>
                            c.label.includes(searchedItem[title ?? ""])
                          )
                        : content
                    }
                    selectedFilters={tempSelectedFilters}
                    handleCheckboxChange={handleTempCheckboxChange}
                  />
                </>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
