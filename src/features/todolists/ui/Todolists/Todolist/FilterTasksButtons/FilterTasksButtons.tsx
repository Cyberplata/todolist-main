import Box from "@mui/material/Box";
import React, {useCallback} from 'react';
import {ButtonWithMemo} from "../../../../../../common/components/ButtonWithMemo/ButtonWithMemo";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";
import {changeTodolistFilterAC, type FilterValuesType, type TodolistType} from "../../../../model/todolists-reducer";
import {filterButtonContainerSx} from "./FilterTasksButtons.styles";

type Props = {
    todolist: TodolistType
}

export const FilterTasksButtons = ({todolist}: Props) => {
    console.log("FilterTasksButtons is called")

    const {filter, id} = todolist

    const dispatch = useAppDispatch()


    const changeFilterTasksHandler = useCallback((filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({todolistID: id, filter}))
    }, [changeTodolistFilterAC, id])


    return (
        <Box sx={filterButtonContainerSx}>
            <ButtonWithMemo variant={filter === 'all' ? 'outlined' : 'contained'}
                            color={"inherit"}
                            onClick={() => changeFilterTasksHandler('all')}
                            title={"All"}
            />
            <ButtonWithMemo variant={filter === 'active' ? 'outlined' : 'contained'}
                            color={"primary"}
                            onClick={() => changeFilterTasksHandler('active')}
                            title={"Active"}
            />
            <ButtonWithMemo variant={filter === 'completed' ? 'outlined' : 'contained'}
                            color={"secondary"}
                            onClick={() => changeFilterTasksHandler('completed')}
                            title={"Completed"}
            />
        </Box>
    );
};

// // вариант Валеры
// type ButtonWithMemoPropsType = ButtonProps & {}
//
// const ButtonWithMemo = ({...props}: ButtonWithMemoPropsType) => {
//     return <Button
//         variant={props.variant}
//         onClick={props.onClick}
//         color={props.color}
//         {...props}
//     >{props.title}</Button>
// }