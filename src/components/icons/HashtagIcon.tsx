import { IconProps } from "@/types/common";
import React from "react";

const HashtagIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.5417 6.70703L7.66667 16.2904M15.3333 6.70703L12.4583 16.2904M17.25 9.58203H6.70833M16.2917 13.4154H5.75"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.0837 11.4993C21.0837 16.0169 21.0837 18.2757 19.6797 19.6787C18.2777 21.0827 16.0179 21.0827 11.5003 21.0827C6.98274 21.0827 4.72395 21.0827 3.31999 19.6787C1.91699 18.2767 1.91699 16.0169 1.91699 11.4993C1.91699 6.98177 1.91699 4.72297 3.31999 3.31902C4.72491 1.91602 6.98274 1.91602 11.5003 1.91602C16.0179 1.91602 18.2767 1.91602 19.6797 3.31902C20.6131 4.25243 20.9255 5.56439 21.0309 7.66602"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default HashtagIcon;
