export interface ProductSliderProps {
  apiAddress: string;
}

export interface features {
  name: string;
}

type FeatureType = {
  name: string;
  iconName: string | null;
  label: string;
};
export interface Product {
  items: FeatureType[];
  id: string;
  link?: string;
  thumbnailUrl: string;
  price: number;
  discountedPrice: number | null;
  discount?: string;
  name: string;
  features: features[];
  isLiked?: boolean;
  finalPrice?: string;
}

export type ProductFilterdData = {
  message: string;
  pageNumber: number;
  pageSize: number;
  products: Product[];
  totalCount: number;
  totalPages: number;
};
