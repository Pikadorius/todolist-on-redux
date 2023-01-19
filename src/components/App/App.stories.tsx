import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ReduxStoreProviderDecorator} from '../../redux/ReduxStoreProviderDecorator';
import App from './App';

export default {
    title: 'Features/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;


const Template: ComponentStory<typeof App> = (args) => <App {...args} />

export const AppStory = Template.bind({})
AppStory.args = {
    demo: true
}


