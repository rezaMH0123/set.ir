"use client";

import { useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";

export interface PaginationResponse<T> {
  items: T[];
  totalCount: number;
  totalPages: number;
  averageRating?: number;
  totalComments?: number;
}

type FetcherFunction<T> = (
  index: number,
  perPage: number
) => Promise<PaginationResponse<T>>;

type WithPaginationProps<T> = {
  keyPrefix: string;
  fetcher: FetcherFunction<T>;
  itemComponent: React.FC<{ item: T; index: number }>;
  perPage?: number;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  wrapUpComponent?: React.ReactNode;
  notFoundComponent?: React.ReactNode;
  loadingMoreText?: React.ReactNode;
  wrapperClassName?: string;
  onFirstPageLoaded?: (meta: {
    averageRating: number;
    totalComments: number;
  }) => void;
};

function WithPagination<T>({
  keyPrefix,
  fetcher,
  itemComponent: ItemComponent,
  perPage = 8,
  containerProps = {},
  wrapUpComponent,
  notFoundComponent,
  loadingMoreText,
  wrapperClassName,
  onFirstPageLoaded,
}: WithPaginationProps<T>) {
  const getKey = (
    pageIndex: number,
    previousPageData: PaginationResponse<T> | null
  ) => {
    if (previousPageData && previousPageData.items.length === 0) return null;
    return [pageIndex, perPage, keyPrefix];
  };

  const { data, size, setSize, isLoading, isValidating, error } =
    useSWRInfinite(getKey, ([pageIndex, perPage]: [number, number]) =>
      fetcher(pageIndex, perPage)
    );

  const allItems = data?.flatMap((page) => page.items) ?? [];
  const totalPages = data?.[0]?.totalPages ?? 1;

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const loadMore = useCallback(() => {
    if (size < totalPages) {
      setSize(size + 1);
    }
  }, [size, totalPages, setSize]);

  useEffect(() => {
    if (inView && !isLoading && !isValidating && size < totalPages) {
      loadMore();
    }
  }, [inView, isLoading, isValidating, size, totalPages, loadMore]);

  useEffect(() => {
    if (data?.[0] && onFirstPageLoaded) {
      const { averageRating = 0, totalComments = 0 } = data[0];
      onFirstPageLoaded({ averageRating, totalComments });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (error) return <div className="text-red-500">Error fetching data</div>;

  if (!data)
    return (
      <div className="text-gray-500">
        {loadingMoreText ?? "در حال بارگذاری بیشتر..."}
      </div>
    );

  if (allItems.length === 0)
    return <>{notFoundComponent ?? <div>No items found.</div>}</>;

  return (
    <>
      {allItems.length > 0 ? (
        <div className={wrapperClassName} {...containerProps}>
          {allItems.map((item, index) => (
            <ItemComponent key={index} item={item} index={index} />
          ))}
        </div>
      ) : (
        notFoundComponent
      )}

      <div ref={ref} className="text-center mt-4 mb-10">
        {size < totalPages && (
          <div className="text-gray-500">
            {loadingMoreText ?? "در حال بارگذاری بیشتر..."}
          </div>
        )}
        {size === totalPages && wrapUpComponent && (
          <div className="mt-4">{wrapUpComponent}</div>
        )}
      </div>
    </>
  );
}

export default WithPagination;
