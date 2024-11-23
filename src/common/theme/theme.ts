import { createTheme } from "@mui/material/styles"
import type { ThemeModeType } from "../../app"

export const getTheme = (themeMode: ThemeModeType) => {
   return createTheme({
      palette: {
         // mode: themeMode === 'light' ? 'light' : 'dark',
         mode: themeMode,
         primary: {
            main: "#7017ee",
            contrastText: "white",
         },
         secondary: {
            light: "#757ce8",
            main: "#3f50b5",
            dark: "#002884",
            contrastText: "#fff",
         },
      },
   })
}
