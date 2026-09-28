import {
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
  useState,
} from "react";
import Tab from "./Tab";
import { TabsContext } from "./Tabs.context";
import { getPanelId, getTabId, getTabValue } from "./Tabs.utils";
import TabsProps, { TabProps } from "./types";
import styles from "./Tabs.module.scss";

const isTabElement = (child: ReactNode): child is ReactElement<TabProps> =>
  isValidElement<TabProps>(child);

function Tabs({
  variant = "pill",
  children,
  defaultValue,
  value,
  onChange,
}: TabsProps) {
  const tabChildren = Children.toArray(children).filter(isTabElement);
  if (tabChildren.length === 0) {
    throw new Error("Tabs must contain at least one Tabs.Tab child");
  }

  const [internalActiveTab, setInternalActiveTab] = useState<string>(
    () => defaultValue ?? getTabValue(tabChildren[0].props),
  );

  const activeTab = value ?? internalActiveTab;

  const handleSetActiveTab = (newTab: string) => {
    if (value === undefined) {
      setInternalActiveTab(newTab);
    }
    onChange?.(newTab);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const enabledTabs = tabChildren
      .filter((child) => !child.props.disabled)
      .map((child) => getTabValue(child.props));

    if (enabledTabs.length === 0) return;

    const focusedTab = document.activeElement?.id.replace("tab-", "");
    const currentIndex = focusedTab ? enabledTabs.indexOf(focusedTab) : 0;
    let nextIndex: number | null = null;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (currentIndex + 1) % enabledTabs.length;
        e.preventDefault();
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex =
          (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
        e.preventDefault();
        break;
      case "Home":
        nextIndex = 0;
        e.preventDefault();
        break;
      case "End":
        nextIndex = enabledTabs.length - 1;
        e.preventDefault();
        break;
      case "Tab": {
        const activeTabValue = tabChildren
          .map((child) => getTabValue(child.props))
          .find((v) => v.toLowerCase() === activeTab.toLowerCase());
        const tabpanel = document.getElementById(
          getPanelId(activeTabValue ?? activeTab),
        );
        if (tabpanel) {
          e.preventDefault();
          tabpanel.focus();
        }
        return;
      }
    }

    if (nextIndex !== null) {
      const tabElement = document.getElementById(
        getTabId(enabledTabs[nextIndex]),
      );
      tabElement?.focus();
    }
  };

  return (
    <div className={styles.tabsWrapper}>
      <div
        className={`${styles.tabsContainer} ${styles[variant]}`}
        role="tablist"
        onKeyDown={handleKeyDown}
      >
        <TabsContext.Provider
          value={{
            activeTab,
            setActiveTab: handleSetActiveTab,
            variant,
          }}
        >
          {children}
        </TabsContext.Provider>
      </div>
      {tabChildren.map((child) => {
        if (!child.props.children) return null;
        const tabValue = getTabValue(child.props);
        const isActive = activeTab.toLowerCase() === tabValue.toLowerCase();
        if (!isActive) return null;
        return (
          <div
            key={tabValue}
            role="tabpanel"
            id={getPanelId(tabValue)}
            aria-labelledby={getTabId(tabValue)}
            tabIndex={-1}
          >
            {child.props.children}
          </div>
        );
      })}
    </div>
  );
}

Tabs.Tab = Tab;

export default Tabs;
