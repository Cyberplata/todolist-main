import {FilterValuesType, TaskType, TodolistType} from "./App";
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import {filterButtonContainerSx, getListItemSx} from "./Todolist.styles";

type PropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistId: string, filterValue: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, taskStatus: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistID: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistID: string, title: string) => void
}

export const Todolist = (props: PropsType) => {
    // todo: перенести
    // let tasksForTodolist = tasks
    // if (el.filter === 'active') {
    // 	tasksForTodolist = tasks.filter(task => !task.isDone)
    // }
    // if (el.filter === 'completed') {
    // 	tasksForTodolist = tasks.filter(task => task.isDone)
    // }

    const filteredTasks = () => {
        let tasksForTodolist = tasks;
        if (filter === 'active') {
            tasksForTodolist = tasks.filter(task => !task.isDone)
        }
        if (filter === 'completed') {
            tasksForTodolist = tasks.filter(task => task.isDone)
        }
        return tasksForTodolist;
    }

    const {
        removeTodolist,
        todolistId,
        title,
        tasks,
        filter,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        changeTaskTitle,
        changeTodolistTitle,
    } = props

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(todolistId, filter)
    }

    const deleteAllTodoHandler = () => {
        removeTodolist(todolistId)
    }

    const addTaskHandler = (title: string) => {
        addTask(todolistId, title)
    }

    const updateTodolistHandler = (newTitle: string) => {
        changeTodolistTitle(todolistId, newTitle)
    }

    const updateTaskHandler = (taskId: string, newTitle: string) => {
        changeTaskTitle(todolistId, taskId, newTitle)
    }

    const removeTaskHandler = (taskId: string) => {
        removeTask(todolistId, taskId)
    }

    const mappedTask = filteredTasks().map((task) => {
        // Todo: перенесли наверх из map
        // const removeTaskHandler = () => {
        //     removeTask(todolistId, task.id)
        // }

        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const newStatusValue = e.currentTarget.checked
            changeTaskStatus(todolistId, task.id, newStatusValue)
        }

        return <ListItem
            key={task.id}
            sx={getListItemSx(task.isDone)}
        >
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan odlTitle={task.title} updateItem={(newTitle) => {
                    updateTaskHandler(task.id, newTitle)
                }}/>
            </div>
            <IconButton aria-label="delete" onClick={() => removeTaskHandler(task.id)}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
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
