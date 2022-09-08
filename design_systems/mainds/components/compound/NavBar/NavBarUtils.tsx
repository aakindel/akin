import { isElementOfType } from "../../../utils";
import { NavBarLogo, NavBarItemGroup, NavBarItem } from "./inner_components";

export const ComponentDisplayName = "MainDS.compound.NavBar";

export function isNavBarLogoElement(
  child: React.ReactNode
): child is React.ReactElement<{ children: React.ReactNode }> {
  return isElementOfType(child, NavBarLogo);
}

export function isNavBarItemGroupElement(
  child: React.ReactNode
): child is React.ReactElement<{ children: React.ReactNode }> {
  return isElementOfType(child, NavBarItemGroup);
}

export function isNavBarItemElement(
  child: React.ReactNode
): child is React.ReactElement<{ children: React.ReactNode }> {
  return isElementOfType(child, NavBarItem);
}
