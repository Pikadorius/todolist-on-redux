import React, { useCallback} from 'react';
import '../App/App.css';
import {Todolist} from './TodoList';
import {AddItemForm} from '../common/AddItemForm/AddItemForm';
import ButtonAppBar from '../common/ButtonAppBar/ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from 'react-redux';
import {
     createTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    TodolistDomainType
} from '../Features/Todolists/todolistsReducer';
import {AppRootState} from '../../redux/store';
import {
    addTaskTC,
    changeTaskAC,
    removeTaskAC,
    TasksStateType
} from '../Features/Todolists/tasksReducer';


const AppWithOutRedux: React.FC = () => {
    console.log(`App rendering`)

    // так как доступ к таскам и тудулистам в App - апп рендерится при любом изменении
    const todolists = useSelector<AppRootState, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch<any>()

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    },[dispatch])

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    },[dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(value, todolistId))
    },[dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, title))
    },[dispatch])
    const changeTaskStatus = useCallback((id: string, status: number, todolistId: string) => {
        dispatch(changeTaskAC(id, {status}, todolistId))
    },[dispatch])
    const removeTodolist =useCallback((id: string) => {
        dispatch(removeTodolistAC(id))
    },[dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskAC(taskId, {title:newTitle}, todolistId))
    },[dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    },[dispatch])


    return (
        <div className="App">
            {/*<Fake/>*/}
            <ButtonAppBar/>
            <Container fixed>
                <Grid container>
                    <Paper style={{margin: '20px'}} elevation={3}><AddItemForm addItem={addTodolist}/></Paper>
                    <button onClick={() => {
                        console.log(tasks)
                        console.log(todolists)
                    }}>log
                    </button>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            return <Grid item key={tl.id}>
                                <Paper elevation={3} style={{padding: '20px'}}><Todolist
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasks[tl.id]}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                /></Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithOutRedux;
