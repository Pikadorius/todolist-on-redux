import React, { useCallback} from 'react';
import './App.css';
import {Todolist} from './TodoList';
import {AddItemForm} from './AddItemForm';
import ButtonAppBar from './ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from 'react-redux';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    TodolistDomainType
} from './reducers/todolistsReducer';
import {AppRootState} from './redux/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType} from './reducers/tasksReducer';


const App: React.FC = () => {
    console.log(`App rendering`)

    // так как доступ к таскам и тудулистам в App - апп рендерится при любом изменении
    const todolists = useSelector<AppRootState, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    },[dispatch])

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    },[dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(value, todolistId))
    },[dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    },[dispatch])
    const changeTaskStatus = useCallback((id: string, status: number, todolistId: string) => {
        dispatch(changeTaskStatusAC(id, status, todolistId))
    },[dispatch])
    const removeTodolist =useCallback((id: string) => {
        dispatch(removeTodolistAC(id))
    },[dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
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

export default App;
