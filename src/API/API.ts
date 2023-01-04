import axios from 'axios';

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<D> = {
    data: D
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
    deleteTodolist: (todolistId: string) => axiosInstanse.delete<ResponseType<{}>>(`/todo-lists/${todolistId}`),
    updateTodolistTitle: (todolistId: string, title: string) => axiosInstanse.put<ResponseType<{}>>(`/todo-lists/${todolistId}`, {title}),
    reorderTodolists: (todolistId: string, target: string | null) => axiosInstanse.put(`/todo-lists/${todolistId}/reorder?putAfterItemId=${target}`)
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type TaskResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}


export const tasksAPI = {
    getTasks: (todolistId: string) => axiosInstanse.get<TaskResponseType>(`/todo-lists/${todolistId}/tasks`),
    createTask: (todolistId: string, newTaskTitle: string) => axiosInstanse.post(`/todo-lists/${todolistId}/tasks`, {newTaskTitle}),
    updateTask: (todolistId: string, taskId: string, task: TaskType) => axiosInstanse.put(`/todo-lists/${todolistId}/tasks/${taskId}`, {task}),
    deleteTask: (todolistId: string, taskId: string) => axiosInstanse.put(`/todo-lists/${todolistId}/tasks/${taskId}`),
    reorderTasks: (todolistId: string, taskId: string, target: string | null) => axiosInstanse.put(`/todo-lists/${todolistId}/tasks/${taskId}/reorder?putAfterItemId=${target}`)
}

export const authAPI = {
    me: () => axiosInstanse.get('/auth/me').then(response => response.data),
    authorize: () => axiosInstanse.post(`/auth/login`)
}