import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit"
import { createTodolistTC, deleteTodolistTC } from "./todolists-slice"

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type TasksState = Record<string, Task[]>

const initialState: TasksState = {}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    deleteTaskAC(state, action: PayloadAction<{ todolistId: string; taskId: string }>) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    },
    createTaskAC: {
      prepare(todolistId: string, title: string) {
        return {
          payload: {
            todolistId,
            title,
            id: nanoid(),
          },
        }
      },
      reducer(state, action: PayloadAction<{ todolistId: string; title: string; id: string }>) {
        const { todolistId, title, id } = action.payload

        // Создаём массив, если не существует
        if (!state[todolistId]) {
          state[todolistId] = []
        }

        const newTask: Task = {
          id,
          title,
          isDone: false,
        }

        state[todolistId].unshift(newTask)
      },
    },
    changeTaskStatusAC(state, action: PayloadAction<{ todolistId: string; taskId: string; isDone: boolean }>) {
      const task = state[action.payload.todolistId]?.find((task) => task.id === action.payload.taskId)
      if (task) {
        task.isDone = action.payload.isDone
      }
    },
    changeTaskTitleAC(state, action: PayloadAction<{ todolistId: string; taskId: string; title: string }>) {
      const task = state[action.payload.todolistId]?.find((task) => task.id === action.payload.taskId)
      if (task) {
        task.title = action.payload.title
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const { deleteTaskAC, createTaskAC, changeTaskStatusAC, changeTaskTitleAC } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
export default tasksSlice.reducer
