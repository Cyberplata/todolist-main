import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import { EditableSpan } from "common/components"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import React, { ChangeEvent, memo, useCallback } from "react"
import type { DomainTask } from "../../../../../api"
import { TaskStatus } from "../../../../../lib/enums"
import { deleteTaskTC, updateTaskTC } from "../../../../../model/tasks-reducer"
import type { DomainTodolist } from "../../../../../model/todolists-reducer"
import { getListItemSx } from "./Task.styles"

type Props = {
   todolist: DomainTodolist
   task: DomainTask
   // disabled?: boolean
}

export const Task = memo((props: Props) => {
   const { todolist, task } = props

   const dispatch = useAppDispatch()

   const removeTaskHandler = useCallback(() => {
      dispatch(deleteTaskTC({ todolistId: todolist.id, taskId: task.id }))
   }, [dispatch, todolist.id, task.id])

   const changeTaskStatusHandler = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
         const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
         const newTask = { ...task, status }
         dispatch(updateTaskTC(newTask)) // через props task
         // dispatch(updateTaskTC({ todolistId: todolist.id, taskId: task.id, domainModel: newTask })) // через getState()
      },
      [dispatch, todolist.id, task.id],
   )

   const changeTaskTitleHandler = useCallback(
      (title: string) => {
         const newTask = { ...task, title }
         dispatch(updateTaskTC(newTask)) // через props task
         // dispatch(updateTaskTC({ todolistId: todolist.id, taskId: task.id, domainModel: newTask })) // через getState()
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
            <Checkbox
               checked={task.status === TaskStatus.Completed}
               onChange={changeTaskStatusHandler}
               disabled={todolist.entityStatus === "loading"}
            />
            <EditableSpan
               value={task.title}
               onChange={changeTaskTitleHandler}
               disabled={todolist.entityStatus === "loading"}
            />
         </div>
         <IconButton aria-label="delete" onClick={removeTaskHandler} disabled={todolist.entityStatus === "loading"}>
            <DeleteIcon />
         </IconButton>
      </ListItem>
   )
})
