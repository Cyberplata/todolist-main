// @flow 
import Box from "@mui/material/Box";
import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeThemeAC, type ThemeModeType} from "./app/app-reducer";
import type {RootState} from "./app/store";
import {AppBarHeader} from "./AppBarHeader";
import {getTheme} from "./common/theme/theme";

export const Header = () => {
    const themeMode = useSelector<RootState, ThemeModeType>(state => state.app.themeMode)

    const dispatch = useDispatch()

    const theme = getTheme(themeMode)

    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
    }

    return (
        <Box sx={{flexGrow: 1, mb: 10}}>
            <AppBarHeader changeModeHandler={changeModeHandler}/>
        </Box>
    )
}