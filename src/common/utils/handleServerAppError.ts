import type { AppDispatch } from "app/store"
import { BaseResponse } from "common/types"
import { setAppErrorAC, setAppStatusAC } from "app/app-reducer"

// Вот зачем нужны джейнерик функции
// Для addTaskTC, updateTaskTC вот такой тип в res.data -> BaseResponse<{item: DomainTask}>
// Для addTodolistTC -> BaseResponse<{item: Todolist}>
// Для deleteTaskTC -> BaseResponse

// ❌
// Вот так плохо писать
// export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: AppDispatch) => {

// ✅
export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: AppDispatch) => {
   if (data.messages.length) {
      dispatch(setAppErrorAC(data.messages[0]))
   } else {
      dispatch(setAppErrorAC("Some error occurred"))
   }
   dispatch(setAppStatusAC("failed"))
   // res.data.messages.length ? dispatch(setAppErrorAC(res.data.messages[0])) : dispatch(setAppErrorAC('Some error occurred'))
}
