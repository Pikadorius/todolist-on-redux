import {useSelector} from 'react-redux';
import {AppRootState, useAppDispatch} from '../../../redux/store';
import {fetchTodolists, TodolistDomainType} from './todolistsReducer';
import React, {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {TodolistRedux} from './Todolist/TodoListRedux';


const Todolists = ({demo=false}:{demo?:boolean}) => {
    const todolists = useSelector<AppRootState, TodolistDomainType[]>(state => state.todolists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!demo) {
            dispatch(fetchTodolists())
        }
        else return;
    }, [])

    return <Grid container spacing={3}>
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
