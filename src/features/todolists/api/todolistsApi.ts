import axios from 'axios'
import {options, token} from "../../../app/AppHttpRequests";
import type {Response, Todolist} from "./todolistsApi.types";


export const todolistsApi = {
    getTodolists() {
        const promise = axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return promise
    },
    updateTodolist(payload: {id: string, title: string}) {
        const { title, id } = payload
        const promise = axios.put<Response<{
            item: Todolist
        }>>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {title},
            options
        )
        return promise
    },
    createTodolist(title: string = '') {
        const promise = axios.post<Response<{
            item: Todolist
        }>>(
            'https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title},
            options
        )
        return promise
    },
    deleteTodolist(id: string) {
        const promise = axios.delete<Response>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            options
        )
        return promise
    },
}