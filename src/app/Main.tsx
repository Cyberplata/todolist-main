import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { AddItemForm } from "common/components"
import { useAppSelector } from "common/hooks"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { Path } from "common/routing"
import * as React from "react"
import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router"
import { selectIsLoggedIn } from "../features/auth/model"
import { addTodolistTC } from "../features/todolists/model/todolists-reducer"
import { Todolists } from "../features/todolists/ui/Todolists"

export const Main = () => {
   const dispatch = useAppDispatch()

   const isLoggedIn = useAppSelector(selectIsLoggedIn)
   const navigate = useNavigate()

   const addTodolist = useCallback(
      (title: string) => {
         dispatch(addTodolistTC(title))
      },
      [dispatch],
   )

   useEffect(() => {
      if (!isLoggedIn) {
         navigate(Path.Login)
      }
   }, [isLoggedIn, navigate])

   return (
      <Container fixed>
         <Grid container sx={{ mb: 5 }}>
            <AddItemForm addItem={addTodolist} />
         </Grid>
         <Grid container spacing={4}>
            <Todolists />
         </Grid>
      </Container>
   )
}
