import parseJSON from "./parseJSON";

export function readLocalStorageValue(
  storageKey: string,
  noParse?: boolean
): string | null | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const item = localStorage.getItem(storageKey);
    return noParse ? item : parseJSON(item);
  } catch (error) {
    console.warn(`Error reading localStorage key “${storageKey}”:`, error);
    return undefined;
  }
}

export function setLocalStorageValue(
  storageKey: string,
  value: string,
  noParse?: boolean
) {
  if (typeof window === "undefined") {
    console.warn(
      `Tried setting localStorage key “${storageKey}” even though environment is not a client`
    );
    return;
  }

  try {
    return noParse
      ? localStorage.setItem(storageKey, value)
      : localStorage.setItem(storageKey, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error storing localStorage key “${storageKey}”:`, error);
  }
}
