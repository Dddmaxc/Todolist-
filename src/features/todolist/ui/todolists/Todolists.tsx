import { Grid, Paper } from "@mui/material";
import { useAppSelector } from "../../../../common/hooks/useAppSelector";
import { TodolistItem } from "./TodolistItem/TodolistItem";
import { selectTodolists } from "../../model/todolists-selectors";


export const Todolists = () => {
const todolists = useAppSelector(selectTodolists);

    return (
        <>
         {todolists.map(todolist => (
              <Grid key={todolist.id}>
                <Paper sx={{ p: '0 20px 20px 20px' }}>
                  <TodolistItem
                    todolist={todolist}
                  />
                </Paper>
              </Grid>
          ))}
        </>
    )
}


