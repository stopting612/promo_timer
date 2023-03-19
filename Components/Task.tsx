import styles from "@/styles/Task.module.css";
import Image from "next/image";
import { useState, useReducer, useContext } from "react";
import AddTaskForm from "./AddTaskForm";
import TaskDetail from "./TaskDetail";
import TodoContext, {Todo} from "@/context/todoContent";


export default function Task() {
  const todoContent = useContext(TodoContext);

  const [openTaskPanel, setOpenTaskPanel] = useState(false);

  function openTask(){
      setOpenTaskPanel(!openTaskPanel);
  }
  
  const todoList = todoContent.state.todoLists;
  return (
    <div className={styles.task_container}>
      <div className={styles.task_menu}>
        <span className={styles.task_title}>Tasks</span>
        <div className={styles.task_detail}>
          <button className={styles.detail_btn}>
            <Image
              src="/threedots-white.png"
              alt=""
              height={16}
              width={16}
            ></Image>
          </button>
          </div>
          <div className={styles.detail_menu} >
            <div className={styles.detail_option}>
              <Image
                src="/delete-black.png"
                alt=""
                width={14}
                height={14}
                className={styles.option_img}
              ></Image>
              Clear finished tasks
            </div>
            <div className={styles.detail_option}>
              <Image
                src="/clear-black.png"
                alt=""
                width={14}
                height={14}
                className={styles.option_img}
              ></Image>
              Clear act pomodoros
            </div>
            <div className={styles.detail_option}>
              <Image
                src="/save-black2.png"
                alt=""
                width={14}
                height={14}
                className={styles.option_img}
              ></Image>
              Save as routine
            </div>
            <div className={styles.detail_option}>
              <Image
                src="/plus-black.png"
                alt=""
                width={14}
                height={14}
                className={styles.option_img}
              ></Image>
              Add from routines
            </div>
            <div className={styles.detail_option}>
              <Image
                src="/integration-black.png"
                alt=""
                width={14}
                height={14}
                className={styles.option_img}
              ></Image>
              Import from Todoist
            </div>
            <div className={styles.detail_option}>
              <Image
                src="/threedots-white.png"
                alt=""
                height={18}
                width={18}
                className={styles.option_active_img}
              ></Image>
              Clear all tasks
            </div>
          </div>
      </div>
      {todoList.map((todo: any, key: number) => (
          <TaskDetail key={key} data={todo}/>
        ))}
      <div className={styles.add_task} onClick={openTask}>
        <Image
          src="/plus-circle-white.png"
          alt=""
          width={18}
          height={18}
          className={styles.option_img}
        ></Image>
        <div className={styles.add_task_title} >Add Task</div>
      </div>
      <div>
        {openTaskPanel ? <AddTaskForm handleClick={openTask} type="ADD"/> : null}
      </div>
    </div>
  );
}
