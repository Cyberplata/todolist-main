import { ChangeEvent, KeyboardEvent, memo, useState } from "react"
import AddBoxIcon from "@mui/icons-material/AddBox"
import IconButton from "@mui/material/IconButton"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { filterButtonContainerSx } from "../../../features/todolists/ui/Todolists/Todolist/FilterTasksButtons/FilterTasksButtons.styles"

export type Props = {
   addItem: (title: string) => void
   disabled?: boolean
}
export const AddItemForm = memo(({ addItem, disabled }: Props) => {
   const [title, setTitle] = useState("")
   const [error, setError] = useState<string | null>(null)

   const addItemHandler = () => {
      if (title.trim() !== "") {
         addItem(title.trim())
         setTitle("")
      } else {
         setError("Title is required")
      }
   }

   const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setTitle(event.currentTarget.value)
   }

   const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (error) {
         setError(null)
      }
      if (event.key === "Enter") {
         addItemHandler()
      }
   }

   return (
      <Box sx={filterButtonContainerSx}>
         <TextField
            id="outlined-basic"
            label="Enter a title"
            variant="outlined"
            value={title}
            onChange={changeItemTitleHandler}
            onKeyUp={addItemOnKeyUpHandler}
            size="small"
            error={!!error}
            helperText={error}
            disabled={disabled}
         />

         <IconButton onClick={addItemHandler} color={"primary"} disabled={disabled}>
            <AddBoxIcon />
         </IconButton>
      </Box>
   )
})
