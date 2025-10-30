import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { CreateItemForm } from "@/common/components/"
import { Container, Grid } from "@mui/material"
import { Todolists } from "@/features/todolist/ui/todolists/Todolists"
import { createTodolistTC } from "@/features/todolist/model/todolists-slice"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import { selectIsLoggedIn } from "@/features/auth/model/auth-slice"
import { Path } from "@/common/routing/Routing"
import { Navigate } from "react-router"

export const Main = () => {
  const dispatch = useAppDispatch()
  const isLogout = useAppSelector(selectIsLoggedIn)

  const createTodolist = (title: string) => {
    dispatch(createTodolistTC(title))
  }

  return (
    <>
      {!isLogout ? (
        <Navigate to={Path.Login} />
      ) : (
        <Container maxWidth={"lg"}>
          <Grid container sx={{ mb: "30px" }}>
            <CreateItemForm onCreateItem={createTodolist} />
          </Grid>
          <Grid container spacing={4}>
            <Todolists />
          </Grid>
        </Container>
      )}
    </>
  )
}
