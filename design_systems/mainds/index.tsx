import React from "react";
import DSStyles from "./styles/mainds.module.scss";

export type DSProviderProps = {
  children: React.ReactNode;
};

export default function DefaultDSProvider({ children }: DSProviderProps) {
  return <div className={DSStyles["main-ds"]}>{children}</div>;
}
