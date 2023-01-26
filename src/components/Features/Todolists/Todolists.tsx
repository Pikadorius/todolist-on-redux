import { useAppDispatch, useAppSelector} from '../../../redux/store';
import {createTodolistTC, fetchTodolists, TodolistDomainType} from './todolistsReducer';
import React, {useCallback, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {TodolistRedux} from './Todolist/TodoListRedux';
import {AddItemForm} from '../../common/AddItemForm/AddItemForm';
import {Navigate} from 'react-router-dom';


const Todolists = ({demo = false}: { demo?: boolean }) => {
    const todolists = useAppSelector(state => state.todolists)
    const dispatch = useAppDispatch()
    const isLogged = useAppSelector(state => state.auth.isLoggedIn)

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [])


    useEffect(() => {
        if (!demo || !isLogged) {
            debugger
            dispatch(fetchTodolists())
        } else return;
    }, [])


    if (!isLogged) {
        return <Navigate to={'/login'}/>
    }


    return <Grid container spacing={3}>
        <Grid container spacing={-2}>
            <Paper style={{margin: '20px'}} elevation={3}>
                <AddItemForm addItem={addTodolist}/>
            </Paper>
        </Grid>

        {
            todolists.map(tl => {
                return <Grid item key={tl.id}>
                    <Paper elevation={3} style={{padding: '20px'}}>
                        <TodolistRedux todolist={tl} demo={demo}/>
                    </Paper>
                </Grid>
            })
        }
    </Grid>
}


export default Todolists;
