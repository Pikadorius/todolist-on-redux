import Task from './Task';
import {TaskType} from './TodoList';
import {action} from '@storybook/addon-actions';
import {useState} from 'react';
import React from 'react';
import TaskWithRedux from './ComponentsWithRedux/TaskWithRedux';
import {Provider, useSelector} from 'react-redux';
import store, {AppRootState} from './redux/store';

export default {
    title: 'Components/Task',
    component: Task
}

export const TaskBaseExample = () => {
    const [task, setTask] = useState<TaskType>({
        id: '1',
        title: 'Test storybook',
        isDone: false
    })

    const changeTitle = (id: string, title: string) => {
        setTask({...task, title})
    }
    const changeStatus = (id: string, isDone: boolean) => {
        setTask({...task, isDone})
    }


    return <Task
        task={task}
        removeTask={action('Delete task button clicked')}
        changeTaskStatus={changeStatus}
        changeTaskTitle={changeTitle}/>
}
