export type Task = {
    description: string | null
    title: string
    status: number
    // status: TaskStatus
    priority: number
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
    items: Task[]
}

// Примерно такая структура создаётся на бэкэнде
export enum TaskStatus {
    notReady = 0,
    part = 1,
    done = 2,
}

// const a = TaskStatus.done // 2

export type UpdateTaskModel = {
    description: string | null
    title: string
    status: TaskStatus
    priority: number
    startDate: string | null
    deadline: string | null
}