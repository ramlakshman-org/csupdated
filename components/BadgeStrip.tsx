import styles from "./BadgeStrip.module.css";

const badges = [
  { label: "Azure Expert MSP", color: "#0078D4" },
  { label: "Microsoft Solutions Partner", color: "#0078D4" },
  { label: "ISO 27001 Certified", color: "#2E7D32" },
  { label: "SOC 2 Type II", color: "#2E7D32" },
];

export default function BadgeStrip() {
  return (
    <div className={styles.strip} aria-label="Certifications">
      {badges.map((badge) => (
        <span
          key={badge.label}
          className={styles.badge}
          style={{ borderLeftColor: badge.color }}
        >
          <span className={styles.check} style={{ color: badge.color }}>✓</span>
          {badge.label}
        </span>
      ))}
    </div>
  );
}
