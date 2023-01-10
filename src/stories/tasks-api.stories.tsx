import React, {useEffect, useState, KeyboardEvent} from 'react'
import {tasksAPI} from '../API/API';

export default {
    title: 'API/Tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        e.key === 'Enter' && tasksAPI.getTasks("386123b3-1569-4932-acec-b51a303696b8").then(res => setState(res.data.items))
    }

    return <div>
        <input onChange={(e) => setTodolistId(e.currentTarget.value)} value={todolistId} placeholder={'todolistID'}
               onKeyDown={onEnter}/>
        <div>{JSON.stringify(state)}</div>
    </div>
}


export const CreateTask = () => {
    const [state, setState] = useState<any>(null)

    const [value, setValue] = useState('')


    const onClickHandler = () => {
        tasksAPI.createTask("386123b3-1569-4932-acec-b51a303696b8", value.trim())
        setValue('')
    }

    useEffect(() => {
        tasksAPI.getTasks("386123b3-1569-4932-acec-b51a303696b8").then(res => setState(res.data.items))
    }, [value])


    return (
        <div>
            <input onChange={(e) => setValue(e.currentTarget.value)} value={value}/>
            <button id={'button'} onClick={onClickHandler}>+</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}


export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [value, setValue] = useState('')


    const onClickHandler = () => {
        tasksAPI.deleteTask("837ae73f-d715-4368-9e8b-f3c4405e6581", value.trim()).then(() => setState('Task deleted')).catch(() => setState('No such task'))
        setValue('')
    }


    return (
        <div>
            <input onChange={(e) => setValue(e.currentTarget.value)} value={value}/>
            <button id={'button'} onClick={onClickHandler}>Delete</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}


export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskStatus = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

    }, [])

    return <div>{JSON.stringify(state)}</div>
}