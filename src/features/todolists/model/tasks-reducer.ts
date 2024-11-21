import { v1 } from "uuid"
import type { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"

// let todolistID1 = v1()
// let todolistID2 = v1()

// const initialState: TasksStateType = {
//     [todolistID1]: [
//         {id: v1(), title: 'HTML&CSS', isDone: true},
//         {id: v1(), title: 'JS', isDone: true},
//         {id: v1(), title: 'ReactJS', isDone: false},
//     ],
//     [todolistID2]: [
//         {id: v1(), title: 'Rest API', isDone: true},
//         {id: v1(), title: 'GraphQL', isDone: false},
//     ],
// }

// Typing
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksReducerActionsType): TasksStateType => {
  // debugger
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistID]: state[action.payload.todolistID].filter((el) => el.id !== action.payload.taskId),
      }
    }
    case "ADD-TASK": {
      const newTask: TaskType = {
        id: v1(),
        title: action.payload.title,
        isDone: false,
      }
      return {
        ...state,
        [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]],
      }
    }
    case "CHANGE-TASK-STATUS": {
      const { todolistID, taskId, isDone } = action.payload
      return {
        ...state,
        [todolistID]: state[todolistID].map((el) => (el.id === taskId ? { ...el, isDone } : el)),
      }
    }
    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.payload.todolistID]: state[action.payload.todolistID].map((el) =>
          el.id === action.payload.taskId ? { ...el, title: action.payload.title } : el,
        ),
      }
    }
    case "ADD-TODOLIST": {
      // const newTodolistId = v1()
      return {
        ...state,
        [action.payload.newTodolistId]: [],
      }
    }
    case "REMOVE-TODOLIST": {
      // first variant
      const copyState = { ...state }
      delete copyState[action.payload.id]
      return copyState

      // // second variant
      // const {
      //     [action.payload.id]: [],
      //     ...rest
      // } = state
      // return rest
    }
    default:
      return state
  }
}

// Action creators
export const removeTaskAC = (payload: { todolistID: string; taskId: string }) => {
  return {
    type: "REMOVE-TASK",
    payload,
  } as const
}

export const addTaskAC = (payload: { todolistID: string; title: string }) => {
  return {
    type: "ADD-TASK",
    payload,
  } as const
}

export const changeTaskStatusAC = (payload: { todolistID: string; taskId: string; isDone: boolean }) => {
  return {
    type: "CHANGE-TASK-STATUS",
    payload,
  } as const
}

export const changeTaskTitleAC = (payload: { todolistID: string; taskId: string; title: string }) => {
  return {
    type: "CHANGE-TASK-TITLE",
    payload,
  } as const
}

// Запись через ReturnType
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

export type TasksReducerActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
