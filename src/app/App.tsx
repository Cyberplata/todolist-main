import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import {useSelector} from "react-redux";
import {getTheme} from "../common/theme/theme";
import {Header} from "../Header";
import {Main} from "../Main";
import type {ThemeModeType} from "./app-reducer";
import type {RootState} from "./store";


// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }

// export type TodolistType = {
//     id: string,
//     title: string
//     filter: FilterValuesType
// }
//
// export type FilterValuesType = 'all' | 'active' | 'completed'


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
    // const theme = getTheme(themeMode)

    // const dispatch = useDispatch()


    // // CRUD tasks:
    // const addTask = useCallback((todolistID: string, title: string) => {
    //     // const action = addTaskAC({todolistID, title})
    //     // dispatch(action)
    //     dispatch(addTaskAC({todolistID, title}))
    // },[dispatch]);
    //
    // const changeTaskStatus = useCallback((todolistID: string, taskId: string, taskStatus: boolean) => {
    //     dispatch(changeTaskStatusAC({todolistID, taskId, isDone: taskStatus}))
    // },[dispatch]);
    //
    // const changeTaskTitle = useCallback((todolistID: string, taskId: string, title: string) => {
    //     dispatch(changeTaskTitleAC({todolistID, taskId, title}))
    // },[dispatch]);
    //
    // const removeTask = useCallback((todolistID: string, taskId: string) => {
    //     dispatch(removeTaskAC({todolistID, taskId}))
    // },[dispatch]);

    // // CRUD todolist:
    // const addTodolist = useCallback((title: string) => {
    //     dispatch(addTodolistAC(title))
    // }, [dispatch]);
    //
    // const changeFilter = useCallback((todolistID: string, filter: FilterValuesType) => {
    //     dispatch(changeTodolistFilterAC({todolistID, filter}))
    // },[dispatch]);
    //
    // const changeTodolistTitle = useCallback((todolistID: string, title: string) => {
    //     dispatch(changeTodolistTitleAC({todolistID, title}))
    // },[dispatch]);
    //
    // const removeTodolist = useCallback((todolistID: string) => {
    //     dispatch(removeTodolistAC(todolistID))
    // },[dispatch]);

    // UI:
    // const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    // const changeModeHandler = () => {
    //     dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
    //     // setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    // }

    // const theme = createTheme({
    //     palette: {
    //         // mode: themeMode === 'light' ? 'light' : 'dark',
    //         mode: themeMode,
    //         primary: {
    //             main: '#7017ee',
    //             contrastText: 'white',
    //         },
    //         secondary: {
    //             light: '#757ce8',
    //             main: '#3f50b5',
    //             dark: '#002884',
    //             contrastText: '#fff',
    //         },
    //     },
    // })

    return (
        <div className="App">
            {/*<ThemeProvider theme={themeMode}>*/}
            {/*<ThemeProvider theme={theme}>*/}
            <ThemeProvider theme={getTheme(themeMode)}>
                <CssBaseline/>
                {/*<Box sx={{flexGrow: 1, mb: 10}}>*/}
                {/*    <AppBarHeader changeModeHandler={changeModeHandler}/>*/}
                {/*</Box>*/}
                <Header/>

                <Main/>
                {/*<Container fixed>*/}
                {/*    <Grid container sx={{mb: 5}}>*/}
                {/*        <AddItemForm addItem={addTodolist}/>*/}
                {/*    </Grid>*/}

                {/*    <Grid container spacing={4}>*/}
                {/*        {todolists.map((el) => {*/}
                {/*            // let tasksForTodolist = tasks[el.id]*/}
                {/*            // if (el.filter === 'active') {*/}
                {/*            //     tasksForTodolist = tasks[el.id].filter(task => !task.isDone)*/}
                {/*            // }*/}
                {/*            // if (el.filter === 'completed') {*/}
                {/*            //     tasksForTodolist = tasks[el.id].filter(task => task.isDone)*/}
                {/*            // }*/}
                {/*            return (*/}
                {/*                <Grid key={el.id} item>*/}
                {/*                    <Paper elevation={6} sx={{p: '20px'}}>*/}
                {/*                        <Todolist todolistId={el.id}*/}
                {/*                                  title={el.title}*/}
                {/*                                  tasks={tasks[el.id]}*/}
                {/*                                  removeTask={removeTask}*/}
                {/*                                  changeFilter={changeFilter}*/}
                {/*                                  addTask={addTask}*/}
                {/*                                  filter={el.filter}*/}
                {/*                                  changeTaskStatus={changeTaskStatus}*/}
                {/*                                  removeTodolist={removeTodolist}*/}
                {/*                                  changeTaskTitle={changeTaskTitle}*/}
                {/*                                  changeTodolistTitle={changeTodolistTitle}*/}
                {/*                        />*/}
                {/*                    </Paper>*/}
                {/*                </Grid>*/}
                {/*            )*/}
                {/*        })}*/}
                {/*    </Grid>*/}
                {/*</Container>*/}
            </ThemeProvider>
        </div>
    );
}

// export default App;
