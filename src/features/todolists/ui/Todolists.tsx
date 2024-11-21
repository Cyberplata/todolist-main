import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { useAppSelector } from "common/hooks"
import React from "react"
import { selectTodolists } from "../model/todolistsSelectors"
import { Todolist } from "./Todolists/Todolist/Todolist"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

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
