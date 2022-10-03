import useHasWindow from "@/hooks/useHasWindow";
import { useTheme } from "next-themes";
import React from "react";
import IconButton from "../IconButton";

const ThemeChanger = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const hasWindow = useHasWindow();

  const changeTheme = () =>
    setTheme(
      resolvedTheme === "light" || resolvedTheme === "mds-light"
        ? "mds-dark"
        : "mds-light"
    );

  return hasWindow ? (
    <React.Fragment>
      {resolvedTheme === "light" || resolvedTheme === "mds-light" ? (
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
