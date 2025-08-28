import { CreateItemForm } from "../../../../../common/components/createItemForm/CreateItemForm"
import { useAppDispatch } from "../../../../../common/hooks/useAppDispatch"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { Tasks } from "./tasks/Tasks"
import { FilterButtons } from "./FilterButtons/FilterButtons"
import { DomainTodolist } from "@/features/todolist/model/todolists-slice"
import { createTask } from "@/features/todolist/model/tasks-slice"

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const createTaskHandler = (title: string) => {
    dispatch(createTask({ todolistId: todolist.id, title }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTaskHandler} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
