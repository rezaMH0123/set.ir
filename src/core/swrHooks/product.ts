import { useParams } from "next/navigation";
import useSWR from "swr";
import { getComments } from "../apiCalls/product";
import SWR_KEYS from "../swrKeys";

export const useCommentMeta = (productId: string) => {
  return useSWR(`comments-meta-${productId}`, () =>
    getComments(productId, "0", "1")
  );
};

export const useComments = () => {
  const params = useParams();
  const productId = params?.productId as string;

  const {
    data = { averageRating: 0, comments: [], totalComments: 0 },
    error,
    isLoading,
  } = useSWR(SWR_KEYS.comments(productId), () => getComments(productId));

  return {
    ...data,
    isLoading,
    error,
  };
};
