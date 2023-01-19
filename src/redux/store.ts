import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {TasksActionsType, tasksReducer} from './reducers/tasksReducer';
import {TodoActionsType, todolistsReducer} from './reducers/todolistsReducer';
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {appReducer} from './reducers/appReducer';


// combine reducers with Redux method
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})
// type of state
export type AppRootState = ReturnType<typeof rootReducer>

// middleWare for thunk
const enchanced=applyMiddleware(thunkMiddleware)
// create store with Redux method
const store = legacy_createStore(rootReducer, enchanced)



//explanation from redux-tookit docs
export type AppDispatchType = ThunkDispatch<AppRootState, any, AnyAction>
// custom useDispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()

// custom useSelector
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector

// @ts-ignore
window.store = store;

export default store;

