import { setAppStatusAC } from "app/app-reducer"
import type { AppThunk } from "app/store"
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
   action: TodolistsReducerActionsType
): DomainTodolist[] => {
   switch (action.type) {
      case "SET-TODOLISTS": {
         return action.payload.todolists.map((tl) => ({ ...tl, filter: "all" }))
      }
      case "REMOVE-TODOLIST": {
         return state.filter((tl) => tl.id !== action.payload.todolistId)
      }
      case "ADD-TODOLIST": {
         const newTodolist: DomainTodolist = {
            ...action.payload.todolist,
            filter: "all"
         }
         return [...state, newTodolist]
      }
      case "UPDATE-TODOLIST": {
         return state.map((tl) => (tl.id === action.payload.todolistId ? { ...tl, title: action.payload.title } : tl))
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
export const removeTodolistAC = (payload: { todolistId: string }) => {
   return { type: "REMOVE-TODOLIST", payload } as const
}

export const addTodolistAC = (payload: { todolist: Todolist }) => {
   return { type: "ADD-TODOLIST", payload } as const
}

export const changeTodolistTitleAC = (payload: { todolistId: string; title: string }) => {
   return { type: "CHANGE-TODOLIST-TITLE", payload } as const
}

export const changeTodolistFilterAC = (payload: { todolistId: string; filter: FilterValuesType }) => {
   return { type: "CHANGE-TODOLIST-FILTER", payload } as const
}

export const setTodolistsAC = (payload: { todolists: Todolist[] }) => {
   return { type: "SET-TODOLISTS", payload } as const
}

export const updateTodolistAC = (payload: { todolistId: string; title: string }) => {
   return { type: "UPDATE-TODOLIST", payload } as const
}

// Thunks

// синтаксис для then
// export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
export const fetchTodolistsTC = (): AppThunk =>
   (dispatch) => {
      // Устанавливаем статус "loading", чтобы показать крутилку
      dispatch(setAppStatusAC('loading'))
      todolistsApi.getTodolists().then((res) => {
         // Скрываем крутилку после успешной загрузки
         dispatch(setAppStatusAC('succeeded'))
         dispatch(setTodolistsAC({ todolists: res.data }))
      })
   }

export const addTodolistTC = (title: string): AppThunk =>
   (dispatch) => {
      todolistsApi.createTodolist(title).then(res => {
         const newTodo = res.data.data.item
         dispatch(addTodolistAC({ todolist: newTodo }))
         // dispatch(fetchTodolistsTC())
      })
   }

export const removeTodolistTC = (id: string): AppThunk =>
   (dispatch) => {
      todolistsApi.deleteTodolist(id).then((res) => {
         dispatch(removeTodolistAC({ todolistId: id }))
      })
   }

export const updateTodolistTitleTC =
   (arg: { id: string; title: string }): AppThunk =>
      (dispatch) => {
         const { id, title } = arg
         todolistsApi.updateTodolist({ id, title }).then((res) => {
            dispatch(updateTodolistAC({ todolistId: id, title }))
         })
      }

// запись через ReturnType Actions type
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type UpdateTodolistActionType = ReturnType<typeof updateTodolistAC>

export type TodolistsReducerActionsType =
   | RemoveTodolistActionType
   | AddTodolistActionType
   | ChangeTodolistTitleActionType
   | ChangeTodolistFilterActionType
   | SetTodolistsActionType
   | UpdateTodolistActionType
