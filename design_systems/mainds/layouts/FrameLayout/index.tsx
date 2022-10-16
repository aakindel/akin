/* adapted from:
   - https://blog.andriishupta.dev/cross-origin-iframe-communication-with-window-post-message
   - https://github.com/andriishupta/cross-origin-iframe-communication-with-nextjs/blob/main/packages/parent-app/pages/index.tsx
   - https://github.com/andriishupta/cross-origin-iframe-communication-with-nextjs/blob/main/packages/child-app/pages/index.tsx
*/

import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type MessageFromParent = {
  type: "px-height-from-parent";
  value: string | number;
};

type MessageFromChild = {
  type: "doc-height-from-child";
  value: string | number;
};

type DefaultFPLayoutProps = {
  framePxHeight?: number;
  defaultPxHeight?: number;
  children?:
    | React.ReactNode
    | ((x: {
        iframeRef: RefObject<HTMLIFrameElement>;
        iframeHeight: number;
      }) => React.ReactNode);
  childURL: string;
};

type DefaultFCLayoutProps = {
  children?:
    | React.ReactNode
    | ((x: { childHeight: number }) => React.ReactNode);
  parentURL: string;
};

const FRAME_DEFAULT_HEIGHT = 450;

const getOriginFromURL = (userURL: string) => {
  return userURL.startsWith("https://") || userURL.startsWith("http://")
    ? new URL(userURL).origin
    : userURL;
};

/* ======================================================================= */
/* Frame Parent Layouts */
/* ======================================================================= */

export const DefaultFPLayout = ({
  framePxHeight,
  defaultPxHeight,
  children,
  childURL,
}: DefaultFPLayoutProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [shouldSendHeightMsg, setShouldSendHeightMsg] = useState<boolean>(true);
  const [iframeHeight, setIframeHeight] = useState<number>(
    framePxHeight
      ? framePxHeight
      : defaultPxHeight
      ? defaultPxHeight
      : FRAME_DEFAULT_HEIGHT
  );

  const postMessageToChild = useCallback(
    (message: MessageFromParent) => {
      iframeRef.current?.contentWindow?.postMessage(message, childURL);
    },
    [childURL]
  );

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      // skip messages from unexpected origins
      if (event.origin !== getOriginFromURL(childURL)) {
        return;
      }

      /* HANDLE POSTING MESSAGES TO FRAME CHILD */
      /* sending messages in the handler for the message listener 
         ensures that messages will be sent after the child iframe 
         is loaded, which avoids the postMessage error due to an unloaded
         iframe from appearing (https://stackoverflow.com/a/22379990) */

      if (
        iframeRef.current?.contentWindow &&
        shouldSendHeightMsg &&
        framePxHeight
      ) {
        postMessageToChild({
          type: "px-height-from-parent",
          value: framePxHeight,
        });
        setShouldSendHeightMsg(false);
      }

      /* HANDLE RECEIVING MESSAGES FROM FRAME CHILD */

      const message: MessageFromChild = event.data;

      if (message?.type === "doc-height-from-child" && !framePxHeight) {
        setIframeHeight(message.value as number);
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [childURL, framePxHeight, postMessageToChild, shouldSendHeightMsg]);

  return (
    <React.Fragment>
      {typeof children === "function"
        ? children({ iframeRef, iframeHeight })
        : children}
    </React.Fragment>
  );
};

/* ======================================================================= */
/* Frame Child Layouts */
/* ======================================================================= */

export const DefaultFCLayout = ({
  children,
  parentURL,
}: DefaultFCLayoutProps) => {
  const [framePxHeight, setFramePxHeight] = useState<number | null>(null);
  const [docHeight, setDocHeight] = useState<number | null>(null);

  const postMessageToParent = useCallback(
    (message: MessageFromChild) => {
      // https://stackoverflow.com/a/47305856 : avoid postMessage error
      if (window.location !== window.parent.location) {
        window.parent.postMessage(message, parentURL);
      }
    },
    [parentURL]
  );

  useEffect(() => {
    window.document.body.style.overflowY = "hidden";
  }, []);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      // skip messages from unexpected origins
      if (event.origin !== getOriginFromURL(parentURL)) {
        return;
      }

      const message: MessageFromParent = event.data;

      if (message?.type === "px-height-from-parent") {
        setFramePxHeight(message.value as number);
        window.document.body.style.height = `${message.value as number}px`;
        setDocHeight(message.value as number);
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [parentURL]);

  useEffect(() => {
    setDocHeight(window.document.body.offsetHeight);
  }, [docHeight, setDocHeight]);

  useEffect(() => {
    if (!framePxHeight && docHeight) {
      postMessageToParent({
        type: "doc-height-from-child",
        value: docHeight,
      });
    }
  }, [docHeight, framePxHeight, postMessageToParent, setDocHeight]);

  const childHeight = framePxHeight
    ? framePxHeight
    : docHeight
    ? docHeight
    : FRAME_DEFAULT_HEIGHT;

  return (
    <React.Fragment>
      {typeof children === "function" ? children({ childHeight }) : children}
    </React.Fragment>
  );
};
