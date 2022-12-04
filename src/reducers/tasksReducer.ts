import {v1} from 'uuid';
import {TaskType} from '../TodoList';
import {AddTodolistACType, RemoveTodolistACType, todolistId1, todolistId2} from './todolistsReducer';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

// initial state for reducer
const inititalState = {
    [todolistId1]: [
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true}
] as TaskType[],
    [todolistId2]: [
    {id: v1(), title: "Milk", isDone: true},
    {id: v1(), title: "React Book", isDone: true}
] as TaskType[]
}

export type InititalStateType = typeof inititalState
// if state comes - use it, esle - use initial state
export const tasksReducer = (state: InititalStateType=inititalState, action: TasksActionsType):InititalStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            // create new task
            let task:TaskType = {id: v1(), title: action.payload.title, isDone: false};
            // find rigth tasks
            let todolistTasks = state[action.payload.todolistId];
            // rewrite tasks with new task
            state[action.payload.todolistId] = [task, ...todolistTasks];
            // return changed tasks
            return {...state}
        }
        case 'REMOVE-TASK': {
            // find rigth tasks
            let todolistTasks = state[action.payload.todolistId];
            // rewrite it with filtered version
            state[action.payload.todolistId] = todolistTasks.filter(t => t.id !== action.payload.id);
            // return changed tasks
            return {...state}
        }
        case 'CHANGE-TASK-STATUS': {
            // find rigth tasks
            let todolistTasks = state[action.payload.todolistId];
            // find right task
            let task = todolistTasks.find(t => t.id === action.payload.id);
            // change task if you can find it
            if (task) {
                task.isDone = action.payload.isDone;
                // return changed task
                return {...state}
            } else return state;
        }
        case 'CHANGE-TASK-TITLE': {
            // find rigth tasks
            let todolistTasks = state[action.payload.todolistId];
            // find right task
            let task = todolistTasks.find(t => t.id === action.payload.id);
            // change task if you can find it
            if (task) {
                task.title = action.payload.newTitle;
                // return changed task
                return {...state}
            } else return state;
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
