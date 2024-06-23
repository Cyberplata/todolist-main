import {ChangeEvent, KeyboardEvent, useState} from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import {filterButtonContainerSx} from "./Todolist.styles";

type Props = {
    addItem: (title: string) => void
};
export const AddItemForm = ({addItem}: Props) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }

    const buttonStyles = {
        maxWidth: '30px',
        maxHeight: '30px',
        minWidth: '30px',
        minHeight: '30px',
        backgroundColor: 'red'
    }

    return (
        <Box sx={filterButtonContainerSx}>
            {/*<input*/}
            {/*    className={error ? 'error': ''}*/}
            {/*    value={title}*/}
            {/*    onChange={changeItemTitleHandler}*/}
            {/*    onKeyUp={addItemOnKeyUpHandler}*/}
            {/*/>*/}

            <TextField
                id="outlined-basic"
                label="Enter a title"
                variant="outlined"
                value={title}
                onChange={changeItemTitleHandler}
                onKeyUp={addItemOnKeyUpHandler}
                size='small'
                error={!!error}
                helperText={error}
            />

            <IconButton onClick={addItemHandler} color={'primary'}>
                <AddBoxIcon />
            </IconButton>

            {/*<Button*/}
            {/*    variant="contained"*/}
            {/*    onClick={addItemHandler}*/}
            {/*    // size='small'*/}
            {/*    // style={buttonStyles}*/}
            {/*>+</Button>*/}
            {/*<Button title={'+'} onClick={addItemHandler}/>*/}
            {/*{error && <div className={'error-message'}>{error}</div> }*/}
        </Box>
    );
};