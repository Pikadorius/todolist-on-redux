import Task from './Task';
import {TaskType} from './TodoList';
import {action} from '@storybook/addon-actions';
import {useState} from 'react';
import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import TaskWithRedux from './ComponentsWithRedux/TaskWithRedux';
import {ReduxStoreProviderDecorator} from './redux/ReduxStoreProviderDecorator';
import {v1} from 'uuid';

export default {
    title: 'Todolist/Task',
    component: Task,
    args: {
        task: {
            id: '1',
            title: 'Test storybook',
            isDone: true
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
        id: '1',
        title: 'Test storybook',
        isDone: false
    }
}
//===================Controlled============================

const Template1: ComponentStory<typeof Task> = (args) => {
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
