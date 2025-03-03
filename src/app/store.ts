import { applyMiddleware, combineReducers, legacy_createStore as createStore, UnknownAction } from "redux"
import { thunk, type ThunkAction, type ThunkDispatch } from "redux-thunk"
import { authReducer } from "../features/auth/model/auth-reducer"
import { tasksReducer } from "../features/todolists/model/tasks-reducer"
import { todolistsReducer } from "../features/todolists/model/todolists-reducer"
import { appReducer } from "./app-reducer"

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistsReducer,
   app: appReducer,
   auth: authReducer,
})
// непосредственно создаём store
export const store = createStore(rootReducer, {}, applyMiddleware(thunk))

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>

// // вариант 1 типизации
// type AppActionsType = TodolistsReducerActionsType | TasksReducerActionsType | AppReducerActionsType
// export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>
// export type AppThunk = ThunkAction<void, RootState, unknown, AppActionsType>

// вариант 2 с урока почему то ошибки Argument type AppThunk is not assignable to parameter type UnknownAction
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
export type AppThunk = ThunkAction<void, RootState, unknown, UnknownAction>

// @ts-ignore
window.store = store

// // Наш объект store
/*
{
    state: {
        task: {},
        todolists: [],
    },
    getState(),
    dispatch(),
    subscribe()
}*/
