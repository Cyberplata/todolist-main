import AddBoxIcon from "@mui/icons-material/AddBox"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { ChangeEvent, KeyboardEvent, memo, useState } from "react"
import { filterButtonContainerSx } from "../../../features/todolists/ui/Todolists/Todolist/FilterTasksButtons/FilterTasksButtons.styles"
import { AddItemForm, type Props } from "./AddItemForm"

// ----- AddItemFormStory -----
const meta = {
  title: "Todolists/AddItemForm", // Название папки/Название подпапки
  component: AddItemForm,
  parameters: {
    // Это свойства, которые позволяют сохранять нам статические данные нашей компоненты
    layout: "centered",
  },
  tags: ["autodocs"], // Создаёт папку Документация
  argTypes: {
    // Предназначен, чтобы писать свойства, которые заданы неявно и ограничить значение пропсов
    addItem: {
      description: "Button clicked inside form",
    },
  },
  args: { addItem: fn() }, // Основное свойство, в котором мы задаём пропсы для нашей компоненты.
  // Самое важное, что когда мы создаём эти пропсы args они попадают во все наши Истории Сторибуковские
} satisfies Meta<typeof AddItemForm> // Протипизировать можно сверху либо здесь -> meta:Meta<typeof AddItemForm>

export default meta
type Story = StoryObj<typeof meta>

export const AddItemFormStory: Story = {}

// ----- AddItemFormWithErrorStory -----
const AddItemFormWithError = memo(({ addItem }: Props) => {
  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>("Title is required")

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
    if (error !== null) {
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
      />

      <IconButton onClick={addItemHandler} color={"primary"}>
        <AddBoxIcon />
      </IconButton>
    </Box>
  )
})

export const AddItemFormWithErrorStory = {
  // Ещё способ создавать истории через метод render() и передачу args
  render: (args: Props) => <AddItemFormWithError addItem={args.addItem} />,
}
// Time 43:54 - https://www.youtube.com/watch?v=0U_isB5xkoU
