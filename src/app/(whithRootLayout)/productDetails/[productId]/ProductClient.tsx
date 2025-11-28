"use client";

import BreadcrumbsClient from "@/components/Breadcrumb";
import AddToCart from "@/components/cards/AddToCart";
import { useUser } from "@/context/UserContext";
import {
  getAparatLink,
  getArvanLink,
  getProductAfterPurchase,
  getProductBeforePurchase,
  getSaminLink,
} from "@/core/apiCalls/product";
import Comments from "@/sections/productDetails/Comments";
import ContentSection from "@/sections/productDetails/ContentSection";
import HasPurchasedSideContent from "@/sections/productDetails/HasPurchasedSideContent";
import ProductDescriptionSection from "@/sections/productDetails/ProductDescription";
import ProductFutear from "@/sections/productDetails/ProductFutear";
import ProductHeader from "@/sections/productDetails/ProductHeader";
import ScrollSpyTabs from "@/sections/productDetails/ScrollSpyTabs";
import TagsSection from "@/sections/productDetails/TagsSection";
import TeachersSection from "@/sections/productDetails/TeachersSection";
import { Product } from "@/types/product";
import { getCookie } from "cookies-next";
import { useEffect, useRef, useState } from "react";
import Loader from "../Loader";
import { useUserViewTracker } from "@/utils/hooks/useUserViewTracker";

type ProductClientProps = {
  productId: string;
};

export default function ProductClient({ productId }: ProductClientProps) {
  const [hasPurchased, setHasPurchased] = useState(false);
  const [productData, setProductData] = useState<Product>();
  const [refreshToken, setRefreshToken] = useState<string | undefined>();
  const [selectedVideoLink, setSelectedVideoLink] = useState<string | null>(
    null
  );
  const [player, setPlayer] = useState<string>("Aparat");
  const videoSectionRef = useRef<HTMLDivElement | null>(null);

  const { isLoggedIn, isLoading } = useUser();

  useUserViewTracker(productData);

  useEffect(() => {
    document.title = productData?.name ?? "فروشگاه ست";
  }, [productData?.name]);

  useEffect(() => {
    const token = getCookie("refreshToken");
    if (typeof token === "string") {
      setRefreshToken(token);
    }

    const getProductData = async () => {
      if (!isLoading) {
        const token = getCookie("token") as string;
        try {
          if (token) {
            const res = await getProductAfterPurchase(productId, token);
            if (res.data) {
              setProductData(res.data);
              setHasPurchased(true);
            } else {
              const res = await getProductBeforePurchase(productId);
              setProductData(res ?? null);
              setHasPurchased(false);
            }
          }
        } catch {
          const res = await getProductBeforePurchase(productId);
          setProductData(res ?? null);
          setHasPurchased(false);
        }
      }
    };
    getProductData();
  }, [isLoggedIn, isLoading, productId]);

  const handleVideoClick = async (videoLink: string, player: string) => {
    let data: { url: string } = { url: "" };
    if (player === "Aparat") {
      data = await getAparatLink(videoLink);
    } else if (player === "Arvan") {
      data = await getArvanLink(videoLink);
    } else if (player === "Samin") {
      data = await getSaminLink(videoLink);
    }

    if (!!data.url) {
      setPlayer(player);
      setSelectedVideoLink(data.url);

      setTimeout(() => {
        videoSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  return (
    <>
      {isLoading || productData === undefined ? (
        <Loader className="mt-4" />
      ) : (
        <main
          dir="rtl"
          className="flex flex-col md:flex-row gap-x-8 justify-center md:mt-4 font-vazir"
        >
          <div ref={videoSectionRef} className="bg-black absolute top-24" />
          <div className=" min-h-[800px] w-full md:w-[666px]">
            <aside className="h-5  font-vazir flex items-center mt-6 md:mt-2">
              <BreadcrumbsClient
                categories={productData?.categories || []}
                grades={productData?.grades || []}
                majors={productData?.majors || []}
                lessons={productData?.lessons || []}
              />
            </aside>
            <div className="mt-4 text-right">
              <ProductHeader
                isClient={true}
                name={productData?.name}
                player={player}
                videoLink={selectedVideoLink}
                imageUrl={productData?.imageUrl}
              />

              <ScrollSpyTabs />
              <div className="px-3">
                <ProductFutear features={productData?.features} />

                <ProductDescriptionSection
                  description={productData?.description}
                />

                <div
                  className={`${
                    !!refreshToken && hasPurchased ? "md:hidden" : ""
                  }`}
                >
                  <ContentSection
                    product={productData}
                    hasPurchased={hasPurchased}
                    onVideoClick={handleVideoClick}
                  />
                </div>
                {productData?.teachers.length !== 0 && (
                  <section
                    id="teachers"
                    data-section
                    data-label="مدرسین"
                    className="mt-16 w-full md:w-[563]"
                  >
                    <TeachersSection data={productData?.teachers} />
                  </section>
                )}
                <div
                  id="comments"
                  data-section
                  data-label="نظرات"
                  className="mt-16 w-full md:w-[540]"
                >
                  <Comments hasPurchased={hasPurchased} />
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
          <aside
            className={`min-h-20  w-full md:w-[315px] md:min-w-[315px] mt-8`}
          >
            <AddToCart
              product={productData}
              hasPurchased={hasPurchased}
              className={`w-full md:w-[315px]
                  fixed bottom-[75px] left-1/2 -translate-x-1/2
                  md:sticky md:top-36 md:left-0 md:translate-x-0
                  z-20 ${!!refreshToken && hasPurchased && "hidden"}`}
            />
            <HasPurchasedSideContent
              productContent={productData?.contents}
              hasPurchased={hasPurchased}
              onVideoClick={handleVideoClick}
            />
          </aside>
        </main>
      )}
    </>
  );
}
