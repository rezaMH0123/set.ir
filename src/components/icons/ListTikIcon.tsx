import { IconProps } from "@/types/common";
import React from "react";

const ListTikIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.5 5.5L4 7L7 4M2.5 12.5L4 14L7 11M2.5 19.5L4 21L7 18M10.5 12.5H21.5M10.5 19.5H21.5M10.5 5.5H21.5"
        stroke="#262626"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ListTikIcon;
