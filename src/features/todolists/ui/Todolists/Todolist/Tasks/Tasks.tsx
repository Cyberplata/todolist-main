import List from "@mui/material/List";
import React, {memo} from 'react';
import {useAppSelector} from "../../../../../../common/hooks/useAppSelector";
import {selectTasks} from "../../../../model/tasksSelectors";
import type {TodolistType} from "../../../../model/todolists-reducer";

import {Task} from "./Task/Task";

type Props = {
    todolist: TodolistType
}

export const Tasks = memo(({todolist}: Props) => {
    console.log("Tasks is called")

    const tasks = useAppSelector(selectTasks)

    // TODO: нужно ли выносить в отельный компонент функцию filteredTasks+tasks? Стоит ли оборачивать в useCallback, useMemo, memo если будем выносить в функцию-хэлпер?
    // Отфильтрованные таски, вынес из map-а компоненты App
    const filterTasks = () => {
        const allTodolistTasks = tasks[todolist.id]

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

    // TODO: Выносить или не выносить mappedTasks? Совместный с filteredTasks или отдельный вынос? И если выносить то куда? features/todolists/ui/Todolists/Todolist/getMappedTasks ?
    // Примерная логика выноса filteredTasks и mappedTasks
    // export const getFilteredTasks = (tasks, todolist) => {
    //     const allTodolistTasks = tasks[todolist.id];
    //
    //     if (todolist.filter === 'active') {
    //         return allTodolistTasks.filter(task => !task.isDone);
    //     }
    //
    //     if (todolist.filter === 'completed') {
    //         return allTodolistTasks.filter(task => task.isDone);
    //     }
    //
    //     return allTodolistTasks;
    // };
    //
    // export const getMappedTasks = (tasks, todolist) => {
    //     const filteredTasks = getFilteredTasks(tasks, todolist);
    //     return filteredTasks.map(t => (
    //         <Task key={t.id} todolist={todolist} task={t} />
    //     ));
    // };

    const filteredTasks = filterTasks()

    const mappedTasks = filteredTasks.map((t) => {
        return <Task key={t.id}
                     todolist={todolist}
                     task={t}
        />
    })

    return (
        <>
            {
                // tasks[todolist.id].length === 0
                filteredTasks.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {mappedTasks}
                    </List>
            }
        </>
    );
});