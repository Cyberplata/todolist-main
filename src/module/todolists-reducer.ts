import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}

// Igor
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
    }
}

//Victor
// export type AddTodolistActionType = {
//     type: 'ADD-TODOLIST'
//     payload: {
//         title: string
//         id: string
//     }
// }

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilterValuesType
    }
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            // setTodolists(todolists.filter(el => el.id !== todolistId))
            // логика по удалению тудулиста
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            // Igor
            const newTodolistId = v1()
            const newTodolist: TodolistType = {id: newTodolistId, title: action.payload.title, filter: 'all'}
            return [...state, newTodolist] // логика по добавлению тудулиста

            // Victor
            // const {id, title} = action.payload
            // return [{id, title, filter: 'all'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.payload.id
                ? {...tl, title: action.payload.title}
                : tl
            )
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.payload.id
                ? {...tl, filter: action.payload.filter}
                : tl
            )
        }
        default:
            return state;
            // throw new Error("I don't understand this type")
    }
}

export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistID,
        },
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
        },
    } as const
}

// Victor addTodolistAC
// export const addTodolistAC = (id: string, title: string): AddTodolistActionType => ({
//     type: 'ADD-TODOLIST',
//     payload: {
//         id,
//         title,
//     },
// })

export const updateTodolistAC = (todolistID: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: todolistID,
            title,
        },
    } as const
}

export const changeFilterAC = (todolistID: string, filterValue: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id: todolistID,
            filter: filterValue,
        },
    } as const
}