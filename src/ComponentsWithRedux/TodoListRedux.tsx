import React, {memo, useCallback, useEffect} from 'react';
import {AddItemForm} from '../AddItemForm';
import {EditableSpan} from '../EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {
    changeTodolistFilterAC, changeTodolistTC, deleteTodolistTC,
    FilterValuesType,
    TodolistDomainType
} from '../reducers/todolistsReducer';
import { useSelector} from 'react-redux';
import {useAppDispatch, AppRootState} from '../redux/store';
import {addTaskTC, fetchTasksForTodolist} from '../reducers/tasksReducer';
import TaskWithRedux from './TaskWithRedux';
import {TaskStatuses} from '../API/API';


type PropsType = {
    todolist: TodolistDomainType
}

export const TodolistRedux = memo((props: PropsType) => {
    console.log(`${props.todolist.id} rendering. ${props.todolist.filter}`)
    const {id: todoId, filter, title} = props.todolist
    // const tasks=useSelector<AppRootState, TaskType[]>(state => state.tasks[props.id])  // another variant
    const selector = (state: AppRootState) => state.tasks[todoId]
    const tasks = useSelector(selector)
    const dispatch =useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksForTodolist(props.todolist.id))
    }, [])


    let filteredTasks = tasks

    if (filter === "active") {
        filteredTasks = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (filter === "completed") {
        filteredTasks = tasks.filter(t => t.status === TaskStatuses.Completed);
    }


    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(todoId, title))
    }, [todoId])

    const removeTodolist = () => {
        dispatch(deleteTodolistTC(todoId))
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTC(todoId, title))
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
                    return <TaskWithRedux key={t.id} task={t} todolistId={props.todolist.id}/>
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
})

