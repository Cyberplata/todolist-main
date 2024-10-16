import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from 'react';
import {changeThemeAC} from "../../../../app/app-reducer";
import {selectThemeMode} from "../../../../app/appSelectors";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {MenuButton} from "../../MenuButton/MenuButton";

export const AppBarHeader = () => {
    const themeMode = useAppSelector(selectThemeMode)

    const dispatch = useAppDispatch()

    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
    }

    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    News
                </Typography>
                <MenuButton color="inherit">Login</MenuButton>
                <MenuButton color="inherit">Logout</MenuButton>
                <MenuButton color="inherit">Faq</MenuButton>
                <Switch color={'default'} onChange={changeModeHandler}/>
            </Toolbar>
        </AppBar>
    );
};

