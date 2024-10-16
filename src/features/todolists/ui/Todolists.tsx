import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React from 'react';
import {useSelector} from "react-redux";
import type {RootState} from "../../../app/store";
import {type TodolistType} from "../model/todolists-reducer";
import {Todolist} from "./Todolists/Todolist/Todolist";

export const Todolists = () => {
    const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)

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