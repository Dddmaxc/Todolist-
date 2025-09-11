import { setAppError, setAppStatus } from "@/app/app-slice"
import { Dispatch } from "@reduxjs/toolkit"
import { BaseResponse } from "../types/types"

export const handleAppError = <T>(dispatch: Dispatch, data: BaseResponse<T>) => {
  const error = data.messages.length ? data.messages[0] : "some error occured"
  dispatch(setAppError({ error }))
  dispatch(setAppStatus({ status: "failed" }))
}
