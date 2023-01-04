import axios from 'axios';
import {TaskType} from '../TodoList';

let axiosInstanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        'API-KEY': 'abc137fc-ad0c-49be-975b-e12bdb8a93ad'
    },
    withCredentials: true
})


export const todolistsAPI = {
    getAllTodolists: () => axiosInstanse.get('/todo-lists'),
    addNewTodolist: (title: string) => axiosInstanse.post('/todo-lists', {title}),
    deleteTodolist: (todolistId: string) => axiosInstanse.delete(`/todo-lists/${todolistId}`),
    updateTodolistTitle: (todolistId: string, newTitle: string) => axiosInstanse.put(`/todo-lists/${todolistId}`, {newTitle}),
    reorderTodolists: (todolistId: string, target: string | null) => axiosInstanse.put(`/todo-lists/${todolistId}/reorder?putAfterItemId=${target}`)
}

export const tasksAPI = {
    getTasks: (todolistId: string) => axiosInstanse.get(`/todo-lists/${todolistId}/tasks`),
    addNewTask: (todolistId: string, newTaskTitle: string) => axiosInstanse.post(`/todo-lists/${todolistId}/tasks`, {newTaskTitle}),
    updateTask: (todolistId: string, taskId: string, task: TaskType) => axiosInstanse.put(`/todo-lists/${todolistId}/tasks/${taskId}`, {task}),
    deleteTask: (todolistId: string, taskId: string) => axiosInstanse.put(`/todo-lists/${todolistId}/tasks/${taskId}`),
    reorderTasks: (todolistId: string, taskId: string, target: string | null) => axiosInstanse.put(`/todo-lists/${todolistId}/tasks/${taskId}/reorder?putAfterItemId=${target}`)
}

export const authAPI = {
    me: () => axiosInstanse.get('/auth/me').then(response=>response.data),
    authorize: ()=>axiosInstanse.post(`/auth/login`)
}