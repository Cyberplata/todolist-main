import {FilterValuesType, TaskType, TodolistType} from "./app/App";
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import {filterButtonContainerSx} from "./Todolist.styles";
import {Task} from "./Task";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./app/store";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./module/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./module/tasks-reducer";

// Отдаём todolist вместо всех пропсов, потому что, думаем, что мне нужно для отрисовки моих компонент? Нам нужны тудулисты и таски.
// Могу ли я вытащить тудулисты зная id? - да, с использованием useSelector().
// Могу ли я вытащить таски зная id? - да, по id.
// Но когда мы оцениваем App мы уже достали наш объект todolist с помощью useSelector()
// И чтобы лишний раз не пинать наш store и не делать лишних перерисовок, передаём через пропсы только todolist
type PropsType = {
    todolist: TodolistType
}

export const TodolistWithRedux = ({todolist}: PropsType) => {
    // console.log("TodolistWithRedux is called")

    // todo: перенести
    // let tasksForTodolist = tasks
    // if (el.filter === 'active') {
    // 	tasksForTodolist = tasks.filter(task => !task.isDone)
    // }
    // if (el.filter === 'completed') {
    // 	tasksForTodolist = tasks.filter(task => task.isDone)
    // }

    const {
        id,
        title,
        filter
    } = todolist

    const tasks = useSelector<RootState, TaskType[]>(state => state.tasks[id])

    const dispatch = useDispatch()

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        // dispatch(changeFilterAC(id, filter))
        dispatch(changeFilterAC({id, filter}))
    }

    const deleteAllTodoHandler = () => {
        dispatch(removeTodolistAC(id))
    }

    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC({todolistID: id, title}))
    }

    const updateTodolistHandler = (title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }

    // const updateTaskHandler = (taskId: string, newTitle: string) => {
    //     changeTaskTitle(todolistId, taskId, newTitle)
    // }

    // const removeTaskHandler = (taskId: string) => {
    //     removeTask(todolistId, taskId)
    // }

    // Отфильтрованные таски, вынес из map-а компоненты App
    const filteredTasks = () => {
        let tasksForTodolist: TaskType[] = tasks;
        if (filter === 'active') {
            tasksForTodolist = tasks.filter(task => !task.isDone)
        }
        if (filter === 'completed') {
            tasksForTodolist = tasks.filter(task => task.isDone)
        }
        return tasksForTodolist;
    }

    // Отмэпленные таски из jsx Todolist
    const mappedTask = filteredTasks().map((task) => {
        const removeTaskHandler = () => {
            dispatch(removeTaskAC({todolistID: id, taskId: task.id}))
        }
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const newStatusValue = e.currentTarget.checked
            dispatch(changeTaskStatusAC({todolistID: id, taskId: task.id, taskStatus: newStatusValue}))
        }
        const updateTaskHandler = (newTitle: string) => {
            dispatch(changeTaskTitleAC({todolistID: id, taskId: task.id, title: newTitle}))
        }
        return <Task
            key={task.id}
            task={task}
            removeTaskHandler={removeTaskHandler}
            changeTaskStatusHandler={changeTaskStatusHandler}
            updateTaskHandler={updateTaskHandler}
        />
    })

    return (
        <div>
            <h3><EditableSpan odlTitle={title} updateItem={updateTodolistHandler}/>
                <IconButton aria-label="delete" onClick={deleteAllTodoHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>

            <div>
                <AddItemForm addItem={addTaskHandler}/>
            </div>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {mappedTask}
                    </List>
            }
            <Box sx={filterButtonContainerSx}>
                <Button variant={filter === 'all' ? 'outlined' : 'contained'}
                        color={"success"}
                        onClick={() => changeFilterTasksHandler('all')}
                >All</Button>
                <Button variant={filter === 'active' ? 'outlined' : 'contained'}
                        color={"primary"}
                        onClick={() => changeFilterTasksHandler('active')}
                >Active</Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'contained'}
                        color={"secondary"}
                        onClick={() => changeFilterTasksHandler('completed')}
                >Completed</Button>
            </Box>
        </div>
    )
}
