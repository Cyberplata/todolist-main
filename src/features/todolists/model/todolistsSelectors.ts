import type { RootState } from "app/store"
import type { TodolistType } from "features/todolists/model/todolists-reducer"

export const selectTodolists = (state: RootState): TodolistType[] => state.todolists
