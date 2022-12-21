import React, {ChangeEvent, memo} from 'react';
import {TaskType} from './TodoList';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
}


const Task = memo((props: TaskPropsType) => {
    console.log('Task rendering')

    const onClickHandler = () => props.removeTask(props.task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue);
    }
    const onTitleChangeHandler = (newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue);
    }

    return (
    <li className={props.task.isDone ? "is-done" : ""}>
        <Checkbox onChange={onChangeHandler} checked={props.task.isDone}/>
        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton aria-label="delete" onClick={onClickHandler}>
            <DeleteIcon/>
        </IconButton>
    </li>
    )
})

export default Task;