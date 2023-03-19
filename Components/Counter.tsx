import styles from "@/styles/Counter.module.css";
import Image from "next/image";
import { useEffect, useState, useRef, useContext } from "react";
import { useSetting } from "@/context/settingContext";
import TodoContext, {Todo} from "@/context/todoContent";

export default function Counter() {
  const { pomodoro, shortBreak, longBreak, setPercentage, percentage } = useSetting();
  const [PromoBtn, setPromoBtn] = useState(true);
  const [ShortBreakBtn, setShortBreakBtn] = useState(false);
  const [LongBreakBtn, setLongBreakBtn] = useState(false);
  const [textColor, setTextColor] = useState("red");
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [type, setType] = useState("work");
  const [totalSecond, setTotalSecond] = useState(0);

  const secondsLeftRef = useRef(timer);
  const isPauseRef = useRef(isPaused);
  const modeRef = useRef(type);
  const breakCycleRef = useRef(0);
  const percentageRef = useRef(percentage);

  const todoContext = useContext(TodoContext);

  const todoList = todoContext.state.todoLists;
  const defaultTodo = todoList.find((todo) => todo.default == true);

  function initTimer() {
    console.log("initTime");
    if (type === "work") {
      secondsLeftRef.current = pomodoro * 60;
      setTotalSecond(pomodoro * 60)
      setPercentage('')
    } else if (type === "shortBreak") {
      secondsLeftRef.current = shortBreak * 60;
      setTotalSecond(shortBreak * 60)
      setPercentage('')
    } else if (type === "longBreak") {
      secondsLeftRef.current = longBreak * 60;
      setTotalSecond(longBreak * 60)
      setPercentage('')
    }
    setTimer(secondsLeftRef.current);
  }

  function tick() {
    secondsLeftRef.current--;
    setTimer(secondsLeftRef.current);
  }

  function switchToWorkMode() {
    setPromoBtn(true);
    setShortBreakBtn(false);
    setLongBreakBtn(false);
    document.body.style.backgroundColor = "rgb(0, 0, 0)";
    setTextColor("red");
    setType("work");
    secondsLeftRef.current = pomodoro * 60;
    setTimer(pomodoro * 60);
    modeRef.current = "work";
    setPercentage('')
    setTotalSecond(pomodoro * 60)
  }

  function switchToShortBreakMode() {
    setPromoBtn(false);
    setShortBreakBtn(true);
    setLongBreakBtn(false);
    document.body.style.backgroundColor = "rgb(56, 133, 138)";
    setTextColor("rgb(56, 133, 138)");
    setType("shortBreak");
    secondsLeftRef.current = shortBreak * 60;
    setTimer(shortBreak * 60);
    modeRef.current = "shortBreak";
    setTotalSecond(shortBreak * 60)
    setPercentage('')
    
  }

  function switchToLongBreakMode() {
    setPromoBtn(false);
    setShortBreakBtn(false);
    setLongBreakBtn(true);
    document.body.style.backgroundColor = "rgb(57, 112, 151)";
    setTextColor("rgb(57, 112, 151)");
    setType("longBreak");
    secondsLeftRef.current = longBreak * 60;
    setTimer(longBreak * 60);
    modeRef.current = "longBreak";
    setTotalSecond(longBreak * 60)
    setPercentage('')
    
  }
  
  function switchMode(defaultTodo: any) {
    if (modeRef.current === "work") {
      if (breakCycleRef.current !== 4) {
        console.log("switch1");
        //turn to short break
        switchToShortBreakMode();
        breakCycleRef.current++;
        console.log(defaultTodo)
        if (defaultTodo){
          todoContext.dispatch({
            type: "ADD_COUNT",
            payload: defaultTodo
          })
        }
        
      } else if (breakCycleRef.current == 4) {
        //turn to long break
        console.log("switch3");
        switchToLongBreakMode();
        breakCycleRef.current = 0;
      }
    } else if (modeRef.current === "shortBreak") {
      //turn back to work
      console.log("switch2");
      switchToWorkMode();
    }
  }

  const minutes = Math.floor(timer / 60);
  let seconds: any = timer % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  
  const test: string = (((totalSecond - timer) / totalSecond) * 100) + '%';

  setPercentage(test)
  
  useEffect(() => {
    initTimer();
 
    const interval = setInterval(() => {
      if (!isPauseRef.current) {
        return;
      }

      if (secondsLeftRef.current === 0) {
        return switchMode(defaultTodo);
      }

      tick();
    }, 1);
    return () => clearInterval(interval);

    
  }, [pomodoro, shortBreak, longBreak, defaultTodo]);

  
  function handlePomoBtn() {
    isPauseRef.current = false;
    setIsPaused(false);
    switchToWorkMode();
  }

  function handleShortBreak() {
    isPauseRef.current = false;
    setIsPaused(false);
    switchToShortBreakMode();
  }

  function handleLongBreak() {
    isPauseRef.current = false;
    setIsPaused(false);
    switchToLongBreakMode();
  }

  return (
    <div className={styles.counter_container}>
      <div className={styles.counter_inner_container}>
        <div className={styles.counter_btn}>
          <button
            className={
              PromoBtn ? `${styles.btn} ${styles.active_btn}` : styles.btn
            }
            onClick={handlePomoBtn}
          >
            Pomodoro
          </button>
          <button
            className={
              ShortBreakBtn ? `${styles.btn} ${styles.active_btn}` : styles.btn
            }
            onClick={handleShortBreak}
          >
            Short Break
          </button>
          <button
            className={
              LongBreakBtn ? `${styles.btn} ${styles.active_btn}` : styles.btn
            }
            onClick={handleLongBreak}
          >
            Long Break
          </button>
        </div>
        <div id="timer_string" className={styles.timer}>
          {minutes}:{seconds}
        </div>
        <div className={styles.start_container}>
          {isPaused ? (
            <button
              style={{ color: `${textColor}` }}
              className={styles.start_btn}
              onClick={() => {
                setIsPaused(false);
                isPauseRef.current = false;
              }}
            >
              PAUSE
            </button>
          ) : (
            <button
              style={{ color: `${textColor}` }}
              className={styles.start_btn}
              onClick={() => {
                setIsPaused(true);
                isPauseRef.current = true;
              }}
            >
              START
            </button>
          )}

          <div className={styles.next_container}>
            <button className={styles.next_btn}>
              <Image
                src="/next-white3.png"
                height={22}
                width={22}
                alt=""
              ></Image>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.cycle}># {defaultTodo? defaultTodo.cycle : ''}</div>
      <div className={styles.encourage_string}>{defaultTodo? defaultTodo.todoTitle : 'Time to focus!'}</div>
    </div>
  );
}
