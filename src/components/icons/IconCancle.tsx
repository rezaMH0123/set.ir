import React from "react";

type IconProps = {
  className?: string;
  stroke?: string;
  fill?: string;
  onClick?: () => void;
};

const IconCancle: React.FC<IconProps> = ({ className, fill, onClick }) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.4153 5.88458C17.7749 5.52551 17.7752 4.9428 17.4158 4.58344C17.0565 4.22409 16.4738 4.22432 16.1147 4.58396L10.9991 9.70762L5.8836 4.58396C5.52453 4.22432 4.94183 4.22409 4.58247 4.58344C4.22311 4.9428 4.22334 5.52551 4.58298 5.88458L9.70664 11.0001L4.58298 16.1157C4.22334 16.4747 4.22311 17.0574 4.58247 17.4168C4.94182 17.7762 5.52453 17.7759 5.8836 17.4163L10.9991 12.2926L16.1147 17.4163C16.4738 17.7759 17.0565 17.7762 17.4158 17.4168C17.7752 17.0574 17.7749 16.4747 17.4153 16.1157L12.2916 11.0001L17.4153 5.88458Z"
        fill={fill}
      />
    </svg>
  );
};

export default IconCancle;
