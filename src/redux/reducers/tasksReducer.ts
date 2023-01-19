import {AddTodolistACType, RemoveTodolistACType, SetTodolistsFromServerACType} from './todolistsReducer';
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateDomianTaskType, UpdateTaskType} from '../../API/API';
import {Dispatch} from 'redux';
import {AppRootState} from '../store';
import {throws} from 'assert';
import {setAppErrorAC, setAppStatusAC} from './appReducer';

export const defaultTask: TaskType = {
    id: '',
    title: '',
    description: '',
    todoListId: '0',
    order: 0,
    status: TaskStatuses.New,
    priority: TaskPriorities.Low,
    startDate: '',
    deadline: ''
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
            return {...state, [action.payload.todolistId]: [action.payload.task, ...state[action.payload.todolistId]]}
        }
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.id)
            }
        }
        case 'UPDATE_TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.id ? {...t, ...action.payload.task} : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {[action.payload.todolist.id]: [], ...state}
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.payload.id]
            return {...copyState}
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
    ChangeTaskACType |
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

type ChangeTaskACType = ReturnType<typeof changeTaskAC>
export const changeTaskAC = (id: string, task: UpdateDomianTaskType, todolistId: string) => {
    return {
        type: 'UPDATE_TASK',
        payload: {
            id,
            task,
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
    dispatch(setAppStatusAC('loading'))
    tasksAPI.getTasks(todolistId).then(res => {
        dispatch(setTasksFromServer(todolistId, res.data.items))
        dispatch(setAppStatusAC('succeeded'))
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
    dispatch(setAppStatusAC('loading'))
    tasksAPI.createTask(todolistId, title).then(res => {
        if (res.resultCode === 0) {
            dispatch(addTaskAC(res.data.item, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            dispatch(setAppErrorAC(res.messages[0]))
            dispatch(setAppStatusAC('failed'))
        }

    })
}

// variant with getState inside thunk
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomianTaskType) => (dispatch: Dispatch, getState: () => AppRootState) => {

    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
        console.warn('Task not found!')
        return;
    }

    const model: UpdateTaskType = {
        title: task.title,
        status: task.status,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        ...domainModel
    }
    tasksAPI.updateTask(todolistId, taskId, model).then(res => {
        dispatch(changeTaskAC(taskId, res.data.data.item, todolistId))
    })
}


/*
export const updateTaskTC2 = (todolistId: string, taskId: string, domainModel: UpdateDomianTaskType, task: TaskType) => (dispatch: Dispatch, getState: () => AppRootState) => {

    const model: UpdateTaskType = {
        title: task.title,
        status: task.status,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        ...domainModel
    }
    tasksAPI.updateTask(todolistId, taskId, model).then(res => {
        dispatch(changeTaskAC(taskId, res.data.data.item, todolistId))
    })
}
*/
