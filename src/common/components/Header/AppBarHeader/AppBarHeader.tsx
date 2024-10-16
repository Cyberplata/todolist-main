import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {useDispatch, useSelector} from "react-redux";
import {changeThemeAC, type ThemeModeType} from "../../../../app/app-reducer";
import type {RootState} from "../../../../app/store";
import {MenuButton} from "../../MenuButton";
import Switch from "@mui/material/Switch";
import AppBar from "@mui/material/AppBar";
import React from 'react';

export const AppBarHeader = () => {
    const themeMode = useSelector<RootState, ThemeModeType>(state => state.app.themeMode)

    const dispatch = useDispatch()

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

