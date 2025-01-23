// // Примерно такая структура создаётся на бэкэнде
// export enum TaskStatus {
//     notReady = 0,
//     part = 1,
//     done = 2,
// }
//
// // const a = TaskStatus.done // 2

export enum TaskStatus {
   New = 0,
   InProgress = 1,
   Completed = 2,
   Draft = 3,
}

// // Тоже самое, что и enum нельзя изменять поля
// export const TaskStatus2 = {
//    New: 0,
//    InProgress: 1,
//    Completed: 2,
//    Draft: 3,
// } as const

export enum TaskPriority {
   Low = 0,
   Middle = 1,
   Hi = 2,
   Urgently = 3,
   Later = 4,
}

export enum ResultCode {
   Success = 0, // запрос успешно прошел
   Error = 1, // произошла ошибка
   CaptchaError = 10, // captcha ошибка
}
