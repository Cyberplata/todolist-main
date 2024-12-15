import type { AppDispatch, AppThunk, RootState } from "app/store"
import type { AddTodolistActionType, RemoveTodolistActionType } from "features/todolists/model/todolists-reducer"
import { v1 } from "uuid"
import { type DomainTask, tasksApi, type UpdateTaskModel } from "../api"
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
      case "REMOVE-TASK": {
         return {
            ...state,
            [action.payload.todolistId]: state[action.payload.todolistId].filter(
               (el) => el.id !== action.payload.taskId
            )
         }
      }
      case "ADD-TASK": {
         // const newTask: DomainTask = {
         //    title: action.payload.title,
         //    todoListId: action.payload.todolistId,
         //    startDate: "",
         //    priority: TaskPriority.Low,
         //    description: "",
         //    deadline: "",
         //    status: TaskStatus.New,
         //    addedDate: "",
         //    order: 0,
         //    id: v1(),
         // }
         const newTask = action.payload.task
         return {
            ...state,
            [newTask.todoListId]: [newTask, ...state[newTask.todoListId]]
         }
      }
      // case "CHANGE-TASK-STATUS": {
      //    return {
      //       ...state,
      //       [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
      //          t.id === action.payload.taskId
      //             ? {
      //                ...t,
      //                status: action.payload.status
      //             }
      //             : t
      //       )
      //    }
      // }
      case "CHANGE-TASK-STATUS": {
         // const newTask = action.payload.task
         // const { todoListId, id, status } = newTask
         const { todoListId, id, status } = action.payload.task
         return {
            ...state,
            [todoListId]: state[todoListId].map((t) =>
               t.id === id ?
                  { ...t, status }
                  : t
            )
         }
      }
      case "CHANGE-TASK-TITLE": {
         return {
            ...state,
            [action.payload.todolistId]: state[action.payload.todolistId].map((el) =>
               el.id === action.payload.taskId ? { ...el, title: action.payload.title } : el
            )
         }
      }
      case "ADD-TODOLIST": {
         // const newTodolistId = v1()
         return {
            ...state,
            [action.payload.newTodolistId]: []
         }
      }
      case "REMOVE-TODOLIST": {
         const copyState = { ...state }
         delete copyState[action.payload.id]
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
      payload
   } as const
}

// export const addTaskAC = (payload: { todolistId: string; title: string }) => {
export const addTaskAC = (payload: { task: DomainTask }) => {
   return {
      type: "ADD-TASK",
      payload
   } as const
}

// export const changeTaskStatusAC = (payload: { todolistId: string; taskId: string; status: TaskStatus }) => {
export const changeTaskStatusAC = (payload: { task: DomainTask }) => {
   return {
      type: "CHANGE-TASK-STATUS",
      payload
   } as const
}

export const changeTaskTitleAC = (payload: { todolistId: string; taskId: string; title: string }) => {
   return {
      type: "CHANGE-TASK-TITLE",
      payload
   } as const
}

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
   return {
      type: "SET-TASKS",
      payload
   } as const
}


// Thunks
// export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
   // 1. API
   tasksApi.getTasks(todolistId).then((res) => {
      const tasks = res.data.items
      // 2. Set to redux state
      dispatch(setTasksAC({ todolistId, tasks }))
   })
}

export const deleteTaskTC = (arg: { todolistId: string; taskId: string }): AppThunk => (dispatch) => {
   tasksApi.deleteTask(arg).then((res) => {
      dispatch(removeTaskAC(arg))
      // вариант, чтобы удалялось одновременно у нескольких пользователей
      // dispatch(fetchTasksTC(arg.todolistId))
   })
}

export const addTaskTC = (arg: { title: string; todolistId: string }): AppThunk => (dispatch) => {
   tasksApi.createTask(arg).then((res) => {
      // dispatch(addTaskAC({ title: res.data.data.item.title, todolistId: res.data.data.item.todoListId }))
      dispatch(addTaskAC({ task: res.data.data.item }))
   })
}

// changeTaskStatusTC

// // 1 вариант с созданием модели внутри TC
// export const changeTaskStatusTC =
//    (arg: { taskId: string; status: TaskStatus; todolistId: string }): AppThunk =>
//    (dispatch: AppDispatch, getState: () => RootState) => {
//       const { todolistId, taskId, status } = arg
//
//       const allTasksFromState = getState().tasks
//       const tasksForCurrentTodolist = allTasksFromState[todolistId]
//       const task = tasksForCurrentTodolist.find((t) => t.id === taskId)
//
//       if (task) {
//          const model: UpdateTaskModel = {
//             status,
//             title: task.title,
//             deadline: task.deadline,
//             description: task.description,
//             priority: task.priority,
//             startDate: task.startDate
//          }
//
//          tasksApi.updateTask({ taskId, todolistId, model }).then((res) => {
//             dispatch(changeTaskStatusAC({ todolistId, taskId, status }))
//          })
//       }
// }

// 2ой вариант с передачей таски через пропсы (Task.tsx)
export const changeTaskStatusTC = (task: DomainTask): AppThunk =>
   (dispatch) => {
      const model: UpdateTaskModel = {
         status: task.status,
         title: task.title,
         deadline: task.deadline,
         description: task.description,
         priority: task.priority,
         startDate: task.startDate
      }

      tasksApi.updateTask({ taskId: task.id, todolistId: task.todoListId, model }).then((res) => {
         dispatch(changeTaskStatusAC({ task }))
      })
   }

// // 3ий вариант с передачей лишних свойств в таске
// // (Весь объект таски передаём DomainTask и лишние свойства такие как: startDate, order, addedDate),
// // то есть бэк Димыча написан не идеально и по хорошему должен выбрасывать ошибку
// export const changeTaskStatusTC = (task: DomainTask): AppThunk =>
//    (dispatch) => {
//       tasksApi.updateTask({ taskId: task.id, todolistId: task.todoListId, model: task }).then((res) => {
//          dispatch(changeTaskStatusAC({ task }))
//       })
//    }

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
