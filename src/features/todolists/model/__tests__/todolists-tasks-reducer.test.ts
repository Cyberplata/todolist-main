import { addTodolistAC, todolistsReducer, type TodolistType } from "../todolists-reducer"
import { tasksReducer, type TasksStateType } from "../tasks-reducer"

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodolistType> = []

  const action = addTodolistAC("new todolist")

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.newTodolistId)
  expect(idFromTodolists).toBe(action.payload.newTodolistId)
})
