import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {TasksActionsType, tasksReducer} from '../reducers/tasksReducer';
import {TodoActionsType, todolistsReducer} from '../reducers/todolistsReducer';
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';


// combine reducers with Redux method
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// type of state
export type AppRootState = ReturnType<typeof rootReducer>

const enchaced=applyMiddleware(thunkMiddleware)
// create store with Redux method
const store = legacy_createStore(rootReducer, enchaced)

// type of dispatch
export type ActionsType = TodoActionsType & TasksActionsType


//explanation from redux-tookit docs
export type AppDispatchType = ThunkDispatch<AppRootState, unknown, ActionsType>

// @ts-ignore
window.store = store;

export default store;

