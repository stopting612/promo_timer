
import styles from "@/styles/Task.module.css";
import Image from "next/image";
import TodoContext from "@/context/todoContent";
import { useContext, useState } from "react";
import EditTaskForm from "./EditTaskForm";

export default function TaskDetail({data}:any) {
  const todoContext = useContext(TodoContext);
  const[ editPanel, setEditPanel] = useState(false)
  function Toggle(){
    todoContext.dispatch({
      type: "TOGGLE",
      payload: data
    })

  }

  function ToggleDefault(){
    todoContext.dispatch({
      type: "TOGGLE_DEFAULT",
      payload: data
    })
  }

  function openEditPanel(){
    setEditPanel(!editPanel)
  }
  return (
        <>
        {
          editPanel ?  <EditTaskForm handleClick={openEditPanel} type="EDIT" todo={data}/> : <div className={styles.my_task_container}>
          <div className={styles.my_task}>
            <div className={`${styles.activity_wrapper} ${data.default ? `${styles.activity_wrapper_default}` : ''}`}>
              <div className={styles.task_wrapper}>
                <div className={styles.activity_main} >
                  <div onClick={Toggle} className={`${styles.tickBox} ${data.complete ? `${styles.complete_task}` : ''}`}>
                    
                  </div>
                  <span onClick={ToggleDefault} className={`${styles.activity_title} ${data.complete ? `${styles.activity_title_default}` : ''}`}>{data.todoTitle}</span>
                </div>
                
                <div className={styles.progress_menu}>
                  <span className={styles.progress_num}>{data.count}/ {data.cycle}</span>
                  <div className={styles.progress_detail}>
                    <div className={styles.detail_icon} onClick={openEditPanel}>
                      <Image
                        src="/vertical-ellipsis.png"
                        alt=""
                        height={18}
                        width={18}
                        className={styles.detail_img}
                      ></Image>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        }
      </>
  );
}
