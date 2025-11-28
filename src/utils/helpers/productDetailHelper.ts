/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_IMAGE_URL } from "@/configs/globals";
import { convertToISODuration } from "@/utils/helpers/common";
import { getAparatLinkServerSide } from "@/core/apiCalls/product";

export async function getFirstPlayableVideoLink(
  productData: any
): Promise<string> {
  const firstPlayableVideoId: string = productData.contents.reduce(
    (acc: string, content: any) => {
      return (
        acc ||
        content.videos.reduce((innerAcc: string, video: any) => {
          if (innerAcc) return innerAcc;
          if (video.isPreview && video.player === "Aparat") {
            return video.videoLink ?? "";
          }
          return innerAcc;
        }, "")
      );
    },
    ""
  );

  if (!firstPlayableVideoId) return "";
  return await getAparatLinkServerSide(firstPlayableVideoId);
}

export function getProductJsonLd(productData: any) {
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
  const priceValidUntil = oneWeekFromNow.toISOString().split("T")[0]; // YYYY-MM-DD

  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: productData.name,
    image: [`${BASE_IMAGE_URL}${productData.imageUrl}`],
    description: productData.description,
    sku: productData.id,
    brand: { "@type": "Brand", name: "SET.IR" },
    offers: {
      "@type": "Offer",
      url: `https://set.ir/productDetails/${productData.id}`,
      priceCurrency: "IRR",
      price: productData.price - (productData.discountAmount ?? 0) + "",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      priceValidUntil,
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "IRR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          name: "Worldwide",
          addressCountry: "IR",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            value: 0,
            unitCode: "DAY",
            minValue: 0,
            maxValue: 0,
          },
          transitTime: {
            "@type": "QuantitativeValue",
            value: 0,
            unitCode: "DAY",
            minValue: 0,
            maxValue: 0,
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
        applicableCountry: "IR",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: productData.averageRating ?? "4.8",
      reviewCount: (productData.totalComments ?? 0) + 4,
    },
  };
}

export function getVideoJsonLd(productData: any, firstVideo: any) {
  if (!firstVideo || firstVideo.player !== "Aparat" || !firstVideo.videoTime)
    return null;

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: firstVideo.videoName || productData.name,
    description: productData.description,
    thumbnailUrl: [`${BASE_IMAGE_URL}${productData.imageUrl}`],
    uploadDate: new Date().toISOString(), // TODO: API باید createdAt بدهد
    duration: convertToISODuration(firstVideo.videoTime),
    contentUrl: firstVideo.videoLink,
    embedUrl: firstVideo.videoLink,
    publisher: {
      "@type": "Organization",
      name: "SET.IR",
      logo: { "@type": "ImageObject", url: "/icon.png" },
    },
  };
}
