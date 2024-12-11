import { AddItemForm } from "common/components"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { memo, useCallback } from "react"
import { addTaskAC } from "../../../model/tasks-reducer"
import type { DomainTodolist } from "../../../model/todolists-reducer"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"

type Props = {
   todolist: DomainTodolist
}

export const Todolist = memo(({ todolist }: Props) => {
   // console.log("Todolist is called")

   const dispatch = useAppDispatch()

   // TODO: Здесь мб стоит вынести хэндлер в дочернюю компоненту AddItemForm?
   const addTaskHandler = useCallback(
      (title: string) => {
         dispatch(addTaskAC({ todolistId: todolist.id, title }))
      },
      [dispatch, todolist.id],
   )

   return (
      <>
         <TodolistTitle todolist={todolist} />
         <AddItemForm addItem={addTaskHandler} />
         <Tasks todolist={todolist} />
         <FilterTasksButtons todolist={todolist} />
      </>
   )
})
