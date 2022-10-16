import { createContext, useContext, useState } from "react";
import { StyleClassProps } from "@/design_systems/mainds/types";

export type TabId = string | number | undefined;

/* ======================================================================= */
/* Tab Context */
/* ======================================================================= */

export interface Context {
  readonly activeTabId: TabId;
  readonly setActiveTabId: React.Dispatch<
    React.SetStateAction<TabId | undefined>
  >;
}

const TabContext = createContext<Context>({
  activeTabId: undefined,
  setActiveTabId: () => {
    /* empty */
  },
});

/* ======================================================================= */
/* Tabs */
/* ======================================================================= */

type TabsProps = StyleClassProps & {
  defaultTabId: TabId;
  // https://stackoverflow.com/a/60297147 : children as function or Node
  children?: React.ReactNode | ((x: { activeTabId: TabId }) => React.ReactNode);
};

export const Tabs = ({ defaultTabId, children }: TabsProps) => {
  const [activeTabId, setActiveTabId] = useState<TabId | undefined>(
    defaultTabId
  );

  return (
    <TabContext.Provider value={{ activeTabId, setActiveTabId }}>
      {typeof children === "function" ? children({ activeTabId }) : children}
    </TabContext.Provider>
  );
};

/* ======================================================================= */
/* Tab List */
/* ======================================================================= */

type TabListProps = StyleClassProps & {
  children?: React.ReactNode;
};

export const TabList = ({ children, ...styleClassProps }: TabListProps) => {
  return <div {...styleClassProps}>{children}</div>;
};

/* ======================================================================= */
/* Tab */
/* ======================================================================= */

type TabProps = StyleClassProps & {
  tabId?: TabId;
  children?: React.ReactNode;
};

export const Tab = ({ tabId, children, ...styleClassProps }: TabProps) => {
  const { setActiveTabId } = useContext(TabContext);

  return (
    <button
      onClick={() => {
        setActiveTabId(tabId);
      }}
      {...styleClassProps}
    >
      {children}
    </button>
  );
};

/* ======================================================================= */
/* Tab Panel */
/* ======================================================================= */

type TabPanelProps = StyleClassProps & {
  tabId?: TabId;
  children?: React.ReactNode;
};

export const TabPanel = ({
  tabId,
  children,
  ...styleClassProps
}: TabPanelProps) => {
  const { activeTabId } = useContext(TabContext);
  const isSelected = activeTabId === tabId;

  return isSelected ? <div {...styleClassProps}>{children}</div> : null;
};

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;
