import styles from "@/styles/Main.module.css";
import ProgressBar from "./ProgressBar";
import Counter from "./Counter";
import Task from "./Task";
import PromoDetail from "./PromoDetail";
import { useSetting } from "@/context/settingContext";
import SettingPanel from "./SettingPanel";

export default function Main() {
  const {
    settingPanel
  } = useSetting()
  return (
    <div className={styles.container}> 
      <ProgressBar />
      <Counter />
      <Task />
      <PromoDetail />
    
      {
        settingPanel ? <SettingPanel /> : ""
      }

    </div>
  );
}
