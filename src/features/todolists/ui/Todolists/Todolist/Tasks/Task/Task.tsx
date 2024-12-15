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
}

export const Task = memo((props: Props) => {
   const { todolist, task } = props

   const dispatch = useAppDispatch()

   // useEffect(() => {
   //    dispatch(fetchTasksTC(todolist.id))
   // }, [])

   const removeTaskHandler = useCallback(() => {
      dispatch(deleteTaskTC({ todolistId: todolist.id, taskId: task.id }))
   }, [dispatch, todolist.id, task.id])

   const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
         const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
         const newTask = { ...task, status }
         // dispatch(changeTaskStatusTC({ todolistId: todolist.id, taskId: task.id, status }))
         // dispatch(changeTaskStatusTC(newTask))
         dispatch(updateTaskTC(newTask))
      },
      [dispatch, todolist.id, task.id]
   )

   const changeTaskTitleHandler = useCallback((title: string) => {
         const newTask = { ...task, title }
         // dispatch(changeTaskTitleTC({ todolistId: todolist.id, taskId: task.id, title }))
         // dispatch(changeTaskTitleTC(newTask))
         dispatch(updateTaskTC(newTask))
      },
      [dispatch, todolist.id, task.id]
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
