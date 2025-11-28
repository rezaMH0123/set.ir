import BreadcrumbsClient from "@/components/Breadcrumb";
import AddToCart from "@/components/cards/AddToCart";
import Comments from "@/sections/productDetails/Comments";
import ContentSection from "@/sections/productDetails/ContentSection";
import ProductDescriptionSection from "@/sections/productDetails/ProductDescription";
import ProductFutear from "@/sections/productDetails/ProductFutear";
import ProductHeader from "@/sections/productDetails/ProductHeader";
import ScrollSpyTabs from "@/sections/productDetails/ScrollSpyTabs";
import TagsSection from "@/sections/productDetails/TagsSection";
import TeachersSection from "@/sections/productDetails/TeachersSection";
import { cookies } from "next/headers";
import ProductClient from "./ProductClient";
import {
  cachedGetProductBeforePurchase,
  getComments,
} from "@/core/apiCalls/product";
import {
  getFirstPlayableVideoLink,
  getProductJsonLd,
  getVideoJsonLd,
} from "@/utils/helpers/productDetailHelper";
import { Suspense } from "react";
import UserViewTrackerClient from "@/sections/productDetails/UserViewTrackerClient";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const product = await cachedGetProductBeforePurchase(
    (await params).productId
  );
  const finalPrice = product.price - (product.discountAmount ?? 0);

  return {
    title: `${product.name} | SET.IR - آموزش ویدیویی`,
    description: product.description.substring(0, 160),
    canonical: `https://set.ir/productDetails/${product.id}`,
    robots: "index, follow",
    openGraph: {
      title: `${product.name} | SET.IR`,
      description: product.description.substring(0, 160),
      type: "website",
      url: `https://set.ir/productDetails/${product.id}`,
      images: [
        {
          url: `${product.imageUrl}`,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description.substring(0, 160),
      images: [`${product.imageUrl}`],
    },
    other: {
      product_id: product.id,
      product_name: product.name,
      product_price: finalPrice.toString(),
      product_old_price: product.price.toString(),
      availability: "instock",
      guarantee: "ضمانت کیفیت محصول",
    },
  };
}

export default async function ProductDetails({
  params,
}: {
  searchParams: Promise<{ type?: string }>;
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const token = cookieStore.get("token")?.value;

  const productData = await cachedGetProductBeforePurchase(productId);
  const hasPurchased = false;
  const commentsData = await getComments(productId, "1", "10");

  const firstContent = productData?.contents?.[0];
  const firstVideo = firstContent?.videos?.[0];

  const firstPlayableVideoLink = await getFirstPlayableVideoLink(productData);

  const productJsonLd = getProductJsonLd(productData);
  const videoSchema = getVideoJsonLd(productData, firstVideo);

  console.log(productData);
  if (!refreshToken && !token) {
    return (
      <main
        dir="rtl"
        className="flex flex-col md:flex-row gap-x-8 justify-center md:mt-4 font-vazir relative"
      >
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
        {videoSchema && (
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(videoSchema),
            }}
          />
        )}
        <Suspense fallback={null}>
          <UserViewTrackerClient productData={productData} />
        </Suspense>

        <div className="min-h-[800px] w-full md:w-[666px]">
          <aside className="h-5 font-vazir flex items-center mt-2">
            <BreadcrumbsClient
              categories={productData?.categories || []}
              grades={productData?.grades || []}
              majors={productData?.majors || []}
              lessons={productData?.lessons || []}
            />
          </aside>

          <div className="mt-4 text-right">
            <ProductHeader
              isClient={false}
              name={productData?.name}
              player="Aparat"
              videoLink={firstPlayableVideoLink}
              imageUrl={productData?.imageUrl}
            />

            <ScrollSpyTabs />

            <div className="px-3">
              <ProductFutear features={productData?.features} />

              <ProductDescriptionSection
                description={productData?.description}
              />

              <aside aria-labelledby="محتوای-اضافی-محصول">
                <ContentSection
                  product={productData}
                  hasPurchased={hasPurchased}
                />
              </aside>

              {productData?.teachers.length !== 0 && (
                <section
                  id="teachers"
                  data-section
                  data-label="مدرسین"
                  className="mt-16 w-full md:w-[563px]"
                >
                  <TeachersSection data={productData?.teachers} />
                </section>
              )}

              <div
                id="comments"
                data-section
                data-label="نظرات"
                className="mt-16 w-full md:w-[540px]"
              >
                <Comments
                  hasPurchased={hasPurchased}
                  commentsData={commentsData.comments}
                />
              </div>

              <div className="mt-16 w-full mb-12">
                <TagsSection
                  tags={productData?.tags}
                  fallbackFeatures={productData?.features}
                />
              </div>
            </div>
          </div>
        </div>

        <aside className="md:min-h-20 w-full md:w-[315px] mt-0 md:mt-24">
          <AddToCart
            product={productData}
            hasPurchased={hasPurchased}
            className={`w-full md:w-[315px]
              fixed bottom-[75px] left-1/2 -translate-x-1/2
              md:sticky md:top-36 md:left-0 md:translate-x-0
              z-20`}
          />
        </aside>
      </main>
    );
  }

  return <ProductClient productId={productId} />;
}
