"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpLeft,
  PackageOpen,
  Search,
  Shapes,
  X,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import httpService from "@/core/services/http-services";
import Link from "next/link";
import APP_ROUTES from "@/constants/paths";

type searchProduct = {
  id: string;
  name: string;
  thumbnailUrl: string;
  price: string;
  type: string;
};
type SearchBoxProps = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

const SearchBox: React.FC<SearchBoxProps> = ({
  value,
  onChange,
  onSubmit,
  className,
}) => {
  const [showResults, setShowResults] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    products: searchProduct[];
    grades: searchProduct[];
  } | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobileModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileModalOpen]);

  useEffect(() => {
    if (!value.trim()) {
      setSearchResults(null);
      return;
    } else {
      setShowResults(true);
    }

    const search = async () => {
      try {
        const res = await httpService.get(
          `Product/AutoCompleteSearch?searchTerm=${value}`
        );
        if (res.status === 200) {
          setSearchResults(res.data.data);
        }
      } catch {
        setSearchResults(null);
      }
    };
    const timeout = setTimeout(() => {
      search();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [value]);

  useEffect(() => {
    setIsMobileModalOpen(false);
    setShowResults(false);
    if (pathname !== APP_ROUTES.FILTER) {
      onChange("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    onSubmit();
    setShowResults(false);
    setIsMobileModalOpen(false);
  };

  const handleInputFocus = () => {
    if (isMobile) {
      setIsMobileModalOpen(true);
      setShowResults(true);
    }
  };
  const handleInputChange = (value: string) => {
    onChange(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim() === "") {
      params.delete("Title");
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  };

  const handleClearSearchBox = () => {
    onChange("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("Title");
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  const createLinkWithTitle = (title: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("Title", title);
    return `${APP_ROUTES.FILTER}?${currentParams.toString()}`;
  };

  const handleClearSearch = () => {
    onChange("");
    setIsMobileModalOpen(false);
  };
  return (
    <div className={`relative z-50 ${className}`}>
      {!isMobileModalOpen && (
        <form className="relative z-50" onSubmit={handleSubmit}>
          <input
            type="text"
            dir="rtl"
            placeholder="جستجو..."
            value={value}
            onFocus={handleInputFocus}
            onClick={() => setShowResults(true)}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full pr-4 pl-10 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none"
          />
          {value ? (
            <X
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={handleClearSearchBox}
            />
          ) : (
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={handleSubmit}
            />
          )}
        </form>
      )}
      {!isMobile && showResults && (
        <div
          className="bg-black/50 fixed left-0 top-0 w-full h-full"
          onClick={() => {
            setShowResults(false);
          }}
        ></div>
      )}
      <AnimatePresence>
        {!isMobile && showResults && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
            dir="rtl"
            className="absolute w-full text-right bg-white border border-gray-300 rounded-md mt-1 p-3 shadow-card3 overflow-hidden z-50"
          >
            <p
              onClick={handleSubmit}
              className="text-sm text-neutral-600 flex w-fit cursor-pointer items-center gap-x-2"
            >
              {value ? (
                <>
                  <Search className="text-neutral-600 rotate-90 cursor-pointer w-5 h-5 ml-2" />
                  جستجو
                  <span className="text-neutral-400">{`«${value}»`}</span>
                </>
              ) : (
                "عبارت مورد نظر خود را جستجو کنید"
              )}
            </p>
            <div className="max-h-[500px] overflow-scroll px-3 ">
              {searchResults && searchResults.products.length > 0 && (
                <>
                  <span className="text-neutral-400 flex items-center gap-x-2 mt-6">
                    <PackageOpen className="w-4 h-4 stroke-neutral-500" />
                    محصولات
                  </span>
                  <div className="mt-5  space-y-8">
                    {searchResults!.products.map((item, index) => (
                      <Link
                        aria-label="APP_ROUTES.productDetails"
                        key={index}
                        href={APP_ROUTES.productDetails(item.id)}
                        className="flex justify-between items-center"
                      >
                        <span className="text-Neutral-base-500">
                          {item.name}
                        </span>
                        <ArrowUpLeft className="min-w-6 min-h-6" />
                      </Link>
                    ))}
                  </div>
                </>
              )}
              {searchResults && searchResults.grades?.length > 0 && (
                <>
                  <span className="text-neutral-400 flex items-center gap-x-2 mt-6">
                    <Shapes className="w-4 h-4 stroke-neutral-500" />
                    دسته بندی ها
                  </span>
                  <div className="mt-5 space-y-8 ">
                    {searchResults.grades.map((item, index) => (
                      <Link
                        aria-label="createLinkWithTitle"
                        key={index}
                        href={createLinkWithTitle(item.name)}
                        className="flex justify-between items-center"
                      >
                        <span className="text-Neutral-base-500">
                          {item.name}
                        </span>
                        <ArrowUpLeft className="min-w-6 min-h-6" />
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobile && isMobileModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 p-4 "
            onClick={() => {
              setIsMobileModalOpen(false);
            }}
          >
            <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
              <div className="relative bg-white rounded-xl p-2">
                <ArrowRight
                  className="text-MediumGray absolute top-1/2 -translate-y-1/2 right-4"
                  onClick={() => {
                    setIsMobileModalOpen(false);
                    onChange("");
                  }}
                />
                <input
                  type="text"
                  dir="rtl"
                  placeholder="جستجو..."
                  value={value}
                  onChange={(e) => handleInputChange(e.target.value)}
                  autoFocus
                  className="w-full pr-10  pl-10 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none"
                />
                {value ? (
                  <X
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                    onClick={handleClearSearchBox}
                  />
                ) : (
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                    onClick={handleSubmit}
                  />
                )}
              </div>
            </form>

            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.25 }}
                dir="rtl"
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col items-center max-h-4/5 overflow-scroll text-right bg-white mt-4 p-3 rounded-xl"
              >
                <p
                  onClick={handleSubmit}
                  className="place-self-start cursor-pointer text-sm text-neutral-600 flex w-fit gap-x-2"
                >
                  {value ? (
                    <>
                      <Search className="text-neutral-600 w-5 h-5 ml-2 rotate-90" />
                      جستجو
                      <span className="text-neutral-400">{`«${value}»`}</span>
                    </>
                  ) : (
                    "عبارت مورد نظر خود را جستجو کنید"
                  )}
                </p>
                <div className="px-3">
                  {searchResults && searchResults.products.length > 0 && (
                    <>
                      <span className="text-neutral-400 flex items-center gap-x-2 mt-6">
                        <PackageOpen className="w-4 h-4 stroke-neutral-500" />
                        محصولات
                      </span>
                      <div className="mt-5  space-y-8">
                        {searchResults?.products.map((item, index) => (
                          <Link
                            aria-label="handleClearSearch"
                            onClick={handleClearSearch}
                            key={index}
                            href={APP_ROUTES.productDetails(item.id)}
                            className="flex justify-between items-center"
                          >
                            <span className="text-Neutral-base-500">
                              {item.name}
                            </span>
                            <ArrowUpLeft className="min-w-6 min-h-6" />
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                  {searchResults && searchResults.grades?.length > 0 && (
                    <>
                      <span className="text-neutral-400 flex items-center gap-x-2 mt-6">
                        <Shapes className="w-4 h-4 stroke-neutral-500" />
                        دسته بندی ها
                      </span>
                      <div className="mt-5 space-y-8 ">
                        {searchResults.grades.map((item, index) => (
                          <Link
                            aria-label="APP_ROUTES.FILTER"
                            onClick={handleClearSearch}
                            key={index}
                            href={APP_ROUTES.FILTER}
                            className="flex justify-between items-center"
                          >
                            <span className="text-Neutral-base-500">
                              {item.name}
                            </span>
                            <ArrowUpLeft className="min-w-6 min-h-6" />
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBox;
