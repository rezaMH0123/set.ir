import Image from "next/image";
import { Feather } from "lucide-react";

import ListTikIcon from "@/components/icons/ListTikIcon";
import { LUCIDE_ICONS } from "@/assets/icons/lucideIcons/lucideIcons";

interface ProductFutearProps {
  features: { name: string; iconName?: string }[];
  title?: string;
  className?: string;
}

export default function ProductFutear({
  features,
  title = "ویژگی‌های محصول",
  className = "mt-9 w-[550px]",
}: ProductFutearProps) {
  if (!features?.length) return null;

  return (
    <section
      id="features"
      aria-labelledby="ویژگی‌ها"
      data-section
      data-label="ویژگی‌ها"
      className={className}
    >
      <div className="flex items-center gap-x-2">
        <ListTikIcon className="fill-black w-6 h-6" />
        <h2 className="font-bold text-[16px] md:text-[20px]">{title}</h2>
      </div>

      <ul className="flex md:flex-row flex-wrap gap-4 mt-6 list-none p-0 m-0">
        {features.map((item, index) => {
          const IconSrc =
            item.iconName &&
            LUCIDE_ICONS[item.iconName as keyof typeof LUCIDE_ICONS];

          return (
            <li
              key={index}
              className="flex items-center w-2/5 md:w-[170px] h-[42px] rounded-lg shadow-card3 px-3"
            >
              {IconSrc ? (
                <Image
                  src={IconSrc}
                  alt={item.name}
                  className="h-5 w-5 stroke-black1"
                  unoptimized
                />
              ) : (
                <Feather className="h-5 w-5 stroke-black1" />
              )}
              <span className="mr-2 text-black1 text-xs truncate">
                {item.name}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
