import React, {ChangeEvent} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC, TodolistType
} from './reducers/todolistsReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './redux/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './reducers/tasksReducer';


type PropsType = {
    todolist: TodolistType
}

export function TodolistRedux(props: PropsType) {
    const {id: todoId, filter, title} = props.todolist
    // const tasks=useSelector<AppRootState, TaskType[]>(state => state.tasks[props.id])  // another variant
    const selector = (state: AppRootState) => state.tasks[todoId]
    const tasks = useSelector(selector)
    const dispatch = useDispatch()

    let filteredTasks = tasks

    if (filter === "active") {
        filteredTasks = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        filteredTasks = tasks.filter(t => t.isDone);
    }


    const addTask = (title: string) => {
        dispatch(addTaskAC(title, todoId))
    }

    const removeTodolist = () => {
        dispatch(removeTodolistAC(todoId))
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(todoId, title))
    }

    const filterHandler = (filter: FilterValuesType) => () => dispatch(changeTodolistFilterAC(filter, todoId))

    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitle}/>
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                filteredTasks.map(t => {

                    const removeTask = () => dispatch(removeTaskAC(t.id, todoId))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, todoId))
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, todoId))
                    }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        <IconButton aria-label="delete" onClick={removeTask}>
                            <DeleteIcon/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <ButtonGroup>
                <Button size='small' variant={filter === 'all' ? "contained" : 'outlined'}
                        color="warning"
                        onClick={filterHandler('all')}>All</Button>

                <Button size='small' variant={filter === 'active' ? "contained" : 'outlined'}
                        color="error"
                        onClick={filterHandler('active')}>Active</Button>

                <Button size='small' variant={filter === 'completed' ? "contained" : 'outlined'}
                        color='success'
                        onClick={filterHandler('completed')}>Completed</Button>
            </ButtonGroup>
        </div>
    </div>
}


