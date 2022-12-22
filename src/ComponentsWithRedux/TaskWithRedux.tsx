import React, {ChangeEvent, memo} from 'react';
import {TaskType} from '../TodoList';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from '../EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../reducers/tasksReducer';

type TaskPropsType = {
    task: TaskType
    todolistId: string
}


const Task = memo((props: TaskPropsType) => {
    console.log('Task rendering')

    const dispatch=useDispatch()

    const onClickHandler = () => dispatch(removeTaskAC(props.task.id, props.todolistId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(props.task.id,newIsDoneValue,props.todolistId))
    }
    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newValue,props.todolistId))
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