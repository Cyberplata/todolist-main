import { TaskStatus } from "common/enums"
import { ChangeEvent } from "react"
import { instance } from "../../../common/instance/instance"
import type { BaseResponse } from "common/types"
import { type GetTasksResponse, type DomainTask, type UpdateTaskModel } from "./tasksApi.types"

export const tasksApi = {
  getTasks(id: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${id}/tasks`)
  },
  createTask(payload: { title: string; todolistId: string }) {
    const { todolistId, title } = payload
    return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title })
  },
  removeTask(payload: { taskId: string; todolistId: string }) {
    const { todolistId, taskId } = payload
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  changeTaskStatus(payload: { e: ChangeEvent<HTMLInputElement>; task: DomainTask; todolistId: string }) {
    const { e, task, todolistId } = payload
    const model: UpdateTaskModel = {
      description: task.description,
      title: task.title,
      status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
      // status: e.currentTarget.checked ? 2 : 0,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }

    return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${task.id}`, model)
  },
  changeTaskTitle(payload: { title: string; task: DomainTask; todolistId: string }) {
    const { title, task, todolistId } = payload
    const model: UpdateTaskModel = {
      description: task.description,
      title,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }

    return instance.put<BaseResponse>(`todo-lists/${todolistId}/tasks/${task.id}`, model)
  },
}
