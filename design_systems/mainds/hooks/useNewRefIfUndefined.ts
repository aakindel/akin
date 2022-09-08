import React, { useRef } from "react";

const useNewRefIfUndefined = ({
  userRef,
}: {
  [key: string]: React.RefObject<HTMLElement> | null | undefined;
}) => {
  const defaultRef = useRef<HTMLElement>(null);
  const finalRef = userRef ? userRef : defaultRef;
  return finalRef;
};

export default useNewRefIfUndefined;
