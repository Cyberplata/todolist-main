// // @flow
// import * as React from 'react';
// import {getListItemSx} from "./Todolist.styles";
// import Checkbox from "@mui/material/Checkbox";
// import {EditableSpan} from "./EditableSpan";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ListItem from "@mui/material/ListItem";
// import {ChangeEvent} from "react";
//
// type TaskType = {
//     tasks: TaskType[]
//     removeTaskHandler: () => void
//     changeTaskStatusHandler: (e: ChangeEvent<HTMLInputElement>) => void
//     updateTaskHandler: (newTitle: string) => void
// };
// export const Task = (props: TaskType) => {
//
//     const {
//         tasks,
//         removeTaskHandler,
//         changeTaskStatusHandler,
//         updateTaskHandler
//     } = props
//
//     return (
//         <ListItem
//             key={tasks[]}
//             sx={getListItemSx(task.isDone)}
//         >
//             <div>
//                 <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
//                 <EditableSpan odlTitle={task.title} updateItem={updateTaskHandler}/>
//             </div>
//             <IconButton aria-label="delete" onClick={removeTaskHandler}>
//                 <DeleteIcon/>
//             </IconButton>
//         </ListItem>
//
//         // <ListItem
//         //     key={task.id}
//         //     sx={getListItemSx(task.isDone)}
//         // >
//         //     <div>
//         //         <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
//         //         <EditableSpan odlTitle={task.title} updateItem={updateTaskHandler}/>
//         //     </div>
//         //     <IconButton aria-label="delete" onClick={removeTaskHandler}>
//         //         <DeleteIcon/>
//         //     </IconButton>
//         // </ListItem>
//     );
// };


// import * as React from 'react';
// import {getListItemSx} from "./Todolist.styles";
// import Checkbox from "@mui/material/Checkbox";
// import {EditableSpan} from "./EditableSpan";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ListItem from "@mui/material/ListItem";
// import {ChangeEvent} from "react";
//
// type TaskProps = {
//     task: {
//         id: string;
//         title: string;
//         isDone: boolean;
//     };
//     removeTaskHandler: () => void;
//     changeTaskStatusHandler: (e: ChangeEvent<HTMLInputElement>) => void;
//     updateTaskHandler: (newTitle: string) => void;
// };
//
// export const Task = (props: TaskProps) => {
//     const {
//         task,
//         removeTaskHandler,
//         changeTaskStatusHandler,
//         updateTaskHandler
//     } = props;
//
//     return (
//         <ListItem
//             key={task.id}
//             sx={getListItemSx(task.isDone)}
//         >
//             <div>
//                 <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
//                 <EditableSpan oldTitle={task.title} updateItem={updateTaskHandler}/>
//             </div>
//             <IconButton aria-label="delete" onClick={removeTaskHandler}>
//                 <DeleteIcon/>
//             </IconButton>
//         </ListItem>
//     );
// };

import React, { ChangeEvent } from 'react';
import { TaskType } from './App';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { EditableSpan } from './EditableSpan';
import { getListItemSx } from './Todolist.styles';

type TaskProps = {
    task: TaskType;
    todolistId: string;
    removeTask: (todolistID: string, taskId: string) => void;
    changeTaskStatus: (todolistID: string, taskId: string, taskStatus: boolean) => void;
    changeTaskTitle: (todolistID: string, taskId: string, title: string) => void;
};

export const Task: React.FC<TaskProps> = ({ task, todolistId, removeTask, changeTaskStatus, changeTaskTitle }) => {
    const removeTaskHandler = () => {
        removeTask(todolistId, task.id);
    };

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked;
        changeTaskStatus(todolistId, task.id, newStatusValue);
    };

    const updateTaskHandler = (newTitle: string) => {
        changeTaskTitle(todolistId, task.id, newTitle);
    };

    return (
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
                <EditableSpan odlTitle={task.title} updateItem={updateTaskHandler} />
            </div>
            <IconButton aria-label="delete" onClick={removeTaskHandler}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    );
};
