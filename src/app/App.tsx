import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { ErrorSnackbar, Header } from "common/components"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { Routing } from "common/routing"
import { getTheme } from "common/theme"
import { useEffect } from "react"
import { initializeAppTC, selectIsInitialized } from "../features/auth/model"
import { selectThemeMode } from "./appSelectors"
import s from "./App.module.css"
import CircularProgress from "@mui/material/CircularProgress"

export const App = () => {
   const themeMode = useAppSelector(selectThemeMode)
   const isInitialized = useAppSelector(selectIsInitialized)

   const dispatch = useAppDispatch()

   useEffect(() => {
      dispatch(initializeAppTC())
   }, [])

   if (!isInitialized) {
      return (
         <div className={s.circularProgressContainer}>
            <CircularProgress size={150} thickness={3} />
         </div>
      )
   }

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
