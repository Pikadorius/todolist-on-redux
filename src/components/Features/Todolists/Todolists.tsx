import {useSelector} from 'react-redux';
import {AppRootState, useAppDispatch} from '../../../redux/store';
import {fetchTodolists, TodolistDomainType} from '../../../redux/reducers/todolistsReducer';
import React, {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {TodolistRedux} from './Todolist/TodoListRedux';


const Todolists = () => {
    const todolists = useSelector<AppRootState, TodolistDomainType[]>(state => state.todolists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolists())
    }, [])

    return <Grid container spacing={3}>
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
}


export default Todolists;
