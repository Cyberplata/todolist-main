import {v1} from "uuid";
import {TasksStateType} from "../App";

// Стандартная запись через объект action
// export type RemoveTaskActionType = {
//     type: 'REMOVE-TASK'
//     payload: {
//         todolistID: string
//         taskId: string
//     }
// }

// Запись через ReturnType
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export type AddTaskActionType = {
    type: 'ADD-TASK'
    payload: {
        todolistID: string
        title: string
    }
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    payload: {
        todolistID: string
        taskId: string
        taskStatus: boolean
    }
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    payload: {
        todolistID: string
        taskId: string
        title: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    payload: {
        title: string
        newTodolistId: string
    }
}

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    payload: {
        todolistId: string
    }
}

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
                [action.payload.todolistID]: state[action.payload.todolistID].filter(el => el.id !== action.payload.taskId)
            }
        }
        case "ADD-TASK": {
            const newTask = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }
            return {
                ...state,
                [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(el =>
                    el.id === action.payload.taskId
                        ? {...el, isDone: action.payload.taskStatus}
                        : el
                )
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(el =>
                    el.id === action.payload.taskId
                        ? {...el, title: action.payload.title}
                        : el
                )
            }
        }
        case "ADD-TODOLIST": {
            // const newTodolistId = v1()
            return {
                ...state,
                [action.payload.newTodolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            delete state[action.payload.todolistId]
            return {...state}
        }
        default:
            return state

    }
}

export const removeTaskAC = (todolistID: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistID,
            taskId,
        },
    } as const
}

export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistID,
            title,
        },
    } as const
}

export const changeTaskStatusAC = (todolistID: string, taskId: string, taskStatus: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistID,
            taskId,
            taskStatus,
        },
    } as const
}

export const changeTaskTitleAC = (todolistID: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistID,
            taskId,
            title,
        },
    } as const
}

export const AddTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            newTodolistId: v1(),
        },
    } as const
}

export const RemoveTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        },
    } as const
}