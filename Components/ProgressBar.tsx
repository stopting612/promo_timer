import styles from "@/styles/ProgressBar.module.css";
import { useSetting } from "@/context/settingContext";

export default function ProgressBar() {
  const { percentage } = useSetting();
  return (
    <div className={styles.progress_bar_container}> 
      <div style={{width: percentage ? percentage : 0}}className={styles.progress_bar}></div>
    </div>
  );
}
