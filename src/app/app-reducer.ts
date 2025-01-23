export type ThemeModeType = "dark" | "light"
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialState = typeof initialState

const initialState = {
   themeMode: "light" as ThemeModeType,
   status: 'idle' as RequestStatus,
}


export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
   switch (action.type) {
      case "CHANGE_THEME":
         return {
            ...state,
            themeMode: action.payload.theme,
         }
      case 'SET_STATUS':
         return {
            ...state,
            status: action.payload.status,
         }
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
      type: 'SET_STATUS',
      payload: { status },
   } as const
}

export type ChangeThemeActionType = ReturnType<typeof changeThemeAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

export type ActionsType = ChangeThemeActionType | SetAppStatusActionType
