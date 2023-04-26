import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react"
import { Task, TaskType } from "./Task"
import { PlusCircle } from "phosphor-react"
import clipboard from "../assets/clipboard.svg"

import styles from "./Tasks.module.css"

export function Tasks() {
  const [tasks, setTasks] = useState<TaskType[]>([])

  const [newTask, setNewTask] = useState({
    completed: false,
    content: "",
  })

  const [completedTasks, setCompletedTasks] = useState(0)

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()
    setTasks([...tasks, newTask])
    setNewTask({
      completed: false,
      content: "",
    })
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("")
    setNewTask({ completed: false, content: event.target.value })
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!")
  }

  function deleteTask(taskoDelete: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => {
      return task.content !== taskoDelete
    })

    setTasks(tasksWithoutDeletedOne)

    console.log(tasksWithoutDeletedOne)

    completedTasksAccount(tasksWithoutDeletedOne)
  }

  function changeTaskStatus(taskStatus: string) {
    const taskIndex = tasks.findIndex((task) => {
      return task.content == taskStatus
    })

    const tempTasks = [...tasks]

    tempTasks[taskIndex].completed = !tempTasks[taskIndex].completed

    setTasks(tempTasks)

    completedTasksAccount(tempTasks)
  }

  function completedTasksAccount(completedTasks: TaskType[]) {
    const sumOfCompletedTasks = completedTasks.reduce(function (
      accumulator,
      currentValue
    ) {
      return currentValue.completed ? accumulator + 1 : accumulator
    },
    0)

    setCompletedTasks(sumOfCompletedTasks)
  }

  return (
    <div className={styles.tasks}>
      <form onSubmit={handleCreateNewTask} className={styles.addTask}>
        <input
          type="text"
          placeholder="Adicione uma tarefa"
          value={newTask.content}
          onChange={handleNewTaskChange}
          required
          onInvalid={handleNewTaskInvalid}
        />
        <button>
          Criar <PlusCircle size={16} weight="bold" />
        </button>
      </form>
      <div className={styles.taskCount}>
        <div className={styles.tasksCreated}>
          <p>Tarefas criadas</p>
          <span>{tasks.length}</span>
        </div>
        <div className={styles.completedTasks}>
          <p>Concluídas</p>
          <span>{completedTasks}</span>
        </div>
      </div>
      <div className={styles.taskContainer}>
        {tasks.map((task) => {
          return (
            <Task
              key={task.content}
              task={task}
              onDeleteTask={deleteTask}
              onChangeTaskStatus={changeTaskStatus}
            />
          )
        })}
      </div>
      {tasks.length === 0 && (
        <div className={styles.emptyTasks}>
          <img src={clipboard} alt="Ícone de tarefas" />
          <p>Você ainda não tem tarefas cadastradas</p>
          <span>Crie tarefas e organize seus itens a fazer</span>
        </div>
      )}
    </div>
  )
}
