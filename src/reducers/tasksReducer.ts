import {AddTodolistACType, RemoveTodolistACType, SetTodolistsFromServerACType} from './todolistsReducer';
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType} from '../API/API';
import {Dispatch} from 'redux';

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
    [key: string]: TaskType[]
}

// initial state for reducer
const inititalState: TasksStateType = {}

// if state comes - use it, esle - use initial state
export const tasksReducer = (state = inititalState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            // create new task
            /*let task: TaskType = {
                ...defaultTask,
                todoListId: action.payload.todolistId,
                title: action.payload.title,
                id: v1()
            };*/
            return {...state, [action.payload.todolistId]: [action.payload.task, ...state[action.payload.todolistId]]}
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
            return {[action.payload.todolist.id]: [], ...state}
        }
        case 'REMOVE-TODOLIST': {
            delete state[action.payload.id]
            return {...state}
        }
        case 'SET_TODOLISTS': {
            return action.payload.data.reduce((res: TasksStateType, t) => {
                res[t.id] = []
                return res
            }, {})
        }
        case 'SET_TASKS_FOR_TODOLIST': {
            return {...state, [action.payload.todolistId]: action.payload.data}
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
    AddTodolistACType |
    RemoveTodolistACType |
    SetTodolistsFromServerACType |
    SetTasksFromServerACType

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
export const addTaskAC = (task: TaskType, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            task,
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

export type SetTasksFromServerACType = ReturnType<typeof setTasksFromServer>
export const setTasksFromServer = (todolistId: string, data: TaskType[]) => {
    return {
        type: 'SET_TASKS_FOR_TODOLIST',
        payload: {
            todolistId,
            data
        }
    } as const
}

export const fetchTasksForTodolist = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId).then(res => {
        dispatch(setTasksFromServer(todolistId, res.data.items))
    })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todolistId, taskId).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(removeTaskAC(taskId, todolistId))
        }
    })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    tasksAPI.createTask(todolistId, title).then(res => {
        dispatch(addTaskAC(res.data.item, todolistId))
    })
}