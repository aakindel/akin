"use client";

import React from "react";
import Image, { ImageProps as NextImageProps } from "next/image";
import { useTheme } from "next-themes";
import useHasWindow from "@/hooks/useHasWindow";
import { cn } from "../../utils";

type ThemedImageProps = Omit<NextImageProps, "src" | "alt"> & {
  srcLight?: string;
  srcDark?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
  alt: string;
};

const ThemedImage = ({
  srcLight = "",
  srcDark = "",
  className,
  imageClassName,
  style,
  width = 2880,
  height = 1645,
  alt,
  ...props
}: ThemedImageProps) => {
  const hasWindow = useHasWindow();

  const { resolvedTheme } = useTheme();
  let src;

  switch (resolvedTheme) {
    case "light":
      src = srcLight ? srcLight : srcDark;
      break;
    case "dark":
      src = srcDark ? srcDark : srcLight;
      break;
    default:
      src = "";
      break;
  }

  return hasWindow ? (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("h-auto max-w-full", className, imageClassName)}
      {...props}
      style={{
        ...style,
      }}
    />
  ) : (
    <div
      className={cn("h-auto max-w-full", className)}
      style={{
        aspectRatio: `${width}  / ${height}`,
        ...style,
      }}
    />
  );
};

export default ThemedImage;
