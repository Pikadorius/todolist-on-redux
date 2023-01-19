import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import {v1} from 'uuid'
import {defaultTask, tasksReducer, TasksStateType} from './reducers/tasksReducer';
import {TodolistDomainType, todolistsReducer} from './reducers/todolistsReducer';
import {AppRootState} from './store';
import {appReducer} from './reducers/appReducer';
import thunkMiddleware from 'redux-thunk';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState: AppRootState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', order: 0, addedDate: '1', entityStatus: 'loading'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', order: 1, addedDate: '2', entityStatus: 'idle'}
    ],
    tasks: {
        ['todolistId1']: [
            {...defaultTask, id: v1(), title: 'HTML&CSS', todoListId: 'todolistId1'},
            {...defaultTask, id: v1(), title: 'JS', todoListId: 'todolistId1'}
        ],
        ['todolistId2']: [
            {...defaultTask, id: v1(), title: 'Milk', todoListId: 'todolistId2'},
            {...defaultTask, id: v1(), title: 'React Book', todoListId: 'todolistId2'}
        ]
    } as TasksStateType,
    app: {
        status: 'idle',
        error: null
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState, applyMiddleware(thunkMiddleware))

export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
}