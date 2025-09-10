import { IconButton } from "@mui/material"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import {  changeTodolistTitleTC, deleteTodolistTC, DomainTodolist } from "../../../../model/todolists-slice"
import styles from "./TodolistTitle.module.css"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist
  const dispatch = useAppDispatch()

  const deleteTodolist = () => {
    dispatch(deleteTodolistTC({ id: id }))
  }

  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleTC({ id: id, title }))
  }
  return (
    <>
      <div className={styles.container}>
        <h3>
          <EditableSpan value={title} onChange={changeTodolistTitle} />
        </h3>
        <IconButton onClick={deleteTodolist} disabled={entityStatus === "loading"}>
          <DeleteIcon />
        </IconButton>
      </div>
    </>
  )
}
