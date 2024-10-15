import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import React, {ChangeEvent, memo, useCallback} from 'react';
import {useDispatch} from "react-redux";
import {EditableSpan} from '../../../../../../common/components/EditableSpan';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, type TaskType} from "../../../../../../model/tasks-reducer";
import type {TodolistType} from "../../../../../../model/todolists-reducer";
import {getListItemSx} from '../../../../../../Todolist.styles';

type Props = {
    todolist: TodolistType
    task: TaskType
};

export const Task = memo((props: Props) => {
    console.log("TaskValera is called")

    const {
        todolist,
        task,
    } = props

    const dispatch = useDispatch()

    // Final????? Стоит ли оборачивать в хук useCallback()?
    const removeTaskHandler = useCallback(() => {
        // removeTask(todolist.id, task.id)
        dispatch(removeTaskAC({todolistID: todolist.id, taskId: task.id}))
    }, [dispatch, todolist.id, task.id])

    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({todolistID: todolist.id, taskId: task.id, isDone: newStatusValue}))
    }, [dispatch, todolist.id, task.id])

    const changeTaskTitleHandler = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC({todolistID: todolist.id, taskId: task.id, title: newTitle}))
    }, [dispatch, todolist.id, task.id])

    if (!task) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        return null; // или любой другой способ обработки ошибки
    }

    return (
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan odlTitle={task.title} updateItem={changeTaskTitleHandler}/>
            </div>
            <IconButton aria-label="delete" onClick={removeTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    );
});
