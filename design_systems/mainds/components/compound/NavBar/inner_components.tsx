import React from "react";
import NavBarStyles from "./NavBar.module.scss";
import { ComponentDisplayName } from "./NavBarUtils";

/* ======================================================================= */
/* NavBarLogo */
/* ======================================================================= */
export const NavBarLogo = ({ children }: { children?: React.ReactNode }) => {
  return <div className={NavBarStyles["nav-bar-logo"]}>{children}</div>;
};

NavBarLogo.displayName = `${ComponentDisplayName}.Logo`;

/* ======================================================================= */
/* NavBarItemGroup */
/* ======================================================================= */
export const NavBarItemGroup = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return <ul className={NavBarStyles["nav-bar-item-group"]}>{children}</ul>;
};

NavBarItemGroup.displayName = `${ComponentDisplayName}.ItemGroup`;

/* ======================================================================= */
/* NavBarItem */
/* ======================================================================= */
export const NavBarItem = ({ children }: { children?: React.ReactNode }) => {
  return <li className={NavBarStyles["nav-bar-item"]}>{children}</li>;
};

NavBarItem.displayName = `${ComponentDisplayName}.Item`;
