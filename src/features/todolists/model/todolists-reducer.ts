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
   action: TodolistsReducerActionsType
): DomainTodolist[] => {
   switch (action.type) {
      case "SET-TODOLISTS": {
         // 6
         return action.payload.todolists.map((tl) => ({ ...tl, filter: "all" }))
      }
      case "REMOVE-TODOLIST": {
         return state.filter((tl) => tl.id !== action.payload.todolistId)
      }
      case "ADD-TODOLIST": {
         // const newTodolist: DomainTodolist = {
         //    id: action.payload.todolist.id,
         //    title: action.payload.todolist.title,
         //    filter: "all",
         //    addedDate: "",
         //    order: 0
         // }
         // const newTodolist = action.payload.todolist as DomainTodolist
         const newTodolist: DomainTodolist = {
            ...action.payload.todolist,
            filter: "all"
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
// export const removeTodolistAC = (todolistId: string) => {
//    return {
//       type: "REMOVE-TODOLIST",
//       payload: {
//          id: todolistId
//       }
//    } as const
// }
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

// Thunks
// export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
export const fetchTodolistsTC = (): AppThunk =>
   (dispatch) => {
      // 2 BLL -> DAL
      // внутри санки можно делать побочные эффекты (запросы на сервер)
      todolistsApi.getTodolists().then((res) => {
         // 5 DAL -> BLL
         // и диспатчить экшены (action) или другие санки (thunk)
         dispatch(setTodolistsAC({ todolists: res.data }))
      })
   }

export const addTodolistTC = (title: string): AppThunk =>
   (dispatch) => {
      todolistsApi.createTodolist(title).then(res => {
         const newTodo = res.data.data.item
         dispatch(addTodolistAC({ todolist: newTodo }))
      })
   }

export const removeTodolistTC = (id: string): AppThunk =>
   (dispatch) => {
      todolistsApi.deleteTodolist(id).then((res) => {
         dispatch(removeTodolistAC({todolistId: id}))
      })
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
