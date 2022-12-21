import {v1} from 'uuid';
import {TaskType} from '../TodoList';
import {AddTodolistACType, RemoveTodolistACType, todolistId1, todolistId2} from './todolistsReducer';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

// initial state for reducer
const inititalState:TasksStateType = {}

export type InititalStateType = typeof inititalState
// if state comes - use it, esle - use initial state
export const tasksReducer = (state: InititalStateType=inititalState, action: TasksActionsType):InititalStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            // create new task
            let task:TaskType = {id: v1(), title: action.payload.title, isDone: false};
            return {...state, [action.payload.todolistId]:[task,...state[action.payload.todolistId]]}
        }
        case 'REMOVE-TASK': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.id)}
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t=>t.id===action.payload.id? {...t, isDone: action.payload.isDone}:t)}
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t=>t.id===action.payload.id? {...t, title: action.payload.newTitle}:t)}
        }
        case 'ADD-TODOLIST': {
            return {[action.payload.newTodolistId]: [], ...state}
        }
        case 'REMOVE-TODOLIST': {
            delete state[action.payload.id]
            return {...state}
        }
        default: return state;
    }
}

export type TasksActionsType =
    RemoveTaskACType |
    AddTaskACType |
    ChangeTaskStatusACType |
    ChangeTaskTitleACType |
    AddTodolistACType
    | RemoveTodolistACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id,
            todolistId
        }
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todolistId
        }
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            id,
            isDone,
            todolistId
        }
    } as const
}

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            id,
            newTitle,
            todolistId
        }
    } as const
}
