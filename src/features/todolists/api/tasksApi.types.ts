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
