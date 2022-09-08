import {
  readLocalStorageValue,
  setLocalStorageValue,
} from "@/utils/localStorage";
import { Dispatch, SetStateAction, useState } from "react";

// https://usehooks.com/useLocalStorage/
// https://usehooks-ts.com/react-hook/use-local-storage
export default function useLocalStorageState<T>(
  storageKey: string,
  initialValue: T,
  noParse = false
): [T, Dispatch<SetStateAction<T>>] {
  // if (typeof window !== "undefined") {
  //   localStorage.setItem(storageKey, "undefined");
  // }
  const retrievedValue = readLocalStorageValue(storageKey, noParse);
  // console.log(retrievedValue);

  const [storedValue, setStoredValue] = useState<T>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (retrievedValue as unknown as T) || (initialValue as T)
  );

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    // Allow value to be a function so we have the same API as useState
    const newValue = value instanceof Function ? value(storedValue) : value;

    // Save to local storage
    setLocalStorageValue(storageKey, newValue as unknown as string, noParse);
    // console.log("saving", storageKey);

    // Save state
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
}
