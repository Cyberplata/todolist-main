import type {ThemeModeType} from "./app-reducer";
import type {RootState} from "./store";

export const selectThemeMode = (state: RootState): ThemeModeType => state.app.themeMode