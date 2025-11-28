import { useEffect, useRef } from "react";

export const useInfiniteScroll = (
  loadMore: () => Promise<void>,
  loading: boolean,
  hasMore: boolean
) => {
  const isFetching = useRef(false);

  const checkScroll = async () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    const offset = 200;

    if (
      scrollTop + windowHeight + offset >= fullHeight &&
      !loading &&
      hasMore &&
      !isFetching.current
    ) {
      isFetching.current = true;
      try {
        await loadMore();
      } finally {
        isFetching.current = false;
      }
    }
  };

  useEffect(() => {
    const handle = () => checkScroll();
    window.addEventListener("scroll", handle);
    window.addEventListener("resize", handle);
    handle();
    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMore, loading, hasMore]);
};
