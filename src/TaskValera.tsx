import React, {ChangeEvent, memo} from 'react';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {EditableSpan} from './EditableSpan';
import type {TaskType} from "./model/tasks-reducer";
import {getListItemSx} from './Todolist.styles';

type TaskValeraPropsType = {
    todolistId: string
    task: TaskType
    removeTask: (todolistID: string, taskId: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, taskStatus: boolean) => void
    changeTaskTitle: (todolistID: string, taskId: string, title: string) => void
};

export const TaskValera = memo((props: TaskValeraPropsType) => {
    console.log("TaskValera is called")

    const {todolistId, task, removeTask, changeTaskStatus, changeTaskTitle} = props

    if (!task) {
        return null; // или любой другой способ обработки ошибки
    }

    const removeTaskHandler = () => {
        removeTask(todolistId, task.id)
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(todolistId, task.id, newStatusValue)
    }
    const updateTaskHandler = (newTitle: string) => {
        changeTaskTitle(todolistId, task.id, newTitle)
    }

    return (
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
