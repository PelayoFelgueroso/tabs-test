import Badge from "../badge/Badge";
import { useTabsContext } from "./Tabs.context";
import styles from "./Tabs.module.scss";
import type { TabProps } from "./types";

function Tab({ badge, disabled, label }: TabProps) {
  const { activeTab, setActiveTab, variant } = useTabsContext();
  const isSelected = activeTab === label;

  const handleClick = () => {
    setActiveTab(label);
  };

  return (
    <>
      <button
        type="button"
        role="tab"
        aria-selected={isSelected}
        aria-controls={`tabpanel-${label}`}
        onClick={handleClick}
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
    </>
  );
}

export default Tab;
