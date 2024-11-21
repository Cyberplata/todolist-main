import type { RootState } from "../../../app"
import type { TasksStateType } from "./tasks-reducer"

export const selectTasks = (state: RootState): TasksStateType => state.tasks
