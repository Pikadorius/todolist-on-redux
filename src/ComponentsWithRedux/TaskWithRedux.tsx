import React, {ChangeEvent, memo} from 'react';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from '../EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from 'react-redux';
import {
    deleteTaskTC,
    updateTaskTC
} from '../reducers/tasksReducer';
import {TaskType} from '../API/API';

type TaskPropsType = {
    task: TaskType
    todolistId: string
}


const Task = memo((props: TaskPropsType) => {
    console.log('Task rendering')

    const dispatch = useDispatch<any>()

    const deleteTask = () => dispatch(deleteTaskTC(props.todolistId, props.task.id))
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let newStatus = e.currentTarget.checked ? 2 : 0;
        dispatch(updateTaskTC(props.todolistId, props.task.id, {status: newStatus}))
    }
    const changeTaskTitle = (newValue: string) => {
        dispatch(updateTaskTC(props.todolistId, props.task.id, {title: newValue}))

    }

    return (
        <li className={props.task.status === 2 ? "is-done" : ""}>
            <Checkbox onChange={changeTaskStatus} checked={props.task.status === 2}/>
            <EditableSpan value={props.task.title} onChange={changeTaskTitle}/>
            <IconButton aria-label="delete" onClick={deleteTask}>
                <DeleteIcon/>
            </IconButton>
        </li>
    )
})

export default Task;