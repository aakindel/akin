// https://stackoverflow.com/a/42066099
export default function collapseString(value: string): string {
  return value.replace(/\n\s+/g, "").trim();
}
