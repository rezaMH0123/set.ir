"use client";

import React from "react";
import { useRouter } from "next/navigation";
import WithPagination from "@/sections/shared/WithPagination";
import EmptyContentDLayout from "@/components/EmptyContentDLayout";
import baseImages from "@/assets/images";
import ShowProductCard from "@/sections/dashboard/cards/ShowProductCard";
import { fetchPurchasedVideos } from "@/core/apiCalls/dashboard";
import { Loader2 } from "lucide-react";

type FeatureType = {
  name: string;
  iconName: string | null;
  label: string;
};

export type VideoType = {
  id: string;
  name: string;
  price: string;
  discountedPrice: string | null;
  thumbnailUrl: string;
  features: FeatureType[];
  link: string;
  CurrentPrice: number;
  prevPrice: number;
  discount: string;
  isLiked: boolean;
};

export default function MyContentVideos() {
  const router = useRouter();

  const getPaginatedVideos = async (pageIndex: number, perPage: number) => {
    const videos = await fetchPurchasedVideos({
      pageSize: perPage,
      pageNumber: pageIndex + 1,
    });
    const allVideos = videos.items ?? [];
    const totalPages = Math.ceil(videos.totalCount / perPage);

    return {
      items: allVideos,
      totalCount: videos.totalCount,
      totalPages: totalPages,
    };
  };

  const VideoCard: React.FC<{ item: VideoType; index: number }> = ({
    item,
  }) => (
    <div className="flex justify-center items-start">
      <ShowProductCard product={item} />
    </div>
  );

  return (
    <WithPagination<VideoType>
      keyPrefix="my-videos"
      fetcher={getPaginatedVideos}
      itemComponent={VideoCard}
      perPage={10}
      loadingMoreText={
        <div className="w-full place-items-center">
          <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
        </div>
      }
      // wrapUpComponent={
      //     <div className="text-center mt-4">تمام محصولات نمایش داده شدند.</div>
      // }
      notFoundComponent={
        <div className="flex-1 flex justify-center items-center">
          <EmptyContentDLayout
            className="flex flex-col items-center"
            srcImg={baseImages.emptyContentImage}
            title="هیچ محتوای آموزشی‌ای ندارید"
            textButton="+ افزودن محصول به لیست"
            onClick={() => router.replace("/")}
          />
        </div>
      }
      containerProps={{
        className:
          "grid gap-2 px-8 py-5 max-xl:px-4 justify-start max-md:px-2 grid-cols-[repeat(auto-fit,minmax(186px,1fr))] max-md:grid-cols-[repeat(auto-fit,minmax(160px,1fr))]",
      }}
    />
  );
}
