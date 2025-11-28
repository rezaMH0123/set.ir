"use client";

import { useState } from "react";

type Option = {
  label: string;
  value: string;
};

type ToggleBoxProps = {
  className?: string;
  currentType: string;
  options: Option[];
  handleClick: (value: string) => void;
};

export default function ToggleBox({
  className,
  currentType,
  options,
  handleClick,
}: ToggleBoxProps) {
  const [selectedType, setSelectedType] = useState(currentType || "notes");

  const clickHandler = (value: string) => {
    if (selectedType !== value) {
      setSelectedType(value);
      handleClick(value);
    }
  };

  return (
    <div className={`inline-flex rounded-3xl bg-blue1 p-1.5 ${className}`}>
      {options.map((opt) => {
        const isActive = selectedType === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => clickHandler(opt.value)}
            className={`px-2 md:px-5 py-2 text-xs md:text-sm  rounded-3xl min-w-20 ${
              isActive
                ? "bg-white text-black2 text-[12px] md:text-[16px] font-semibold"
                : "bg-transparent text-white "
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
