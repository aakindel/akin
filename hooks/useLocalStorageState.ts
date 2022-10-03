import {
  readLocalStorageValue,
  setLocalStorageValue,
} from "@/utils/localStorage";
import { Dispatch, SetStateAction, useState } from "react";

// https://usehooks.com/useLocalStorage/
// https://usehooks-ts.com/react-hook/use-local-storage
export default function useLocalStorageState<T>(
  storageKey: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const retrievedValue = readLocalStorageValue(storageKey);

  const [storedValue, setStoredValue] = useState<T>(
    (retrievedValue as unknown as T) || (initialValue as T)
  );

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    // Allow value to be a function so we have the same API as useState
    const newValue = value instanceof Function ? value(storedValue) : value;

    // Save to local storage
    setLocalStorageValue(storageKey, newValue as unknown as string);
    // console.log("saving", storageKey);

    // Save state
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
}
