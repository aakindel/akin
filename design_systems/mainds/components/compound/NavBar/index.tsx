import useNewRefIfUndefined from "../../../hooks/useNewRefIfUndefined";
import React, { ForwardedRef, RefObject } from "react";
import { NavBarLogo, NavBarItemGroup, NavBarItem } from "./inner_components";
import {
  ComponentDisplayName,
  isNavBarLogoElement,
  isNavBarItemGroupElement,
  // isNavBarItemElement,
} from "./NavBarUtils";
import NavBarStyles from "./NavBar.module.scss";
import Container from "@/design_systems/mainds/components/Container";
import { ContainerType } from "../../Container/types";

export type NavBarProps = {
  id?: string;
  className?: string;
  bottomBorder?: boolean;
  innerContainerType?: ContainerType;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34757#issuecomment-488848720
export interface CompoundNavBar
  extends React.ForwardRefExoticComponent<
    NavBarProps & React.RefAttributes<HTMLElement>
  > {
  Logo: typeof NavBarLogo;
  ItemGroup: typeof NavBarItemGroup;
  Item: typeof NavBarItem;
}

const NavBar = React.forwardRef(
  (
    { className, bottomBorder, innerContainerType, children }: NavBarProps,
    ref: ForwardedRef<HTMLElement>
  ) => {
    // get passed in Logo
    const Logo = React.Children.toArray(children).filter((child) => {
      return isNavBarLogoElement(child);
    }) as React.ReactElement[];

    // get passed in ItemGroup (which should only contain passed in Items)
    const ItemGroup = React.Children.toArray(children).filter((child) => {
      return isNavBarItemGroupElement(child);
    }) as React.ReactElement[];

    // get passed in Item
    // const Item = React.Children.toArray(ItemGroup).filter((child) => {
    //   return isNavBarItemElement(child);
    // }) as React.ReactElement[];

    // get ref from prop
    const userRef = ref as RefObject<HTMLDivElement>;

    // create nav ref using either user ref or default ref
    const navRef = useNewRefIfUndefined({
      userRef,
    }) as RefObject<HTMLDivElement>;

    return (
      <div
        className={
          className
            ? `${className} ${NavBarStyles["nav-bar-scope"]}`
            : `${NavBarStyles["nav-bar-scope"]}`
        }
        ref={navRef}
      >
        {innerContainerType ? (
          <div
            className={
              bottomBorder
                ? `${NavBarStyles["nav-bar-container"]} ${NavBarStyles["bottom-border"]}`
                : `${NavBarStyles["nav-bar-container"]}`
            }
          >
            <Container type={innerContainerType}>
              <nav className={`${NavBarStyles["nav-bar"]}`}>
                {Logo}
                {ItemGroup}
              </nav>
            </Container>
          </div>
        ) : (
          <div
            className={
              bottomBorder
                ? `${NavBarStyles["nav-bar-container"]} ${NavBarStyles["bottom-border"]}`
                : `${NavBarStyles["nav-bar-container"]}`
            }
          >
            <nav className={`${NavBarStyles["nav-bar"]}`}>
              {Logo}
              {ItemGroup}
            </nav>
          </div>
        )}
      </div>
    );
  }
) as CompoundNavBar;

NavBar.displayName = ComponentDisplayName;

NavBar.Logo = NavBarLogo;
NavBar.ItemGroup = NavBarItemGroup;
NavBar.Item = NavBarItem;

export default NavBar;
