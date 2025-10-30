import { instance } from "@/common/instance/instance"
import { LoginForm } from "../lib"
import { BaseResponse } from "@/common/types/types"

export const authApi = {
  login(args: LoginForm) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>(`/auth/login`, args)
  },
}
