import {v1} from "uuid";
import {TasksStateType, TaskType} from "../App";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

// Стандартная запись через объект action
// export type RemoveTaskActionType = {
//     type: 'REMOVE-TASK'
//     payload: {
//         todolistID: string
//         taskId: string
//     }
// }
// export type AddTaskActionType = {
//     type: 'ADD-TASK'
//     payload: {
//         todolistID: string
//         title: string
//     }
// }
// export type ChangeTaskStatusActionType = {
//     type: 'CHANGE-TASK-STATUS'
//     payload: {
//         todolistID: string
//         taskId: string
//         taskStatus: boolean
//     }
// }
// export type ChangeTaskTitleActionType = {
//     type: 'CHANGE-TASK-TITLE'
//     payload: {
//         todolistID: string
//         taskId: string
//         title: string
//     }
// }
// export type AddTodolistActionType = {
//     type: 'ADD-TODOLIST',
//     payload: {
//         title: string
//         newTodolistId: string
//     }
// }
// export type RemoveTodolistActionType = {
//     type: 'REMOVE-TODOLIST',
//     payload: {
//         todolistId: string
//     }
// }

// Запись через ReturnType
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

// Используем Action Type из todolists-reducer.ts
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TasksStateType = {
    [todolistID1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: 'Rest API', isDone: true},
        {id: v1(), title: 'GraphQL', isDone: false},
    ],
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(el => el.id !== action.taskId)
            }
        }
        case "ADD-TASK": {
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {
                ...state,
                [action.todolistID]: [newTask, ...state[action.todolistID]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(el =>
                    el.id === action.taskId
                        ? {...el, isDone: action.taskStatus}
                        : el
                )
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(el =>
                    el.id === action.taskId
                        ? {...el, title: action.title}
                        : el
                )
            }
        }
        case "ADD-TODOLIST": {
            // const newTodolistId = v1()
            return {
                ...state,
                [action.newTodolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            delete state[action.todolistID]
            return {...state}
        }
        default:
            return state

    }
}

// с полем payload
// export const removeTaskAC = (todolistID: string, taskId: string) => {
//     return {
//         type: 'REMOVE-TASK',
//         payload: {
//             todolistID,
//             taskId,
//         },
//     } as const
// }

//без payload
export const removeTaskAC = (todolistID: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        todolistID,
        taskId,
    } as const
}

export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: 'ADD-TASK',
        todolistID,
        title,
    } as const
}

export const changeTaskStatusAC = (todolistID: string, taskId: string, taskStatus: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todolistID,
        taskId,
        taskStatus,
    } as const
}

export const changeTaskTitleAC = (todolistID: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        todolistID,
        taskId,
        title,
    } as const
}

// export const RemoveTodolistAC = (todolistId: string) => {
//     return {
//         type: 'REMOVE-TODOLIST',
//         payload: {
//             todolistId
//         },
//     } as const
// }