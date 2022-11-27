import React from 'react';
import './App.css';
import {TaskType, Todolist} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import ButtonAppBar from './ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from './reducers/todolistsReducer';
import {
    addTaskAC,
    addTasksToTodolistAC, changeTaskStatusAC,
    changeTaskTitleAC,
    deleteTasksFromTodolistAC,
    removeTaskAC
} from './reducers/tasksReducer';
import {ActionsType} from './redux/store';

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type StateType ={
    todolists: TodolistType[]
    tasks: TasksStateType
}

type AppType = {
    state: StateType
    dispatch: (action:ActionsType)=>void
}

const App:React.FC<AppType> = ({state, dispatch}) => {

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(id, newTitle,todolistId))
    }


    function addTodolist(title: string) {
        let newTodolistId = v1();
        dispatch(addTodolistAC(title,newTodolistId))
        dispatch(addTasksToTodolistAC(newTodolistId))
    }

    function removeTodolist(id: string) {
        dispatch(removeTodolistAC(id))
        dispatch(deleteTasksFromTodolistAC(id))
    }

    function changeTodolistTitle(id: string, title: string) {
        dispatch(changeTodolistTitleAC(id, title))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(value, todolistId))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container >
                    <Paper style={{margin: '20px'}}  elevation={3}><AddItemForm addItem={addTodolist}/></Paper>
                    <button onClick={()=> {
                        console.log(state.tasks)
                        console.log(state.todolists)
                    }}>log</button>
                </Grid>
                <Grid container spacing={3}>
                {
                    state.todolists.map(tl => {
                        let allTodolistTasks = state.tasks[tl.id];
                        let tasksForTodolist = allTodolistTasks;

                        if (tl.filter === "active") {
                            tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                        }
                        if (tl.filter === "completed") {
                            tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                        }

                        return <Grid item>
                            <Paper  elevation={3} style={{padding: '20px'}}><Todolist
                                key={tl.id}
                                id={tl.id}
                                title={tl.title}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
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
