"use client";

import { ProductData } from "@/types/userTracker";
import { useUserViewTracker } from "@/utils/hooks/useUserViewTracker";

type Props = {
  productData: ProductData;
};

export default function UserViewTrackerClient({ productData }: Props) {
  useUserViewTracker(productData);
  return null;
}
