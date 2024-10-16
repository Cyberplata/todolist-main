import List from "@mui/material/List";
import React from 'react';
import {useSelector} from "react-redux";
import type {RootState} from "../../../../../../app/store";
import type {TasksStateType} from "../../../../../../model/tasks-reducer";
import type {TodolistType} from "../../../../../../model/todolists-reducer";

import {Task} from "./Task/Task";

type Props = {
    todolist: TodolistType
}

export const Tasks = ({todolist}: Props) => {
    console.log("Tasks is called")

    const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)

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

    // const filteredTasks = useCallback(() => {
    //     const allTodolistTasks = tasks[todolist.id]
    //
    //     // let tasksForTodolist = tasks;
    //     let tasksForTodolist = allTodolistTasks;
    //     if (todolist.filter === 'active') {
    //         tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
    //     }
    //     if (todolist.filter === 'completed') {
    //         tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
    //     }
    //     return tasksForTodolist;
    // },[])

    const mappedTask = filteredTasks().map((t) => {
        return <Task key={t.id}
                     todolist={todolist}
                     task={t}
        />
    })

    return (
        <>
            {
                // tasks[todolist.id].length === 0
                filteredTasks().length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {mappedTask}
                    </List>
            }
        </>
    );
};