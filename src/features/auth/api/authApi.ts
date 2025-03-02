import { instance } from "common/instance"
import type { BaseResponse } from "common/types"
import type { LoginArgs } from "./authApi.types"

export const authApi = {
   login(payload: LoginArgs) {
      return instance.post<BaseResponse<{ userId: number; token: string }>>(`auth/login`, payload)
   },
}
