import React from "react";
import ContainerStyles from "./Container.module.scss";

export type ContainerProps = {
  type?:
    | "none"
    | "tightest"
    | "tighter"
    | "tight"
    | "normal"
    | "wide"
    | "wider"
    | "widest"
    | "full"
    | "screen-xs"
    | "screen-sm"
    | "screen-md"
    | "screen-lg"
    | "screen-xl";
  children?: React.ReactNode;
};

const Container = ({ type = "normal", children }: ContainerProps) => {
  return (
    <>
      <div className={ContainerStyles[type]}>{children}</div>
    </>
  );
};

export default Container;
