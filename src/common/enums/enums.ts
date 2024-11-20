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

export enum TaskPriority {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}
