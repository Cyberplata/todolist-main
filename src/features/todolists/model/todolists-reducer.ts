import type { AppDispatch, AppThunk } from "app/store"
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
      case "SET-TODOLISTS": {
         // 6
         return action.todolists.map((tl) => ({ ...tl, filter: "all" }))
      }
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

// Thunks
// export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
   // 2
   // внутри санки можно делать побочные эффекты (запросы на сервер)
   todolistsApi.getTodolists().then((res) => {
      // 5
      // и диспатчить экшены (action) или другие санки (thunk)
      dispatch(setTodolistsAC(res.data))
   })
}

// export const fetchTodolistsThunk = (dispatch: AppDispatch) => {
//    // 2
//    // внутри санки можно делать побочные эффекты (запросы на сервер)
//    todolistsApi.getTodolists().then((res) => {
//       // 5
//       // и диспатчить экшены (action) или другие санки (thunk)
//       dispatch(setTodolistsAC(res.data))
//    })
// }

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
