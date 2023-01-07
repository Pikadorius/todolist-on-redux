import {ComponentMeta, ComponentStory} from '@storybook/react';
import TaskWithRedux from './TaskWithRedux';
import React from 'react';
import {ReduxStoreProviderDecorator} from '../redux/ReduxStoreProviderDecorator';
import {useSelector} from 'react-redux';
import {AppRootState} from '../redux/store';
import {TaskType} from '../API/API';

export default {
    title: 'Todolist/TaskWithRedux',
    component: TaskWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof TaskWithRedux>



const TaskWithReduxContainer = () => {
    const task = useSelector<AppRootState, TaskType>(state => state.tasks['todolistId1'][0])
    return <TaskWithRedux task={task} todolistId={'todolistId1'}/>
}

const Template: ComponentStory<typeof TaskWithRedux> = () => {
    return <TaskWithReduxContainer/>
}

export const TaskWithReduxStory = Template.bind({})

