import { createContext, useContext } from "react";
import type { TabsContextProps } from "./types";

export const TabsContext = createContext<TabsContextProps | null>(null);

export function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tab must be used within a Tabs component");
  }
  return context;
}
