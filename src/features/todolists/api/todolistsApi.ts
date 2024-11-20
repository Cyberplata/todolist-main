import {instance} from "../../../common/instance/instance";
import type {Response, Todolist} from "./todolistsApi.types";


export const todolistsApi = {
    getTodolists() {
        return instance.get<Todolist[]>('todo-lists')
    },
    updateTodolist(payload: {id: string, title: string}) {
        const { title, id } = payload
        return instance.put<Response<{ item: Todolist }>>(`todo-lists/${id}`, {title})
    },
    createTodolist(title: string = '') {
        return instance.post<Response<{ item: Todolist }>>('todo-lists', {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<Response>(`todo-lists/${id}`)
    },
}