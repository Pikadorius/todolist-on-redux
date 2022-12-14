import React, {useCallback, useEffect} from 'react';
import '../App.css';
import {AddItemForm} from '../AddItemForm';
import ButtonAppBar from '../ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useSelector} from 'react-redux';
import {
     addTodolistTC, fetchTodolists,
    TodolistDomainType
} from '../reducers/todolistsReducer';
import {AppRootState, useAppDispatch,} from '../redux/store';
import {TodolistRedux} from './TodoListRedux';

const App: React.FC = () => {
    console.log('AppWithRedux rendering...')
    // const tasks=useSelector<AppRootState, TasksStateType>(state => state.tasks)
    const todolists = useSelector<AppRootState, TodolistDomainType[]>(state => state.todolists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        /*todolistsAPI.getAllTodolists().then(res => {
            dispatch(setTodolistFromServer(res))
        })*/
        dispatch(fetchTodolists())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container>
                    <Paper style={{margin: '20px'}} elevation={3}><AddItemForm addItem={addTodolist}/></Paper>

                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            return <Grid item key={tl.id}>
                                <Paper elevation={3} style={{padding: '20px'}}>
                                    <TodolistRedux todolist={tl}/>
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
