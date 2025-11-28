import React from "react";

type ContentItem = {
  id: string;
  label: string;
};

type RadioButtonListProps = {
  content: ContentItem[];
  selectedFilter: string | null;
  handleRadioChange: (id: string | null) => void;
};

export default function RadioButtonList({
  content,
  selectedFilter,
  handleRadioChange,
}: RadioButtonListProps) {
  const handleChange = (id: string) => {
    if (selectedFilter === id) {
      handleRadioChange(null);
    } else {
      handleRadioChange(id);
    }
  };
  return (
    <ul className="divide-y divide-LightGray">
      {content.map((item) => (
        <li
          key={item.id}
          onClick={() => handleRadioChange(item.id)}
          className="py-4 flex flex-row-reverse justify-between items-center gap-2 cursor-pointer"
        >
          <div className="relative">
            <input
              type="radio"
              id={`radio-${item.id}`}
              checked={selectedFilter === item.id}
              onClick={(e) => {
                e.stopPropagation();
                if (selectedFilter === item.id) {
                  handleRadioChange(null);
                }
              }}
              onChange={() => handleChange(item.id)}
              className="peer appearance-none w-4 h-4 rounded-sm border-2 border-LightGray  cursor-pointer transition-colors"
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
          <label htmlFor={`radio-${item.id}`} className="cursor-pointer">
            {item.label}
          </label>
        </li>
      ))}
    </ul>
  );
}
