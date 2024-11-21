import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import { EditableSpan } from "common/components"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import React, { memo, useCallback } from "react"
import { changeTodolistTitleAC, removeTodolistAC, type TodolistType } from "../../../../model/todolists-reducer"
import styles from "./TodolistTitle.module.css"

type Props = {
  todolist: TodolistType
}

export const TodolistTitle = memo(({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const removeTodolistHandler = useCallback(() => {
    dispatch(removeTodolistAC(todolist.id))
  }, [dispatch, todolist.id])

  const updateTodolistHandler = useCallback(
    (newTitle: string) => {
      dispatch(changeTodolistTitleAC({ todolistID: todolist.id, title: newTitle }))
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
