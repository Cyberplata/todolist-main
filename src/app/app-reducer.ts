export type ThemeModeType = "dark" | "light" | undefined
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
export type NullableString = string | null

type InitialState = typeof initialState

const initialState = {
   themeMode: "light" as ThemeModeType,
   status: "idle" as RequestStatus,
   // error: null as string | null
   error: null as NullableString,
}

export const appReducer = (state: InitialState = initialState, action: AppReducerActionsType): InitialState => {
   switch (action.type) {
      case "CHANGE_THEME":
         return { ...state, themeMode: action.payload.theme }
      case "SET_STATUS":
         return { ...state, status: action.payload.status }
      case "SET_ERROR":
         return { ...state, error: action.payload.error }
      default:
         return state
   }
}

// Action creators
export const changeThemeAC = (theme: ThemeModeType) => {
   return {
      type: "CHANGE_THEME",
      payload: { theme },
   } as const
}

export const setAppStatusAC = (status: RequestStatus) => {
   return {
      type: "SET_STATUS",
      payload: { status },
   } as const
}

export const setAppErrorAC = (error: NullableString) => {
   return {
      type: "SET_ERROR",
      payload: { error },
   } as const
}

export type ChangeThemeActionType = ReturnType<typeof changeThemeAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

export type AppReducerActionsType = ChangeThemeActionType | SetAppStatusActionType | SetAppErrorActionType
