import { setAppError, setAppStatus } from "@/app/app-slice"
import { Dispatch } from "@reduxjs/toolkit"
import axios from "axios"

export const handleServerAppError = (error: unknown, dispatch: Dispatch) => {
  let errorMessage 

  // axios ошибки
  if (axios.isAxiosError(error)) {
    errorMessage = error.response?.data?.messages || error.message 
  } else if (error instanceof Error) {
    // нативные ошибки
    errorMessage = error.message
  } else {
    errorMessage = JSON.stringify(error)
  }

  dispatch(setAppStatus({ status: "idle" }))
  dispatch(setAppError({ error: errorMessage }))
}
