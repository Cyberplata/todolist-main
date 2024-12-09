import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { useAppSelector } from "common/hooks"
import { selectTodolists } from "features/todolists/model/todolistsSelectors"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { todolistsApi } from "../api"
import { setTodolistsAC } from "../model/todolists-reducer"
import { Todolist } from "./Todolists/Todolist/Todolist"

export const Todolists = () => {
   const todolists = useAppSelector(selectTodolists)

   const dispatch = useDispatch()

   useEffect(() => {
      todolistsApi.getTodolists().then((res) => {
         dispatch(setTodolistsAC(res.data))
      })
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
