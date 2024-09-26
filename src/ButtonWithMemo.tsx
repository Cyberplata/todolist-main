// вариант Валеры
import {ButtonProps} from "@mui/material/Button";
import Button from "@mui/material/Button";
import {memo} from "react";

type ButtonWithMemoPropsType = ButtonProps & {}

export const ButtonWithMemo = memo(({...props}: ButtonWithMemoPropsType) => {
    return <Button
        /*как вариант вообще оставить одни ...props*/
        // variant={props.variant}
        // onClick={props.onClick}
        // color={props.color}
        {...props}
    >{props.title}</Button>
})