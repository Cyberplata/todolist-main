import type { NullableString, RequestStatus, ThemeModeType } from "./app-reducer"
import type { RootState } from "./store"

export const selectThemeMode = (state: RootState): ThemeModeType => state.app.themeMode

export const selectSetAppStatus = (state: RootState): RequestStatus => state.app.status

export const selectError = (state: RootState): NullableString => state.app.error
