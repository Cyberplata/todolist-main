export type Todolist = {
  id: string
  title: string
  addedDate: string
  order: number
}

// export type FieldError = {
//     error: string
//     field: string
// }
//
// export type Response<T = {}> = {
//     data: T
//     resultCode: number
//     messages: string[]
//     fieldsErrors: FieldError[]
// }

// type Data = {
//     item: Todolist
// }

// Эту типизацию заменили на type Response
// type CreateTodolistResponse = {
//     data: {
//         item: Todolist
//     }
//     resultCode: number
//     messages: string[]
//     fieldsErrors: FieldError[]
// }
//
// type DeleteTodolistResponse = {
//     data: {}
//     resultCode: number
//     messages: string[]
//     fieldsErrors: FieldError[]
// }

// Пример как использовать универсальный тип через дженерики и несколько параметров
// type Response<T, D, S> = {
//     data: T
//     resultCode: D
//     messages: S[]
//     fieldsErrors: FieldError[]
// }
//
// const a: Response<{}, number, string>

// Как можно объединять типы, если разные свойства-данные есть
// type BaseResponse = {
//     resultCode: number
//     messages: string[]
//     fieldsErrors: FieldError[]
// }
//
// type CreateTodolistResponse = BaseResponse & {
//     data1: {
//         item: Todolist
//     }
// }
// type RemoveTodolistResponse = BaseResponse & {
//     data2: {}
// }
