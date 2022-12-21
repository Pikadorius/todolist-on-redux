import React, {ChangeEvent, memo, useCallback, useMemo} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {FilterValuesType} from './reducers/todolistsReducer';
import Task from './Task';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo(function (props: PropsType) {
    console.log(`Todo rendering`)

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.id, props.addTask])

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    let taskForTodolist = (): TaskType[] => {
        if (props.filter === "active") {
            return props.tasks.filter(t => !t.isDone);
        } else if (props.filter === "completed") {
            return props.tasks.filter(t => t.isDone);
        } else return props.tasks
    }

    const filterHandler = (filter: FilterValuesType) => () => props.changeFilter(filter, props.id)

    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.id), [props.removeTask, props.id])
    const changeTaskStatus = useCallback((taskId: string, newIsDoneValue: boolean) => {
        props.changeTaskStatus(taskId, newIsDoneValue, props.id);
    }, [props.id, props.changeTaskStatus])
    const changeTaskTitle = useCallback((taskId: string, newValue: string) => {
        props.changeTaskTitle(taskId, newValue, props.id);
    }, [props.id, props.changeTaskTitle])

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                taskForTodolist().map(t => {
                    return <Task
                        key={t.id}
                        task={t}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}/>
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
                <ButtonMemo onClick={filterHandler('completed')} title={'Completed'} color={'success'} variant={props.filter === 'completed' ? "contained" : 'outlined'}/>
            </ButtonGroup>
        </div>
    </div>
})

type ButtonMemoType = {
    title: string
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    variant: 'text' | 'outlined' | 'contained'
    onClick: ()=>void
}

const ButtonMemo = memo((props:ButtonMemoType) => {
    console.log('Button rendering')
    return (
        <Button size='small' variant={props.variant} color={props.color} onClick={props.onClick}
               >{props.title}</Button>
    )
})


