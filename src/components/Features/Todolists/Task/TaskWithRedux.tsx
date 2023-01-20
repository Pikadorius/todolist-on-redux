import React, {ChangeEvent, memo} from 'react';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from '../../../common/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    deleteTaskTC,
    updateTaskTC
} from '../tasksReducer';
import {TaskType} from '../../../../API/API';
import {useAppDispatch} from '../../../../redux/store';

type TaskPropsType = {
    task: TaskType
    todolistId: string
    disabled?:boolean
}


const Task = memo((props: TaskPropsType) => {
    console.log('Task rendering')

    const dispatch = useAppDispatch()

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
            <Checkbox onChange={changeTaskStatus} checked={props.task.status === 2} disabled={props.disabled}/>
            <EditableSpan value={props.task.title} onChange={changeTaskTitle} disabled={props.disabled}/>
            <IconButton aria-label="delete" onClick={deleteTask} disabled={props.disabled}>
                <DeleteIcon/>
            </IconButton>
        </li>
    )
})

export default Task;