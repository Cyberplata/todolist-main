// @flow 
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {useCallback} from "react";
import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AddItemForm} from "./AddItemForm";
import type {RootState} from "./app/store";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    type TasksStateType
} from "./model/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    type FilterValuesType, removeTodolistAC,
    type TodolistType
} from "./model/todolists-reducer";
import {Todolist} from "./Todolist";


export const Main = () => {

    const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    // CRUD tasks:
    const addTask = useCallback((todolistID: string, title: string) => {
        // const action = addTaskAC({todolistID, title})
        // dispatch(action)
        dispatch(addTaskAC({todolistID, title}))
    },[dispatch]);

    const changeTaskStatus = useCallback((todolistID: string, taskId: string, taskStatus: boolean) => {
        dispatch(changeTaskStatusAC({todolistID, taskId, isDone: taskStatus}))
    },[dispatch]);

    const changeTaskTitle = useCallback((todolistID: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({todolistID, taskId, title}))
    },[dispatch]);

    const removeTask = useCallback((todolistID: string, taskId: string) => {
        dispatch(removeTaskAC({todolistID, taskId}))
    },[dispatch]);

    // CRUD todolist:
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch]);

    const changeFilter = useCallback((todolistID: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({todolistID, filter}))
    },[dispatch]);

    const changeTodolistTitle = useCallback((todolistID: string, title: string) => {
        dispatch(changeTodolistTitleAC({todolistID, title}))
    },[dispatch]);

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    },[dispatch]);

    return (
        <Container fixed>
            <Grid container sx={{mb: 5}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>

            <Grid container spacing={4}>
                {todolists.map((el) => {
                    // let tasksForTodolist = tasks[el.id]
                    // if (el.filter === 'active') {
                    //     tasksForTodolist = tasks[el.id].filter(task => !task.isDone)
                    // }
                    // if (el.filter === 'completed') {
                    //     tasksForTodolist = tasks[el.id].filter(task => task.isDone)
                    // }
                    return (
                        <Grid key={el.id} item>
                            <Paper elevation={6} sx={{p: '20px'}}>
                                <Todolist todolistId={el.id}
                                          title={el.title}
                                          tasks={tasks[el.id]}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          filter={el.filter}
                                          changeTaskStatus={changeTaskStatus}
                                          removeTodolist={removeTodolist}
                                          changeTaskTitle={changeTaskTitle}
                                          changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    );
};