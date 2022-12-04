import React from 'react';
import './App.css';
import {Todolist} from './TodoList';
import {AddItemForm} from './AddItemForm';
import ButtonAppBar from './ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {AppType} from './AppContainer';


const App: React.FC<AppType> = (props) => {

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container>
                    <Paper style={{margin: '20px'}} elevation={3}><AddItemForm addItem={props.addTodolist}/></Paper>
                    <button onClick={() => {
                        console.log(props.tasks)
                        console.log(props.todolists)
                    }}>log
                    </button>
                </Grid>
                <Grid container spacing={3}>
                    {
                        props.todolists.map(tl => {
                            let allTodolistTasks = props.tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                            }

                            return <Grid item key={tl.id}>
                                <Paper elevation={3} style={{padding: '20px'}}><Todolist
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTask={props.removeTask}
                                    changeFilter={props.changeFilter}
                                    addTask={props.addTask}
                                    changeTaskStatus={props.changeStatus}
                                    filter={tl.filter}
                                    removeTodolist={props.removeTodolist}
                                    changeTaskTitle={props.changeTaskTitle}
                                    changeTodolistTitle={props.changeTodolistTitle}
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
