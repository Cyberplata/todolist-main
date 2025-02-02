import type { AppDispatch } from "app/store"
import { setAppErrorAC, setAppStatusAC } from "app/app-reducer"

export const handleServerNetworkError = (error: { message: string }, dispatch: AppDispatch) => {
   dispatch(setAppErrorAC(error.message))
   dispatch(setAppStatusAC("failed"))
}

// https://ru.react-redux.js.org/api/batch/
// Если вы используете React 18, вам не нужно использовать batch. React 18 автоматически группирует все обновления состояния в независимо от их положения в очереди.

// import { batch } from 'react-redux'
//
// function myThunk() {
//   return (dispatch, getState) => {
//     // Должно привести только к одному комбинированному рендерингу, а не к двум
//     batch(() => {
//       dispatch(increment())
//       dispatch(increment())
//     })
//   }
// }
