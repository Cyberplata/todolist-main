import { TaskPriority, TaskStatus } from "features/todolists/lib/enums"

export type DomainTask = {
   description: string | null
   title: string
   status: TaskStatus
   priority: TaskPriority
   startDate: string | null
   deadline: string | null
   id: string
   todoListId: string
   order: number
   addedDate: string
}

export type GetTasksResponse = {
   totalCount: number
   error: string
   items: DomainTask[]
}

export type UpdateTaskModel = {
   description: string | null
   title: string
   status: TaskStatus
   priority: TaskPriority
   startDate: string | null
   deadline: string | null
}

// UpdateTaskDomainModel это такой же тип как и UpdateTaskModel,
// только все свойства в нем являются необязательными
// Для способа через props task Task.tsx не нужно, только для getState()
// export type UpdateTaskDomainModel = {
//    title?: string
//    description?: string | null
//    status?: TaskStatus
//    priority?: TaskPriority
//    startDate?: string | null
//    deadline?: string | null
// }

// Partial используется для создания нового типа данных на основе существующего типа, делая все его свойства необязательными
export type UpdateTaskDomainModel = Partial<UpdateTaskModel>
