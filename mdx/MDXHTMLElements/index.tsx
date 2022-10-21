import { HTMLAttributes } from "react";
import MDXStyles from "./mdx-prose.module.scss";
import React from "react";
import AppLink, { AppLinkProps } from "@/components/AppLink";
import Image from "next/image";

export const MDXAppLink = (props: AppLinkProps) => {
  const { className } = props;
  return (
    <AppLink className={`${MDXStyles["prose-link"]} ${className}`} {...props} />
  );
};

export const MDXFeaturedImage = ({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) => {
  return (
    // https://www.reddit.com/r/nextjs/comments/vhujbf/comment/idbql9r/
    <div className={MDXStyles["featured-img-container"]}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        layout="responsive"
        objectFit="cover"
      />
    </div>
  );
};

const MDXHTMLElements = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={MDXStyles["prose-h1"]} {...props} />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={MDXStyles["prose-h2"]} {...props} />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={MDXStyles["prose-h3"]} {...props} />
  ),
  h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className={MDXStyles["prose-h4"]} {...props} />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className={MDXStyles["prose-body"]} {...props} />
  ),
  a: (props: HTMLAttributes<HTMLElement>) => (
    <a className={MDXStyles["prose-link"]} {...props} />
  ),
  blockquote: (props: HTMLAttributes<HTMLElement>) => (
    <blockquote className={MDXStyles["prose-blockquote"]} {...props} />
  ),
  strong: (props: HTMLAttributes<HTMLElement>) => (
    <strong className={MDXStyles["prose-strong"]} {...props} />
  ),
  ol: (props: HTMLAttributes<HTMLElement>) => (
    <ol className={MDXStyles["prose-ol"]} {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLElement>) => (
    <ul className={MDXStyles["prose-ul"]} {...props} />
  ),
  li: (props: HTMLAttributes<HTMLElement>) => (
    <li className={MDXStyles["prose-li"]} {...props} />
  ),
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code className={MDXStyles["prose-code"]} {...props} />
  ),
};

export default MDXHTMLElements;
