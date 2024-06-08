import {useState} from "react";

type Props = {
    title: string
    // onChange: () => void
};

export const EditableSpan = ({title}: Props) => {
    const [editMode, setEditMode] = useState(false)
    const activateEditModeHandler = () => {
        setEditMode(!editMode)
    }

    return (
        editMode
            ? <input value={title} onBlur={activateEditModeHandler} autoFocus/>
            : <span onDoubleClick={activateEditModeHandler}>{title}</span>
    );
};