import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  imageSrc: StaticImageData;
  title: string;
  description: string;
  linkHref?: string;
  linkText?: string;
  Icon?: LucideIcon;
  className?: string;
  hasButton?: boolean;
};

export default function EmptyState({
  imageSrc,
  title,
  description,
  hasButton,
  linkHref,
  linkText,
  Icon,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Image alt="empty-state-image" src={imageSrc} height={202} width={202} />
      <div className="w-[330px] flex flex-col items-center space-y-2 mt-2">
        <h3 className="font-medium text-neutral-800">{title}</h3>
        <p className="text-center">{description}</p>
        {hasButton && linkHref && (
          <Link
            aria-label="linkHref "
            href={linkHref}
            className="w-full flex justify-center gap-x-2 border border-blue1 rounded-xl p-2 px-10 mt-6"
          >
            {Icon && <Icon className="stroke-blue1" />}
            <span className="text-blue1">{linkText}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
