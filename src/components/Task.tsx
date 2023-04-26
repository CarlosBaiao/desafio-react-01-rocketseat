import { Trash } from "phosphor-react"

import styles from "./Task.module.css"

export interface TaskType {
  completed: boolean
  content: string
}

interface TaskProps {
  task: TaskType
  onDeleteTask: (task: string) => void
  onChangeTaskStatus: (task: string) => void
}

export function Task({ task, onDeleteTask, onChangeTaskStatus }: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(task.content)
  }

  function handleChangeTaskStatus() {
    onChangeTaskStatus(task.content)
  }

  return (
    <div className={styles.task} >
      <input type="checkbox" id="checkbox" checked={task.completed}  onChange={()=>{}}/>
      <label htmlFor="checkbox" onClick={handleChangeTaskStatus}></label>
      <p>{task.content}</p>
      <div
        className={styles.removeItem}
        title="Deletar tarefa"
        onClick={handleDeleteTask}
      >
        <Trash size={14} />
      </div>
    </div>
  )
}
