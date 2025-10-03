import { createResponseSchema, Todolist, TodolistSchema } from "../api/todolistsApi.types"
import { todolistsApi } from "../api/todolistsApi"
import { createAppSlice } from "@/common/utils/createAppSlice"
import { setAppStatus } from "@/app/app-slice"
import { RequestStatus } from "../api/tasksApi.types"
import { ResultCode } from "@/common/enums/enums"
import { handleAppError, handleServerNetworkError } from "@/common/utils"
import { z } from "zod"

export type FilterValues = "all" | "active" | "completed"

export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
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
          TodolistSchema.array().parse(res.data)
          thunkAPI.dispatch(setAppStatus({ status: "succeeded" }))
          return { todolists: res.data }
        } catch (error) {
          handleServerNetworkError(error, thunkAPI.dispatch)
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
      },
    ),

    // ➕ Create todolist
    createTodolistTC: create.asyncThunk(
      async (title: string, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatus({ status: "loading" }))
          const res = await todolistsApi.createTodolist(title)
          TodolistSchema.parse(res.data.data.item)

          if (res.data.resultCode === ResultCode.Success) {
            return { todolist: res.data.data.item }
          } else {
            handleAppError(thunkAPI.dispatch, res.data)
            return thunkAPI.rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(error, thunkAPI.dispatch)
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          if (action.payload?.todolist) {
            state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
          }
        },
      },
    ),

    // 🗑️ Delete todolist
    deleteTodolistTC: create.asyncThunk(
      async ({ id }: { id: string }, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatus({ status: "loading" }))
          thunkAPI.dispatch(changeTodolistEntityStatusAC({ entityStatus: "loading", id }))
          //сохраняем результат вызова API
          const res = await todolistsApi.deleteTodolist(id)
          //Валидация ответа
          createResponseSchema(z.object({})).parse(res.data)

          if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(setAppStatus({ status: "succeeded" }))
            return { id }
          } else {
            handleAppError(thunkAPI.dispatch, res.data)
            return thunkAPI.rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(error, thunkAPI.dispatch)
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
      },
    ),

    // ✏️ Change title
    changeTodolistTitleTC: create.asyncThunk(
      async ({ id, title }: { id: string; title: string }, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatus({ status: "loading" }))
          await todolistsApi.changeTodolistTitle(id, title)
          thunkAPI.dispatch(setAppStatus({ status: "succeeded" }))
          return { id, title }
        } catch (error) {
          handleServerNetworkError(error, thunkAPI.dispatch)
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
      },
    ),

    // 🔁 Change filter
    changeTodolistFilterAC: create.reducer((state, action: { payload: { id: string; filter: FilterValues } }) => {
      const todolist = state.find((t) => t.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
    changeTodolistEntityStatusAC: create.reducer(
      (state, action: { payload: { id: string; entityStatus: RequestStatus } }) => {
        const todolist = state.find((t) => t.id === action.payload.id)
        if (todolist) {
          todolist.entityStatus = action.payload.entityStatus
        }
      },
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
  changeTodolistEntityStatusAC,
} = todolistsSlice.actions

export const { selectTodolists } = todolistsSlice.selectors

export default todolistsSlice.reducer
