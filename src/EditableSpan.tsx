import {ChangeEvent, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;
import {log} from "node:util";

type Props = {
    odlTitle: string
    updateItem: (newTitle: string) => void
};

export const EditableSpan = ({odlTitle, updateItem}: Props) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(odlTitle)
    console.log(newTitle)

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
            ? <input value={newTitle} onChange={changeTitleHandler} onBlur={activateEditModeHandler} autoFocus/>
            : <span onDoubleClick={activateEditModeHandler}>{odlTitle}</span>
    );
};