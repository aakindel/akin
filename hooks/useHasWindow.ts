import { useState, useEffect } from "react";

function useHasWindow(): boolean {
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    setHasWindow(true);
  }, [hasWindow]);

  return hasWindow;
}

export default useHasWindow;

/*
  the function below still causes hydration errors for some reason.
  - https://marcoghiani.com/blog/react-custom-hooks-uselocalstorage
  - https://stackoverflow.com/a/66374800; https://lihautan.com/hydrating-text-content/
*/

// function hasWindow(): boolean {
//   return typeof window !== "undefined";
// }
