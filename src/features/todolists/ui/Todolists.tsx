import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React from 'react';
import type {RootState} from "../../../app/store";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import {Todolist} from "./Todolists/Todolist/Todolist";

const selectTodolists = (state: RootState) => state.todolists

export const Todolists = () => {
    const todolists = useAppSelector(state => state.todolists)

    return (
        <>
            {
                todolists.map((tl) => {
                    return (
                        <Grid key={tl.id} item>
                            <Paper elevation={6} sx={{p: '20px'}}>
                                {/*<Paper sx={{p: '0 20px 20px 20px'}}>*/}
                                <Todolist key={tl.id}
                                          todolist={tl}
                                />
                            </Paper>
                        </Grid>
                    )
                })
            }
        </>
    );
};