import { BASE_IMAGE_URL } from "@/configs/globals";
import { getCachedAppearance } from "@/core/apiCalls/landing";
import Image from "next/image";
import Link from "next/link";

const Campain = async () => {
  const appearanceJson = await getCachedAppearance();
  return (
    <>
      {(appearanceJson?.campain?.dateRange?.[0] ?? 0) < Date.now() &&
        (appearanceJson?.campain?.dateRange?.[1] ?? 0) > Date.now() && (
          <div className="h-[60px] w-full bg-white cursor-pointer">
            <Link
              aria-label="تصویر کمپین"
              href={appearanceJson?.campain?.link ?? ""}
            >
              <Image
                alt="تصویر کمپین"
                title="مشاهده جزئیات کمپین ویژه" //in this line we need title text for campain
                height={60}
                width={1900}
                src={BASE_IMAGE_URL + appearanceJson?.campain?.imageUrl}
                className="h-[60px] object-cover place-self-center"
              />
            </Link>
          </div>
        )}
    </>
  );
};

export default Campain;
