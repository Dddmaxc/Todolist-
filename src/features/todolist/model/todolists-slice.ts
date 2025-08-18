import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit"

export type FilterValues = "all" | "active" | "completed"

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as Todolist[],
  reducers: {
    deleteTodolistAC(state, action: PayloadAction<{ id: string }>) {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    createTodolistAC: {
      prepare(title: string) {
        return {
          payload: {
            id: nanoid(),
            title,
          },
        }
      },
      reducer(state, action: PayloadAction<{ id: string; title: string }>) {
        state.push({ ...action.payload, filter: "all" })
      },
    },
    changeTodolistTitleAC(state, action: PayloadAction<{ id: string; title: string }>) {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    },
    changeTodolistFilterAC(state, action: PayloadAction<{ id: string; filter: FilterValues }>) {
      const todolist = state.find((todolist) => todolist.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    },
  },
})

export const {
  deleteTodolistAC,
  createTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
} = todolistsSlice.actions

export default todolistsSlice.reducer
