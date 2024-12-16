import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import { EditableSpan } from "common/components"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import {
   type DomainTodolist,
   removeTodolistTC,
   updateTodolistTitleTC
} from "features/todolists/model/todolists-reducer"
import React, { memo, useCallback } from "react"
import styles from "./TodolistTitle.module.css"

type Props = {
   todolist: DomainTodolist
}

export const TodolistTitle = memo(({ todolist }: Props) => {
   const dispatch = useAppDispatch()

   const removeTodolistHandler = useCallback(() => {
      dispatch(removeTodolistTC(todolist.id))
   }, [dispatch, todolist.id])

   const updateTodolistHandler = useCallback(
      (title: string) => {
         dispatch(updateTodolistTitleTC({ id: todolist.id, title }))
      },
      [dispatch, todolist.id],
   )

   return (
      <div className={styles.container}>
         <h3>
            <EditableSpan value={todolist.title} onChange={updateTodolistHandler} />
            <IconButton aria-label="delete" onClick={removeTodolistHandler}>
               <DeleteIcon />
            </IconButton>
         </h3>
      </div>
   )
})
