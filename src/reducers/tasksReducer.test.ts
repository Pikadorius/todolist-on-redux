import {v1} from 'uuid';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC, defaultTask,
    removeTaskAC,
    tasksReducer, TasksStateType
} from './tasksReducer';
import {addTodolistAC, removeTodolistAC} from './todolistsReducer';

let tasks: TasksStateType;
let todoId1 = 'todolistId1'
let todoId2 ='todolistId2'

beforeEach(() => {
    tasks = {
        [todoId1]: [
            {...defaultTask, id: '1', title: "HTML&CSS", todoListId: todoId1, status: 0},
            {...defaultTask, id: '2', title: "JS", todoListId: todoId1, status: 0},

        ],
        [todoId2]: [
            {...defaultTask, id: '1', title: "Milk", todoListId: todoId2, status: 0},
            {...defaultTask, id: '2', title: "Bread", todoListId: todoId2, status: 0},
        ]
    }
})

test('reducer should delete correct task', () => {

    let newTasks = tasksReducer(tasks, removeTaskAC('1', todoId1))

    expect(newTasks[todoId1][0].title).toBe('JS')
    expect(tasks[todoId1][0].title).toBe('HTML&CSS')
    expect(newTasks[todoId1].every(t => t.id !== '1')).toBeTruthy()

    expect(newTasks[todoId1].length).toBe(1)
    expect(tasks[todoId1].length).toBe(2)
})

test('reducer should added task to correct todo', () => {

    let newTasks = tasksReducer(tasks, addTaskAC('Meat', todoId2))

    expect(newTasks[todoId2].length).toBe(3)
    expect(tasks[todoId2].length).toBe(2)
    expect(newTasks[todoId2][0].title).toBe('Meat')
    expect(newTasks[todoId2][2].id).toBeDefined()
})

test('reducer should change correct task status in correct todo', () => {

    let newTasks = tasksReducer(tasks, changeTaskStatusAC('2', 2, todoId2))

    expect(newTasks[todoId2][1].status).toBe(2)
    expect(tasks[todoId2][1].status).toBe(0)
})

test('reducer should change correct task title in correct todo', () => {

    let newTasks = tasksReducer(tasks, changeTaskTitleAC('2', 'React', todoId1))

    expect(newTasks[todoId1][1].title).toBe('React')
    expect(tasks[todoId1][1].title).toBe('JS')
})


test('reducer should added empty tasks array', () => {
    let newTasks = tasksReducer(tasks, addTodolistAC(''))
    let keys=Object.keys(newTasks)

    expect(keys.length).toBe(3)

})

test('reducer should deleted correct tasks array', () => {

    let newTasks = tasksReducer(tasks, removeTodolistAC(todoId1))

    expect(newTasks[todoId1]).toBeUndefined()
})


test('correct task should be added to correct array', () => {
    const startState = {...tasks}

    const action = addTaskAC('juice', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(2)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].status).toBe(0)
})


test('status of specified task should be changed', () => {
    const startState = {...tasks}

    const action = changeTaskStatusAC('2', 2, 'todolistId2')

    const endState = tasksReducer(startState, action)
0
    expect(endState['todolistId2'][1].status).toBe(2)
    expect(startState['todolistId2'][1].status).toBe(0)
})


test('property with todolistId should be deleted', () => {
    const startState = {...tasks}

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})