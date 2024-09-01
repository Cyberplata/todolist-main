import {v1} from "uuid";
// import {TasksStateType, TaskType} from "../App";
import {TasksStateType, TaskType} from "../app/App";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

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

// Используем Action Type из todolists-reducer.ts просто импортим, не нужно их создавать
// export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
// export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type TasksReducerActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

// let todolistID1 = v1()
// let todolistID2 = v1()

// const initialState: TasksStateType = {
//     [todolistID1]: [
//         {id: v1(), title: 'HTML&CSS', isDone: true},
//         {id: v1(), title: 'JS', isDone: true},
//         {id: v1(), title: 'ReactJS', isDone: false},
//     ],
//     [todolistID2]: [
//         {id: v1(), title: 'Rest API', isDone: true},
//         {id: v1(), title: 'GraphQL', isDone: false},
//     ],
// }

const initialState: TasksStateType = {}

export const tasksReducer = (
    state: TasksStateType = initialState,
    action: TasksReducerActionsType
): TasksStateType => {
    // debugger
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(el => el.id !== action.payload.taskId)
            }
        }
        case "ADD-TASK": {
            const newTask: TaskType = {
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
                [action.newTodolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            // first variant
            // let copyState = {...state}
            // delete copyState[action.todolistID]
            // return copyState

            // second variant
            const {
                [action.todolistID]: [],
                ...rest
            } = state
            return rest
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

//В tasks-reducer.ts все action creators принимают 2 и более параметра.
// Поэтому для того, чтобы не допустить ошибку при передаче параметров мы упаковали параметры в payload
export const removeTaskAC = (payload: { todolistID: string, taskId: string }) => {
    return {
        type: 'REMOVE-TASK',
        payload,
    } as const
}

export const addTaskAC = (payload: { todolistID: string, title: string }) => {
    return {
        type: 'ADD-TASK',
        payload,
    } as const
}

export const changeTaskStatusAC = (payload: { todolistID: string, taskId: string, taskStatus: boolean }) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload,
    } as const
}

export const changeTaskTitleAC = (payload: { todolistID: string, taskId: string, title: string }) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload,
    } as const
}

// // C полем payload
// export const RemoveTodolistAC = (todolistId: string) => {
//     return {
//         type: 'REMOVE-TODOLIST',
//         payload: {
//             todolistId
//         },
//     } as const
// }