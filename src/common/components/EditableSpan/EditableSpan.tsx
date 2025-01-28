import Typography from "@mui/material/Typography"
import { ChangeEvent, memo, useState } from "react"
import TextField from "@mui/material/TextField"

type Props = {
   value: string
   onChange: (newTitle: string) => void
   disabled?: boolean
}

export const EditableSpan = memo(({ value, onChange, disabled }: Props) => {
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
      <TextField
         id="outlined-basic"
         label="Enter a title"
         variant="outlined"
         value={newTitle}
         onChange={changeTitleHandler}
         onBlur={activateEditModeHandler}
         size="small"
         autoFocus
         disabled={disabled}
      />
   ) : (
      <Typography onDoubleClick={activateEditModeHandler} component="span">
         {value}
      </Typography>
   )
})
