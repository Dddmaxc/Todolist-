import { createSlice } from "@reduxjs/toolkit"

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
  },
  reducers: (create) => ({
    changeThemeMode: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
  }),
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
  },
})

export const { changeThemeMode,setAppStatus } = appSlice.actions
export const { selectThemeMode, selectStatus } = appSlice.selectors
export default appSlice.reducer

export type ThemeMode = "dark" | "light"
