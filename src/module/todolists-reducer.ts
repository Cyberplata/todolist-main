import {v1} from "uuid";
// import {FilterValuesType, TodolistType} from "../App";
import {FilterValuesType, TodolistType} from "../app/App";

// export type RemoveTodolistActionType = {
//     type: 'REMOVE-TODOLIST'
//     todolistID: string
// }

// Без payload
// export type AddTodolistActionType = {
//     type: 'ADD-TODOLIST'
//     title: string
//     newTodolistId: string
// }

// export type ChangeTodolistTitleActionType = {
//     type: 'CHANGE-TODOLIST-TITLE'
//     id: string
//     title: string
// }

// export type ChangeTodolistFilterActionType = {
//     type: 'CHANGE-TODOLIST-FILTER'
//     id: string
//     filter: FilterValuesType
// }

// запись через ReturnType
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeFilterAC>

export type TodolistsReducerActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


// let todolistID1 = v1()
// let todolistID2 = v1()

// const initialState: TodolistType[] = [
//     {id: todolistID1, title: 'What to learn', filter: 'all'},
//     {id: todolistID2, title: 'What to buy', filter: 'all'},
// ]

const initialState: TodolistType[] = []

export const todolistsReducer = (
    state: TodolistType[] = initialState,
    action: TodolistsReducerActionsType
): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            // setTodolists(todolists.filter(el => el.id !== todolistId))
            // логика по удалению тудулиста
            return state.filter(tl => tl.id !== action.payload.id)
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

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title,
        newTodolistId: v1(),
    } as const
}

export const changeTodolistTitleAC = (payload: { id: string, title: string }) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload,
    } as const
}

export const changeFilterAC = (payload: { id: string, filter: FilterValuesType }) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload,
    } as const
}