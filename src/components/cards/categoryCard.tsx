import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";
import baseImages from "@/assets/images";

interface CategoryCardProps {
  image: StaticImport;
  title: string;
  link: string;
  className: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  image,
  title,
  link,
  className,
}) => {
  return (
    <>
      <div className="hidden md:block min-w-[160px] min-h-[110px] mx-auto">
        <Link aria-label="link" href={link}>
          <div
            dir="rtl"
            className="relative w-full h-full flex justify-center items-end bg-white rounded-[10px] gap-2 p-3 shadow-[0_2px_6px_0_rgba(0,0,0,0.32)]"
          >
            <Image
              src={image}
              alt={`تصویر دسته‌بندی ${title}`}
              title={`مشاهده محصولات ${title}`}
              className="absolute w-[140px] h-[120px] object-contain bottom-12 left-1/2 -translate-x-1/2"
              width={200}
              height={200}
            />
            <div className="font-bold text-2xl">{title}</div>
          </div>
        </Link>
      </div>
      <Link
        aria-label="link"
        className={`cursor-pointer relative px-4 w-full flex mx-8 mb-4 rounded-2xl text-white md:hidden flex-row-reverse justify-between items-center  ${className}`}
        href={link}
      >
        <Image
          src={baseImages.categoryMobileBg}
          alt="Foreground"
          className="absolute inset-0 w-full h-full m-auto"
        />
        <Image
          width={200}
          height={200}
          src={image}
          alt={`تصویر دسته‌بندی ${title}`}
          title={`مشاهده محصولات ${title}`}
          className="h-20 w-20 p-2"
        />
        <div className="font-bold text-2xl">{title}</div>
      </Link>
    </>
  );
};

export default CategoryCard;
