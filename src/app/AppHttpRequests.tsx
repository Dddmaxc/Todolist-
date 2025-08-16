import { type ChangeEvent, type CSSProperties, useEffect, useState } from "react"
import Checkbox from "@mui/material/Checkbox"
import { CreateItemForm, EditableSpan } from "@/common/components"
import { Todolist } from "@/features/todolist/api/todolistsApi.types"
import { todolistApi } from "@/features/todolist/api/todolistsApi"
import { tasksApi } from "@/features/todolist/api/tasksApi"
import { DomainTask, UpdateTaskModel } from "@/features/todolist/api/tasksApi.types"
import { TaskStatus } from "@/common/enums/enums"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<Record<string, DomainTask[]>>({})

  useEffect(() => {
    todolistApi.getTodolists().then((res) => {
      const todolists = res.data
      setTodolists(todolists)
      todolists.forEach((todolist) => {
        tasksApi.getTasks(todolist.id).then((res) => {
          setTasks((prev: any) => ({ ...prev, [todolist.id]: res.data.items }))
        })
      })
    })
  }, [])

  const createTodolist = (title: string) => {
    todolistApi.createTodolist(title).then((res) => {
      const newTodolist = res.data.data.item
      setTodolists((prev) => [newTodolist, ...prev])
    })
  }

  const deleteTodolist = (id: string) => {
    todolistApi.deleteTodolist(id).then(() => {
      setTodolists((prev) => prev.filter((todolist) => todolist.id !== id))
      delete tasks[id]
      setTasks({ ...tasks })
    })
  }

  const changeTodolistTitle = (id: string, title: string) => {
    todolistApi.changeTodolistTitle(id, title).then(() => {
      setTodolists((prev) => prev.map((todolist) => (todolist.id === id ? { ...todolist, title } : todolist)))
    })
  }

  const createTask = (todolistId: string, title: string) => {
    tasksApi.createTasks(todolistId, title).then((res) => {
      const newTask = res.data.data.item
      setTasks((prev) => ({
        ...prev,
        [todolistId]: [newTask, ...(prev[todolistId] || [])],
      }))
    })
  }
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
    const model: UpdateTaskModel = {
      ...task,
      status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
    }

    tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, model }).then((res) => {
      setTasks((prev) => ({
        ...prev,
        [task.todoListId]: prev[task.todoListId].map((t) => (t.id === task.id ? res.data.data.item : t)),
      }))
    })
  }

  const changeTaskTitle = (task: DomainTask, title: string) => {
    const model: UpdateTaskModel = {
      ...task,
      title,
    }

    tasksApi.changeTaskTitle(task.todoListId, task.id, model).then((res) => {
      const upDate = res.data.item
      setTasks((prev) => ({
        ...prev,
        [task.todoListId]: prev[task.todoListId].map((t) => (t.id === task.id ? upDate : t)),
      }))
    })
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    tasksApi.deleteTask(todolistId, taskId).then(() => {
      setTasks((prev) => ({
        ...prev,
        [todolistId]: prev[todolistId].filter((t) => t.id !== taskId),
      }))
    })
  }

  return (
    <div style={{ margin: "20px" }}>
      <CreateItemForm onCreateItem={createTodolist} />
      {todolists.map((todolist) => (
        <div key={todolist.id} style={container}>
          <div>
            <EditableSpan value={todolist.title} onChange={(title) => changeTodolistTitle(todolist.id, title)} />
            <button onClick={() => deleteTodolist(todolist.id)}>x</button>
          </div>
          <CreateItemForm onCreateItem={(title) => createTask(todolist.id, title)} />
          {(tasks[todolist.id] || []).map((task) => (
            <div key={task.id}>
              <Checkbox checked={task?.status === TaskStatus.Completed} onChange={(e) => changeTaskStatus(e, task)} />
              <EditableSpan value={task?.title} onChange={(title) => changeTaskTitle(task, title)} />
              <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const container: CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
