import { setAppErrorAC, setAppStatusAC } from "app/app-reducer"
import type { AppDispatch, AppThunk, RootState } from "app/store"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import type { AddTodolistActionType, RemoveTodolistActionType } from "features/todolists/model/todolists-reducer"
import { type DomainTask, tasksApi, type UpdateTaskModel } from "../api"
import type { UpdateTaskDomainModel } from "../api/tasksApi.types"
import { ResultCode } from "../lib/enums"

export type TasksStateType = {
   [key: string]: Array<DomainTask>
}

const initialState: TasksStateType = {}

// {
//    'todoID1': [{taskId: string, title: string}]
//    'todoID2': [{taskId: string, title: string}]
// }

export const tasksReducer = (state: TasksStateType = initialState, action: TasksReducerActionsType): TasksStateType => {
   // debugger
   switch (action.type) {
      case "SET-TASKS": {
         const stateCopy = { ...state }
         stateCopy[action.payload.todolistId] = action.payload.tasks
         return stateCopy
      }
      case "UPDATE-TASK": {
         // props task
         const { todoListId, id, status, title } = action.payload.task
         return {
            ...state,
            [todoListId]: state[todoListId].map((t) => (t.id === id ? { ...t, status, title } : t)),
         }
      }
      // case "UPDATE-TASK": { // getState()
      //    const { todolistId, taskId, domainModel } = action.payload
      //    return {
      //       ...state,
      //       [todolistId]: state[todolistId].map((t) =>
      //          t.id === taskId
      //             ? { ...t, ...domainModel } // обновляем только изменённые поля
      //             : t
      //       )
      //    }
      // }
      case "REMOVE-TASK": {
         return {
            ...state,
            [action.payload.todolistId]: state[action.payload.todolistId].filter(
               (el) => el.id !== action.payload.taskId,
            ),
         }
      }
      case "ADD-TASK": {
         const newTask = action.payload.task
         return {
            ...state,
            [newTask.todoListId]: [newTask, ...state[newTask.todoListId]],
         }
      }
      // case "CHANGE-TASK-STATUS": {
      //    const { todoListId, id, status } = action.payload.task
      //    return {
      //       ...state,
      //       [todoListId]: state[todoListId].map((t) =>
      //          t.id === id ?{ ...t, status }: t
      //       )
      //    }
      // }
      // case "CHANGE-TASK-TITLE": {
      //    const { todoListId, id, title } = action.payload.task
      //    return {
      //       ...state,
      //       [todoListId]: state[todoListId].map((el) =>
      //          el.id === id ? { ...el, title: title } : el
      //       )
      //    }
      // }
      case "ADD-TODOLIST": {
         return {
            ...state,
            [action.payload.todolist.id]: [],
         }
      }
      case "REMOVE-TODOLIST": {
         const copyState = { ...state }
         delete copyState[action.payload.todolistId]
         return copyState
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

// export const addTaskAC = (payload: { todolistId: string; title: string }) => {
export const addTaskAC = (payload: { task: DomainTask }) => {
   return {
      type: "ADD-TASK",
      payload,
   } as const
}

// export const changeTaskStatusAC = (payload: { todolistId: string; taskId: string; status: TaskStatus }) => {
// export const changeTaskStatusAC = (payload: { task: DomainTask }) => {
//    return {
//       type: "CHANGE-TASK-STATUS",
//       payload
//    } as const
// }

// export const changeTaskTitleAC = (payload: { todolistId: string; taskId: string; title: string }) => {
// export const changeTaskTitleAC = (payload: { task: DomainTask }) => {
//    return {
//       type: "CHANGE-TASK-TITLE",
//       payload
//    } as const
// }

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
   return {
      type: "SET-TASKS",
      payload,
   } as const
}

// export const updateTaskAC = (payload: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }) => { // getState()
export const updateTaskAC = (payload: { task: DomainTask }) => {
   // props task
   return {
      type: "UPDATE-TASK",
      payload,
   } as const
}

// Thunks
// export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
export const fetchTasksTC =
   (todolistId: string): AppThunk =>
   (dispatch) => {
      dispatch(setAppStatusAC("loading"))
      tasksApi.getTasks(todolistId).then((res) => {
         const tasks = res.data.items
         dispatch(setAppStatusAC("succeeded"))
         dispatch(setTasksAC({ todolistId, tasks }))
      })
   }

export const deleteTaskTC =
   (arg: { todolistId: string; taskId: string }): AppThunk =>
   (dispatch) => {
      dispatch(setAppStatusAC("loading"))
      tasksApi
         .deleteTask(arg)
         .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
               dispatch(setAppStatusAC("succeeded"))
               dispatch(removeTaskAC(arg))
            } else {
               handleServerAppError(res.data, dispatch)
            }
         })
         .catch((error) => {
            handleServerNetworkError(error, dispatch)
            // dispatch(setAppErrorAC(error.message))
            // dispatch(setAppStatusAC("failed"))
         })
   }

export const addTaskTC =
   (arg: { title: string; todolistId: string }): AppThunk =>
   (dispatch) => {
      // Устанавливаем статус "loading", чтобы показать крутилку
      dispatch(setAppStatusAC("loading"))
      tasksApi
         .createTask(arg)
         .then((res) => {
            // А здесь если ResultCode или === 0 или !== 0
            if (res.data.resultCode === ResultCode.Success) {
               // Скрываем крутилку после успешной загрузки
               dispatch(setAppStatusAC("succeeded"))
               dispatch(addTaskAC({ task: res.data.data.item }))
            } else {
               handleServerAppError(res.data, dispatch)
            }
         })
         .catch((error) => {
            // Здесь будут у нас все 400 и 500 ошибки
            handleServerNetworkError(error, dispatch)
         })
   }

// // Решение c методом finally()
// export const _addTaskTCWithFinally =
//    (arg: { title: string; todolistId: string }): AppThunk =>
//    (dispatch) => {
//       dispatch(setAppStatusAC("loading"))
//       tasksApi
//          .createTask(arg)
//          .then((res) => {
//             if (res.data.resultCode === ResultCode.Success) {
//                dispatch(addTaskAC({ task: res.data.data.item }))
//             } else {
//                handleServerAppError(res.data, dispatch)
//             }
//          })
//          .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//          })
//          .finally(() => {
//             dispatch(setAppStatusAC("idle"))
//          })
//    }

// updateTaskTC - вместо changeTaskStatusTC и changeTaskTitleTC напишите универсальную санку
// для обновления таски updateTaskTC, чтобы избавиться от дублирования кода

// 1. Вариант через props task из Task.tsx
export const updateTaskTC =
   (task: DomainTask): AppThunk =>
   (dispatch) => {
      const model: UpdateTaskModel = {
         status: task.status,
         title: task.title,
         deadline: task.deadline,
         description: task.description,
         priority: task.priority,
         startDate: task.startDate,
      }
      dispatch(setAppStatusAC("loading"))
      tasksApi
         .updateTask({ todolistId: task.todoListId, taskId: task.id, model })
         .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
               dispatch(setAppStatusAC("succeeded"))
               dispatch(updateTaskAC({ task }))
            } else {
               handleServerAppError(res.data, dispatch)
            }
         })
         .catch((error) => {
            handleServerNetworkError(error, dispatch)
         })
   }

// // 2. Вариант через getState()
// export const updateTaskTC =
//    (arg: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }) =>
//       (dispatch: AppDispatch, getState: () => RootState) => {
//          const { todolistId, taskId, domainModel } = arg
//
//          const allTasksFromState = getState().tasks
//          const tasksForCurrentTodolist = allTasksFromState[todolistId]
//          const task = tasksForCurrentTodolist.find((t) => t.id === taskId)
//
//          // // Достаём текущую таску из стейта
//          // const currentTask = getState().tasks[todolistId]?.find(task => task.id === taskId)
//
//          if (task) {
//             // Создаем обновлённую модель задачи, объединяя текущую таску с переданным domainModel
//             const model: UpdateTaskModel = {
//                ...task, // берём все текущие поля из задачи
//                ...domainModel // переопределяем (перезаписываем) поля, которые есть в domainModel
//             }
//             tasksApi.updateTask({ todolistId, taskId, model }).then((res) => {
//                dispatch(updateTaskAC({ todolistId, taskId, domainModel }))
//             })
//          }
//       }

// Запись через ReturnType
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type setTasksActionType = ReturnType<typeof setTasksAC>
export type updateTaskActionType = ReturnType<typeof updateTaskAC>

export type TasksReducerActionsType =
   | RemoveTaskActionType
   | AddTaskActionType
   | AddTodolistActionType
   | RemoveTodolistActionType
   | setTasksActionType
   | updateTaskActionType
