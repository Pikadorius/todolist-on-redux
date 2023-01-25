import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {TasksActionsType, tasksReducer} from '../components/Features/Todolists/tasksReducer';
import {TodoActionsType, todolistsReducer} from '../components/Features/Todolists/todolistsReducer';
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {appReducer} from '../components/App/appReducer';
import {authReducer} from '../components/Features/Login/authReducer';


// combine reducers with Redux method
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
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

