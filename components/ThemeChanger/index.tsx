import useHasWindow from "@/hooks/useHasWindow";
import { useTheme } from "@/lib/next-themes-lib";
import React from "react";
import IconButton from "../IconButton";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  const hasWindow = useHasWindow();

  const changeTheme = () =>
    setTheme(
      theme === "system"
        ? "mds-dark"
        : theme === "mds-light"
        ? "mds-dark"
        : "mds-light"
    );

  return hasWindow ? (
    <React.Fragment>
      {theme === "system" ? (
        <IconButton icon="sun" onClick={changeTheme} />
      ) : theme === "mds-light" ? (
        <IconButton icon="sun" onClick={changeTheme} />
      ) : (
        <IconButton icon="moon" onClick={changeTheme} />
      )}
    </React.Fragment>
  ) : (
    <div style={{ width: "36px", height: "36px" }}></div>
  );
};

export default ThemeChanger;
