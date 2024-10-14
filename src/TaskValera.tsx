import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import React, {ChangeEvent, memo} from 'react';
import {useDispatch} from "react-redux";
import {EditableSpan} from './EditableSpan';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, type TaskType} from "./model/tasks-reducer";
import type {TodolistType} from "./model/todolists-reducer";
import {getListItemSx} from './Todolist.styles';

type TaskValeraPropsType = {
    todolist: TodolistType
    task: TaskType
    // todolistId: string
    // removeTask: (todolistID: string, taskId: string) => void
    // changeTaskStatus: (todolistID: string, taskId: string, taskStatus: boolean) => void
    // changeTaskTitle: (todolistID: string, taskId: string, title: string) => void
};

export const TaskValera = memo((props: TaskValeraPropsType) => {
    console.log("TaskValera is called")

    const {
        todolist,
        task,
        // todolistId,
        // removeTask,
        // changeTaskStatus,
        // changeTaskTitle
    } = props

    // const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    // Final????? Стоит ли оборачивать в хук useCallback()?
    const removeTaskHandler = () => {
        // removeTask(todolist.id, task.id)
        dispatch(removeTaskAC({todolistID: todolist.id, taskId: task.id}))
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({todolistID: todolist.id, taskId: task.id, isDone: newStatusValue}))
    }
    const updateTaskHandler = (newTitle: string) => {
        dispatch(changeTaskTitleAC({todolistID: todolist.id, taskId: task.id, title: newTitle}))
    }

    // const removeTaskHandler = useCallback(() => {
    //     const removeTask = (todolistID: string, taskId: string) => {
    //         dispatch(removeTaskAC({todolistID, taskId}))
    //     }
    //     return removeTask;
    // }, [dispatch]);
    //
    // const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    //     const newStatusValue = e.currentTarget.checked
    //     // changeTaskStatus(todolistId, task.id, newStatusValue)
    //     const changeTaskStatus = (todolistID: string, taskId: string) => {
    //         dispatch(changeTaskStatusAC({todolistID, taskId, isDone: newStatusValue}))
    //     }
    //     return changeTaskStatus;
    // }, [dispatch]);
    //
    // const updateTaskHandler = useCallback(() => {
    //     // changeTaskTitle(todolistId, task.id, newTitle)
    //     const changeTaskTitle = (todolistID: string, taskId: string, title: string) => {
    //         dispatch(changeTaskTitleAC({todolistID, taskId, title}))
    //     }
    //     return changeTaskTitle;
    // }, [dispatch]);

    // if (!tasks[todolist.id]) {
    //     return null; // или любой другой способ обработки ошибки
    // }
    if (!task) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        return null; // или любой другой способ обработки ошибки
    }

    // CRUD tasks:
    // const changeTaskStatus = useCallback((todolistID: string, taskId: string, taskStatus: boolean) => {
    //     dispatch(changeTaskStatusAC({todolistID, taskId, isDone: taskStatus}))
    // }, [dispatch]);
    //
    // const changeTaskTitle = useCallback((todolistID: string, taskId: string, title: string) => {
    //     dispatch(changeTaskTitleAC({todolistID, taskId, title}))
    // }, [dispatch]);
    //
    // const removeTask = useCallback((todolistID: string, taskId: string) => {
    //     dispatch(removeTaskAC({todolistID, taskId}))
    // }, [dispatch]);

    // // Хэндлеры
    // const removeTaskHandler = () => {
    //     removeTask(todolistId, task.id)
    // }
    // const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     const newStatusValue = e.currentTarget.checked
    //     changeTaskStatus(todolist.id, task.id, newStatusValue)
    // }
    // const updateTaskHandler = (newTitle: string) => {
    //     changeTaskTitle(todolist.id, task.id, newTitle)
    // }


    // const removeTaskHandler = () => {
    //     const removeTask = useCallback((todolistID: string, taskId: string) => {
    //         dispatch(removeTaskAC({todolistID, taskId}))
    //     }, [dispatch]);
    //     return removeTask;
    // }
    // const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     const newStatusValue = e.currentTarget.checked
    //     // changeTaskStatus(todolistId, task.id, newStatusValue)
    //     const changeTaskStatus = useCallback((todolistID: string, taskId: string) => {
    //         dispatch(changeTaskStatusAC({todolistID, taskId, isDone: newStatusValue}))
    //     }, [dispatch]);
    //     return changeTaskStatus;
    // }
    // const updateTaskHandler = () => {
    //     // changeTaskTitle(todolistId, task.id, newTitle)
    //     const changeTaskTitle = useCallback((todolistID: string, taskId: string, title: string) => {
    //         dispatch(changeTaskTitleAC({todolistID, taskId, title}))
    //     }, [dispatch]);
    //     return changeTaskTitle;
    // }

    return (
        // <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
        //     <div>
        //         <Checkbox checked={task.isDone} onChange={changeTaskStatus}/>
        //         <EditableSpan odlTitle={task.title} updateItem={changeTaskTitle}/>
        //     </div>
        //     <IconButton aria-label="delete" onClick={removeTask}>
        //         <DeleteIcon/>
        //     </IconButton>
        // </ListItem>
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan odlTitle={task.title} updateItem={updateTaskHandler}/>
            </div>
            <IconButton aria-label="delete" onClick={removeTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    );
});
