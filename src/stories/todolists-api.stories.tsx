import React, {useEffect, useState} from 'react'
import {todolistsAPI, TodolistType} from '../API/API';

export default {
    title: 'API/Features'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.getAllTodolists().then(data => setState(data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [value, setValue] = useState('')

    const onClickHandler = () => {
        todolistsAPI.createTodolist(value.trim()).then(res=>console.log(res))
        setValue('')
    }

    useEffect(() => {
        todolistsAPI.getAllTodolists().then(data => setState(data))
    }, [value])


    return (
        <div>
            <input onChange={(e) => setValue(e.currentTarget.value)} value={value}/>
            <button id={'button'} onClick={onClickHandler}>+</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [value, setValue] = useState('')


    const onClickHandler = () => {
        todolistsAPI.deleteTodolist(value.trim()).then(()=>setState('Features deleted')).catch(()=>setState('No such todolist'))
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


export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.updateTodolistTitle("e938b792-b598-41e0-81e0-518b7feca13a", 'What to repeat').then(res=>setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}