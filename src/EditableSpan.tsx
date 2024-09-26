import {ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";

type EditableSpanType = {
    odlTitle: string
    updateItem: (newTitle: string) => void
    // newTaskId: string
};

export const EditableSpan = ({odlTitle, updateItem}: EditableSpanType) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(odlTitle)
    // console.log(newTitle)

    const activateEditModeHandler = () => {
        setEditMode(!editMode)
        if (editMode) {
            updateItem(newTitle)
        }
    }

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        editMode
            // ? <input value={newTitle} onChange={changeTitleHandler} onBlur={activateEditModeHandler} autoFocus/>
            ? <TextField
                id="outlined-basic"
                label="Enter a title"
                variant="outlined"
                value={newTitle}
                onChange={changeTitleHandler}
                onBlur={activateEditModeHandler}
                size='small'
                autoFocus
            />
            : <span onDoubleClick={activateEditModeHandler}>{odlTitle}</span>
    );
};