import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import { EditableSpan } from "common/components"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import {
   type DomainTodolist,
   removeTodolistTC,
   updateTodolistTitleTC,
} from "features/todolists/model/todolists-reducer"
import React, { memo, useCallback } from "react"
import styles from "./TodolistTitle.module.css"

type Props = {
   todolist: DomainTodolist
}

export const TodolistTitle = memo(({ todolist }: Props) => {
   const { title, id, entityStatus } = todolist

   const dispatch = useAppDispatch()

   const removeTodolistHandler = useCallback(() => {
      dispatch(removeTodolistTC(id))
   }, [dispatch, id])

   const updateTodolistHandler = useCallback(
      (title: string) => {
         dispatch(updateTodolistTitleTC({ id, title }))
      },
      [dispatch, id],
   )

   return (
      <div className={styles.container}>
         <h3>
            <EditableSpan value={title} onChange={updateTodolistHandler} disabled={entityStatus === "loading"} />
            <IconButton aria-label="delete" onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
               <DeleteIcon />
            </IconButton>
         </h3>
      </div>
   )
})
