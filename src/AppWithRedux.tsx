import './App.css';
import {Todolist} from "./Todolist";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {AppBarHeader} from "./AppBarHeader";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./module/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./module/tasks-reducer";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type TodolistType = {
    id: string,
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type ThemeMode = 'dark' | 'light'

function AppWithRedux() {
    // BLL:
    // Global States:
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    // CRUD tasks:
    const addTask = (todolistID: string, title: string) => {
        const action = addTaskAC(todolistID, title)
        dispatchToTasks(action)
    }
    const changeTaskStatus = (todolistID: string, taskId: string, taskStatus: boolean) => {
        const action = changeTaskStatusAC(todolistID, taskId, taskStatus)
        dispatchToTasks(action)
    }
    const changeTaskTitle = (todolistID: string, taskId: string, title: string) => {
        const action = changeTaskTitleAC(todolistID, taskId, title)
        dispatchToTasks(action)
    }
    const removeTask = (todolistID: string, taskId: string) => {
        const action = removeTaskAC(todolistID, taskId)
        dispatchToTasks(action)
    }

    // CRUD todolist:
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    const changeFilter = (todolistId: string, filterValue: FilterValuesType) => {
        const action = changeFilterAC(todolistId, filterValue)
        dispatchToTodolists(action)
    }
    const changeTodolistTitle = (todolistID: string, title: string) => {
        const action = changeTodolistTitleAC(todolistID, title)
        dispatchToTodolists(action)
    }
    const removeTodolist = (todolistID: string) => {
        const action = removeTodolistAC(todolistID)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    // UI:
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#7017ee',
                contrastText: 'white',
            },
            secondary: {
                light: '#757ce8',
                main: '#3f50b5',
                dark: '#002884',
                contrastText: '#fff',
            },
        },
    })

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Box sx={{flexGrow: 1, mb: 10}}>
                    <AppBarHeader changeModeHandler={changeModeHandler}/>
                </Box>
                <Container fixed>

                    <Grid container sx={{mb: 5}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>

                    <Grid container spacing={4}>
                        {todolists.map((el) => {
                            // let tasksForTodolist = tasks[el.id]
                            // if (el.filter === 'active') {
                            //     tasksForTodolist = tasks[el.id].filter(task => !task.isDone)
                            // }
                            // if (el.filter === 'completed') {
                            //     tasksForTodolist = tasks[el.id].filter(task => task.isDone)
                            // }
                            return (
                                <Grid item>
                                    <Paper elevation={6} sx={{p: '20px'}}>
                                        <Todolist
                                            key={el.id}
                                            todolistId={el.id}
                                            title={el.title}
                                            tasks={tasks[el.id]}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={el.filter}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </ThemeProvider>

        </div>
    );
}

export default AppWithRedux;
