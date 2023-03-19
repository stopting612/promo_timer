import styles from "@/styles/AddTaskForm.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import TodoContext from "@/context/todoContent";
import { useContext } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = {
  id?: number;
  todoTitle: string;
  cycle: number;
  count?: number;
  default? : boolean
};

const schema = yup
  .object({
    todoTitle: yup.string().required(),
    cycle: yup.number().required(),
  })
  .required();

export default function EditTaskForm({ handleClick, todo}: any) {
  const todoContext = useContext(TodoContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      todoTitle:  todo.todoTitle,
      cycle: todo.cycle,
      count: todo.count,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues, event: any) => {
        
        const update = {
                id: todo.id,
                todoTitle: data.todoTitle,
                cycle: data.cycle,
                count: data.count
        }
        event.preventDefault();
        todoContext.dispatch({
                type: "UPDATE",
                payload: update,
        });
        handleClick();
  };

  const handleDelete = (data: FormValues, event: any) =>{
        const deleteTodo = {
                id: todo.id,
                todoTitle: data.todoTitle,
                cycle: data.cycle,
                count: data.count
        }
        todoContext.dispatch(
                {
                        type: "DELETE",
                        payload: deleteTodo   
                }
        )
  }
  return (
    <form className={styles.addContainer} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.mainWrapper}>
        <div className={styles.mainContainer}>
          <div className={styles.titleWrapper}>
            <div className={styles.titleContainer}>
              <div className={styles.title}>
                <label htmlFor="todoTitle"></label>
                <input
                  {...register("todoTitle")}
                  type="text"
                  id="todoTitle"
                  placeholder="What are you working on?"
                  className={styles.title_input}
                ></input>
                <p className={styles.errorMsg}>{errors.todoTitle?.message}</p>
              </div>
            </div>
          </div>
          <div className={styles.cycleContainer}>
            <span>Pomodoros Cycle</span>
          </div>
          <div className={styles.count_container}>
            <input {...register("count")}
            id="count"
            type="number"
            min={1}
            step={1}
            className={styles.inputEST} readOnly></input>
            <div className={styles.slash}>/</div>
            <label htmlFor="cycle"></label>
          </div>
          <input
            {...register("cycle")}
            id="cycle"
            type="number"
            min={1}
            step={1}
            className={styles.inputEST}
          ></input>
          
          <p className={styles.errorMsg}>{errors.cycle?.message}</p>
          <div className={styles.actionContainer}>
            <button className={styles.actionBtn} onClick={handleDelete}>Delete</button>
            <div className={styles.submitContainer}>
              <button
                title="Escape key"
                className={styles.cancelBtn}
                onClick={handleClick}
              >
                Cancel
              </button>
              <button className={styles.saveBtn} type="submit">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
