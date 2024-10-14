import List from "@mui/material/List";
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "./app/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, type TasksStateType} from "./model/tasks-reducer";
import type {TodolistType} from "./model/todolists-reducer";
import {TaskValera} from "./TaskValera";

type Props = {
    todolist: TodolistType
}

export const Tasks = ({todolist}: Props) => {
    console.log("Tasks is called")
    const dispatch = useDispatch()

    const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)

    // const changeTaskStatus = useCallback((todolistID: string, taskId: string, taskStatus: boolean) => {
    //     dispatch(changeTaskStatusAC({todolistID, taskId, isDone: taskStatus}))
    // }, [dispatch]);
    //
    // const changeTaskTitle = useCallback((todolistID: string, taskId: string, title: string) => {
    //     dispatch(changeTaskTitleAC({todolistID, taskId, title}))
    // }, [dispatch]);
    //
    // const removeTask = useCallback((todolistID: string, taskId: string) => {
    //     dispatch(removeTaskAC({todolistID, taskId}))
    // }, [dispatch]);

    // Отфильтрованные таски, вынес из map-а компоненты App
    const filteredTasks = () => {
        const allTodolistTasks = tasks[todolist.id]

        // let tasksForTodolist = tasks;
        let tasksForTodolist = allTodolistTasks;
        if (todolist.filter === 'active') {
            tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
        }
        if (todolist.filter === 'completed') {
            tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
        }
        return tasksForTodolist;
    }

    // Отмэпленные таски
    // const mappedTask = filteredTasks().map((t) => {
    //     const removeTaskHandler = () => {
    //         removeTask(todolistId, t.id)
    //     }
    //     const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //         const newStatusValue = e.currentTarget.checked
    //         changeTaskStatus(todolistId, t.id, newStatusValue)
    //     }
    //     const updateTaskHandler = (newTitle: string) => {
    //         changeTaskTitle(todolistId, t.id, newTitle)
    //     }
    //     return <Task
    //         key={t.id}
    //         task={t}
    //         removeTaskHandler={removeTaskHandler}
    //         changeTaskStatusHandler={changeTaskStatusHandler}
    //         updateTaskHandler={updateTaskHandler}
    //     />
    // })

    const mappedTask = filteredTasks().map((t) => {
        return <TaskValera key={t.id}
                           todolist={todolist}
                           task={t}
                           // todolistId={todolist.id}
                           // removeTask={removeTask}
                           // changeTaskStatus={changeTaskStatus}
                           // changeTaskTitle={changeTaskTitle}
        />
    })

    return (
        <>
            {
                // tasks.length === 0
                // todolist.id.length === 0
                tasks[todolist.id].length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {mappedTask}
                    </List>
            }
        </>
    );
};