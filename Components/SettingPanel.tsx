import styles from "@/styles/SettingPanel.module.css";
import Image from "next/image";
import { useSetting } from "@/context/settingContext";

export default function SettingPanel() {
  const { setSettingPanel, pomodoro, setPomodoro, shortBreak, setShortBreak, longBreak, setLongBreak } = useSetting();

  function handleCloseSettingPanel(){
        setSettingPanel(false);
  }
  return (
    <div className={styles.settingPanelContainer}>
      <div className={styles.settingPanelMain} >
        <Image
          src="/remove-black-sm.png"
          alt=""
          width={14}
          height={14}
          className={styles.removeIcon}
          onClick={handleCloseSettingPanel}
        ></Image>
        <div className={styles.settingPanel}>
          <div className={styles.title}>Setting</div>
          <div className={styles.setting_container}>
            <div className={styles.container}>
              <div className={styles.time_title} >
                <Image
                  src="/clock-black.png"
                  alt=""
                  width={16}
                  height={16}
                  className={styles.timerIcon}
                ></Image>
                Timer
              </div>
              <div className={styles.timer_container}>
                <div className={styles.timer_setting_container}>
                  <span className={styles.timer_setting_title}>
                    Time (minutes)
                  </span>
                </div>
                <div className={styles.break_time_container}>
                  <div className={styles.promodoro_box}>
                    <label className={styles.box_title}>Pomodoro</label>
                    <input
                      className={styles.box}
                      type="number"
                      min="0"
                      step="1"
                      value={pomodoro}
                      onChange={(e)=>{setPomodoro(parseInt(e.target.value))}}
                    ></input>
                  </div>
                  <div className={styles.promodoro_box}>
                    <label className={styles.box_title}>Short Break</label>
                    <input
                      className={styles.box}
                      type="number"
                      min="0"
                      step="1"
                      value={shortBreak}
                      onChange={(e)=>{setShortBreak(parseInt(e.target.value))}}
                    ></input>
                  </div>
                  <div className={styles.promodoro_box}>
                    <label className={styles.box_title}>Long Break</label>
                    <input
                      className={styles.box}
                      type="number"
                      min="0"
                      step="1"
                      value={longBreak}
                      onChange={(e)=>{setLongBreak(parseInt(e.target.value))}}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
