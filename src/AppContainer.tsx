import App from './App';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {AppRootState} from './redux/store';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC, InititalStateType,
    removeTaskAC
} from './reducers/tasksReducer';
import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC, TodolistType
} from './reducers/todolistsReducer';

type MapStateType = {
    todolists: TodolistType[]
    tasks: InititalStateType
}
const mapStateToProps = (state: AppRootState): MapStateType => {
    return {
        todolists: state.todolists,
        tasks: state.tasks
    }
}

type MapDispacthType = {
    removeTask: (id: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    addTodolist: (title: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, title: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
}
const mapDispacthToProps = (dispatch: Dispatch): MapDispacthType => {
    return {
        removeTask: (id: string, todolistId: string) => dispatch(removeTaskAC(id, todolistId)),
        addTask: (title: string, todolistId: string) => dispatch(addTaskAC(title, todolistId)),
        changeStatus: (id: string, isDone: boolean, todolistId: string) => dispatch(changeTaskStatusAC(id, isDone, todolistId)),
        changeTaskTitle: (id: string, newTitle: string, todolistId: string) => dispatch(changeTaskTitleAC(id, newTitle, todolistId)),
        addTodolist: (title: string) => {
            dispatch(addTodolistAC(title))
        },
        removeTodolist: (id: string) => {
            dispatch(removeTodolistAC(id))
        },
        changeFilter: (value: FilterValuesType, todolistId: string) => dispatch(changeTodolistFilterAC(value, todolistId)),
        changeTodolistTitle: (id: string, title: string) => dispatch(changeTodolistTitleAC(id, title))
    }
}
export type AppType = MapStateType & MapDispacthType
export const AppContainer = connect(mapStateToProps, mapDispacthToProps)(App)

export default AppContainer;
