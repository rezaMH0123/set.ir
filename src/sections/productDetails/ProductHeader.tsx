import Image from "next/image";
import VideoPlayerWithSkeleton from "@/sections/productDetails/LazyVideoPlayer";
import { BASE_IMAGE_URL } from "@/configs/globals";

type ProductHeaderProps = {
  name: string;
  imageUrl: string;
  videoLink: string | null;
  player: string;
  isClient: boolean;
};

export default function ProductHeader({
  name,
  imageUrl,
  videoLink,
  player,
  isClient,
}: ProductHeaderProps) {
  return (
    <header aria-labelledby="عنوان-محصول">
      <h1 className="font-bold text-lg md:text-xl mx-4 md:mx-0">{name}</h1>

      <div className={`w-full mt-3.5 ${isClient ? "-mb-6 md:mb-0" : ""}`}>
        <div className={`w-full h-full ${isClient ? "md:rounded-2xl" : ""}`}>
          {videoLink ? (
            <div className="w-full h-full mt-3.5">
              <VideoPlayerWithSkeleton src={videoLink} player={player} />
            </div>
          ) : (
            <div className="relative w-full aspect-video overflow-hidden md:rounded-2xl">
              <Image
                src={BASE_IMAGE_URL + imageUrl}
                alt="product-image-blur"
                className="object-cover blur-sm absolute top-0 left-0 w-full h-full z-0 scale-110"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                aria-hidden="true"
                priority
              />
              <Image
                src={BASE_IMAGE_URL + imageUrl}
                alt="product-image"
                className="object-contain absolute top-0 left-0 w-full h-full z-10"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
