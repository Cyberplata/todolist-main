import type { RootState } from "app/store"
import type { CaptchaUrl } from "./auth-reducer"

export const selectIsLoggedIn = (state: RootState): boolean => state.auth.isLoggedIn

export const selectIsInitialized = (state: RootState): boolean => state.auth.isInitialized

export const selectCaptchaUrl = (state: RootState): CaptchaUrl => state.auth.captchaUrl