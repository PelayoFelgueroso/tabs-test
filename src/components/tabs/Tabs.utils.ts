import type { TabProps } from "./types";

export const getTabValue = ({
  value,
  label,
}: Pick<TabProps, "value" | "label">) => value ?? label;

export const getTabId = (tabValue: string) => `tab-${tabValue}`;

export const getPanelId = (tabValue: string) => `tabpanel-${tabValue}`;
