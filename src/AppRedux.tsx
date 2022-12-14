import React from 'react';
import './App.css';
import {AddItemForm} from './AddItemForm';
import ButtonAppBar from './ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from 'react-redux';
import {
    addTodolistAC,
    TodolistType
} from './reducers/todolistsReducer';
import {AppRootState} from './redux/store';
import {TodolistRedux} from './TodoListRedux';


const App: React.FC = () => {
    // const tasks=useSelector<AppRootState, TasksStateType>(state => state.tasks)
    const todolists = useSelector<AppRootState, TodolistType[]>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container>
                    <Paper style={{margin: '20px'}} elevation={3}><AddItemForm addItem={addTodolist}/></Paper>
                    {/*<button onClick={() => {
                        // console.log(tasks)
                        // console.log(todolists)
                    }}>log
                    </button>*/}
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
