import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { ErrorSnackbar, Header } from "common/components"
import { useAppSelector } from "common/hooks"
import { Routing } from "common/routing"
import { getTheme } from "common/theme"
import { selectThemeMode } from "./appSelectors"

export const App = () => {
   const themeMode = useAppSelector(selectThemeMode)

   return (
      <div className="App">
         <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline />
            <Header />
            <Routing />
            <ErrorSnackbar />
         </ThemeProvider>
      </div>
   )
}
