import Task from './Task';
import {action} from '@storybook/addon-actions';
import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ReduxStoreProviderDecorator} from '../../redux/ReduxStoreProviderDecorator';
import {defaultTask} from '../Features/Todolists/tasksReducer';
import {TaskStatuses, TaskType} from '../../API/API';

export default {
    title: 'Features/Task',
    component: Task,
    args: {
        task: {
            ...defaultTask,
            id: '1',
            title: 'Test storybook',
            status:TaskStatuses.Completed
        },
        changeTaskTitle: action('Title changed'),
        removeTask: action('Task deleted'),
        changeTaskStatus: action('Status changed')
    },
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({})


export const TaskIsUndoneStory = Template.bind({})
TaskIsUndoneStory.args = {
    task: {
        ...defaultTask,
        id: '1',
        title: 'Test storybook'
    }
}
//===================Controlled============================

const Template1: ComponentStory<typeof Task> = () => {
    const [task, setTask] = useState<TaskType>({
        ...defaultTask,
        id: '1',
        title: 'Test storybook',
    })

    const changeTitle = (id: string, title: string) => {
        setTask({...task, title})
    }
    const changeStatus = (id: string, status: number) => {
        setTask({...task, status})
    }
    return <Task
        task={task}
        removeTask={action('Delete task button clicked')}
        changeTaskStatus={changeStatus}
        changeTaskTitle={changeTitle}/>
}

export const ControlledTask = Template1.bind({})



/*
// Old syntax

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
}*/
