import List from "@mui/material/List"
import { useAppDispatch, useAppSelector } from "common/hooks"
import React, { memo, useEffect } from "react"
import { TaskStatus } from "../../../../lib/enums"
import { fetchTasksTC } from "../../../../model/tasks-reducer"
import { selectTasks } from "../../../../model/tasksSelectors"
import type { DomainTodolist } from "../../../../model/todolists-reducer"
import { Task } from "./Task"

type Props = {
   todolist: DomainTodolist
}

export const Tasks = memo(({ todolist }: Props) => {
   const tasks = useAppSelector(selectTasks)

   const dispatch = useAppDispatch()

   useEffect(() => {
      dispatch(fetchTasksTC(todolist.id))
   }, [])

   // Отфильтрованные таски, вынес из map-а компоненты App
   const filterTasks = () => {
      const allTodolistTasks = tasks[todolist.id]

      let tasksForTodolist = allTodolistTasks
      if (todolist.filter === "active") {
         tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.New)
      }
      if (todolist.filter === "completed") {
         tasksForTodolist = allTodolistTasks.filter((task) => task.status == TaskStatus.Completed)
      }
      return tasksForTodolist
   }

   const filteredTasks = filterTasks()
   const mappedTasks = filteredTasks?.map((t) => {
      return <Task key={t.id} todolist={todolist} task={t} />
   })

   return (
      <>
         {
            // tasks[todolist.id].length === 0
            filteredTasks?.length === 0 ? <p>Тасок нет</p> : <List>{mappedTasks}</List>
         }
      </>
   )
})
