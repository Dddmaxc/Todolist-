import { instance } from "@/common/instance/instance"
import { LoginForm } from "../lib"
import { BaseResponse } from "@/common/types/types"
import { MeResponse } from "./authApi.types."

export const authApi = {
  login(args: LoginForm) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>(`/auth/login`, args)
  },
  logout() {
    return instance.delete<BaseResponse>(`/auth/login`)
  },
  me() {
    return instance.get<BaseResponse<MeResponse>>(`/auth/me`)
  },
}

