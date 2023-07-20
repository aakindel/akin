"use client";

import React from "react";
import { type MiniProject, type Project } from "@/.contentlayer/generated";
import { cn } from "../../utils";

const getSrc = ({
  srcLight: argSrcLight = undefined,
  srcDark: argSrcDark = undefined,
  srcLightMicro: argSrcLightMicro = undefined,
  srcDarkMicro: argSrcDarkMicro = undefined,
}: {
  project?: Project;
  miniProject?: MiniProject;
  srcLight?: string;
  srcDark?: string;
  srcLightMicro?: string;
  srcDarkMicro?: string;
}) => {
  const srcLight = argSrcLight
    ? argSrcLight
    : argSrcDark
    ? argSrcDark
    : argSrcLightMicro
    ? argSrcLightMicro
    : argSrcDarkMicro
    ? argSrcDarkMicro
    : "";
  const srcDark = argSrcDark
    ? argSrcDark
    : argSrcLight
    ? argSrcLight
    : argSrcLightMicro
    ? argSrcLightMicro
    : argSrcDarkMicro
    ? argSrcDarkMicro
    : "";
  const srcLightMicro = argSrcLightMicro
    ? argSrcLightMicro
    : argSrcDarkMicro
    ? argSrcDarkMicro
    : "";
  const srcDarkMicro = argSrcDarkMicro
    ? argSrcDarkMicro
    : argSrcLightMicro
    ? argSrcLightMicro
    : "";
  return { srcLight, srcDark, srcLightMicro, srcDarkMicro };
};

type ThemedImageProps = {
  project?: Project;
  miniProject?: MiniProject;
  srcLight?: string;
  srcDark?: string;
  srcLightMicro?: string;
  srcDarkMicro?: string;
  className?: string;
  style?: React.CSSProperties;
  imageClassName?: string;
  width?: number;
  height?: number;
  alt: string;
};

const ThemedImage = ({
  project,
  miniProject,
  srcLight: argSrcLight,
  srcDark: argSrcDark,
  srcLightMicro: argSrcLightMicro,
  srcDarkMicro: argSrcDarkMicro,
  className,
  imageClassName,
  style,
  width = 2880,
  height = 1645,
  alt,
}: ThemedImageProps) => {
  const { srcLight, srcDark, srcLightMicro, srcDarkMicro } = getSrc({
    srcLight: argSrcLight
      ? argSrcLight
      : project?.featuredImageLight
      ? project?.featuredImageLight
      : miniProject?.featuredImageLight,
    srcDark: argSrcDark
      ? argSrcDark
      : project?.featuredImageDark
      ? project?.featuredImageDark
      : miniProject?.featuredImageDark,
    srcLightMicro: argSrcLightMicro
      ? argSrcLightMicro
      : project?.featuredImageLightMicro
      ? project?.featuredImageLightMicro
      : miniProject?.featuredImageLightMicro,
    srcDarkMicro: argSrcDarkMicro
      ? argSrcDarkMicro
      : project?.featuredImageDarkMicro
      ? project?.featuredImageDarkMicro
      : miniProject?.featuredImageDarkMicro,
  });

  return (
    <div
      className={cn("relative h-auto max-w-full overflow-hidden", className)}
      style={{
        aspectRatio: `${width}  / ${height}`,
        ...style,
      }}
    >
      {srcLightMicro && (
        <picture className="overflow-hidden">
          <img
            className="absolute bottom-0 left-0 right-0 top-0 block h-full w-full overflow-hidden object-cover backdrop-blur-[32px] dark:hidden"
            alt={alt}
            src={srcLightMicro}
          ></img>
        </picture>
      )}
      <picture className="overflow-hidden">
        <img
          className={cn(
            "relative block h-auto w-full max-w-full overflow-hidden object-cover dark:hidden",
            imageClassName
          )}
          alt={alt}
          src={srcLight}
        ></img>
      </picture>
      {srcDarkMicro && (
        <picture className="overflow-hidden">
          <img
            className="absolute bottom-0 left-0 right-0 top-0 hidden h-full w-full overflow-hidden object-cover backdrop-blur-[32px] dark:block"
            alt={alt}
            src={srcDarkMicro}
          ></img>
        </picture>
      )}
      <picture className="overflow-hidden">
        <img
          className={cn(
            "relative hidden h-auto w-full max-w-full overflow-hidden object-cover dark:block",
            imageClassName
          )}
          alt={alt}
          src={srcDark}
        ></img>
      </picture>
    </div>
  );
};

export default ThemedImage;
