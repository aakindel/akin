// https://blog.maximeheckel.com/posts/building-a-design-system-from-scratch/#:~:text=isElementOfType%20utility%20function
// https://github.com/MaximeHeckel/design-system/blob/main/src/lib/utils/isElementOfType.ts
export function isElementOfType<P = Record<string, unknown>>(
  element: unknown,
  ComponentType: React.ComponentType<P>
): element is React.ReactElement<P> {
  const reactElement = element as React.ReactElement;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore ts complains about displayName not existing on `type`
  return reactElement?.type?.displayName === ComponentType.displayName;
}
