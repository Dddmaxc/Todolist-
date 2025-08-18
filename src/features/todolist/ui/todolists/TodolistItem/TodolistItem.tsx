import { CreateItemForm } from "../../../../../common/components/createItemForm/CreateItemForm"
import { useAppDispatch } from "../../../../../common/hooks/useAppDispatch"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { Tasks } from "./tasks/Tasks"
import { FilterButtons } from "./FilterButtons/FilterButtons"
import { Todolist } from "../../../model/todolists-slice"
import { createTaskAC } from "../../../model/tasks-slice"

type Props = {
  todolist: Todolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const createTask = (title: string) => {
    dispatch(createTaskAC(todolist.id, title))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
