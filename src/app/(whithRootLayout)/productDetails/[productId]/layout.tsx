import ProductSlider from "@/components/sliders/productSlider";
import { getServerSideProductByFilter } from "@/core/apiCalls/landing";
import { cachedGetProductBeforePurchase } from "@/core/apiCalls/product";
import BACKEND_ROUTES from "@/core/configs";
import { BookCopyIcon } from "lucide-react";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ productId: string }>;
}>) {
  const { productId } = await params;

  const productData = await cachedGetProductBeforePurchase(productId);

  const smilarProductsFilter = [
    ...productData.categories.map((c) => `Categories=${c.id}`),
    ...productData.majors.map((m) => `Majors=${m.id}`),
    ...productData.grades.map((g) => `Grades=${g.id}`),
    "SortOrder=MostExpensive",
  ].join("&");

  const smilarProductsFilterWithLesson = [
    ...productData.categories.map((c) => `Categories=${c.id}`),
    ...productData.majors.map((m) => `Majors=${m.id}`),
    ...productData.grades.map((g) => `Grades=${g.id}`),
    ...productData.lessons.map((l) => `Lessons=${l.id}`),
    "SortOrder=MostExpensive",
  ].join("&");

  const similarProducts = await getServerSideProductByFilter(
    BACKEND_ROUTES.PRODUCTS_SEARCH_BY_FILTER + "?" + smilarProductsFilter
  );

  const similarProductsWithLesson = await getServerSideProductByFilter(
    BACKEND_ROUTES.PRODUCTS_SEARCH_BY_FILTER +
      "?" +
      smilarProductsFilterWithLesson
  );

  const mixedSimilarPorducts = [
    ...similarProductsWithLesson,
    ...similarProducts.filter(
      (p) => !similarProductsWithLesson.find((sp) => sp.id === p.id)
    ),
  ].filter((p) => p.id !== productId);

  return (
    <>
      {children}
      {!!mixedSimilarPorducts.length && (
        <div className="mt-4 md:px-2 max-w-[1020px] w-full place-self-center">
          <div
            style={{ direction: "rtl" }}
            className="font-semibold px-4 md:px-2 text-lg text-right w-full"
          >
            <BookCopyIcon className="inline-block" />
            <label className="pr-2">محصولات مشابه</label>
          </div>
          <ProductSlider
            filtersString={"?" + smilarProductsFilter}
            products={mixedSimilarPorducts}
          />
        </div>
      )}
    </>
  );
}
