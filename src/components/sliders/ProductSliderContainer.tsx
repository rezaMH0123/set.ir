import React from "react";
import { Product } from "@/types/slider.type";
import ProductSlider from "./productSlider";
import { getServerSideProductByFilter } from "@/core/apiCalls/landing";

interface ProductSliderContainerProps {
  apiAddress: string;
  filterString?: string;
}

const ProductSliderContainer: React.FC<ProductSliderContainerProps> = async ({
  apiAddress,
  filterString,
}) => {
  const products: Product[] = await getServerSideProductByFilter(apiAddress);

  return <ProductSlider filtersString={filterString} products={products} />;
};

export default ProductSliderContainer;
