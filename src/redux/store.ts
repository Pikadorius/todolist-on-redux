import {combineReducers, legacy_createStore} from 'redux';
import {TasksActionsType, tasksReducer} from '../reducers/tasksReducer';
import {TodoActionsType, todolistsReducer} from '../reducers/todolistsReducer';

export type ActionsType = TasksActionsType | TodoActionsType

const reducers=combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
const store=legacy_createStore(reducers)

export default store;