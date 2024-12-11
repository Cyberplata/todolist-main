import type { AppDispatch } from "app/store"
import { v1 } from "uuid"
import { todolistsApi } from "../api"

// Typing
// export type DomainTodolist = {
//    id: string
//    title: string
//    filter: FilterValuesType
// }
export type Todolist = {
   id: string
   title: string
   addedDate: string
   order: number
}

export type DomainTodolist = Todolist & {
   filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed"

const initialState: DomainTodolist[] = []

export const todolistsReducer = (
   state: DomainTodolist[] = initialState,
   action: TodolistsReducerActionsType,
): DomainTodolist[] => {
   switch (action.type) {
      case "REMOVE-TODOLIST": {
         return state.filter((tl) => tl.id !== action.payload.id)
      }
      case "ADD-TODOLIST": {
         const newTodolist: DomainTodolist = {
            id: action.payload.newTodolistId,
            title: action.payload.title,
            filter: "all",
            addedDate: "",
            order: 0,
         }
         return [...state, newTodolist]
      }
      case "CHANGE-TODOLIST-TITLE": {
         return state.map((tl) => (tl.id === action.payload.todolistId ? { ...tl, title: action.payload.title } : tl))
      }
      case "CHANGE-TODOLIST-FILTER": {
         return state.map((tl) => (tl.id === action.payload.todolistId ? { ...tl, filter: action.payload.filter } : tl))
      }
      case "SET-TODOLISTS": {
         return action.todolists.map((tl) => ({ ...tl, filter: "all" }))
      }
      default:
         return state
   }
}

// Action creators
export const removeTodolistAC = (todolistId: string) => {
   return {
      type: "REMOVE-TODOLIST",
      payload: {
         id: todolistId,
      },
   } as const
}

export const addTodolistAC = (title: string) => {
   return {
      type: "ADD-TODOLIST",
      payload: {
         title,
         newTodolistId: v1(),
      },
   } as const
}

export const changeTodolistTitleAC = (payload: { todolistId: string; title: string }) => {
   return {
      type: "CHANGE-TODOLIST-TITLE",
      payload,
   } as const
}

export const changeTodolistFilterAC = (payload: { todolistId: string; filter: FilterValuesType }) => {
   return {
      type: "CHANGE-TODOLIST-FILTER",
      payload,
   } as const
}

export const setTodolistsAC = (todolists: Todolist[]) => {
   return { type: "SET-TODOLISTS", todolists } as const
}

// запись через ReturnType Actions type
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type TodolistsReducerActionsType =
   | RemoveTodolistActionType
   | AddTodolistActionType
   | ChangeTodolistTitleActionType
   | ChangeTodolistFilterActionType
   | SetTodolistsActionType

// Thunks
export const fetchTodolistsThunk = (dispatch: AppDispatch) => {
   // внутри санки можно делать побочные эффекты (запросы на сервер)
   todolistsApi.getTodolists().then((res) => {
      // и диспатчить экшены (action) или другие санки (thunk)
      dispatch(setTodolistsAC(res.data))
   })
}
