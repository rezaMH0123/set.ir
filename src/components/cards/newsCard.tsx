"use client";

import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";

interface NewsCardProps {
  image: StaticImport;
  title: string;
  link: string;
  text: string;
  date: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  image,
  title,
  link,
  date,
  text,
}) => {
  return (
    <div
      dir="rtl"
      className="min-w-[330px] max-sm:min-w-[270px] min-h-[420px] max-sm:min-h-[370px] mx-auto"
    >
      <Link aria-label="link" href={link}>
        <div className="relative w-[330px] max-sm:w-[270px] h-[420px] max-sm:h-[370px] justify-center items-end bg-white rounded-[10px] gap-2 p-3 shadow-[0_1px_4px_0_rgba(0,0,0,0.32)]">
          <div className="flex justify-between mt-2 mb-6 max-sm:mb-4">
            <div className="font-semibold mt-1 text-xl max-sm:text-base">
              {title}
            </div>
            <div className="text-sm">{date}</div>
          </div>
          <Image
            src={image}
            alt="category"
            className="h-[173px] max-sm:h-[135px] rounded-[10px] object-contain mx-auto"
          />
          <div className="my-4 line-clamp-6">{text}</div>
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;
