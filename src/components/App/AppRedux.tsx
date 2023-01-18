import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import ButtonAppBar from '../ButtonAppBar/ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useSelector} from 'react-redux';
import {
    addTodolistTC, fetchTodolists,
    TodolistDomainType
} from '../../redux/reducers/todolistsReducer';
import {AppRootState, useAppDispatch,} from '../../redux/store';
import {TodolistRedux} from '../Features/Todolists/Todolist/TodoListRedux';
import Todolists from '../Features/Todolists/Todolists';

const App: React.FC = () => {
    console.log('AppWithRedux rendering...')

    const dispatch = useAppDispatch()

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container>
                    <Paper style={{margin: '20px'}} elevation={3}>
                        <AddItemForm addItem={addTodolist}/>
                    </Paper>
                </Grid>
                <Todolists/>
            </Container>
        </div>
    );
}

export default App;

