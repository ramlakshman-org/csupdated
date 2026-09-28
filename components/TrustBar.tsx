import { company } from "@/lib/data";
import styles from "./TrustBar.module.css";

export default function TrustBar() {
  return (
    <div className={styles.bar} aria-label="Certifications and partnerships">
      <ul className={styles.list}>
        {company.trust.map((item) => (
          <li key={item} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
