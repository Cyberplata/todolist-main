import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import { selectThemeMode } from "app/appSelectors"
import { RECAPTCHA_SITE_KEY } from "common/config/config"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { Path } from "common/routing"
import { getTheme } from "common/theme"
import React, { useEffect, useRef } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import type { LoginArgs } from "../../api"
import { loginTC, selectIsLoggedIn } from "../../model"
import type { CaptchaUrl } from "../../model/auth-reducer"
import s from "./Login.module.css"

export const Login = () => {
   // debugger
   const themeMode = useAppSelector(selectThemeMode)
   const theme = getTheme(themeMode)

   const dispatch = useAppDispatch()
   const isLoggedIn = useAppSelector(selectIsLoggedIn) // достаём значение, чтобы сделать редирект потом после смены значения с false на true
   const navigate = useNavigate()
   // const captchaUrl = useAppSelector(selectCaptchaUrl)

   const recaptchaRef = useRef<ReCAPTCHA | null>(null)

   const {
      register,
      handleSubmit,
      reset,
      control,
      setError, // ✅ Используем для ручной установки ошибки
      clearErrors, // ✅ Очищаем ошибки при изменении капчи
      formState: { errors },
   } = useForm<LoginArgs>({ defaultValues: { email: "", password: "", rememberMe: false } })

   // Функция сброса капчи
   // const resetCaptcha = () => {
   //    recaptchaRef.current?.reset()
   // }

   // const onSubmit: SubmitHandler<LoginArgs> = async (data) => {
   //    if (!data.captcha) {
   //       setError("captcha", { type: "manual", message: "Please verify you are not a robot" })
   //       return
   //    }
   //
   //    try {
   //       const action = await dispatch(loginTC(data))
   //
   //       // Если ошибка логина (проверяй свой action на ошибку)
   //       // if (loginTC.rejected.match(action)) {
   //          setError("email", { type: "manual", message: "Invalid email or password" })
   //          setError("password", { type: "manual", message: "Invalid email or password" })
   //          resetCaptcha() // ✅ Сброс капчи при ошибке
   //       // } else {
   //          reset() // Очистка формы при успешном входе
   //       // }
   //    } catch (error) {
   //       console.error(error)
   //       resetCaptcha()
   //    }
   // }

   const onSubmit: SubmitHandler<LoginArgs> = (data) => {
      // debugger
      console.log(data)
      if (!data.captcha) {
         setError("captcha", { type: "manual", message: "Please verify you are not a robot" })
         return
      }
      dispatch(loginTC(data))
      reset()
      recaptchaRef.current?.reset() // Сброс капчи после отправки
   }

   // Функция обработки успешного прохождения капчи
   const handleCaptchaChange = (token: CaptchaUrl) => {
      if (token) {
         clearErrors("captcha")
      }
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
                           minLength: {
                              // ✅ Использование minLength здесь лучше, чем регулярное выражение, потому что оно встроено в react-hook-form и сразу работает с errors
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

                     {/* reCAPTCHA */}
                     <Controller
                        name="captcha"
                        control={control}
                        render={({ field: { onChange } }) => (
                           <ReCAPTCHA
                              sitekey={RECAPTCHA_SITE_KEY} // ✅ Вставь свой ключ
                              onChange={(token) => {
                                 onChange(token)
                                 handleCaptchaChange(token)
                              }}
                           />
                        )}
                     />
                     {errors.captcha && <span className={s.errorMessage}>{errors.captcha.message}</span>}

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
