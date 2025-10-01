import Checkbox from "@mui/material/Checkbox"
import ListItem from "@mui/material/ListItem"
import { EditableSpan } from "../../../../../../../common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAppDispatch } from "../../../../../../../common/hooks/useAppDispatch"
import { ChangeEvent } from "react"
import { changeTaskStatus, changeTaskTitleAC, deleteTask } from "../../../../../model/tasks-slice"
import { getListItemSx } from "./TaskItem.styles"
import { DomainTask } from "@/features/todolist/api/tasksApi.types"
import { TaskStatus } from "@/common/enums/enums"

type Props = {
  todolistId: string
  task: DomainTask
  disable?: boolean
}

export const TaskItem = ({ todolistId, task, disable }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTaskHandler = () => {
    dispatch(deleteTask({ todolistId: todolistId, taskId: task.id }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    dispatch(
      changeTaskStatus({
        ...task,
        status: newStatusValue,
      }),
    )
  }

  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskTitleAC({ todolistId: todolistId, taskId: task.id, title }))
  }
  
  const isDone = task.status === TaskStatus.Completed
  return (
    <>
      <ListItem sx={getListItemSx(isDone)}>
        <div>
          <Checkbox checked={isDone} onChange={changeTaskStatusHandler} disabled={disable} />
          <EditableSpan value={task.title} onChange={changeTaskTitle} />
        </div>
        <IconButton onClick={deleteTaskHandler} disabled={disable}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    </>
  )
}
