import { setAppStatusAC } from "app/app-reducer"
import type { AppThunk } from "app/store"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { ResultCode } from "../../todolists/lib/enums"
import { authApi, type LoginArgs } from "../api"

type InitialStateType = typeof initialState

const initialState = {
   isLoggedIn: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
   // debugger
   switch (action.type) {
      case "SET_IS_LOGGED_IN":
         return { ...state, isLoggedIn: action.payload.isLoggedIn }
      default:
         return state
   }
}
// Action creators
const setIsLoggedInAC = (isLoggedIn: boolean) => {
   return { type: "SET_IS_LOGGED_IN", payload: { isLoggedIn } } as const
}

// Actions types
type ActionsType = ReturnType<typeof setIsLoggedInAC>

// thunks
export const loginTC =
   (data: LoginArgs): AppThunk =>
   (dispatch) => {
      dispatch(setAppStatusAC("loading"))
      // debugger
      authApi
         .login(data)
         .then((res) => {
            // debugger
            if (res.data.resultCode === ResultCode.Success) {
               // debugger
               // Скрываем крутилку после успешной загрузки
               dispatch(setAppStatusAC("succeeded"))
               // Логинимся
               dispatch(setIsLoggedInAC(true))
            } else {
               // debugger
               handleServerAppError(res.data, dispatch)
            }
         })
         .catch((error) => {
            // debugger
            // Здесь будут у нас все 400 и 500 ошибки
            handleServerNetworkError(error, dispatch)
         })
   }
