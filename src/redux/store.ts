import {combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from '../reducers/tasksReducer';
import {todolistsReducer} from '../reducers/todolistsReducer';


// combine reducers with Redux method
const rootReducer=combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
export type AppRootState = ReturnType<typeof rootReducer>


// create store with Redux method
const store=legacy_createStore(rootReducer)
export type StoreType=typeof store;
// @ts-ignore
window.store = store;

export default store;

