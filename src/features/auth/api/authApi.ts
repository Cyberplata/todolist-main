import { instance } from "common/instance"
import type { BaseResponse } from "common/types"
import type { LoginArgs } from "./authApi.types"

export const authApi = {
   login(payload: LoginArgs) {
      return instance.post<BaseResponse<{ userId: number; token: string }>>(`auth/login`, payload)
      // return instance.post<BaseResponse<{ userId: number; token: string }>>(`auth/login`, payload, {
      //    // вариант с передачей headers в config
      //    headers: {
      //       Authorization: `Bearer ${localStorage.getItem("sn-token") || ""}`,
      //    },
      // })
   },
   logout() {
      return instance.delete<BaseResponse>(`auth/login`)
   },
   me() {
      return instance.get<BaseResponse<{ id: number; email: string; login: string }>>(`auth/me`)
   },
   // Здесь метод для получения URL капчи (если он имеется в твоём API)
   getCaptchaUrl() {
      return instance.get<BaseResponse<{ url: string }>>("https://social-network.samuraijs.com/api/1.0/security/get-captcha-url")
   }
}
