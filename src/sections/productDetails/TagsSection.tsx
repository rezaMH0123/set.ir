// components/TagsSection.tsx

import HashtagIcon from "@/components/icons/HashtagIcon";

interface TagsSectionProps {
  tags?: string[];
  fallbackFeatures?: { name: string }[];
  title?: string;
  className?: string;
}

export default function TagsSection({
  tags,
  fallbackFeatures,
  title = "برچسب‌ها",
  className = "",
}: TagsSectionProps) {
  const finalTags =
    tags && tags.length > 0 ? tags : fallbackFeatures?.map((f) => f.name) || [];

  if (finalTags.length === 0) return null;

  return (
    <aside
      id="tags"
      aria-labelledby="برچسب‌ها"
      data-section
      data-label="برچسب‌ها"
      className={className}
    >
      <div className="flex items-center gap-x-2 mb-4">
        <HashtagIcon className="stroke-black w-6 h-6" />
        <h2 className="font-bold text-[16px] md:text-[20px]">{title}</h2>
      </div>

      <ul className="px-[18px] flex flex-wrap gap-2 text-MediumGray">
        {finalTags.map((tag, index) => (
          <li key={index} className="inline-block">
            #{tag}
          </li>
        ))}
      </ul>
    </aside>
  );
}
