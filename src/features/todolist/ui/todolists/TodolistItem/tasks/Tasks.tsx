import { DomainTodolist } from "@/features/todolist/model/todolists-slice"
import { TaskItem } from "./TaskItem/TaskItem"
import List from "@mui/material/List"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import { fetchTasks, selectTasks } from "@/features/todolist/model/tasks-slice"
import { useEffect } from "react"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { TaskStatus } from "@/common/enums/enums"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasks(id))
  }, [])
  
  const todolistTasks = tasks[id] || []
  let filteredTasks = todolistTasks 
  if (filter === "active") {
    filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.Completed)
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks?.map((task) => (
            <TaskItem key={task.id} task={task} todolistId={id} />
          ))}
        </List>
      )}
    </>
  )
}
