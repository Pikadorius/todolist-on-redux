import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../API/API';
import {Dispatch} from 'redux';

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & { filter: FilterValuesType }
export let todolistId1 = v1()
export let todolistId2 = v1()
// initial state for reducer
const initialState: TodolistDomainType[] = []
// if state comes - use it, esle - use initial state
export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodoActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            let newTodolist: TodolistDomainType = {
                filter: 'all',
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
            return action.payload.data.map(t => ({...t, filter: 'all'}))
        }
        default:
            return state;
    }
}


export type TodoActionsType =
    AddTodolistACType
    | RemoveTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType
    | SetTodolistsFromServerACType

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolist
        }
    } as const
}

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId,
            title
        }
    } as const
}

type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            filter,
            id
        }
    } as const
}

export type SetTodolistsFromServerACType = ReturnType<typeof setTodolistFromServer>
export const setTodolistFromServer = (data: TodolistType[]) => {
    return {
        type: 'SET_TODOLISTS',
        payload: {
            data
        }
    } as const
}

export const fetchTodolists = () => (dispatch: Dispatch) => {
    todolistsAPI.getAllTodolists().then(res => {
        dispatch(setTodolistFromServer(res))
    })
}


export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(todolistId).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(removeTodolistAC(todolistId))
        }
    })
}


export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(addTodolistAC(res.data.data.item))
        }
    })
}

export const changeTodolistTC = (todolistId: string, title: string) => (dispatch:Dispatch)=> {
    todolistsAPI.updateTodolistTitle(todolistId, title).then(res=>{
        if (res.data.resultCode===0) {
            dispatch(changeTodolistTitleAC(todolistId,title))
        }
    })
}