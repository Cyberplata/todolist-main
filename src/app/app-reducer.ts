export type ThemeModeType = "dark" | "light"

type InitialState = typeof initialState

const initialState = {
   themeMode: "light" as ThemeModeType,
}

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
   switch (action.type) {
      case "CHANGE_THEME":
         return {
            ...state,
            themeMode: action.payload.theme,
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

export type ChangeThemeActionType = ReturnType<typeof changeThemeAC>

export type ActionsType = ChangeThemeActionType
