import { IconProps } from "@/types/common";
import React from "react";

const HomeIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="23"
      height="25"
      viewBox="0 0 23 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M4 24C2.34315 24 1 22.7279 1 21.1587V10.2534C1 9.36666 1.43713 8.53074 2.18187 7.99333L9.68187 2.58125C10.7559 1.80625 12.2441 1.80625 13.3181 2.58125L20.8181 7.99333C21.5629 8.53074 22 9.36666 22 10.2534V21.1587C22 22.7279 20.6569 24 19 24H17.125C15.4681 24 14.125 22.7279 14.125 21.1587V16.7722C14.125 15.3991 12.9497 14.286 11.5 14.286C10.0503 14.286 8.875 15.3991 8.875 16.7722V19.143V21.1587C8.875 22.7279 7.53185 24 5.875 24H4Z" />
    </svg>
  );
};

export default HomeIcon;
