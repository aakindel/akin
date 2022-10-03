import parseJSON from "./parseJSON";

export function readLocalStorageValue(
  storageKey: string
): string | null | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const item = localStorage.getItem(storageKey);
    return parseJSON(item);
  } catch (error) {
    console.warn(`Error reading localStorage key “${storageKey}”:`, error);
    return undefined;
  }
}

export function setLocalStorageValue(storageKey: string, value: string) {
  if (typeof window === "undefined") {
    console.warn(
      `Tried setting localStorage key “${storageKey}” even though environment is not a client`
    );
    return;
  }

  try {
    return localStorage.setItem(storageKey, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error storing localStorage key “${storageKey}”:`, error);
  }
}
