import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectTodolists } from "features/todolists/model/todolistsSelectors"
import React, { useEffect } from "react"
import { fetchTodolistsTC } from "../model/todolists-reducer"
import { Todolist } from "./Todolists/Todolist/Todolist"

export const Todolists = () => {
   const todolists = useAppSelector(selectTodolists)

   const dispatch = useAppDispatch()

   useEffect(() => {
      dispatch(fetchTodolistsTC())
   }, [])

   return (
      <>
         {todolists.map((tl) => {
            return (
               <Grid key={tl.id} item>
                  <Paper elevation={6} sx={{ p: "20px" }}>
                     {/*<Paper sx={{p: '0 20px 20px 20px'}}>*/}
                     <Todolist key={tl.id} todolist={tl} />
                  </Paper>
               </Grid>
            )
         })}
      </>
   )
}
