import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";
import Link, { LinkProps } from "next/link";

const AppLinkVariants = cva(
  "rounded-sm disabled:opacity-50 disabled:pointer-events-none transition-colors",
  {
    variants: {
      variant: {
        default:
          "text-neutral-700 underline decoration-neutral-500 underline-offset-4 hover:decoration-neutral-700 dark:text-neutral-300 dark:decoration-neutral-400 hover:dark:decoration-neutral-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AppLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    LinkProps,
    VariantProps<typeof AppLinkVariants> {
  openInNewTab?: boolean;
}

const AppLink = React.forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ className, variant, openInNewTab, ...props }, ref) => {
    return (
      <Link
        className={cn(AppLinkVariants({ variant, className }))}
        ref={ref}
        {...props}
        target={
          openInNewTab ? "_blank" : props?.target ? props?.target : "_self"
        }
      />
    );
  }
);
AppLink.displayName = "AppLink";

export { AppLink, AppLinkVariants };
