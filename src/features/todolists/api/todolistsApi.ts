import { instance } from "common/instance"
import type { BaseResponse } from "common/types"
import type { Todolist } from "./todolistsApi.types"

export const todolistsApi = {
   getTodolists() {
      // 3
      let date = instance.get<Todolist[]>("todo-lists")
      // 4
      return date
   },
   updateTodolist(payload: { id: string; title: string }) {
      const { title, id } = payload
      return instance.put<BaseResponse>(`todo-lists/${id}`, { title })
   },
   createTodolist(title: string = "") {
      return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", { title })
   },
   deleteTodolist(id: string) {
      return instance.delete<BaseResponse>(`todo-lists/${id}`)
   },
}