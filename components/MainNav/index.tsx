import MainNavStyles from "./MainNav.module.scss";
import NavBar, { NavBarProps } from "@mainds/components/compound/NavBar";
import AppLink from "@/components/AppLink";
import AppLogo from "../AppLogo";

type MainNavProps = NavBarProps;

const MainNav = ({ ...NavBarProps }: MainNavProps) => {
  const defaultNavProps: NavBarProps = NavBarProps.innerContainerType
    ? NavBarProps
    : {
        ...NavBarProps,
        innerContainerType: "screen-md",
      };

  return (
    <NavBar className={MainNavStyles["main-nav-scope"]} {...defaultNavProps}>
      <NavBar.Logo>
        <AppLink href="/" style={{ height: "24px" }}>
          <AppLogo />
        </AppLink>
      </NavBar.Logo>
    </NavBar>
  );
};

export default MainNav;
