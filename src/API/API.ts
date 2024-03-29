import axios from 'axios';
import {RequestStatusType} from '../components/App/appReducer';

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<D = {}> = {
    data: D
    fieldsErrors: string[]
    resultCode: number
    messages: string[]
}


const defaultSettings = {
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        'API-KEY': 'abc137fc-ad0c-49be-975b-e12bdb8a93ad'
    },
    withCredentials: true
}

let axiosInstanse = axios.create(defaultSettings)


export const todolistsAPI = {
    getAllTodolists: () => axiosInstanse.get<TodolistType[]>('/todo-lists').then(res => res.data),
    createTodolist: (title: string) => axiosInstanse.post<ResponseType<{ item: TodolistType }>>('/todo-lists', {title}),
    deleteTodolist: (todolistId: string) => axiosInstanse.delete<ResponseType>(`/todo-lists/${todolistId}`),
    updateTodolistTitle: (todolistId: string, title: string) => axiosInstanse.put<ResponseType>(`/todo-lists/${todolistId}`, {title}),
    reorderTodolists: (todolistId: string, target: string | null) => axiosInstanse.put(`/todo-lists/${todolistId}/reorder?putAfterItemId=${target}`)
}

export type TaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    entityStatus?: RequestStatusType
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4
}

export type UpdateTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export type UpdateDomianTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}


export const tasksAPI = {
    getTasks: (todolistId: string) => axiosInstanse.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`),
    createTask: (todolistId: string, title: string) => axiosInstanse.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title}).then(res=>res.data),
    updateTask: (todolistId: string, taskId: string, task: UpdateTaskType) => axiosInstanse.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, task),
    deleteTask: (todolistId: string, taskId: string) => axiosInstanse.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`),
    reorderTasks: (todolistId: string, taskId: string, target: string | null) => axiosInstanse.put(`/todo-lists/${todolistId}/tasks/${taskId}/reorder?putAfterItemId=${target}`)
}

export type LoginResponseType = {
    id: number
    email: string
    login: string
}

export type LoginType = {
    email: string
    password: string
    rememberMe?: boolean
}

export const authAPI = {
    me: () => axiosInstanse.get<ResponseType<LoginResponseType>>('/auth/me').then(response => response.data),
    auth: (data: LoginType) => axiosInstanse.post<ResponseType<{ userID?: number }>>(`/auth/login`, data),
    logout: () => axiosInstanse.delete<ResponseType>(`/auth/login`),
}

