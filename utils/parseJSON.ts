export default function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === "undefined" ? undefined : JSON.parse(value ?? "");
  } catch {
    console.warn("parseJSON: parsing error on", { value });
    return undefined;
  }
}
