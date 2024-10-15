import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import {useSelector} from "react-redux";
import {getTheme} from "../common/theme/theme";
import {Header} from "../common/components/Header";
import {Main} from "./Main";
import type {ThemeModeType} from "./app-reducer";
import type {RootState} from "./store";


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

    const themeMode = useSelector<RootState, ThemeModeType>(state => state.app.themeMode)

    return (
        <div className="App">
            <ThemeProvider theme={getTheme(themeMode)}>
                <CssBaseline/>
                <Header/>
                <Main/>
            </ThemeProvider>
        </div>
    );
}
