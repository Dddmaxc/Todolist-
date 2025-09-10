import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { CreateItemForm } from "@/common/components/"
import { Container, Grid } from "@mui/material"
import { Todolists } from "@/features/todolist/ui/todolists/Todolists"
import { createTodolistTC } from "@/features/todolist/model/todolists-slice"


export const Main = () => {
  const dispatch = useAppDispatch()

  const createTodolist = (title: string) => {
    dispatch(createTodolistTC(title))
  }

  return (
    <>
      <Container maxWidth={"lg"}>
        <Grid container sx={{ mb: "30px" }}>
          <CreateItemForm onCreateItem={createTodolist} />
        </Grid>
        <Grid container spacing={4}>
          <Todolists />
        </Grid>
      </Container>
    </>
  )
}
