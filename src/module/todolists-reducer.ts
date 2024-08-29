import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistID: string
}

// Igor
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    newTodolistId: string
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
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type TodolistsReducerActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


let todolistID1 = v1()
let todolistID2 = v1()

// const initialState: TodolistType[] = [
//     {id: todolistID1, title: 'What to learn', filter: 'all'},
//     {id: todolistID2, title: 'What to buy', filter: 'all'},
// ]
const initialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = initialState, action: TodolistsReducerActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            // setTodolists(todolists.filter(el => el.id !== todolistId))
            // логика по удалению тудулиста
            return state.filter(tl => tl.id !== action.todolistID)
        }
        case 'ADD-TODOLIST': {
            // Igor
            // const newTodolistId = v1()
            const newTodolist: TodolistType = {
                id: action.newTodolistId,
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodolist] // логика по добавлению тудулиста

            // Victor
            // const {id, title} = action.payload
            // return [{id, title, filter: 'all'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id
                ? {...tl, title: action.title}
                : tl
            )
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id
                ? {...tl, filter: action.filter}
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
        todolistID,
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title,
        newTodolistId: v1(),
    } as const
}

export const changeTodolistTitleAC = (todolistID: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistID,
        title,
    } as const
}

export const changeFilterAC = (todolistID: string, filterValue: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistID,
        filter: filterValue,
    } as const
}