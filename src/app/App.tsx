import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { Header } from "common/components"
import { useAppSelector } from "common/hooks"
import { getTheme } from "common/theme/theme"
import { selectThemeMode } from "./appSelectors"
import { Main } from "./Main"

export const App = () => {
  // console.log("App is called")
  // BLL:
  // Global States:

  // Переписали на Redux
  // const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)

  // Селектор всё равно работает, даже если данные не используются.
  // Фактический мы привязали нашу компоненту и ререндер, что делать не стоит,
  // так как это лишний ререндер
  // const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)

  const themeMode = useAppSelector(selectThemeMode)

  return (
    <div className="App">
      <ThemeProvider theme={getTheme(themeMode)}>
        <CssBaseline />
        <Header />
        <Main />
      </ThemeProvider>
    </div>
  )
}
