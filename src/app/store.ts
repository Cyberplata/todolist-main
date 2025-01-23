import { applyMiddleware, combineReducers, legacy_createStore as createStore, type UnknownAction } from "redux"
import { thunk, type ThunkAction, type ThunkDispatch } from "redux-thunk"
import { tasksReducer, type TasksReducerActionsType } from "../features/todolists/model/tasks-reducer"
import { todolistsReducer, type TodolistsReducerActionsType } from "../features/todolists/model/todolists-reducer"
import { appReducer } from "./app-reducer"

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistsReducer,
   app: appReducer,
})
// непосредственно создаём store
export const store = createStore(rootReducer, {}, applyMiddleware(thunk))

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// export type AppRootStateType = ReturnType<typeof rootReducer>

// Вместо UnknownAction можно использовать AppActionsType. Это типизация для всех action-ов
// type AppActionsType = TodolistsReducerActionsType | TasksReducerActionsType

// export type AppDispatch = typeof store.dispatch
// 1ый и 2ой способ типизации санок. Будем использовать 2ой, чтобы getState не типизировать
// export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>
// export type AppThunk = ThunkAction<void, RootState, unknown, AppActionsType>
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
