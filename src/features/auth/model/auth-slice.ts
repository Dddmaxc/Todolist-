import { createAppSlice, handleAppError } from "@/common/utils"
import { LoginForm } from "../lib"
import { setAppStatus } from "@/app/app-slice"
import { authApi } from "../api/authApi"
import { ResultCode } from "@/common/enums/enums"
import { AUTH_TOKEN } from "@/common/constants"

interface AuthState {
  isLoggedIn: boolean
}

const initialState: AuthState = {
  isLoggedIn: false,
}

export const authSlice = createAppSlice({
  name: "authSlice",
  initialState,
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
  reducers: (create) => ({
    loginTC: create.asyncThunk(
      async (args: LoginForm, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatus({ status: "loading" }))
          const res = await authApi.login(args)

          if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(setAppStatus({ status: "succeeded" }))
            localStorage.setItem(AUTH_TOKEN, res.data.data.token)
            return { isLoggedIn: true }
          } else {
            handleAppError(thunkAPI.dispatch, res.data)
            return thunkAPI.rejectWithValue(null)
          }
        } catch {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          if (action.payload) {
            state.isLoggedIn = action.payload.isLoggedIn
          }
        },
      },
    ),
    logoutTC: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatus({ status: "loading" }))
          const res = await authApi.logout()

          if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(setAppStatus({ status: "succeeded" }))
            localStorage.removeItem(AUTH_TOKEN)
            return { isLoggedIn: false }
          } else {
            handleAppError(thunkAPI.dispatch, res.data)
            return thunkAPI.rejectWithValue(null)
          }
        } catch {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          if (action.payload) {
            state.isLoggedIn = action.payload.isLoggedIn
          }
        },
      },
    ),
    initializeAppTC: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatus({ status: "loading" }))
          const res = await authApi.me()

          if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(setAppStatus({ status: "succeeded" }))
            return { isLoggedIn: true }
          } else {
            handleAppError(thunkAPI.dispatch, res.data)
            return thunkAPI.rejectWithValue(null)
          }
        } catch {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          if (action.payload) {
            state.isLoggedIn = action.payload.isLoggedIn
          }
        },
      },
    ),
  }),
})


export const { selectIsLoggedIn } = authSlice.selectors
export const { loginTC, logoutTC, initializeAppTC } = authSlice.actions
export const authReducer = authSlice.reducer
