import {v1} from 'uuid';
import {addTodolistAC, removeTodolistAC, TodolistDomainType, todolistsReducer} from './todolistsReducer';
import {defaultTask, tasksReducer, TasksStateType} from './tasksReducer';

let todolists: TodolistDomainType[]
let tasks: TasksStateType
let todo1 = 'todolist1'
let todo2 = 'todolist2'

beforeEach(() => {
    todolists = [
        {id: todo1, title: "What to learn", filter: "all", order: 0, addedDate: ''},
        {id: todo2, title: "What to buy", filter: "all", order: 0, addedDate: ''}
    ]

    tasks = {
        [todo1]: [
            {...defaultTask, id: '1', title: "HTML&CSS", todoListId: todo1, status: 0},
            {...defaultTask, id: '2', title: "JS", todoListId: todo1, status: 0},

        ],
        [todo2]: [
            {...defaultTask, id: '1', title: "Milk", todoListId: todo2, status: 0},
            {...defaultTask, id: '2', title: "Bread", todoListId: todo2, status: 0},
        ]
    }
})

test('reducers should add new todolist and tasks', () => {

    let newTodo = todolistsReducer(todolists, addTodolistAC('Test'))
    expect(newTodo.length).toBe(3)

})

test('reducers should delete correct todolist and tasks', () => {

    let newTodo = todolistsReducer(todolists, removeTodolistAC(todo1))
    let newTasks = tasksReducer(tasks, removeTodolistAC(todo1))
    let keys = Object.keys(newTasks)

    expect(newTodo.length).toBe(1)
    expect(keys.length).toBe(1)
    expect(newTodo[0].id).toBe(todo2)
    expect(keys[0]).toBe(todo2)

})