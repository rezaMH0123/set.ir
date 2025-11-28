import React from "react";

type ContentItem = {
  id: string;
  label: string;
};

type CheckboxListProps = {
  content: ContentItem[];
  selectedFilters: { id: string; label: string }[];
  handleCheckboxChange: (id: string, label: string) => void;
};

export default function CheckboxList({
  content,
  selectedFilters,
  handleCheckboxChange,
}: CheckboxListProps) {
  return (
    <ul className="divide-y divide-LightGray">
      {content.map((item) => {
        const normalizedId = item.id.toLowerCase();
        const isChecked = selectedFilters.some(
          (filter) => filter.id.toLowerCase() === normalizedId
        );
        return (
          <li
            key={item.id}
            onClick={() => handleCheckboxChange(normalizedId, item.label)}
            className="py-2 flex flex-row-reverse justify-between items-center gap-2 cursor-pointer"
          >
            <div className="relative">
              <input
                type="checkbox"
                id={`checkbox-${normalizedId}`}
                checked={isChecked}
                onChange={() => handleCheckboxChange(normalizedId, item.label)}
                className="peer appearance-none w-4 h-4 border-2 border-LightGray rounded-md cursor-pointer transition-colors"
              />
              <svg
                className="absolute top-0 left-0 w-4 h-4 text-blue1 opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <label
              onClick={(e) => e.stopPropagation()}
              htmlFor={`checkbox-${normalizedId}`}
              className="cursor-pointer"
            >
              {item.label}
            </label>
          </li>
        );
      })}
    </ul>
  );
}
