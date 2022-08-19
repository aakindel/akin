import React from "react";

type IconNames = "external-link" | "mail";

type IconProps = {
  icon: IconNames;
  width?: number;
  className?: string;
  color?: string;
};

const outlineIcons: { [key in IconNames]: string } = {
  "external-link":
    "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14",
  mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
};

// https://heroicons.com/
const HeroIcons = ({ icon, width = 24, className, color }: IconProps) => {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke={color ? color : "currentColor"}
      strokeWidth={2}
      width={`${width}px`}
      height={`${width}px`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={outlineIcons[icon]}
      />
    </svg>
  );
};

export default HeroIcons;
