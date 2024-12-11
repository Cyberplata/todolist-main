import type { AppDispatch } from "app/store"
import type { AddTodolistActionType, RemoveTodolistActionType } from "features/todolists/model/todolists-reducer"
import { v1 } from "uuid"
import { type DomainTask, tasksApi } from "../api"
import { TaskPriority, TaskStatus } from "../lib/enums"

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
// export type DomainTask = {
//    id: string
//    title: string
//    isDone: boolean
// }

export type TasksStateType = {
   [key: string]: Array<DomainTask>
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksReducerActionsType): TasksStateType => {
   // debugger
   switch (action.type) {
      case "REMOVE-TASK": {
         return {
            ...state,
            [action.payload.todolistId]: state[action.payload.todolistId].filter(
               (el) => el.id !== action.payload.taskId,
            ),
         }
      }
      case "ADD-TASK": {
         const newTask: DomainTask = {
            // id: v1(),
            // title: action.payload.title,
            // isDone: false,
            title: action.payload.title,
            todoListId: action.payload.todolistId,
            startDate: "",
            priority: TaskPriority.Low,
            description: "",
            deadline: "",
            status: TaskStatus.New,
            addedDate: "",
            order: 0,
            id: v1(),
         }
         return {
            ...state,
            [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]],
         }
      }
      case "CHANGE-TASK-STATUS": {
         const { todolistId, taskId, isDone } = action.payload
         return {
            ...state,
            [todolistId]: state[todolistId].map((el) => (el.id === taskId ? { ...el, isDone } : el)),
         }
      }
      case "CHANGE-TASK-TITLE": {
         return {
            ...state,
            [action.payload.todolistId]: state[action.payload.todolistId].map((el) =>
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
         const copyState = { ...state }
         delete copyState[action.payload.id]
         return copyState
      }
      case "SET-TASKS": {
         const stateCopy = { ...state }
         stateCopy[action.payload.todolistId] = action.payload.tasks
         return stateCopy
      }
      default:
         return state
   }
}

// Action creators
export const removeTaskAC = (payload: { todolistId: string; taskId: string }) => {
   return {
      type: "REMOVE-TASK",
      payload,
   } as const
}

export const addTaskAC = (payload: { todolistId: string; title: string }) => {
   return {
      type: "ADD-TASK",
      payload,
   } as const
}

export const changeTaskStatusAC = (payload: { todolistId: string; taskId: string; isDone: boolean }) => {
   return {
      type: "CHANGE-TASK-STATUS",
      payload,
   } as const
}

export const changeTaskTitleAC = (payload: { todolistId: string; taskId: string; title: string }) => {
   return {
      type: "CHANGE-TASK-TITLE",
      payload,
   } as const
}

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
   return {
      type: "SET-TASKS",
      payload,
   } as const
}

// Запись через ReturnType
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type setTasksActionType = ReturnType<typeof setTasksAC>

export type TasksReducerActionsType =
   | RemoveTaskActionType
   | AddTaskActionType
   | ChangeTaskStatusActionType
   | ChangeTaskTitleActionType
   | AddTodolistActionType
   | RemoveTodolistActionType
   | setTasksActionType

// Thunks
// const thunkCreator = () => {
//    return (dispatch, getState) => {
//       api.getTasks().then(res => {
//          dispatch(actionCreator())
//       })
//    }
// }
export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
   tasksApi.getTasks(todolistId).then((res) => {
      const tasks = res.data.items
      dispatch(setTasksAC({ todolistId, tasks }))
   })
}
