import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import { selectThemeMode } from "app/appSelectors"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { Path } from "common/routing"
import { getTheme } from "common/theme"
import React, { useEffect } from "react"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import type { LoginArgs } from "../../api"
import { loginTC } from "../../model"
import { selectIsLoggedIn } from "../../model"
import s from "./Login.module.css"

// type Inputs = {
//    email: string
//    password: string
//    rememberMe: boolean
// }

export const Login = () => {
   const themeMode = useAppSelector(selectThemeMode)
   const theme = getTheme(themeMode)

   const dispatch = useAppDispatch()
   const isLoggedIn = useAppSelector(selectIsLoggedIn) // достаём значение, чтобы сделать редирект потом после смены значения с false на true
   const navigate = useNavigate()

   const {
      register,
      handleSubmit,
      reset,
      control,
      formState: { errors },
   } = useForm<LoginArgs>({ defaultValues: { email: "", password: "", rememberMe: false } })

   const onSubmit: SubmitHandler<LoginArgs> = (data) => {
      dispatch(loginTC(data))
      reset()
   }

   // 1 вариант через useEffect
   useEffect(() => {
      if (isLoggedIn) {
         navigate(Path.Main)
      }
   }, [isLoggedIn, navigate])

   // // 2 вариант через Navigate (так как в новой документации react-router нет этого компонента, то используем 1ый вариант)
   // if (isLoggedIn) {
   //    return <Navigate to={Path.Main} />
   // }

   return (
      <Grid container justifyContent={"center"}>
         <Grid item justifyContent={"center"}>
            <FormControl>
               <FormLabel>
                  <p>
                     To login get registered
                     <a
                        style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
                        href={"https://social-network.samuraijs.com/"}
                        target={"_blank"}
                        rel="noreferrer"
                     >
                        here
                     </a>
                  </p>
                  <p>or use common test account credentials:</p>
                  <p>
                     <b>Email:</b> free@samuraijs.com
                  </p>
                  <p>
                     <b>Password:</b> free
                  </p>
               </FormLabel>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <FormGroup>
                     <TextField
                        // type="email"
                        label="Email"
                        margin="normal"
                        {...register("email", {
                           required: "Email is required",
                           pattern: {
                              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                              message: "Incorrect email address",
                           },
                        })}
                     />
                     {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}
                     <TextField
                        type="password"
                        label="Password"
                        margin="normal"
                        {...register("password", {
                           required: "Password is required",
                           // pattern: {
                           //    value: /^.{3,}$/,
                           minLength: { // ✅ Использование minLength здесь лучше, чем регулярное выражение, потому что оно встроено в react-hook-form и сразу работает с errors
                              value: 3,
                              message: "Password must be at least 3 characters long",
                           },
                        })}
                     />
                     {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}
                     <FormControlLabel
                        label={"Remember me"}
                        control={
                           // 1ый вариант - синтаксис, как будем писать в кастомных хуках в карьерном бустере
                           <Controller
                              name={"rememberMe"}
                              control={control}
                              render={({ field: { value, ...rest } }) => <Checkbox {...rest} checked={value} />}
                           />
                           // // 2 вариант: явно прописать функцию onChange как в примере из документации
                           // <Controller
                           //    name={"rememberMe"}
                           //    control={control}
                           //    render={({ field: { onChange, value } }) => (
                           //       <Checkbox onChange={(e) => onChange(e.target.checked)} checked={value} />
                           //    )}
                           // />
                        }
                     />
                     <Button type={"submit"} variant={"contained"} color={"primary"}>
                        Login
                     </Button>
                  </FormGroup>
               </form>
            </FormControl>
         </Grid>
      </Grid>
   )
}
