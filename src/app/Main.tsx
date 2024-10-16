// @flow
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import * as React from "react";
import {useCallback} from "react";
import {useDispatch} from "react-redux";
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm";
import {useAppDispatch} from "../common/hooks/useAppDispatch";
import {addTodolistAC} from "../features/todolists/model/todolists-reducer";
import {Todolists} from "../features/todolists/ui/Todolists";

export const Main = () => {
    const dispatch = useAppDispatch()

    // CRUD todolist:
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch]);

    return (
        <Container fixed>
            <Grid container sx={{mb: 5}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                <Todolists/>
            </Grid>
        </Container>
    );
};