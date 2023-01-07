import React, {ChangeEvent, memo, useCallback} from 'react';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskType} from './API/API';

type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, status: number) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
}


const Task = memo((props: TaskPropsType) => {
    console.log('Task rendering')

    const onClickHandler = () => props.removeTask(props.task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let statusValue = e.currentTarget.checked ? 2 : 0;
        props.changeTaskStatus(props.task.id, statusValue);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue);
    },[props.changeTaskTitle, props.task.id])

    return (
    <li className={props.task.status===2 ? "is-done" : ""}>
        <Checkbox onChange={onChangeHandler} checked={props.task.status===2}/>
        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton aria-label="delete" onClick={onClickHandler}>
            <DeleteIcon/>
        </IconButton>
    </li>
    )
})

export default Task;