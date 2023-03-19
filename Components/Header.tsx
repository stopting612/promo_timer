import styles from "@/styles/Header.module.css";
import Image from "next/image";
import { useSetting } from "@/context/settingContext";


export default function Header() {  
  const {
    setSettingPanel
  } = useSetting()

  function handleSettingClick(){
    setSettingPanel(true);
  }
  return (
    <div className={styles.menu_inner_box}>
      <div className={styles.logo}>FocusTimer</div>
      <div className={styles.icon_menu}>
        <button className={styles.icon_button}>
          <Image src="/graph-white.png" alt="" width={18} height={18}></Image>
          <div className={styles.button_title}>Report</div>
        </button>
        <button className={styles.icon_button} onClick={handleSettingClick}>
          <Image src="/config-white.png" alt="" width={18} height={18}></Image>
          <div className={styles.button_title}>Setting</div>
        </button>
        <button className={styles.icon_button}>
          <Image src="/user-white.png" alt="" width={18} height={18}></Image>
          <div className={styles.button_title}>Login</div>
        </button>
      </div>
    </div>
  );
}
