import Checkbox from '@mui/material/Checkbox'
import axios from "axios";
import React, {ChangeEvent, useEffect, useState} from 'react'
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm'
import {EditableSpan} from '../common/components/EditableSpan/EditableSpan'
import {Todolist} from "../features/todolists/ui/Todolists/Todolist/Todolist";

const token = '8b1d77f1-f223-4bbe-91c0-9f0435b8f7df'
const apiKey = '2ce9edc9-5880-4110-ab2d-4e4ef2fb6acf'

// вынести хэдеры сюда
const options = {
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey,
    },
}


export type Todolist = {
    id: string
    title: string
    addedDate: string
    order: number
}

type Task = {
    description: string | null
    title: string
    status: number
    // status: TaskStatus
    priority: number
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}

enum TaskStatus {
    notReady = 0,
    part = 1,
    done = 2,
}

//
// const a = TaskStatus.done

type FieldError = {
    error: string
    field: string
}

type GetTasksResponse = {
    totalCount: number
    error: string
    items: Task[]
}

type UpdateTaskModel = {
    description: string | null
    title: string
    status: TaskStatus
    priority: number
    startDate: string | null
    deadline: string | null
}

// type CreateTodolistResponse = {
//     data: {
//         item: Todolist
//     }
//     resultCode: number
//     messages: string[]
//     fieldsErrors: FieldError[]
// }
//
// type DeleteTodolistResponse = {
//     data: {}
//     resultCode: number
//     messages: string[]
//     fieldsErrors: FieldError[]
// }

type Response<T = {}> = {
    data: T
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
}

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({})

    // useEffect(() => {
    //     // get todolists
    //     axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
    //         headers: {
    //             // Authorization: 'Bearer ' + '8b1d77f1-f223-4bbe-91c0-9f0435b8f7df'
    //             // Authorization: token
    //             Authorization: `Bearer ${token}`
    //         }
    //     }).then(res => {
    //         const todolists = res.data
    //         setTodolists(todolists)
    //         todolists.forEach(tl => {
    //             axios.get<Todolist[]>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, option)
    //                 .then(res => {
    //                     console.log(res)
    //                 })
    //         })
    //     })
    // }, [])


        // .then(() => {
        //     setTodolists((prevTodolists) =>
        //         prevTodolists.map((tl) => (tl.id === id ? { ...tl, title } : tl)),
        //     );

    useEffect(() => {
            axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                const todolists = res.data
                setTodolists(todolists)

                // const tasks2 = {
                // 'tl.id': [],
                // }

                todolists.forEach(tl => {
                    axios.get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, options)
                        .then(res => {
                            setTasks(prevTasks => ({...prevTasks, [tl.id]: res.data.items}))
                            // setTasks(tasks => ({...tasks2, [tl.id]: res.data.items}))
                        })
                })
            })
        }, []
    )

    const createTodolistHandler = (title: string = '') => {
        // create todolist
        axios.post<Response<{ item: Todolist }>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, {
            headers: {
                Authorization: `Bearer ${token}`,
                'API-KEY': apiKey,
            },
        }).then(res => {
            const newTodolist = res.data.data.item
            setTodolists([newTodolist, ...todolists])
        })
    }

    const removeTodolistHandler = (id: string) => {
        // remove todolist
        axios.delete<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'API-KEY': apiKey,
            },
        }).then(res => {
            if (res.data.resultCode === 0) {
                // Удаляем тудулист из состояния
                setTodolists(prevTodolists => prevTodolists.filter(todolist => todolist.id !== id));
                //  setTodolist(todolists.filter(tl => tl.id !== id));
            } else {
                // Обработка ошибки, если resultCode не равен 0
                console.error('Error deleting todolist:', res.data.messages);
            }
        }).catch(error => {
            // Обработка ошибки запроса
            console.error('Request failed:', error);
        });
    }

    const updateTodolistHandler = (id: string, title: string) => {
        // update todolist title
        axios.put<Response<{
            item: Todolist
        }>>(`https://social-network.samuraijs.com/api/1.1//todo-lists/${id}`, {title}, options)
            .then(() => {
                // console.log(res.data)
                setTodolists(todolists.map(tl => tl.id === id
                    ? {...tl, title}
                    : tl)
                )
            })
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        // create task
        axios.post<Response<{
            item: Task
        }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {title}, options)
            .then(res => {
                setTasks({...tasks, [todolistId]: [res.data.data.item, ...tasks[todolistId]]})
            })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        // remove task
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: Task, todolistId: string) => {
        // update task status

        const model: UpdateTaskModel = {
            description: task.description,
            title: task.title,
            status: e.currentTarget.checked ? TaskStatus.done : TaskStatus.notReady,
            // status: e.currentTarget.checked ? 2 : 0,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }

        axios.put<Response<{
            item: Task
        }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${task.id}`, model, options)
            .then(res => {
                const newTask = res.data.data.item
                setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === task.id ? newTask : t)})
            })
    }

    const changeTaskTitleHandler = (title: string, task: any) => {
        // update task title

    }

    return (
        <div style={{margin: '20px'}}>
            <AddItemForm addItem={createTodolistHandler}/>

            {/* Todolists */}
            {todolists.map(tl => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditableSpan
                                value={tl.title}
                                onChange={(title: string) => updateTodolistHandler(tl.id, title)}
                            />
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForm addItem={title => createTaskHandler(title, tl.id)}/>

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map(task => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.status === TaskStatus.done}
                                            onChange={e => changeTaskStatusHandler(e, task, tl.id)}
                                        />
                                        <EditableSpan
                                            value={task.title}
                                            onChange={title => changeTaskTitleHandler(title, task)}
                                        />
                                        <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}

// Styles
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}