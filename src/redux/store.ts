import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {TasksActionsType, tasksReducer} from '../reducers/tasksReducer';
import {TodoActionsType, todolistsReducer} from '../reducers/todolistsReducer';
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';


// combine reducers with Redux method
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// type of state
export type AppRootState = ReturnType<typeof rootReducer>

const enchanced=applyMiddleware(thunkMiddleware)
// create store with Redux method
const store = legacy_createStore(rootReducer, enchanced)


export type ActionsType = TodoActionsType & TasksActionsType


//explanation from redux-tookit docs
export type AppDispatchType = ThunkDispatch<AppRootState, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppDispatchType>()

// @ts-ignore
window.store = store;

export default store;

