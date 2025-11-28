import React from "react";

type IconProps = {
  className?: string;
  stroke?: string;
  fill?: string;
};

const PlayIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13.5288 8.24012C13.2199 9.41525 11.7586 10.2456 8.83525 11.9064C6.009 13.512 4.59588 14.3144 3.4575 13.9924C2.98566 13.8586 2.55643 13.6051 2.2115 13.2565C1.375 12.4121 1.375 10.775 1.375 7.49987C1.375 4.22475 1.375 2.58762 2.2115 1.74325C2.55653 1.39493 2.98575 1.14174 3.4575 1.00825C4.59588 0.684495 6.009 1.48775 8.83525 3.09337C11.7578 4.75412 13.2199 5.5845 13.5296 6.75962C13.6583 7.24473 13.6583 7.75501 13.5296 8.24012"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlayIcon;
