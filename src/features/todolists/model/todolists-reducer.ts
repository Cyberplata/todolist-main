import { type RequestStatus, setAppStatusAC } from "app/app-reducer"
import type { AppThunk } from "app/store"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { todolistsApi } from "../api"
import { ResultCode } from "../lib/enums"

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
   entityStatus: RequestStatus
}

export type FilterValuesType = "all" | "active" | "completed"

const initialState: DomainTodolist[] = []

export const todolistsReducer = (
   state: DomainTodolist[] = initialState,
   action: TodolistsReducerActionsType,
): DomainTodolist[] => {
   switch (action.type) {
      case "SET-TODOLISTS": {
         return action.payload.todolists.reverse().map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      }
      case "REMOVE-TODOLIST": {
         return state.filter((tl) => tl.id !== action.payload.todolistId)
      }
      case "ADD-TODOLIST": {
         const newTodolist: DomainTodolist = {
            ...action.payload.todolist,
            filter: "all",
            entityStatus: "idle",
         }
         return [...state, newTodolist]
      }
      case "UPDATE-TODOLIST-TITLE": {
         return state.map((tl) => (tl.id === action.payload.todolistId ? { ...tl, title: action.payload.title } : tl))
      }
      // case "CHANGE-TODOLIST-TITLE": {
      //    return state.map((tl) => (tl.id === action.payload.todolistId ? { ...tl, title: action.payload.title } : tl))
      // }
      case "CHANGE-TODOLIST-FILTER": {
         return state.map((tl) => (tl.id === action.payload.todolistId ? { ...tl, filter: action.payload.filter } : tl))
      }
      case "CHANGE-TODOLIST-ENTITY-STATUS": {
         return state.map((tl) =>
            tl.id === action.payload.id
               ? {
                    ...tl,
                    entityStatus: action.payload.entityStatus,
                 }
               : tl,
         )
      }
      default:
         return state
   }
}

// Action creators
export const removeTodolistAC = (payload: { todolistId: string }) => {
   return { type: "REMOVE-TODOLIST", payload } as const
}

export const addTodolistAC = (payload: { todolist: Todolist }) => {
   return { type: "ADD-TODOLIST", payload } as const
}

// export const changeTodolistTitleAC = (payload: { todolistId: string; title: string }) => {
//    return { type: "CHANGE-TODOLIST-TITLE", payload } as const
// }

export const changeTodolistFilterAC = (payload: { todolistId: string; filter: FilterValuesType }) => {
   return { type: "CHANGE-TODOLIST-FILTER", payload } as const
}

export const setTodolistsAC = (payload: { todolists: Todolist[] }) => {
   return { type: "SET-TODOLISTS", payload } as const
}

export const updateTodolistTitleAC = (payload: { todolistId: string; title: string }) => {
   return { type: "UPDATE-TODOLIST-TITLE", payload } as const
}

export const changeTodolistEntityStatusAC = (payload: { id: string; entityStatus: RequestStatus }) => {
   return { type: "CHANGE-TODOLIST-ENTITY-STATUS", payload } as const
}

// Thunks

// синтаксис для then
// export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
   // Устанавливаем статус "loading", чтобы показать крутилку
   dispatch(setAppStatusAC("loading"))
   todolistsApi.getTodolists().then((res) => {
      // Скрываем крутилку после успешной загрузки
      dispatch(setAppStatusAC("succeeded"))
      dispatch(setTodolistsAC({ todolists: res.data }))
   })
}

export const addTodolistTC =
   (title: string): AppThunk =>
   (dispatch) => {
      dispatch(setAppStatusAC("loading"))
      todolistsApi
         .createTodolist(title)
         .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
               const newTodo = res.data.data.item
               dispatch(setAppStatusAC("succeeded"))
               dispatch(addTodolistAC({ todolist: newTodo }))
            } else {
               handleServerAppError(res.data, dispatch)
            }
         })
         .catch((error) => {
            handleServerNetworkError(error, dispatch)
         })
   }

export const removeTodolistTC =
   (id: string): AppThunk =>
   (dispatch) => {
      dispatch(setAppStatusAC("loading"))
      dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "loading" }))
      todolistsApi
         .deleteTodolist(id)
         .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
               dispatch(setAppStatusAC("succeeded"))
               dispatch(removeTodolistAC({ todolistId: id }))
            } else {
               handleServerAppError(res.data, dispatch)
            }
         })
         .catch((error) => {
            dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "idle" }))
            handleServerNetworkError(error, dispatch)
         })
   }

export const updateTodolistTitleTC =
   (arg: { id: string; title: string }): AppThunk =>
   (dispatch) => {
      const { id, title } = arg
      dispatch(setAppStatusAC("loading"))
      todolistsApi
         .updateTodolist({ id, title })
         .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
               dispatch(setAppStatusAC("succeeded"))
               dispatch(updateTodolistTitleAC({ todolistId: id, title }))
            } else {
               handleServerAppError(res.data, dispatch)
            }
         })
         .catch((error) => {
            dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "idle" }))
            handleServerNetworkError(error, dispatch)
         })
   }

// запись через ReturnType Actions type
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
// export type ChangeTodolistTitleActionType = ReturnType<typeof updateTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type UpdateTodolistActionType = ReturnType<typeof updateTodolistTitleAC>
export type ChangeTodolistEntityActionType = ReturnType<typeof changeTodolistEntityStatusAC>

export type TodolistsReducerActionsType =
   | RemoveTodolistActionType
   | AddTodolistActionType
   // | ChangeTodolistTitleActionType
   | ChangeTodolistFilterActionType
   | SetTodolistsActionType
   | UpdateTodolistActionType
   | ChangeTodolistEntityActionType
