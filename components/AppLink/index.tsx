import Link from "next/link";
import React from "react";

type AppLinkProps = {
  href?: string;
  openInNewTab?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const AppLink = ({
  href = "#",
  openInNewTab,
  className,
  style,
  children,
}: AppLinkProps) => {
  const isInternalLink = href.startsWith("/");
  const target = openInNewTab ? "_blank" : "_self";

  return isInternalLink ? (
    <Link href={href}>
      <a className={className} target={target} style={style}>
        {children}
      </a>
    </Link>
  ) : (
    <a href={href} target={target} className={className} style={style}>
      {children}
    </a>
  );
};

export default AppLink;
