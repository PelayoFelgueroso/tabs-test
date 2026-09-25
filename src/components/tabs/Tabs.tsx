import {
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import Tab from "./Tab";
import { TabsContext } from "./Tabs.context";
import TabsProps, { TabProps } from "./types";
import styles from "./Tabs.module.scss";

const isTabElement = (child: ReactNode): child is ReactElement<TabProps> =>
  isValidElement<TabProps>(child);

function Tabs({
  variant = "pill",
  children,
  defaultSelectedTab,
  selectedTab,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState<string>(
    selectedTab ??
      defaultSelectedTab ??
      (Children.toArray(children)[0] as ReactElement<TabProps>).props.label,
  );

  const handleSetActiveTab = (value: string) => {
    setActiveTab(value);
  };

  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);

  return (
    <>
      <div
        className={`${styles.tabsContainer} ${styles[variant]}`}
        role="tablist"
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
      {Children.map(children, (child) =>
        isTabElement(child) && child.props.label === activeTab
          ? child.props.children
          : null,
      )}
    </>
  );
}

Tabs.Tab = Tab;

export default Tabs;
