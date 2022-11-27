import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {TaskType} from '../TodoList';

const inititalState:TasksStateType = {
    ['firstToDo']: [
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true}
],
    ['secondToDo']: [
    {id: v1(), title: "Milk", isDone: true},
    {id: v1(), title: "React Book", isDone: true}
]
}

export const tasksReducer = (state: TasksStateType=inititalState, action: TasksActionsType) => {
    switch (action.type) {
        case 'ADD-TASK': {
            let task:TaskType = {id: v1(), title: action.payload.title, isDone: false};
            //достанем нужный массив по todolistId:
            let todolistTasks = state[action.payload.todolistId];
            // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
            state[action.payload.todolistId] = [task, ...todolistTasks];
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            return {...state}
        }
        case 'REMOVE-TASK': {
            //достанем нужный массив по todolistId:
            let todolistTasks = state[action.payload.todolistId];
            // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
            state[action.payload.todolistId] = todolistTasks.filter(t => t.id !== action.payload.id);
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            return {...state}
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.payload.todolistId];
            // найдём нужную таску:
            let task = todolistTasks.find(t => t.id === action.payload.id);
            //изменим таску, если она нашлась
            if (task) {
                task.isDone = action.payload.isDone;
                // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
                return {...state}
            } else return state;
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.payload.todolistId];
            // найдём нужную таску:
            let task = todolistTasks.find(t => t.id === action.payload.id);
            //изменим таску, если она нашлась
            if (task) {
                task.title = action.payload.newTitle;
                // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
                return {...state}
            } else return state;
        }
        case 'ADD-TASKS-FOR-TODOLIST': {
            debugger
            return {[action.payload.newTodolistId]: [], ...state}
        }
        case 'DELETE-TASKS': {
            debugger
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
    AddTasksToTodolistACType |
    DeleteTasksFromTodolistACType

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

type AddTasksToTodolistACType = ReturnType<typeof addTasksToTodolistAC>
export const addTasksToTodolistAC = (newTodolistId: string) => {
    return {
        type: 'ADD-TASKS-FOR-TODOLIST',
        payload: {
            newTodolistId
        }
    } as const
}

type DeleteTasksFromTodolistACType = ReturnType<typeof deleteTasksFromTodolistAC>
export const deleteTasksFromTodolistAC = (id: string) => {
    return {
        type: 'DELETE-TASKS',
        payload: {
            id
        }
    } as const
}