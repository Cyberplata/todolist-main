import { instance } from "common/instance"
import type { BaseResponse } from "common/types"
import type { DomainTask, GetTasksResponse, UpdateTaskDomainModel, UpdateTaskModel } from "./tasksApi.types"

export const tasksApi = {
   getTasks(todolistId: string) {
      return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
   },
   createTask(payload: { title: string; todolistId: string }) {
      const { todolistId, title } = payload
      return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title })
   },
   deleteTask(payload: { taskId: string; todolistId: string }) {
      const { todolistId, taskId } = payload
      return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
   },
   updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
      // updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskDomainModel }) {
      const { taskId, todolistId, model } = payload
      return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
   },
}
