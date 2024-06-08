import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {v1} from "uuid";
import {EditableSpan} from "./EditableSpan";

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
        updateTask
    } = props

    // const addTaskHandler = () => {
    // 	if (taskTitle.trim() !== '') {
    // 		addTask(todolistId ,taskTitle.trim())
    // 		setTaskTitle('')
    // 	} else {
    // 		setError('Title is required')
    // 	}
    // }

    // const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // 	setTaskTitle(event.currentTarget.value)
    // }

    // const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    // 	setError(null)
    // 	if (event.key === 'Enter') {
    // 		addTaskHandler()
    // 	}
    // }

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(todolistId, filter)
    }

    const deleteAllTodoHandler = () => {
        removeTodolist(todolistId)
    }

    const addTaskHandler = (title: string) => {
        addTask(props.todolistId,title)
    }

    return (
        <div>
            <h3>
                {title}
                <Button title={"deleteTodo"} onClick={deleteAllTodoHandler}/>
            </h3>
            <div>
                <AddItemForm addItem={addTaskHandler} />
            </div>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {tasks.map((task) => {

                            const removeTaskHandler = () => {
                                removeTask(todolistId, task.id)
                            }

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(todolistId, task.id, newStatusValue)
                            }

                            const updateItemHandler = (newTitle: string) => {
                                updateTask(props.todolistId, task.id,newTitle)
                            }

                            return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                {/*<span>{task.title}</span>*/}
                                <EditableSpan odlTitle={task.title} updateItem={updateItemHandler}/>
                                <Button onClick={removeTaskHandler} title={'x'}/>
                            </li>
                        })}
                    </ul>
            }
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}
                        onClick={() => changeFilterTasksHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}
                        onClick={() => changeFilterTasksHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
                        onClick={() => changeFilterTasksHandler('completed')}/>
            </div>
        </div>
    )
}
