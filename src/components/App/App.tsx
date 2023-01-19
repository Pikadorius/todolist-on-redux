import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import ButtonAppBar from '../ButtonAppBar/ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {addTodolistTC} from '../../redux/reducers/todolistsReducer';
import {useAppDispatch} from '../../redux/store';
import Todolists from '../Features/Todolists/Todolists';
import {ErrorSnackbar} from '../ErrorSnackbar/ErrorSnackbar';

type AppType = {
    demo?: boolean
}

const App: React.FC<AppType> = ({demo = false}) => {
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
                <Todolists demo={demo}/>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;

