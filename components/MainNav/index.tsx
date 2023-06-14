import AppLogoSvg from "@/components/AppLogo";
import { Button } from "@/components/Button";
import ThemeChanger from "@/components/ThemeChanger";
import Link from "next/link";
import React from "react";

const MainNav = () => {
  return (
    <div className="mx-auto flex h-[60px] w-full max-w-7xl flex-wrap items-center justify-between px-6 sm:px-8">
      <div className="flex h-[60px] items-center justify-center">
        <Link href="/">
          <AppLogoSvg />
        </Link>
      </div>
      <ul className="flex list-none items-center gap-4 sm:gap-6">
        <li className="block">
          <Button variant="ghost" className="whitespace-nowrap" asChild>
            <Link href="/mini-projects">Mini Projects</Link>
          </Button>
        </li>
        <li className="block">
          <ThemeChanger />
        </li>
      </ul>
    </div>
  );
};

export default MainNav;
