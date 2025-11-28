import Image from "next/image";
import React from "react";

type EmptyContentDLayoutProps = {
  className?: string;
  textButton?: string;
  title?: string;
  srcImg: string;
  onClick?: () => void;
};

export default function EmptyContentDLayout({
  className,
  textButton,
  title,
  srcImg,
  onClick,
}: EmptyContentDLayoutProps) {
  return (
    <div className={className}>
      <Image alt="emptyImage" src={srcImg} height={200} width={200} />
      {title && (
        <span className="mt-2 text-[15px] font-medium font-vazir">{title}</span>
      )}
      {textButton && (
        <button
          onClick={onClick}
          className="border border-[#224cdf] bg-white rounded-lg p-1 px-2 mt-4 text-[#224cdf] cursor-pointer"
        >
          {textButton}
        </button>
      )}
    </div>
  );
}
