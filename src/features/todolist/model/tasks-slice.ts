import { createTodolistTC, deleteTodolistTC } from "./todolists-slice"
import { createAppSlice } from "@/common/utils/createAppSlice"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskModel } from "../api/tasksApi.types"
import { setAppStatus } from "@/app/app-slice"
import { RootState } from "@/app/store"
import { ResultCode } from "@/common/enums/enums"
import { handleAppError, handleServerAppError } from "@/common/utils"

export type TasksState = Record<string, DomainTask[]>

const initialState: TasksState = {}

const tasksSlice = createAppSlice({
  name: "tasks",
  initialState,
  reducers: (create) => ({
    fetchTasks: create.asyncThunk(
      async (todolistId: string, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatus({ status: "loading" }))
          const res = await tasksApi.getTasks(todolistId)
          const tasks = res.data.items
          thunkAPI.dispatch(setAppStatus({ status: "succeeded" }))
          return { tasks, todolistId }
        } catch (error) {
          thunkAPI.dispatch(setAppStatus({ status: "failed" }))
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled(state, action) {
          state[action.payload.todolistId] = action.payload.tasks
        },
      },
    ),
    createTask: create.asyncThunk(
      async (args: { todolistId: string; title: string }, thunkAPI) => {
        try {
          const res = await tasksApi.createTasks(args.todolistId, args.title)
          if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(setAppStatus({ status: "succeeded" }))
            const task = res.data.data.item
            return { task }
          } else {
            handleAppError(thunkAPI.dispatch, res.data)
            return thunkAPI.rejectWithValue(null)
          }
        } catch (error) {
          handleServerAppError(error, thunkAPI.dispatch)
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled(state, action) {
          const tasks = state[action.payload.task.todoListId]
          tasks.unshift(action.payload.task)
        },
      },
    ),
    deleteTask: create.asyncThunk(
      async (args: { todolistId: string; taskId: string }, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatus({ status: "loading" }))
          const res = await tasksApi.deleteTask(args.todolistId, args.taskId)
          thunkAPI.dispatch(setAppStatus({ status: "succeeded" }))
          if (res.data.resultCode === 0) {
            return { todolistId: args.todolistId, taskId: args.taskId }
          } else {
            return thunkAPI.rejectWithValue(null)
          }
        } catch (error) {
          thunkAPI.dispatch(setAppStatus({ status: "failed" }))
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const tasks = state[action.payload.todolistId]
          const index = tasks.findIndex((task) => task.id === action.payload.taskId)
          if (index !== -1) {
            tasks.splice(index, 1)
          }
        },
      },
    ),
    changeTaskStatus: create.asyncThunk(
      async (task: DomainTask, thunkAPI) => {
        try {
          const model: UpdateTaskModel = {
            ...task,
          }
          thunkAPI.dispatch(setAppStatus({ status: "loading" }))
          const res = await tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, model })
          thunkAPI.dispatch(setAppStatus({ status: "succeeded" }))
          return { task: res.data.data.item }
        } catch (error) {
          thunkAPI.dispatch(setAppStatus({ status: "failed" }))
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const updateTask = action.payload.task
          const task = state[updateTask.todoListId]?.find((t) => t.id === updateTask.id)
          if (task) {
            task.status = updateTask.status
          }
        },
      },
    ),
    changeTaskTitleAC: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string; title: string }, thunkAPI) => {
        const { todolistId, taskId, title } = payload

        const allTodolistTasks = (thunkAPI.getState() as RootState).tasks[todolistId]
        const task = allTodolistTasks.find((task) => task.id === taskId)

        if (!task) {
          return thunkAPI.rejectWithValue(null)
        }

        const model: UpdateTaskModel = {
          description: task.description,
          title,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
          status: task.status,
        }
        try {
          thunkAPI.dispatch(setAppStatus({ status: "loading" }))
          const res = await tasksApi.updateTask({ todolistId, taskId, model })
          thunkAPI.dispatch(setAppStatus({ status: "succeeded" }))
          return { task: res.data.data.item }
        } catch (error) {
          thunkAPI.dispatch(setAppStatus({ status: "failed" }))
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const updateTaskTitle = action.payload.task
          const task = state[updateTaskTitle.todoListId]?.find((t) => t.id === updateTaskTitle.id)
          if (task) {
            task.title = updateTaskTitle.title
          }
        },
      },
    ),
  }),

  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        const id = action.payload?.todolist?.id
        if (id) {
          state[id] = []
        }
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        const id = action.payload?.id
        if (id) {
          delete state[id]
        }
      })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const { deleteTask, createTask, changeTaskStatus, changeTaskTitleAC, fetchTasks } = tasksSlice.actions

export const { selectTasks } = tasksSlice.selectors

export default tasksSlice.reducer
