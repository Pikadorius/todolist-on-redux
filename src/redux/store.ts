import {combineReducers, legacy_createStore} from 'redux';
import {TasksActionsType, tasksReducer} from '../reducers/tasksReducer';
import {TodoActionsType, todolistsReducer} from '../reducers/todolistsReducer';

// combine types of actions
export type ActionsType = TasksActionsType | TodoActionsType

// combine reducers with Redux method
const reducers=combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// create store with Redux method
const store=legacy_createStore(reducers)

export default store;