import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

type PropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistId: string, filterValue: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, taskStatus: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistID: string, taskId: string, title: string) => void
    updateTodolist: (todolistID: string, title: string) => void
}

export const Todolist = (props: PropsType) => {
    // todo: перенести
    // let tasksForTodolist = tasks
    // if (el.filter === 'active') {
    // 	tasksForTodolist = tasks.filter(task => !task.isDone)
    // }
    // if (el.filter === 'completed') {
    // 	tasksForTodolist = tasks.filter(task => task.isDone)
    // }

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
        updateTask,
        updateTodolist
    } = props

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(todolistId, filter)
    }

    const deleteAllTodoHandler = () => {
        removeTodolist(todolistId)
    }

    const addTaskHandler = (title: string) => {
        addTask(todolistId,title)
    }

    const updateTodolistHandler = (newTitle: string) => {
        updateTodolist(todolistId, newTitle)
    }

    const updateTaskHandler = (taskId: string, newTitle: string) => {
        updateTask(todolistId, taskId,newTitle)
    }

    return (
        <div>
            <h3><EditableSpan odlTitle={title} updateItem={updateTodolistHandler}/>
                {/*<Button title={"X"} onClick={deleteAllTodoHandler}/>*/}
                <IconButton aria-label="delete" onClick={deleteAllTodoHandler}>
                    <DeleteIcon />
                </IconButton>
            </h3>

            <div>
                <AddItemForm addItem={addTaskHandler} />
            </div>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {tasks.map((task) => {

                            const removeTaskHandler = () => {
                                removeTask(todolistId, task.id)
                            }

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(todolistId, task.id, newStatusValue)
                            }

                            // const updateTaskHandler = (newTitle: string) => {
                            //     updateTask(props.todolistId, task.id,newTitle)
                            // }

                            return <ListItem key={task.id} className={task.isDone ? 'is-done' : ''}>
                                {/*<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>*/}
                                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
                                {/*<span>{task.title}</span>*/}
                                <EditableSpan odlTitle={task.title} updateItem={(newTitle) => {updateTaskHandler(task.id, newTitle)}}/>
                                {/*<Button onClick={removeTaskHandler} title={'x'}/>*/}
                                <IconButton aria-label="delete" onClick={removeTaskHandler}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        })}
                    </List>
            }
            <div>
                <Button variant={filter === 'all' ? 'outlined' : 'contained'}
                        color={"success"}
                        onClick={() => changeFilterTasksHandler('all')}
                >All</Button>
                <Button variant={filter === 'active' ? 'outlined' : 'contained'}
                        color={"primary"}
                        onClick={() => changeFilterTasksHandler('active')}
                >Active</Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'contained'}
                        color={"secondary"}
                        onClick={() => changeFilterTasksHandler('completed')}
                >Completed</Button>



                {/*<Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}*/}
                {/*        onClick={() => changeFilterTasksHandler('all')}/>*/}
                {/*<Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}*/}
                {/*        onClick={() => changeFilterTasksHandler('active')}/>*/}
                {/*<Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}*/}
                {/*        onClick={() => changeFilterTasksHandler('completed')}/>*/}
            </div>
        </div>
    )
}
