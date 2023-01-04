import React, {useEffect, useState} from 'react'
import {todolistsAPI} from '../API/API';

export default {
    title: 'API'
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
        todolistsAPI.addNewTodolist(value.trim())
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
        todolistsAPI.deleteTodolist(value.trim()).then(()=>setState('Todolist deleted')).catch(()=>setState('No such todolist'))
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
        todolistsAPI.updateTodolistTitle("386123b3-1569-4932-acec-b51a303696b8", 'renamed todo 2')
    }, [])

    return <div>{JSON.stringify(state)}</div>
}