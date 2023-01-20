import {v1} from "uuid";
import {
    addTodolistAC, changeTodolistEntityStatus,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodolistFromServer, TodolistDomainType,
    todolistsReducer
} from "../components/Features/Todolists/todolistsReducer";
import {TodolistType} from '../API/API';

let todolists: TodolistDomainType[]
let todolistId1 = v1()
let todolistId2 = v1()

beforeEach(() => {

    todolists = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: '', entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: '', entityStatus: 'idle'}
    ]
})

test('reducer should remove correct todolist', () => {
    let newTodos = todolistsReducer(todolists, removeTodolistAC(todolistId1))

    expect(newTodos.length).toBe(1)
    expect(newTodos[0].title).toBe("What to buy")
})

test('reducer should add new todolist', () => {

    let title = 'What to do:'
    let newTodos = todolistsReducer(todolists, addTodolistAC({title, id: '1', addedDate: "1", order: 0}))

    expect(newTodos.length).toBe(3)
    expect(newTodos[0].title).toBe(title)
    expect(newTodos[0].filter).toBe('all')
})

test('reducer should change correct todolist filter', () => {
    let newTodos = todolistsReducer(todolists, changeTodolistFilterAC("active", todolistId1))

    expect(newTodos[0].filter).toBe('active')
    expect(newTodos[1].filter).toBe('all')

    expect(todolists[0].filter).toBe('all')
    expect(todolists[1].filter).toBe('all')
})

test('reducer should change correct todolist title', () => {
    let newTodos = todolistsReducer(todolists, changeTodolistTitleAC(todolistId1, 'test'))

    expect(newTodos[0].title).toBe('test')
    expect(newTodos[1].title).toBe('What to buy')

    expect(todolists[0].title).toBe('What to learn')
    expect(todolists[1].title).toBe('What to buy')
})

test('reducer should change correct todolist entityStatus', () => {
    let newTodos = todolistsReducer(todolists, changeTodolistEntityStatus(todolistId1, 'loading'))

    expect(newTodos[0].entityStatus).toBe('loading')
    expect(newTodos[1].entityStatus).toBe('idle')

    expect(todolists[0].entityStatus).toBe('idle')
    expect(todolists[1].entityStatus).toBe('idle')
})

test('reducer should set todolists', () => {
    const newTodo: TodolistType = {
        id: 'todolistId3',
        title: 'Test',
        addedDate: '0',
        order: 0
    }

    let newData = todolistsReducer([], setTodolistFromServer([newTodo]))

    expect(newData.length).toBe(1)
    expect(newData[0].filter).toBe('all')
})