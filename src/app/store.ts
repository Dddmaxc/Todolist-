import { combineReducers, configureStore } from "@reduxjs/toolkit"
import appSlice from "./app-slice"
import tasksSlice from "@/features/todolist/model/tasks-slice"
import todolistsSlice from "@/features/todolist/model/todolists-slice"
import { authReducer } from "@/features/auth/model/auth-slice"


const rootReducer = combineReducers({
  todolists: todolistsSlice,
  tasks: tasksSlice,
  app: appSlice,
  authSlice: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

