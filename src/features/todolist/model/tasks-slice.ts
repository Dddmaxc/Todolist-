import { PayloadAction } from "@reduxjs/toolkit"
import { createTodolistTC, deleteTodolistTC } from "./todolists-slice"
import { createAppSlice } from "@/common/utils/createAppSlice"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskModel } from "../api/tasksApi.types"

export type TasksState = Record<string, DomainTask[]>

const initialState: TasksState = {}

const tasksSlice = createAppSlice({
  name: "tasks",
  initialState,
  reducers: (create) => ({
    fetchTasks: create.asyncThunk(
      async (todolistId: string, thunkAPI) => {
        try {
          const res = await tasksApi.getTasks(todolistId)
          const tasks = res.data.items
          return { tasks, todolistId }
        } catch (error) {
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
          const task = res.data.data.item
          return { task }
        } catch (error) {
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
          const res = await tasksApi.deleteTask(args.todolistId, args.taskId)
          if (res.data.resultCode === 0) {
            return { todolistId: args.todolistId, taskId: args.taskId }
          } else {
            return thunkAPI.rejectWithValue(null)
          }
        } catch (error) {
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
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
          }
          const res = await tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, model })
          return { task: res.data.data.item }
        } catch (error) {
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

    changeTaskTitleAC: create.reducer(
      (state, action: PayloadAction<{ todolistId: string; taskId: string; title: string }>) => {
        const task = state[action.payload.todolistId]?.find((task) => task.id === action.payload.taskId)
        if (task) {
          task.title = action.payload.title
        }
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
