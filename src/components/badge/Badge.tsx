import BadgeProps from "./types";
import styles from "./Badge.module.scss";

function Badge({ label, variant = "neutral" }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[variant]}`}>{label}</span>;
}

export default Badge;
