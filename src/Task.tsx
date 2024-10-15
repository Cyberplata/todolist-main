import React, {ChangeEvent, memo} from 'react';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {EditableSpan} from './EditableSpan';
import type {TaskType} from "./model/tasks-reducer";
import {getListItemSx} from "./Todolist.styles";

type TaskPropsType = {
    task: TaskType;
    removeTaskHandler: () => void;
    changeTaskStatusHandler: (e: ChangeEvent<HTMLInputElement>) => void;
    updateTaskHandler: (newTitle: string) => void;
};

export const Task = memo((props: TaskPropsType) => {
    const {task, removeTaskHandler, changeTaskStatusHandler, updateTaskHandler} = props

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
