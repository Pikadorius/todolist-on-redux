import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from '../common/AddItemForm/AddItemForm';
import ButtonAppBar from '../common/ButtonAppBar/ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {createTodolistTC} from '../Features/Todolists/todolistsReducer';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import Todolists from '../Features/Todolists/Todolists';
import {ErrorSnackbar} from '../common/ErrorSnackbar/ErrorSnackbar';
import LinearProgress from '@mui/material/LinearProgress';
import {RequestStatusType} from './appReducer';


//for storybook (if demo = true use initialState in storybook instead of loading from server)
type AppType = {
    demo?: boolean
}

const App: React.FC<AppType> = ({demo = false}) => {
    console.log('AppWithRedux rendering...')

    const dispatch = useAppDispatch()
    const status:RequestStatusType = useAppSelector(state => state.app.status)

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [])

    return (
        <div className="App">
            <ButtonAppBar/>
            {status === 'loading' && <LinearProgress color={'secondary'}/>}
            <Container fixed>
                <Grid container>
                    <Paper style={{margin: '20px'}} elevation={3}>
                        <AddItemForm addItem={addTodolist}/>
                    </Paper>
                </Grid>
                <Todolists demo={demo}/>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;

