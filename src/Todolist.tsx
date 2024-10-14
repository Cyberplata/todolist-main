import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import {memo, useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {FilterTasksButtons} from "./FilterTasksButtons";
import type {TaskType} from "./model/tasks-reducer";
import type {TodolistType} from "./model/todolists-reducer";
import {Tasks} from "./Tasks";
import {TaskValera} from "./TaskValera";

type Props = {
    todolist: TodolistType
    // tasks: TaskType[]
    addTask: (todolistID: string, title: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistID: string, title: string) => void

    // changeFilter: (todolistId: string, filterValue: FilterValuesType) => void
    // removeTask: (todolistID: string, taskId: string) => void
    // changeTaskStatus: (todolistID: string, taskId: string, taskStatus: boolean) => void
    // changeTaskTitle: (todolistID: string, taskId: string, title: string) => void

    // todolistId: string
    // title: string
    // filter: FilterValuesType
}

export const Todolist = memo((props: Props) => {
    console.log("Todolist is called")

    const {
        todolist,
        removeTodolist,
        addTask,
        changeTodolistTitle,
        // tasks,
        // removeTask,
        // changeFilter,
        // changeTaskStatus,
        // changeTaskTitle,

        // todolistId,
        // title,
        // filter,
    } = props


    const removeTodolistHandler = () => {
        removeTodolist(todolist.id)
    }

    const addTaskHandler = useCallback((title: string) => {
        addTask(todolist.id, title)
    }, [addTask, todolist.id])

    const updateTodolistHandler = useCallback((newTitle: string) => {
        changeTodolistTitle(todolist.id, newTitle)
    }, [changeTodolistTitle, todolist.id])

    // const updateTaskHandler = (taskId: string, newTitle: string) => {
    //     changeTaskTitle(todolistId, taskId, newTitle)
    // }

    // const removeTaskHandler = (taskId: string) => {
    //     removeTask(todolistId, taskId)
    // }

    // // Отфильтрованные таски, вынес из map-а компоненты App
    // const filteredTasks = () => {
    //     let tasksForTodolist = tasks;
    //     if (todolist.filter === 'active') {
    //         tasksForTodolist = tasks.filter(task => !task.isDone)
    //     }
    //     if (todolist.filter === 'completed') {
    //         tasksForTodolist = tasks.filter(task => task.isDone)
    //     }
    //     return tasksForTodolist;
    // }
    //
    // // Отмэпленные таски
    // // const mappedTask = filteredTasks().map((t) => {
    // //     const removeTaskHandler = () => {
    // //         removeTask(todolistId, t.id)
    // //     }
    // //     const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // //         const newStatusValue = e.currentTarget.checked
    // //         changeTaskStatus(todolistId, t.id, newStatusValue)
    // //     }
    // //     const updateTaskHandler = (newTitle: string) => {
    // //         changeTaskTitle(todolistId, t.id, newTitle)
    // //     }
    // //     return <Task
    // //         key={t.id}
    // //         task={t}
    // //         removeTaskHandler={removeTaskHandler}
    // //         changeTaskStatusHandler={changeTaskStatusHandler}
    // //         updateTaskHandler={updateTaskHandler}
    // //     />
    // // })
    //
    // const mappedTask = filteredTasks().map((t) => {
    //     return <TaskValera key={t.id}
    //                        todolistId={todolist.id}
    //                        task={t}
    //                        removeTask={removeTask}
    //                        changeTaskStatus={changeTaskStatus}
    //                        changeTaskTitle={changeTaskTitle}
    //     />
    // })

    return (
        <div>
            <h3><EditableSpan odlTitle={todolist.title} updateItem={updateTodolistHandler}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>

            <div>
                <AddItemForm addItem={addTaskHandler}/>
            </div>

            <Tasks todolist={todolist}/>

            {/*{*/}
            {/*    tasks.length === 0*/}
            {/*        ? <p>Тасок нет</p>*/}
            {/*        : <List>*/}
            {/*            {mappedTask}*/}
            {/*        </List>*/}
            {/*}*/}

            <FilterTasksButtons todolist={todolist}/>
        </div>
    )
})


