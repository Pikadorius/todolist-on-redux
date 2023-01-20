import {EditableSpan} from './EditableSpan';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import React from 'react';

export default {
    title: 'Features/EditableSpan',
    component: EditableSpan
}

export const EditableSpanBaseExample = () => {
    const [value, setValue]=useState('Enter something')

    return <EditableSpan value={value} onChange={(title)=>setValue(title)}/>
}