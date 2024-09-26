import {FilterValuesType, TaskType} from "./app/App";
import {ChangeEvent, memo, useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import {filterButtonContainerSx} from "./Todolist.styles";
import {Task} from "./Task";
import {ButtonWithMemo} from "./ButtonWithMemo";

type PropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistId: string, filterValue: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    filter: FilterValuesType
    changeTaskStatus: (todolistID: string, taskId: string, taskStatus: boolean) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistID: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistID: string, title: string) => void
}

export const Todolist = memo((props: PropsType) => {
    console.log("Todolist is called")

    const {
        removeTodolist,
        todolistId,
        title,
        tasks,
        filter,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        changeTaskTitle,
        changeTodolistTitle,
    } = props

    // const changeFilterTasksHandler = (filter: FilterValuesType) => {
    //     changeFilter(todolistId, filter)
    // }

    const onAllClickHandler = useCallback(() => changeFilter(todolistId, 'all'), [changeFilter, todolistId])
    const onActiveClickHandler = useCallback(() => changeFilter(todolistId, 'active'), [changeFilter, todolistId])
    const onCompletedClickHandler = useCallback(() => changeFilter(todolistId, 'completed'), [changeFilter, todolistId])

    const deleteAllTodoHandler = () => {
        removeTodolist(todolistId)
    }

    const addTaskHandler = useCallback((title: string) => {
        addTask(todolistId, title)
    }, [addTask, todolistId])

    const updateTodolistHandler = (newTitle: string) => {
        changeTodolistTitle(todolistId, newTitle)
    }

    // const updateTaskHandler = (taskId: string, newTitle: string) => {
    //     changeTaskTitle(todolistId, taskId, newTitle)
    // }

    // const removeTaskHandler = (taskId: string) => {
    //     removeTask(todolistId, taskId)
    // }

    // Отфильтрованные таски, вынес из map-а компоненты App
    const filteredTasks = () => {
        let tasksForTodolist = tasks;
        if (filter === 'active') {
            tasksForTodolist = tasks.filter(task => !task.isDone)
        }
        if (filter === 'completed') {
            tasksForTodolist = tasks.filter(task => task.isDone)
        }
        return tasksForTodolist;
    }

    // Отмэпленные таски
    const mappedTask = filteredTasks().map((task) => {

        const removeTaskHandler = () => {
            removeTask(todolistId, task.id)
        }
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const newStatusValue = e.currentTarget.checked
            changeTaskStatus(todolistId, task.id, newStatusValue)
        }
        const updateTaskHandler = (newTitle: string) => {
            changeTaskTitle(todolistId, task.id, newTitle)
        }
        return <Task
            key={task.id}
            task={task}
            removeTaskHandler={removeTaskHandler}
            changeTaskStatusHandler={changeTaskStatusHandler}
            updateTaskHandler={updateTaskHandler}
        />
    })

    return (
        <div>
            <h3><EditableSpan odlTitle={title} updateItem={updateTodolistHandler}/>
                <IconButton aria-label="delete" onClick={deleteAllTodoHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>

            <div>
                <AddItemForm addItem={addTaskHandler}/>
            </div>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {mappedTask}
                    </List>
            }
            {/*Мой вариант кнопки*/}
            {/*<HocButton filter={filter}*/}
            {/*           changeFilter={changeFilter}*/}
            {/*           todolistId={todolistId}*/}
            {/*/>*/}

            <Box sx={filterButtonContainerSx}>

                {/*<Button variant={filter === 'all' ? 'outlined' : 'contained'}*/}
                {/*        color={"success"}*/}
                {/*        onClick={() => changeFilterTasksHandler('all')}*/}
                {/*>All</Button>*/}
                {/*<Button variant={filter === 'active' ? 'outlined' : 'contained'}*/}
                {/*        color={"primary"}*/}
                {/*        onClick={() => changeFilterTasksHandler('active')}*/}
                {/*>Active</Button>*/}
                {/*<Button variant={filter === 'completed' ? 'outlined' : 'contained'}*/}
                {/*        color={"secondary"}*/}
                {/*        onClick={() => changeFilterTasksHandler('completed')}*/}
                {/*>Completed</Button>*/}

                <ButtonWithMemo variant={filter === 'all' ? 'outlined' : 'contained'}
                                color={"inherit"}
                                onClick={onAllClickHandler}
                                title={"All"}
                />
                <ButtonWithMemo variant={filter === 'active' ? 'outlined' : 'contained'}
                                color={"primary"}
                                onClick={onActiveClickHandler}
                                title={"Active"}
                />
                <ButtonWithMemo variant={filter === 'completed' ? 'outlined' : 'contained'}
                                color={"secondary"}
                                onClick={onCompletedClickHandler}
                                title={"Completed"}
                />
            </Box>
        </div>
    )
})

// // вариант Валеры
// type ButtonWithMemoPropsType = ButtonProps & {}
//
// const ButtonWithMemo = ({...props}: ButtonWithMemoPropsType) => {
//     return <Button
//         variant={props.variant}
//         onClick={props.onClick}
//         color={props.color}
//         {...props}
//     >{props.title}</Button>
// }
