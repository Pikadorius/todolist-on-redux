import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../../../API/API';
import {Dispatch} from 'redux';
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from '../../App/appReducer';
import {AxiosError} from 'axios';
import {handleAppError, handleNetworkError} from '../../../Utils/utils';

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & { filter: FilterValuesType, entityStatus: RequestStatusType }
export let todolistId1 = v1()
export let todolistId2 = v1()

// initial state for reducer
const initialState: TodolistDomainType[] = []
// if state comes - use it, esle - use initial state
export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodoActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            let newTodolist: TodolistDomainType = {
                filter: 'all', entityStatus: 'idle',
                ...action.payload.todolist
            };
            return [newTodolist, ...state];
        }
        case 'REMOVE-TODOLIST': {
            return state.filter((t => t.id !== action.payload.id))
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(t => t.id === action.payload.todolistId ? {...t, title: action.payload.title} : t)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(t => t.id === action.payload.id ? {...t, filter: action.payload.filter} : t)
        }
        case 'SET_TODOLISTS': {
            return action.payload.data.map(t => ({...t, filter: 'all', entityStatus: 'idle'}))
        }
        case 'CHANGE_ENTITY_STATUS': {
            return state.map(t => t.id === action.payload.todoId ? {...t, entityStatus: action.payload.status} : t)
        }
        default:
            return state;
    }
}

export type TodoActionsType =
    AddTodolistACType |
    RemoveTodolistACType |
    ChangeTodolistTitleACType |
    ChangeTodolistFilterACType |
    SetTodolistsFromServerACType |
    ChangeTodoEntityStatusType

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', payload: {todolist}} as const)

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', payload: {id}} as const)

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {todolistId, title}
} as const)

type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {filter, id}
} as const)

export type SetTodolistsFromServerACType = ReturnType<typeof setTodolistFromServer>
export const setTodolistFromServer = (data: TodolistType[]) => ({type: 'SET_TODOLISTS', payload: {data}} as const)

export type ChangeTodoEntityStatusType = ReturnType<typeof changeTodolistEntityStatus>
export const changeTodolistEntityStatus = (todoId: string, status: RequestStatusType) => ({
    type: "CHANGE_ENTITY_STATUS",
    payload: {todoId, status}
} as const)


export const fetchTodolists = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getAllTodolists().then(res => {
        dispatch(setTodolistFromServer(res))
        dispatch(setAppStatusAC('succeeded'))
    }).catch((e: AxiosError<{ message: string }>) => {
        handleNetworkError(dispatch, e)
    })
}

export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatus(todolistId, 'loading'))
    todolistsAPI.deleteTodolist(todolistId).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleAppError(dispatch, todolistId, res.data)
        }
    }).catch((e) => {
        handleNetworkError(dispatch, e)
    })
}

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(addTodolistAC(res.data.data.item))
            setAppStatusAC('succeeded')
        } else {
            handleAppError(dispatch, todolistId1, res.data)
        }
    }).catch((e)=>{
        handleNetworkError(dispatch, e)
    })
}

export const changeTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatus(todolistId, 'loading'))
    todolistsAPI.updateTodolistTitle(todolistId, title).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(changeTodolistTitleAC(todolistId, title))
            dispatch(changeTodolistEntityStatus(todolistId, 'succeeded'))
            dispatch(setAppStatusAC('succeeded'))
        }
    }).catch((e)=>{
        handleNetworkError(dispatch, e)
    })
}