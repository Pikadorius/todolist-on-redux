import {FilterValuesType, TodolistType} from '../App';

const initialState: TodolistType[] = [
    {id: 'firstToDo', title: "What to learn", filter: "all"},
    {id: 'secondToDo', title: "What to buy", filter: "all"}
]

export const todolistsReducer = (state: TodolistType[]=initialState, action: TodoActionsType) => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            debugger
            let newTodolist: TodolistType = {
                id: action.payload.newTodolistId,
                title: action.payload.title,
                filter: 'all'
            };
            return [newTodolist, ...state];
        }
        case 'REMOVE-TODOLIST': {
            debugger
            return state.filter((t => t.id !== action.payload.id))
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.payload.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.payload.title;
                return [...state]
            } else return state;
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(tl => tl.id === action.payload.id);
            if (todolist) {
                todolist.filter = action.payload.filter;
                return [...state]
            } else return state;
        }
        default:
            return state
    }
}


export type TodoActionsType =
    AddTodolistACType
    | RemoveTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType

type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string, newTodolistId: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            newTodolistId
        }
    } as const
}

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
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





