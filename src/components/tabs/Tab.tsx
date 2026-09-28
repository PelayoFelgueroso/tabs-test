import Badge from "../badge/Badge";
import { useTabsContext } from "./Tabs.context";
import styles from "./Tabs.module.scss";
import { getPanelId, getTabId, getTabValue } from "./Tabs.utils";
import type { TabProps } from "./types";

function Tab({ badge, disabled, label, value }: TabProps) {
  const { activeTab, setActiveTab, variant } = useTabsContext();
  const tabValue = getTabValue({ value, label });
  const isSelected = activeTab.toLowerCase() === tabValue.toLowerCase();

  const handleClick = () => {
    if (disabled) return;
    setActiveTab(tabValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    // Activate tab on Enter or Space (roving tabindex pattern)
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveTab(tabValue);
    }
  };

  return (
    <button
      type="button"
      id={getTabId(tabValue)}
      role="tab"
      disabled={disabled}
      aria-disabled={disabled}
      aria-selected={isSelected}
      aria-controls={getPanelId(tabValue)}
      tabIndex={isSelected ? 0 : -1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`${styles.tab} ${styles[variant]} ${isSelected ? styles.selected : ""} ${disabled ? styles.disabled : ""}`}
    >
      <span className={styles.label}>{label}</span>
      {badge && <Badge {...badge} />}
      {variant === "underline" && (
        <span
          className={`${styles.line} ${isSelected ? styles.selected : ""}`}
        />
      )}
    </button>
  );
}

export default Tab;
