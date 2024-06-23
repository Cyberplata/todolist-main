import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {MenuButton} from "./MenuButton";
import {createTheme, ThemeProvider} from "@mui/material";
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string,
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type ThemeMode = 'dark' | 'light'

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        // [], а не "" потому что нужно чтобы он сразу сгенерировал айдишку v1() и результат завернул в "" -> "xasdsasdasdnhzx12", а не стрингу "todolistID1"
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

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const removeTask = (todolistID: string, taskId: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].filter(el => el.id !== taskId)
        })

        // const filteredTasks = tasks.filter((task) => {
        //     return task.id !== taskId
        // })
        // setTasks(filteredTasks)
    }

    const changeTaskStatus = (todolistID: string, taskId: string, taskStatus: boolean) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el =>
                el.id === taskId
                    ? {...el, isDone: taskStatus}
                    : el
            )
        })
    }
    //	{id, title, filter, filter:'completed'} === {...el}
    // [[]] убираем лишний массив, так как map и так создаёт новый массив
    const changeFilter = (todolistId: string, filterValue: FilterValuesType) => {
        setTodolists(todolists.map(el =>
            el.id === todolistId
                ? {...el, filter: filterValue}
                : el
        ))
        // const currentTodolist = todolists.find(el => el.id === todolistId)
        // console.log(currentTodolist)
        // if (currentTodolist) {
        // 	currentTodolist.filter = filterValue
        // 	setTodolists([...todolists]) // Передаём новый массив-матрёшек, чтобы реакт проснулся
        // 	// console.log(todolists)
        // }
    }
    const addTask = (todolistID: string, title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({
            ...tasks,
            [todolistID]: [newTask, ...tasks[todolistID]]
        })
    }

    const addTodolist = (title: string) => {
        const newTodolistId = v1()
        const newTodolist: TodolistType = {id: newTodolistId, title, filter: 'all'}
        setTodolists([...todolists, newTodolist])
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }

    const updateTask = (todolistID: string, taskId: string, title: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(
                el => el.id === taskId
                    ? {...el, title}
                    : el
            )
        })
    }

    const updateTodolist = (todolistID: string, title: string) => {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, title} : el))
    }

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#1e8f22',
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
                <Box sx={{flexGrow: 1, mb: 10}}>
                    <AppBar position="fixed">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                News
                            </Typography>
                            <MenuButton color="inherit">Login</MenuButton>
                            <MenuButton color="inherit">Logout</MenuButton>
                            <MenuButton color="inherit">Faq</MenuButton>
                            <Switch color={'default'} onChange={changeModeHandler}/>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Container fixed>

                    <Grid container sx={{mb: 5}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>

                    <Grid container spacing={4}>
                        {todolists.map((el) => {
                            let tasksForTodolist = tasks[el.id]
                            if (el.filter === 'active') {
                                tasksForTodolist = tasks[el.id].filter(task => !task.isDone)
                            }
                            if (el.filter === 'completed') {
                                tasksForTodolist = tasks[el.id].filter(task => task.isDone)
                            }
                            return (
                                <Grid item>
                                    <Paper elevation={6} sx={{p: '20px'}}>
                                        <Todolist
                                            key={el.id}
                                            todolistId={el.id}
                                            title={el.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={el.filter}
                                            removeTodolist={removeTodolist}
                                            updateTask={updateTask}
                                            updateTodolist={updateTodolist}
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

export default App;
