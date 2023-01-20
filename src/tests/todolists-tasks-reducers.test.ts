import {
    addTodolistAC,
    removeTodolistAC,
    setTodolistFromServer,
    TodolistDomainType,
    todolistsReducer
} from '../components/Features/Todolists/todolistsReducer';
import {defaultTask, tasksReducer, TasksStateType} from '../components/Features/Todolists/tasksReducer';

let todolists: TodolistDomainType[]
let tasks: TasksStateType
let todo1 = 'todolist1'
let todo2 = 'todolist2'

beforeEach(() => {
    todolists = [
        {id: todo1, title: "What to learn", filter: "all", order: 0, addedDate: '', entityStatus: 'idle'},
        {id: todo2, title: "What to buy", filter: "all", order: 0, addedDate: '', entityStatus: 'idle'}
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

    let newTodo = todolistsReducer(todolists, addTodolistAC({title:'Test',order:1, addedDate:'1', id:'1'}))
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

test('reducer should set todolists and empty tasks', ()=>{
    let newTodo=todolistsReducer([],setTodolistFromServer(todolists))
    let newTasks=tasksReducer({}, setTodolistFromServer(todolists))

    let keys=Object.keys(newTasks)

    expect(newTodo.length).toBe(2)
    expect(keys.length).toBe(2)
    expect(keys[0]).toBe('todolist1')
    expect(newTasks['todolist1'].length).toBe(0)
    expect(newTasks['todolist2'].length).toBe(0)
})
