import List from "@mui/material/List"
import { useAppSelector } from "common/hooks"
import React, { memo } from "react"
import { selectTasks } from "../../../../model/tasksSelectors"
import type { TodolistType } from "../../../../model/todolists-reducer"
import { Task } from "./Task"

type Props = {
   todolist: TodolistType
}

export const Tasks = memo(({ todolist }: Props) => {
   console.log("Tasks is called")

   const tasks = useAppSelector(selectTasks)

   // TODO: нужно ли выносить в отельный компонент функцию filteredTasks+tasks? Стоит ли оборачивать в useCallback, useMemo, memo если будем выносить в функцию-хэлпер?
   // Отфильтрованные таски, вынес из map-а компоненты App
   const filterTasks = () => {
      const allTodolistTasks = tasks[todolist.id]

      let tasksForTodolist = allTodolistTasks
      if (todolist.filter === "active") {
         tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone)
      }
      if (todolist.filter === "completed") {
         tasksForTodolist = allTodolistTasks.filter((task) => task.isDone)
      }
      return tasksForTodolist
   }

   const filteredTasks = filterTasks()

   const mappedTasks = filteredTasks.map((t) => {
      return <Task key={t.id} todolist={todolist} task={t} />
   })

   return (
      <>
         {
            // tasks[todolist.id].length === 0
            filteredTasks.length === 0 ? <p>Тасок нет</p> : <List>{mappedTasks}</List>
         }
      </>
   )
})
