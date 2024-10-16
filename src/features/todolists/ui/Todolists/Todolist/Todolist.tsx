import {memo, useCallback} from "react";
import {useDispatch} from "react-redux";
import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {addTaskAC} from "../../../model/tasks-reducer";
import type {TodolistType} from "../../../model/todolists-reducer";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";
import {Tasks} from "./Tasks/Tasks";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";

type Props = {
    todolist: TodolistType
}

export const Todolist = memo(({todolist}: Props) => {
    console.log("Todolist is called")

    const dispatch = useDispatch()

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC({todolistID: todolist.id, title}))
    }, [dispatch, todolist.id])

    return (
        <>
            <TodolistTitle todolist={todolist}/>
            {/*<div>*/}
            <AddItemForm addItem={addTaskHandler}/>
            {/*</div>*/}
            <Tasks todolist={todolist}/>
            <FilterTasksButtons todolist={todolist}/>
        </>
    )
})


