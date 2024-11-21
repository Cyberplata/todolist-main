import type { RootState } from "../../../app"
import type { TodolistType } from "./todolists-reducer"

export const selectTodolists = (state: RootState): TodolistType[] => state.todolists
