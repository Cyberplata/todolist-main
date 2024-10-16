import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import React, {memo, useCallback} from 'react';
import {useDispatch} from "react-redux";
import {EditableSpan} from "../../../../../../common/components/EditableSpan";
import {changeTodolistTitleAC, removeTodolistAC, type TodolistType} from "../../../../../../model/todolists-reducer";

type Props = {
    todolist: TodolistType
}

export const TodolistTitle = memo(({todolist}: Props) => {
    const dispatch = useDispatch()

    const removeTodolistHandler = useCallback(() => {
        dispatch(removeTodolistAC(todolist.id))
    }, [dispatch, todolist.id])

    const updateTodolistHandler = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleAC({todolistID: todolist.id, title: newTitle}))
    }, [dispatch, todolist.id])

    return (
        // <div className={'todolist-title-container'}>
        //     <h3>
        //         <EditableSpan odlTitle={todolist.title} updateItem={updateTodolistHandler}/>
        //     </h3>
        //     <IconButton aria-label="delete" onClick={removeTodolistHandler}>
        //         <DeleteIcon/>
        //     </IconButton>
        // </div>
        <div className={'container'}>
            <h3><EditableSpan odlTitle={todolist.title} updateItem={updateTodolistHandler}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
        </div>
    );
});