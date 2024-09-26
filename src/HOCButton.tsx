import React, {memo, useCallback} from 'react';
import Button from "@mui/material/Button";
import {filterButtonContainerSx} from "./Todolist.styles";
import Box from "@mui/material/Box";
import {FilterValuesType} from "./app/App";

export type HocButtonType = {
    filter: FilterValuesType
    changeFilter: (todolistId: string, filterValue: FilterValuesType) => void
    todolistId: string
}

export const HocButton = memo((props: HocButtonType) => {
    const {filter, changeFilter, todolistId} = props

    const onAllClickHandler = useCallback(() => changeFilter(todolistId, 'all'), [changeFilter, todolistId])
    const onActiveClickHandler = useCallback(() => changeFilter(todolistId, 'active'), [changeFilter, todolistId])
    const onCompletedClickHandler = useCallback(() => changeFilter(todolistId, 'completed'), [changeFilter, todolistId])

    return (
        <Box sx={filterButtonContainerSx}>
            <Button variant={filter === 'all' ? 'outlined' : 'contained'}
                    // color={"success"}
                    color={"inherit"}
                    onClick={onAllClickHandler}
            >All</Button>
            <Button variant={filter === 'active' ? 'outlined' : 'contained'}
                    color={"primary"}
                    onClick={onActiveClickHandler}
            >Active</Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'contained'}
                    color={"secondary"}
                    onClick={onCompletedClickHandler}
            >Completed</Button>
        </Box>
    );
});