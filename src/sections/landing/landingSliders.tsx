import FilterSlider from "@/components/sliders/FilterSlider";
import Image from "next/image";
import ProductSliderContainer from "@/components/sliders/ProductSliderContainer";
import BACKEND_ROUTES from "@/core/configs";
import baseImages from "@/assets/images";
import { AppearanceJsonType } from "@/types/appearcne";
import { BASE_IMAGE_URL } from "@/configs/globals";
import Link from "next/link";

export default function LandingSliders({
  appearanceJson,
}: {
  appearanceJson: AppearanceJsonType;
}) {
  return (
    <div className="text-[#3F3F3F]">
      <aside
        aria-label={
          appearanceJson?.["product-list-1"]?.title ?? "ویدئو‌های ابتدایی"
        }
      >
        <h2 className="sr-only">
          {appearanceJson?.["product-list-1"]?.title ??
            "محصولات متوسطه ابتدایی"}
        </h2>
        <div className="min-sm:w-11/12 mb-0 mt-6 mx-auto">
          <div className="mx-auto px-5 font-semibold text-lg ">
            {appearanceJson?.["product-list-1"]?.title ?? "ویدئو‌های ابتدایی"}
          </div>

          <ProductSliderContainer
            apiAddress={`${BACKEND_ROUTES.PRODUCTS_SEARCH_BY_FILTER}${appearanceJson?.["product-list-1"]?.params ?? "?Categories=1&ContentTypes=1&PageNumber=1&PageSize=16"}`}
            filterString={
              appearanceJson?.["product-list-1"]?.params ??
              "?Categories=1&ContentTypes=1&PageNumber=1&PageSize=16"
            }
          />
        </div>
      </aside>
      <aside
        aria-label={
          appearanceJson?.["product-list-2"]?.title ?? "محصولات متوسطه اول"
        }
      >
        <h2 className="sr-only">
          {appearanceJson?.["product-list-2"]?.title ?? "محصولات متوسطه اول"}
        </h2>
        <div className="min-sm:w-11/12 mb-0 mt-6 mx-auto">
          <div className="mx-auto px-5 font-semibold text-lg ">
            {appearanceJson?.["product-list-2"]?.title ?? "محصولات متوسطه اول"}
          </div>
          <ProductSliderContainer
            apiAddress={`${BACKEND_ROUTES.PRODUCTS_SEARCH_BY_FILTER}${appearanceJson?.["product-list-2"]?.params ?? "?Categories=2&PageNumber=1&PageSize=16"}`}
            filterString={
              appearanceJson?.["product-list-2"]?.params ??
              "?Categories=2&PageNumber=1&PageSize=16"
            }
          />
        </div>
      </aside>
      <div className="min-sm:w-11/12 mb-0 mt-6 mx-auto">
        <FilterSlider
          title="تخفیف های شگفت انگیز 🚀"
          filters={[
            "کنکور",
            "امتحان نهایی",
            "متوسطه اول",
            "متوسطه دوم",
            "ابتدایی",
          ]}
          image={null}
        />
      </div>
      <aside
        aria-label={
          appearanceJson?.["product-list-3"]?.title ?? "محصولات متوسطه دوم"
        }
      >
        <h2 className="sr-only">
          {appearanceJson?.["product-list-3"]?.title ?? "محصولات متوسطه دوم"}
        </h2>
        <div className="min-sm:w-11/12 mb-0 mt-6 mx-auto">
          <div className="mx-auto px-5 font-semibold text-lg ">
            {appearanceJson?.["product-list-3"]?.title ?? "محصولات متوسطه دوم"}
          </div>
          <ProductSliderContainer
            apiAddress={`${BACKEND_ROUTES.PRODUCTS_SEARCH_BY_FILTER}${appearanceJson?.["product-list-3"]?.params ?? "?Categories=3&PageNumber=1&PageSize=16"}`}
            filterString={
              appearanceJson?.["product-list-3"]?.params ??
              "?Categories=3&PageNumber=1&PageSize=16"
            }
          />
        </div>
      </aside>

      <Link
        aria-label="appearanceJson"
        href={appearanceJson?.["single-banner"]?.link ?? ""}
      >
        <Image
          src={
            appearanceJson?.["single-banner"]?.imageUrl
              ? BASE_IMAGE_URL + appearanceJson?.["single-banner"]?.imageUrl
              : baseImages.banner
          }
          alt="بنر تبلیغاتی ویژه فروشگاه"
          title="مشاهده جزئیات بنر تبلیغاتی"
          className="px-2 mt-6 mb-10 min-sm:w-11/12 mx-auto max-w-full max-h-80 object-contain"
          width={1600}
          height={400}
          quality={100}
        />
      </Link>

      <aside
        aria-label={
          appearanceJson?.["product-list-4"]?.title ?? "ویدئوهای پایه دوازدهم"
        }
      >
        <h2 className="sr-only">
          {appearanceJson?.["product-list-4"]?.title ?? "ویدئوهای پایه دوازدهم"}
        </h2>
        <div className="min-sm:w-11/12 mb-0 mt-6 mx-auto">
          <div className="mx-auto px-5 font-semibold text-lg ">
            {appearanceJson?.["product-list-4"]?.title ??
              "ویدئوهای پایه دوازدهم"}
          </div>
          <ProductSliderContainer
            apiAddress={`${BACKEND_ROUTES.PRODUCTS_SEARCH_BY_FILTER}${appearanceJson?.["product-list-4"]?.params ?? "?Grades=12&ContentTypes=1&PageNumber=1&PageSize=16"}`}
            filterString={
              appearanceJson?.["product-list-4"]?.params ??
              "?Grades=12&ContentTypes=1&PageNumber=1&PageSize=16"
            }
          />
        </div>
      </aside>
    </div>
  );
}
