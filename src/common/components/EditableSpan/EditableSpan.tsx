import { ChangeEvent, memo, useState } from "react"
import TextField from "@mui/material/TextField"

type Props = {
   value: string
   onChange: (newTitle: string) => void
}

export const EditableSpan = memo(({ value, onChange }: Props) => {
   // console.log("EditableSpan is called")

   const [editMode, setEditMode] = useState(false)
   const [newTitle, setNewTitle] = useState(value)

   const activateEditModeHandler = () => {
      setEditMode(!editMode)
      if (editMode) {
         onChange(newTitle)
      }
   }

   const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTitle(e.currentTarget.value)
   }

   return editMode ? (
      // ? <input value={newTitle} onChange={changeTitleHandler} onBlur={activateEditModeHandler} autoFocus/>
      <TextField
         id="outlined-basic"
         label="Enter a title"
         variant="outlined"
         value={newTitle}
         onChange={changeTitleHandler}
         onBlur={activateEditModeHandler}
         size="small"
         autoFocus
      />
   ) : (
      <span onDoubleClick={activateEditModeHandler}>{value}</span>
   )
})
