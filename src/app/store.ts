import { applyMiddleware, combineReducers, legacy_createStore as createStore, type UnknownAction } from "redux"
import { thunk, type ThunkAction, type ThunkDispatch } from "redux-thunk"
import { tasksReducer } from "../features/todolists/model/tasks-reducer"
import { todolistsReducer } from "../features/todolists/model/todolists-reducer"
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

// export type AppDispatch = typeof store.dispatch
// 1ый и 2ой способ типизации санок. Будем использовать 2ой, чтобы getState не типизировать
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
