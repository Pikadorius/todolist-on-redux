import React, {useState} from 'react';
import {AddItemForm} from './AddItemForm';
import {action, actions} from '@storybook/addon-actions';

export default {
    title: 'Components/AddItemForm',
    component: AddItemForm
}


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

export const AddItemFormBaseExampleWithActions= () => {

    return <AddItemForm addItem={action('Item was added')}/>

}