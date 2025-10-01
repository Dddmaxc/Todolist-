import { Nullable, RequestStatus } from "@/features/todolist/api/tasksApi.types"
import { createSlice } from "@reduxjs/toolkit"



export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "dark" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as Nullable,
  },
  reducers: (create) => ({
    changeThemeMode: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppError: create.reducer<{ error: Nullable}>((state, action) => {
      state.error = action.payload.error
    }),
  }),
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
})

export const { changeThemeMode, setAppStatus, setAppError } = appSlice.actions
export const { selectThemeMode, selectStatus, selectError } = appSlice.selectors
export default appSlice.reducer

export type ThemeMode = "dark" | "light"
