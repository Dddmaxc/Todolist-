import { Grid, Paper } from "@mui/material"
import { useAppSelector } from "../../../../common/hooks/useAppSelector"
import { TodolistItem } from "./TodolistItem/TodolistItem"
import { useEffect } from "react"
import { fetchTodolistsTC, selectTodolists } from "../../model/todolists-slice"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <>
      {todolists.map((todolist) => (
        <Grid sx={{ ml: "34px" }} key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
