import { combineReducers, configureStore } from "@reduxjs/toolkit"
import appSlice from "./app-slice"
import tasksSlice from "@/features/todolist/model/tasks-slice"
import todolistsSlice from "@/features/todolist/model/todolists-slice"


// объединение reducer'ов с помощью combineReducers
const rootReducer = combineReducers({
  todolists: todolistsSlice,
  tasks: tasksSlice,
  app: appSlice,
})

// создание store
export const store = configureStore({
  reducer: rootReducer,
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
