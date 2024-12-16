import type { AppDispatch, AppThunk, RootState } from "app/store"
import type { AddTodolistActionType, RemoveTodolistActionType } from "features/todolists/model/todolists-reducer"
import { type DomainTask, tasksApi, type UpdateTaskModel } from "../api"
import type { UpdateTaskDomainModel } from "../api/tasksApi.types"


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
      // case "UPDATE-TASK": { // props task
      //    const { todoListId, id, status, title } = action.payload.task
      //    return {
      //       ...state,
      //       [todoListId]: state[todoListId].map((t) =>
      //          t.id === id ?
      //             { ...t, status, title }
      //             : t
      //       )
      //    }
      // }
      case "UPDATE-TASK": { // getState()
         const { todolistId, taskId, domainModel } = action.payload
         return {
            ...state,
            [todolistId]: state[todolistId].map((t) =>
               t.id === taskId
                  ? { ...t, ...domainModel } // обновляем только изменённые поля
                  : t
            )
         }
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
         const newTask = action.payload.task
         return {
            ...state,
            [newTask.todoListId]: [newTask, ...state[newTask.todoListId]]
         }
      }
      case "CHANGE-TASK-STATUS": {
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
         const { todoListId, id, title } = action.payload.task
         return {
            ...state,
            [todoListId]: state[todoListId].map((el) =>
               el.id === id ? { ...el, title: title } : el
            )
         }
      }
      case "ADD-TODOLIST": {
         debugger
         return {
            ...state,
            // [action.payload.newTodolistId]: []
            [action.payload.todolist.id]: []
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

// export const changeTaskTitleAC = (payload: { todolistId: string; taskId: string; title: string }) => {
export const changeTaskTitleAC = (payload: { task: DomainTask }) => {
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

// export const updateTaskAC = (payload: { task: DomainTask }) => { // props task
export const updateTaskAC = (payload: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }) => { // getState()
   return {
      type: "UPDATE-TASK",
      payload
   } as const
}


// Thunks
// export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
export const fetchTasksTC = (todolistId: string): AppThunk =>
   (dispatch) => {
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

// // 1 вариант с созданием модели внутри TC и из getState достаём таску
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

      tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, model }).then((res) => {
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

// changeTaskTitleTC через props task
export const changeTaskTitleTC = (task: DomainTask): AppThunk =>
   (dispatch) => {
      const model: UpdateTaskModel = {
         status: task.status,
         title: task.title,
         deadline: task.deadline,
         description: task.description,
         priority: task.priority,
         startDate: task.startDate
      }
      tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, model }).then((res) => {
         dispatch(changeTaskTitleAC({ task }))
      })
   }


// updateTaskTC

// // 1. Вариант через props task из Task.tsx
// export const updateTaskTC = (task: DomainTask): AppThunk =>
//    (dispatch) => {
//       const model: UpdateTaskModel = {
//          status: task.status,
//          title: task.title,
//          deadline: task.deadline,
//          description: task.description,
//          priority: task.priority,
//          startDate: task.startDate
//       }
//       tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, model }).then((res) => {
//          dispatch(updateTaskAC({ task }))
//       })
//    }

// 2. Вариант через getState()
export const updateTaskTC =
   (arg: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }) =>
      (dispatch: AppDispatch, getState: () => RootState) => {
         const { todolistId, taskId, domainModel } = arg

         const allTasksFromState = getState().tasks
         const tasksForCurrentTodolist = allTasksFromState[todolistId]
         const task = tasksForCurrentTodolist.find((t) => t.id === taskId)

         // // Достаём текущую таску из стейта
         // const currentTask = getState().tasks[todolistId]?.find(task => task.id === taskId)

         if (task) {
            // Создаем обновлённую модель задачи, объединяя текущую таску с переданным domainModel
            const model: UpdateTaskModel = {
               ...task, // берём все текущие поля из задачи
               ...domainModel // переопределяем (перезаписываем) поля, которые есть в domainModel
            }
            tasksApi.updateTask({ todolistId, taskId, model }).then((res) => {
               dispatch(updateTaskAC({ todolistId, taskId, domainModel }))
            })
         }
      }

// Запись через ReturnType
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type setTasksActionType = ReturnType<typeof setTasksAC>
export type updateTaskActionType = ReturnType<typeof updateTaskAC>

export type TasksReducerActionsType =
   | RemoveTaskActionType
   | AddTaskActionType
   | ChangeTaskStatusActionType
   | ChangeTaskTitleActionType
   | AddTodolistActionType
   | RemoveTodolistActionType
   | setTasksActionType
   | updateTaskActionType
