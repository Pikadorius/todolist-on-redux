import React, {ChangeEvent, memo, useState} from 'react';


type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    disabled?:boolean
}

export const EditableSpan = memo(({disabled=false,...props}: EditableSpanPropsType)=> {
    console.log('EditableSpan rendering')

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }

    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
})
