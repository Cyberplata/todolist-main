import type { RootState } from "app/store"
import type { DomainTodolist } from "features/todolists/model/todolists-reducer"

export const selectTodolists = (state: RootState): DomainTodolist[] => state.todolists
