"use client";

import { translateWordToPersion } from "@/utils/helpers/translateWords";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";

interface FilterItem {
  id: string;
  label: string;
}

interface FilterContextProps {
  selectedFilters: FilterItem[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<FilterItem[]>>;
  selectSortBy: string | null;
  setSelectSortBy: React.Dispatch<React.SetStateAction<string | null>>;
  finalFilters: { id: string; name: string }[];
  handleRemoveFilter: (id: string) => void;
  initFiltersFromURL: () => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};

interface ProviderProps {
  children: ReactNode;
}

export const FilterProvider = ({ children }: ProviderProps) => {
  const [selectedFilters, setSelectedFilters] = useState<FilterItem[]>([]);
  const [selectSortBy, setSelectSortBy] = useState<string | null>(null);
  const [finalFilters, setFinalFilters] = useState<
    { id: string; name: string }[]
  >([]);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (selectedFilters.length === 0 && !selectSortBy) {
      setFinalFilters([]);
      return;
    }

    const newFinalFilters = [
      ...selectedFilters.map((filter) => ({
        id: filter.id,
        name: filter.label,
      })),
      ...(typeof window !== "undefined" &&
      window.innerWidth <= 768 &&
      selectSortBy
        ? [{ id: selectSortBy, name: translateWordToPersion(selectSortBy) }]
        : []),
    ];

    setFinalFilters(newFinalFilters);
  }, [selectedFilters, selectSortBy]);

  const initFiltersFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    const selectedFiltersFromURL: FilterItem[] = [];
    let sortByFromURL: string | null = null;

    params.forEach((value, key) => {
      if (typeof value !== "string") return;
      const lowerKey = key.toLowerCase();
      const lowerValue = value.toLowerCase();

      if (lowerKey === "sortorder") {
        sortByFromURL = lowerValue;
      } else if (lowerKey !== "title") {
        const id = `${lowerKey}-${lowerValue}`;
        const label = translateWordToPersion(id);
        selectedFiltersFromURL.push({ id: id.toLowerCase(), label });
      }
    });

    setSelectedFilters(selectedFiltersFromURL);

    if (sortByFromURL !== null) {
      setSelectSortBy(sortByFromURL);
    }
  };

  // 🔹 حذف فیلتر
  const handleRemoveFilter = (id?: string) => {
    const params = new URLSearchParams(window.location.search);

    if (!id || id === "all") {
      setSelectedFilters([]);
      setSelectSortBy(null);
      router.replace(pathname);
      return;
    }

    setSelectedFilters((prev) => prev.filter((f) => f.id !== id));

    const [targetKey, targetValue] = id.split("-");

    let actualKey: string | null = null;
    for (const key of params.keys()) {
      if (key.toLowerCase() === targetKey.toLowerCase()) {
        actualKey = key;
        break;
      }
    }

    if (actualKey) {
      const remainingValues = params
        .getAll(actualKey)
        .filter((v) => v.toLowerCase() !== targetValue.toLowerCase());

      params.delete(actualKey);

      remainingValues.forEach((v) =>
        params.append(actualKey.toLowerCase(), v.toLowerCase())
      );

      const newQuery = params.toString();
      router.replace(newQuery ? `${pathname}?${newQuery}` : pathname);
    }
  };

  return (
    <FilterContext.Provider
      value={{
        selectedFilters,
        setSelectedFilters,
        selectSortBy,
        setSelectSortBy,
        finalFilters,
        handleRemoveFilter,
        initFiltersFromURL,
      }}
    >
      <Suspense>
        <SuspensedChild initFiltersFromURL={initFiltersFromURL} />
      </Suspense>
      {children}
    </FilterContext.Provider>
  );
};

const SuspensedChild = ({
  initFiltersFromURL,
}: {
  initFiltersFromURL: () => void;
}) => {
  const searchParams = useSearchParams();
  useEffect(() => {
    initFiltersFromURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return null;
};
