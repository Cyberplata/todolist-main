import { setAppStatusAC } from "app/app-reducer"
import { type AppThunk } from "app/store"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { ResultCode } from "../../todolists/lib/enums"
import { clearTasksDataAC } from "../../todolists/model/tasks-reducer"
import { clearTodolistsDataAC } from "../../todolists/model/todolists-reducer"
import { authApi, type LoginArgs } from "../api"

type InitialStateType = typeof initialState

export type CaptchaUrl = string | null

const initialState = {
   isLoggedIn: false,
   isInitialized: false,
   captchaUrl: null as CaptchaUrl, // URL капчи, если она нужна
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
      case "SET_IS_LOGGED_IN":
         return { ...state, isLoggedIn: action.payload.isLoggedIn }
      case "SET_IS_INITIALIZED":
         return { ...state, isInitialized: action.payload.isInitialized }
      case "SET_CAPTCHA_URL":
         return { ...state, captchaUrl: action.payload.captchaUrl }
      default:
         return state
   }
}
// Action creators
const setIsLoggedInAC = (isLoggedIn: boolean) => {
   return { type: "SET_IS_LOGGED_IN", payload: { isLoggedIn } } as const
}
const setIsInitializedAC = (isInitialized: boolean) => {
   return { type: "SET_IS_INITIALIZED", payload: { isInitialized } } as const
}
const setCaptchaUrlAC = (captchaUrl: CaptchaUrl) => {
   return { type: "SET_CAPTCHA_URL", payload: { captchaUrl } } as const
}

// thunks
export const loginTC =
   (data: LoginArgs): AppThunk =>
   (dispatch) => {
      dispatch(setAppStatusAC("loading"))
      authApi
         .login(data)
         .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
               dispatch(setAppStatusAC("succeeded")) // Скрываем крутилку после успешной загрузки
               dispatch(setIsLoggedInAC(true)) // Логинимся
               localStorage.setItem("sn-token", res.data.data.token) // Устанавливаем обновлённый токен в localStorage
               dispatch(setCaptchaUrlAC(null)) // Удаляем капчу, если авторизация успешна
            } else if (res.data.resultCode === 10) {
               // Если сервер требует капчу
               authApi.getCaptchaUrl().then((captchaRes) => {
                  dispatch(setCaptchaUrlAC(captchaRes.data.data.url))
               })
            } else {
               handleServerAppError(res.data, dispatch)
            }
         })
         .catch((error) => {
            handleServerNetworkError(error, dispatch)
         })
   }

// export const getCaptchaTC = (): AppThunk => (dispatch) => {
//    // Здесь ты можешь использовать свой способ получения URL капчи
//    authApi.login({ email: "", password: "" }) // Имитация запроса для получения капчи
//       .then(() => {
//          dispatch(setCaptchaUrlAC("url_капчи")) // Пример
//       })
//       .catch((error) => {
//          handleServerNetworkError(error, dispatch)
//       })
// }


export const logoutTC = (): AppThunk => (dispatch) => {
   dispatch(setAppStatusAC("loading"))
   authApi
      .logout()
      .then((res) => {
         if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC("succeeded")) // Скрываем крутилку после успешной logout
            dispatch(setIsLoggedInAC(false)) // Вылогиниваемся
            localStorage.removeItem("sn-token")
            // логика по удалению из стейта тудулистов + тасок после logout-а
            dispatch(clearTodolistsDataAC()) // store.getState().todolists = []
            dispatch(clearTasksDataAC()) // store.getState().tasks = {}
         } else {
            handleServerAppError(res.data, dispatch)
         }
      })
      .catch((error) => {
         handleServerNetworkError(error, dispatch)
      })
}

export const initializeAppTC = (): AppThunk => (dispatch) => {
   dispatch(setAppStatusAC("loading"))
   authApi
      .me()
      .then((res) => {
         if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC("succeeded"))
            dispatch(setIsLoggedInAC(true))
         } else {
            handleServerAppError(res.data, dispatch)
         }
      })
      .catch((error) => {
         handleServerNetworkError(error, dispatch)
      })
      .finally(() => {
         dispatch(setIsInitializedAC(true))
      })
}

// Types
export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>
export type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>
export type SetCaptchaUrlActionType = ReturnType<typeof setCaptchaUrlAC>

// Actions types
type ActionsType = SetIsLoggedInActionType | SetIsInitializedActionType | SetCaptchaUrlActionType
