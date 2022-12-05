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
    removeTodolistAC
} from './reducers/todolistsReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './redux/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './reducers/tasksReducer';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export function TodolistRedux(props: PropsType) {
    const selector = (state:AppRootState)=>state.tasks[props.id]
    const tasks=useSelector(selector)
    // const tasks=useSelector<AppRootState, TaskType[]>(state => state.tasks[props.id])  // another variant

    let filteredTasks = tasks

    if (props.filter === "active") {
        filteredTasks = tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        filteredTasks = tasks.filter(t => t.isDone);
    }

    const dispatch = useDispatch()

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.id))
    }

    const removeTodolist = () => {
        dispatch(removeTodolistAC(props.id))
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(props.id, title))
    }

    const filterHandler = (filter: FilterValuesType) =>  () => dispatch(changeTodolistFilterAC(filter, props.id))

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                filteredTasks.map(t => {

                    const removeTask = () => dispatch(removeTaskAC(t.id, props.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id))
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id,newValue, props.id))
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
                <Button size='small' variant={props.filter === 'all' ? "contained" : 'outlined'} color="warning"
                        onClick={filterHandler('all')}>All</Button>

                <Button size='small' variant={props.filter === 'active' ? "contained" : 'outlined'} color="error"
                        onClick={filterHandler('active')}>Active</Button>

                <Button size='small' variant={props.filter === 'completed' ? "contained" : 'outlined'} color='success'
                        onClick={filterHandler('completed')}>Completed</Button>
            </ButtonGroup>
        </div>
    </div>
}


