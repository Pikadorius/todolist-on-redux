import {v1} from 'uuid';
import {TodolistType} from '../API/API';

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {filter: FilterValuesType}
export let todolistId1 = v1()
export let todolistId2 = v1()
// initial state for reducer
const initialState: TodolistDomainType[] = []
// if state comes - use it, esle - use initial state
export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodoActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            let newTodolist: TodolistDomainType = {
                id: action.payload.newTodolistId,
                title: action.payload.title,
                filter: 'all',
                addedDate: new Date().getDate()+"",
                order:0,
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
        default:
            return state;
    }
}


export type TodoActionsType =
    AddTodolistACType
    | RemoveTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            newTodolistId: v1()
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





