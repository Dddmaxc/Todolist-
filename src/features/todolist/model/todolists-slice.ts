import { Todolist } from "../api/todolistsApi.types"
import { todolistsApi } from "../api/todolistsApi"
import { createAppSlice } from "@/common/utils/createAppSlice"
import { setAppStatus } from "@/app/app-slice"

export type FilterValues = "all" | "active" | "completed"

export type DomainTodolist = Todolist & {
  filter: FilterValues
}

const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    // 🌐 Fetch todolists
    fetchTodolistsTC: create.asyncThunk(
      async (_arg, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatus({ status: "loading" }))
          const res = await todolistsApi.getTodolists()
          thunkAPI.dispatch(setAppStatus({ status: "succeeded" }))
          return { todolists: res.data }
        } catch (error) {
          thunkAPI.dispatch(setAppStatus({ status: "failed" }))
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (_state, action) => {
          return action.payload.todolists.map((todolist) => ({
            ...todolist,
            filter: "all",
          }))
        },
      }
    ),

    // ➕ Create todolist
    createTodolistTC: create.asyncThunk(
      async (title: string, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatus({ status: "loading" }))
          const res = await todolistsApi.createTodolist(title)
          thunkAPI.dispatch(setAppStatus({ status: "succeeded" }))
          return { todolist: res.data.data.item }
        } catch (error) {
          thunkAPI.dispatch(setAppStatus({ status: "failed" }))
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          if (action.payload?.todolist) {
            state.unshift({ ...action.payload.todolist, filter: "all" })
          }
        },
      }
    ),

    // 🗑️ Delete todolist
    deleteTodolistTC: create.asyncThunk(
      async ({ id }: { id: string }, thunkAPI) => {
        try {
          await todolistsApi.deleteTodolist(id)
          return { id }
        } catch (error) {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((todolist) => todolist.id === action.payload.id)
          if (index !== -1) {
            state.splice(index, 1)
          }
        },
      }
    ),

    // ✏️ Change title
    changeTodolistTitleTC: create.asyncThunk(
      async ({ id, title }: { id: string; title: string }, thunkAPI) => {
        try {
          await todolistsApi.changeTodolistTitle(id, title)
          return { id, title }
        } catch (error) {
          return thunkAPI.rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((todolist) => todolist.id === action.payload.id)
          if (index !== -1) {
            state[index].title = action.payload.title
          }
        },
      }
    ),

    // 🔁 Change filter
    changeTodolistFilterAC: create.reducer(
      (state, action: { payload: { id: string; filter: FilterValues } }) => {
        const todolist = state.find((t) => t.id === action.payload.id)
        if (todolist) {
          todolist.filter = action.payload.filter
        }
      }
    ),
  }),

  selectors: {
    selectTodolists: (state) => state,
  },
})

export const {
  fetchTodolistsTC,
  createTodolistTC,
  deleteTodolistTC,
  changeTodolistTitleTC,
  changeTodolistFilterAC,
} = todolistsSlice.actions

export const { selectTodolists } = todolistsSlice.selectors

export default todolistsSlice.reducer
