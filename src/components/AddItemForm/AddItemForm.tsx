import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?:boolean
}

export const AddItemForm = memo(({disabled=false,addItem}: AddItemFormPropsType) => {
    console.log('AddItemForm rendering...')
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== "") {
            addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        error!=null && setError(null);
        if (e.charCode === 13) {
            addItemHandler();
        }
    }

    return <div>
        <TextField label={error ? "Write something..." : "Enter new item:"} variant="outlined" value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : "Enter task:"}
                   size={'small'}
                   error={!!error}/>
        <Button style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}
                variant="contained" onClick={addItemHandler} size='small' disabled={disabled}>+</Button>
    </div>
})
