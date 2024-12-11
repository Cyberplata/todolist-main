import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import { EditableSpan } from "common/components"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import React, { ChangeEvent, memo, useCallback } from "react"
import type { DomainTask } from "../../../../../api"
import { TaskStatus } from "../../../../../lib/enums"
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "../../../../../model/tasks-reducer"
import type { DomainTodolist } from "../../../../../model/todolists-reducer"
import { getListItemSx } from "./Task.styles"

type Props = {
   todolist: DomainTodolist
   task: DomainTask
}

export const Task = memo((props: Props) => {
   // console.log("TaskValera is called")

   const { todolist, task } = props

   const dispatch = useAppDispatch()

   const removeTaskHandler = useCallback(() => {
      dispatch(removeTaskAC({ todolistId: todolist.id, taskId: task.id }))
   }, [dispatch, todolist.id, task.id])

   const changeTaskStatusHandler = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
         const newStatusValue = e.currentTarget.checked
         dispatch(changeTaskStatusAC({ todolistId: todolist.id, taskId: task.id, isDone: newStatusValue }))
      },
      [dispatch, todolist.id, task.id],
   )

   const changeTaskTitleHandler = useCallback(
      (newTitle: string) => {
         dispatch(changeTaskTitleAC({ todolistId: todolist.id, taskId: task.id, title: newTitle }))
      },
      [dispatch, todolist.id, task.id],
   )

   // TODO: Нужна ли тут эта проверка?
   if (!task) {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      return null // или любой другой способ обработки ошибки
   }

   return (
      <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
         <div>
            <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatusHandler} />
            <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
         </div>
         <IconButton aria-label="delete" onClick={removeTaskHandler}>
            <DeleteIcon />
         </IconButton>
      </ListItem>
   )
})
