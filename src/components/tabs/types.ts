import type { ReactNode } from "react";
import type BadgeProps from "../badge/types";

export type TabsVariant = "pill" | "underline";

export interface TabsContextProps {
  /* The currently active tab */
  activeTab: string;
  /* Function to set the active tab */
  setActiveTab: (tab: string) => void;
  /* The visual variant of the tabs container */
  variant: TabsVariant;
}

export interface TabProps {
  /* The badge content to display inside the tab */
  badge?: BadgeProps;
  /* The content to display in the tab panel */
  children?: React.ReactNode;
  /* Whether the tab is disabled */
  disabled?: boolean;
  /* The label text displayed in the tab */
  label: string;
  /* The click handler for the tab */
  onClick?: () => void;
}

interface TabsProps {
  /* Contains one or more Tabs.Tab components */
  children: ReactNode;
  /** The tab that should be selected by default (only used for uncontrolled behaviour) */
  defaultSelectedTab?: string;
  /** The tab that is currently selected (controlled behaviour) */
  selectedTab?: string;
  /* The visual style of the tabs */
  variant?: TabsVariant;
}
export default TabsProps;
