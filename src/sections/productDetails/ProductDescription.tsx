import { ScrollText } from "lucide-react";
import Markdown from "react-markdown";

interface ProductDescriptionSectionProps {
  description?: string;
}

export default function ProductDescriptionSection({
  description,
}: ProductDescriptionSectionProps) {
  if (!description) return null;

  return (
    <section
      id="description"
      data-section
      data-label="توضیحات"
      aria-labelledby="توضیحات"
      className="w-full mt-16"
    >
      <div className="px-3 md:px-0">
        <div className="flex items-center gap-x-2 mb-4">
          <ScrollText className="w-6 h-6" />
          <span className="text-[16px] md:text-[20px] font-bold">توضیحات</span>
        </div>
        <div
          className="
            [&_h2]:text-[20px] [&_h2]:font-bold [&_h2]:text-black
            [&_h3]:text-[18px] [&_h3]:font-semibold [&_h3]:text-gray-800
            [&_h4]:text-[17px] [&_h4]:font-medium [&_h4]:text-gray-700
            [&_h5]:text-[17px] [&_h5]:font-medium [&_h5]:text-gray-700
            [&_h6]:text-base [&_h6]:font-medium [&_h6]:text-gray-700
            [&_p]:text-base [&_p]:text-gray-800 [&_p]:leading-relaxed
            [&_a]:text-blue-600 [&_a]:underline hover:[&_a]:text-blue-800
            [&_strong]:font-bold [&_strong]:text-gray-900
            [&_u]:underline [&_u]:decoration-dotted
            [&_i]:italic [&_i]:text-gray-600
            space-y-4
          "
        >
          <Markdown>{description}</Markdown>
        </div>
      </div>
    </section>
  );
}
