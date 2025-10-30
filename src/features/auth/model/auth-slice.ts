import { createAppSlice, handleAppError } from "@/common/utils"
import { LoginForm } from "../lib"
import { setAppStatus } from "@/app/app-slice"
import { authApi } from "../api/authApi"
import { ResultCode } from "@/common/enums/enums"
import { AUTH_TOKEN } from "@/common/constants"

export const authSlice = createAppSlice({
  name: "authSlice",
  initialState: {
    isLoggedIn: false,
  },
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn
  },
  reducers: (create) => ({
    loginTC: create.asyncThunk(
      async (args: LoginForm, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatus({ status: "loading" }))
          const res = await authApi.login(args)
          debugger
          if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(setAppStatus({ status: "succeeded" }))
            localStorage.setItem(AUTH_TOKEN, res.data.data.token)
            return { isLoggedIn: true }
          } else {
            handleAppError(thunkAPI.dispatch, res.data)
            return thunkAPI.rejectWithValue(null)
          }
        } catch (error) {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
  }),
})

export const { selectIsLoggedIn } = authSlice.selectors
export const { loginTC } = authSlice.actions
export const authReducer = authSlice.reducer
