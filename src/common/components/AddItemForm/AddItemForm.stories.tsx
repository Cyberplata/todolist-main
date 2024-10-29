import AddBoxIcon from "@mui/icons-material/AddBox";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import type {Meta, StoryObj} from "@storybook/react";
import {fn} from "@storybook/test";
import {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {
    filterButtonContainerSx
} from "../../../features/todolists/ui/Todolists/Todolist/FilterTasksButtons/FilterTasksButtons.styles";
import {AddItemForm, type Props} from "./AddItemForm";

// ----- AddItemFormStory -----
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Todolists/AddItemForm',
    component: AddItemForm,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        addItem: {
            description: 'Button clicked inside form'
        }
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: {addItem: fn()},
} satisfies Meta<typeof AddItemForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AddItemFormStory: Story = {}


// ----- AddItemFormWithErrorStory -----
const AddItemFormWithError = memo(({addItem}: Props) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>('Title is required')

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title.trim());
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (event.key === 'Enter') {
            addItemHandler();
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
                size='small'
                error={!!error}
                helperText={error}
            />

            <IconButton onClick={addItemHandler} color={'primary'}>
                <AddBoxIcon/>
            </IconButton>

        </Box>
    );
});

export const AddItemFormWithErrorStory = {
    // Ещё способ создавать истории через метод render() и передачу args
    render: (args: Props) => <AddItemFormWithError addItem={args.addItem}/>
}