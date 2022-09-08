import React from "react";

type IconNames =
  | "arrow-narrow-left"
  | "external-link"
  | "mail"
  | "sun"
  | "moon";

type IconProps = {
  icon: IconNames;
  width?: number;
  className?: string;
  color?: string;
};

const outlineIcons: { [key in IconNames]: string } = {
  "arrow-narrow-left": "M7 16l-4-4m0 0l4-4m-4 4h18",
  "external-link":
    "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14",
  mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  sun: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
  moon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
};

// https://v1.heroicons.com/
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
