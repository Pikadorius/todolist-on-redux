import {v1} from 'uuid';
import {AddTodolistACType, RemoveTodolistACType} from './todolistsReducer';
import {TaskPriorities, TaskStatuses, TaskType} from '../API/API';

export const defaultTask: TaskType = {
    id: '',
    title: '',
    description: null,
    todoListId: '0',
    order: 0,
    status: TaskStatuses.New,
    priority: TaskPriorities.Low,
    startDate: null,
    deadline: null
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

// initial state for reducer
const inititalState: TasksStateType = {}

// if state comes - use it, esle - use initial state
export const tasksReducer = (state = inititalState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            // create new task
            let task: TaskType = {
                ...defaultTask,
                todoListId: action.payload.todolistId,
                title: action.payload.title,
                id: v1()
            };
            return {...state, [action.payload.todolistId]: [task, ...state[action.payload.todolistId]]}
        }
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.id)
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.id ? {
                    ...t,
                    status: action.payload.status
                } : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.id ? {
                    ...t,
                    title: action.payload.newTitle
                } : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {[action.payload.newTodolistId]: [], ...state}
        }
        case 'REMOVE-TODOLIST': {
            delete state[action.payload.id]
            return {...state}
        }
        default:
            return state;
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
export const changeTaskStatusAC = (id: string, status: TaskStatuses, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            id,
            status,
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
