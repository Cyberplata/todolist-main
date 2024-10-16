import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import React, {memo, useCallback} from 'react';
import {EditableSpan} from "../../../../../../common/components/EditableSpan/EditableSpan";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";
import {changeTodolistTitleAC, removeTodolistAC, type TodolistType} from "../../../../model/todolists-reducer";
import styles from "./TodolistTitle.module.css"

type Props = {
    todolist: TodolistType
}

export const TodolistTitle = memo(({todolist}: Props) => {
    const dispatch = useAppDispatch()

    const removeTodolistHandler = useCallback(() => {
        dispatch(removeTodolistAC(todolist.id))
    }, [dispatch, todolist.id])

    const updateTodolistHandler = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleAC({todolistID: todolist.id, title: newTitle}))
    }, [dispatch, todolist.id])

    return (
        // <div className={'container'}>
        //     <h3>
        //         <EditableSpan odlTitle={todolist.title} updateItem={updateTodolistHandler}/>
        //     </h3>
        //     <IconButton aria-label="delete" onClick={removeTodolistHandler}>
        //         <DeleteIcon/>
        //     </IconButton>
        // </div>
        <div className={styles.container}>
            <h3>
                <EditableSpan odlTitle={todolist.title}
                              updateItem={updateTodolistHandler}
                />
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
        </div>
    );
});