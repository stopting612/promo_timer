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
};

const schema = yup
  .object({
    todoTitle: yup.string().required(),
    cycle: yup.number().required(),
  })
  .required();

export default function AddTaskForm({ handleClick }: any) {
  const todoContext = useContext(TodoContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      todoTitle:  "",
      cycle: 1,
      count: 0,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues, event: any) => {
    event.preventDefault();

      todoContext.dispatch({
        type: "ADD",
        payload: data,
      });
      handleClick();
    
  };
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
