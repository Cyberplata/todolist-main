import {v1} from "uuid";

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
                id: action.payload.newTodolistId,
                title: action.payload.title,
                filter: 'all'
            }
            return [...state, newTodolist] // логика по добавлению тудулиста

            // Victor
            // const {id, title} = action.payload
            // return [{id, title, filter: 'all'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.payload.todolistID
                ? {...tl, title: action.payload.title}
                : tl
            )
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.payload.todolistID
                ? {...tl, filter: action.payload.filter}
                : tl
            )
        }
        default:
            return state;
            // throw new Error("I don't understand this type")
    }
}


// Action creators
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistID
        }
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            newTodolistId: v1(),
        },
    } as const
}

export const changeTodolistTitleAC = (payload: { todolistID: string, title: string }) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload,
    } as const
}

export const changeTodolistFilterAC = (payload: { todolistID: string, filter: FilterValuesType }) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload,
    } as const
}

// Typing
export type TodolistType = {
    id: string,
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed'

// запись через ReturnType Actions type
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

export type TodolistsReducerActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
