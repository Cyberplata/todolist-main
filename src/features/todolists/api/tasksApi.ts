import axios from 'axios'
import {ChangeEvent} from "react";
import {options, token} from "../../../app/AppHttpRequests";
import {type GetTasksResponse, type Task, TaskStatus, type UpdateTaskModel} from "./tasksApi.types";
import type {Response, Todolist} from "./todolistsApi.types";


export const tasksApi = {
    getTasks(id: string) {
        const promise = axios.get<GetTasksResponse>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}/tasks`,
            options
        )
        return promise
    },
    createTask(payload: { title: string, todolistId: string }) {
        const {todolistId, title} = payload
        const promise = axios.post<Response<{
            item: Task
        }>>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
            {title},
            options
        )
        return promise
    },
    removeTask(payload: { taskId: string, todolistId: string }) {
        const {todolistId, taskId} = payload
        const promise = axios.delete<Response>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
            options
        )
        return promise
    },
    changeTaskStatus(payload: { e: ChangeEvent<HTMLInputElement>, task: Task, todolistId: string }) {
        const {e, task, todolistId} = payload
        const model: UpdateTaskModel = {
            description: task.description,
            title: task.title,
            status: e.currentTarget.checked ? TaskStatus.done : TaskStatus.notReady,
            // status: e.currentTarget.checked ? 2 : 0,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }

        const promise = axios.put<Response<{
            item: Task
        }>>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${task.id}`,
            model,
            options
        )
        return promise
    },
    changeTaskTitle(payload: { title: string, task: Task, todolistId: string }) {
        const {title, task, todolistId} = payload
        const model: UpdateTaskModel = {
            description: task.description,
            title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }

        const promise = axios.put<Response<{
            item: Task
        }>>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${task.id}`,
            model,
            options
        )
        return promise
    }
}