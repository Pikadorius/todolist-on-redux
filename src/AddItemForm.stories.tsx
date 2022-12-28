import React, {useState} from 'react';
import {AddItemForm} from './AddItemForm';
import {action} from '@storybook/addon-actions';
import {ComponentMeta, ComponentStory} from '@storybook/react';

export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            descripton: 'Button clicked'
        }
    }
} as ComponentMeta<typeof AddItemForm>;


const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;



export  const AddItemFormStory = Template.bind({})
AddItemFormStory.args = {
    addItem: action('Button "+" clicked')
}

/*
export const AddItemFormBaseExample = () => {
    const [state, setState] = useState<string[]>([])

    const addItem = (title: string) => {
        setState([title, ...state])
    }
    return <>
        <AddItemForm addItem={addItem}/>
        <button onClick={() => setState([])}>Clear</button>
        {state.map((item, i) => <div key={i}>{item}</div>)}
    </>
}
*/
