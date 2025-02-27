import Box from "@mui/material/Box"
import { ButtonWithMemo } from "common/components"
import { useAppDispatch } from "common/hooks"
import {
   changeTodolistFilterAC,
   type FilterValuesType,
   type DomainTodolist,
} from "features/todolists/model/todolists-reducer"
import React, { useCallback } from "react"
import { filterButtonContainerSx } from "./FilterTasksButtons.styles"

type Props = {
   todolist: DomainTodolist
}

export const FilterTasksButtons = ({ todolist }: Props) => {
   const { filter, id } = todolist

   const dispatch = useAppDispatch()

   const changeFilterTasksHandler = useCallback(
      (filter: FilterValuesType) => {
         dispatch(changeTodolistFilterAC({ todolistId: id, filter }))
      },
      [changeTodolistFilterAC, id],
   )

   return (
      <Box sx={filterButtonContainerSx}>
         <ButtonWithMemo
            variant={filter === "all" ? "outlined" : "contained"}
            color={"inherit"}
            onClick={() => changeFilterTasksHandler("all")}
            title={"All"}
         />
         <ButtonWithMemo
            variant={filter === "active" ? "outlined" : "contained"}
            color={"primary"}
            onClick={() => changeFilterTasksHandler("active")}
            title={"Active"}
         />
         <ButtonWithMemo
            variant={filter === "completed" ? "outlined" : "contained"}
            color={"secondary"}
            onClick={() => changeFilterTasksHandler("completed")}
            title={"Completed"}
         />
      </Box>
   )
}

// // вариант Валеры
// type ButtonWithMemoPropsType = ButtonProps & {}
//
// const ButtonWithMemo = ({...props}: ButtonWithMemoPropsType) => {
//     return <Button
//         variant={props.variant}
//         onClick={props.onClick}
//         color={props.color}
//         {...props}
//     >{props.title}</Button>
// }
