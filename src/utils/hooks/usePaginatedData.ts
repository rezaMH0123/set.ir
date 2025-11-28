import httpService from "@/core/services/http-services";
import { useEffect, useState } from "react";
import { useInfiniteScroll } from "./useinfiniteScroll";

type UsePaginatedDataProps<T> = {
  endpoint: string;
  queryParams: URLSearchParams;
  pageSize?: number;
  mergeFunction?: (
    prevData: T | undefined,
    newData: T,
    pageNumber: number
  ) => T;
};

export default function usePaginatedData<T>({
  endpoint,
  queryParams,
  pageSize = 8,
  mergeFunction,
}: UsePaginatedDataProps<T>) {
  const [data, setData] = useState<T | undefined>();
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null); // ✅ خطا
  const [, setRefetchIndex] = useState(0);

  const loadMoreData = async () => {
    // جلوگیری از درخواست اضافه
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const nextPage = pageNumber;
      const url = `${endpoint}?${queryParams.toString()}&PageNumber=${nextPage}&PageSize=${pageSize}`;

      const res = await httpService.get(url);

      // اگر پاسخ نامعتبر یا غیر از 200 بود
      if (!res || res.status !== 200) {
        console.warn("Unexpected response status:", res?.status);
        setHasMore(false); // ✅ متوقف شو تا حلقه ادامه نداشته باشد
        setError(`Unexpected response: ${res?.status}`);
        return;
      }

      const newData = res.data;

      setData((prev) => {
        if (mergeFunction) return mergeFunction(prev, newData, nextPage);
        return nextPage === 1 || !prev ? newData : prev;
      });

      const totalPages = newData.totalPages ?? 0;
      if (totalPages === 0 || nextPage >= totalPages) {
        setHasMore(false); // ✅ در آخرین صفحه متوقف شو
      }

      setPageNumber((prev) => prev + 1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Pagination error:", err);
      setError(err?.message || "خطا در دریافت داده‌ها");
      setHasMore(false); // ✅ در صورت خطا متوقف شو
    } finally {
      setLoading(false);
    }
  };

  // فراخوانی بینهایت اسکرول
  useInfiniteScroll(loadMoreData, loading, hasMore);

  // ریست هنگام تغییر queryParams
  useEffect(() => {
    setData(undefined);
    setHasMore(true);
    setPageNumber(1);
    setError(null);
    setRefetchIndex((prev) => prev + 1);
  }, [queryParams.toString()]);

  return { data, loading, hasMore, error };
}
