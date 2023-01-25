import {useSelector} from 'react-redux';
import {AppRootState, useAppDispatch} from '../../../redux/store';
import {createTodolistTC, fetchTodolists, TodolistDomainType} from './todolistsReducer';
import React, {useCallback, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {TodolistRedux} from './Todolist/TodoListRedux';
import {AddItemForm} from '../../common/AddItemForm/AddItemForm';


const Todolists = ({demo=false}:{demo?:boolean}) => {
    const todolists = useSelector<AppRootState, TodolistDomainType[]>(state => state.todolists)
    const dispatch = useAppDispatch()


    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [])

    useEffect(() => {
        if (!demo) {
            dispatch(fetchTodolists())
        }
        else return;
    }, [])

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
