import MenuIcon from "@mui/icons-material/Menu"
import LinearProgress from "@mui/material/LinearProgress"
import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { MenuButton } from "common/components"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useAppSelector } from "common/hooks/useAppSelector"
import React from "react"
import { changeThemeAC } from "app/app-reducer"
import { selectSetAppStatus, selectThemeMode } from "app/appSelectors"
import { selectIsLoggedIn } from "../../../../features/auth/model"
import { logoutTC } from "../../../../features/auth/model/auth-reducer"

export const AppBarHeader = () => {
   const themeMode = useAppSelector(selectThemeMode)
   const status = useAppSelector(selectSetAppStatus)

   const dispatch = useAppDispatch()
   const isLoggedIn = useAppSelector(selectIsLoggedIn)

   const changeModeHandler = () => {
      dispatch(changeThemeAC(themeMode === "light" ? "dark" : "light"))
   }

   const logOutHandler = () => {
      dispatch(logoutTC())
   }

   return (
      <AppBar position="fixed">
         <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
               <MenuIcon />
            </IconButton>
            {/*<div>*/}
            {/*   {isLoggedIn && <MenuButton>Logout</MenuButton>}*/}
            {/*   <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>*/}
            {/*   <Switch color={"default"} onChange={changeModeHandler} />*/}
            {/*</div>*/}

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
               News
            </Typography>
            {isLoggedIn && (
               <MenuButton color="inherit" onClick={logOutHandler}>
                  Logout
               </MenuButton>
            )}
            <MenuButton color="inherit">Faq</MenuButton>
            <Switch color={"default"} onChange={changeModeHandler} />
         </Toolbar>
         {status === "loading" && <LinearProgress />}
      </AppBar>
   )
}
