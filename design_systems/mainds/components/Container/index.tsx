import React from "react";
import ContainerStyles from "./Container.module.scss";
import { ContainerType } from "./types";

export type ContainerProps = {
  type?: ContainerType;
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
