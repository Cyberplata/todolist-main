import { TaskPriority, TaskStatus } from "../../lib/enums"
import {
   addTaskAC,
   changeTaskStatusAC,
   changeTaskTitleAC,
   removeTaskAC,
   tasksReducer,
   type TasksStateType
} from "../tasks-reducer"
import { addTodolistAC, type DomainTodolist, removeTodolistAC, type Todolist } from "../todolists-reducer"

let startState: TasksStateType

beforeEach(() => {
   startState = {
      todolistId1: [
         {
            id: "1",
            title: "CSS",
            status: TaskStatus.New,
            todoListId: "todolistId11",
            addedDate: "10.01.1995",
            deadline: "sss",
            description: "let's go",
            order: 0,
            startDate: "29.01.2024",
            priority: TaskPriority.Low
         },
         {
            id: "2",
            title: "JS",
            status: TaskStatus.Completed,
            todoListId: "todolistId22",
            addedDate: "11.02.1996",
            deadline: "fff",
            description: "let's go",
            order: 1,
            startDate: "30.01.2024",
            priority: TaskPriority.Low
         },
         {
            id: "3",
            title: "React",
            status: TaskStatus.New,
            todoListId: "todolistId33",
            addedDate: "12.03.1997",
            deadline: "ggg",
            description: "let's go",
            order: 2,
            startDate: "31.01.2024",
            priority: TaskPriority.Low
         }
      ],
      todolistId2: [
         {
            id: "1",
            title: "bread",
            status: TaskStatus.New,
            todoListId: "todolistId11",
            addedDate: "10.01.1995",
            deadline: "sss",
            description: "let's go",
            order: 0,
            startDate: "29.01.2024",
            priority: TaskPriority.Low
         },
         {
            id: "2",
            title: "milk",
            status: TaskStatus.Completed,
            todoListId: "todolistId22",
            addedDate: "11.02.1996",
            deadline: "fff",
            description: "let's go",
            order: 1,
            startDate: "30.01.2024",
            priority: TaskPriority.Hi
         },
         {
            id: "3",
            title: "tea",
            status: TaskStatus.New,
            todoListId: "todolistId33",
            addedDate: "12.03.1997",
            deadline: "ggg",
            description: "let's go",
            order: 2,
            startDate: "31.01.2024",
            priority: TaskPriority.Low
         }
      ]
   }
})

// beforeEach(() => {
//    startState = {
//       todolistId1: [
//          { id: "1", title: "CSS", isDone: false },
//          { id: "2", title: "JS", isDone: true },
//          { id: "3", title: "React", isDone: false },
//       ],
//       todolistId2: [
//          { id: "1", title: "bread", isDone: false },
//          { id: "2", title: "milk", isDone: true },
//          { id: "3", title: "tea", isDone: false },
//       ],
//    }
// })

test("correct task should be deleted from correct array", () => {
   const action = removeTaskAC({ todolistId: "todolistId2", taskId: "2" })

   const endState = tasksReducer(startState, action)

   expect(endState).toEqual({
      todolistId1: [
         {
            id: "1",
            title: "CSS",
            status: TaskStatus.New,
            todoListId: "todolistId11",
            addedDate: "10.01.1995",
            deadline: "sss",
            description: "let's go",
            order: 0,
            startDate: "29.01.2024",
            priority: TaskPriority.Low
         },
         {
            id: "2",
            title: "JS",
            status: TaskStatus.Completed,
            todoListId: "todolistId22",
            addedDate: "11.02.1996",
            deadline: "fff",
            description: "let's go",
            order: 1,
            startDate: "30.01.2024",
            priority: TaskPriority.Low
         },
         {
            id: "3",
            title: "React",
            status: TaskStatus.New,
            todoListId: "todolistId33",
            addedDate: "12.03.1997",
            deadline: "ggg",
            description: "let's go",
            order: 2,
            startDate: "31.01.2024",
            priority: TaskPriority.Low
         }
      ],
      todolistId2: [
         {
            id: "1",
            title: "bread",
            status: TaskStatus.New,
            todoListId: "todolistId11",
            addedDate: "10.01.1995",
            deadline: "sss",
            description: "let's go",
            order: 0,
            startDate: "29.01.2024",
            priority: TaskPriority.Low
         },
         {
            id: "3",
            title: "tea",
            status: TaskStatus.New,
            todoListId: "todolistId33",
            addedDate: "12.03.1997",
            deadline: "ggg",
            description: "let's go",
            order: 2,
            startDate: "31.01.2024",
            priority: TaskPriority.Low
         }
      ]
   })
})

test("correct task should be added to correct array", () => {
   const newTask = {
      id: "4",
      title: "juce",
      status: TaskStatus.New,
      todoListId: "todolistId2",
      addedDate: "12.12.2024",
      deadline: null,
      description: null,
      order: 0,
      startDate: null,
      priority: TaskPriority.Low
   }

   const action = addTaskAC({ task: newTask }) // Теперь передаём целый объект task

   const endState = tasksReducer(startState, action)

   expect(endState["todolistId1"].length).toBe(3) // В todolistId1 ничего не изменилось
   expect(endState["todolistId2"].length).toBe(4) // В todolistId2 добавилась одна новая задача
   expect(endState["todolistId2"][0].id).toBe(newTask.id) // Проверяем, что id новой задачи соответствует
   expect(endState["todolistId2"][0].title).toBe(newTask.title) // Проверяем title
   expect(endState["todolistId2"][0].status).toBe(newTask.status) // Проверяем статус
})

test("status of specified task should be changed", () => {
   const newTask = {
      id: "2",
      title: "juce",
      status: TaskStatus.New,
      todoListId: "todolistId2",
      addedDate: "12.12.2024",
      deadline: null,
      description: null,
      order: 0,
      startDate: null,
      priority: TaskPriority.Low
   }

   const action = changeTaskStatusAC({ task: newTask })

   const endState = tasksReducer(startState, action)

   expect(endState["todolistId2"][1].status).toBe(TaskStatus.New)
   expect(endState["todolistId1"][1].status).toBe(TaskStatus.Completed)
})

test("title of specified task should be changed", () => {
   const newTaskTitle = "New Task"
   const newTask = {
      id: "2",
      title: newTaskTitle,
      status: TaskStatus.New,
      todoListId: "todolistId2",
      addedDate: "12.12.2024",
      deadline: null,
      description: null,
      order: 0,
      startDate: null,
      priority: TaskPriority.Low
   }

   // const action = changeTaskTitleAC({ todolistId: "todolistId2", taskId: "2", title: newTaskTitle })
   const action = changeTaskTitleAC({ task: newTask })

   const endState = tasksReducer(startState, action)

   expect(endState["todolistId2"][1].title).toBe(newTask.title)
   expect(endState["todolistId1"][1].title).toBe("JS")
})

test("new array should be added when new todolist is added", () => {
   const newTodolist: Todolist = {
      id: "todolistId3", // <-- уникальный ID
      title: "New Todolist",
      addedDate: "2024-12-17T00:00:00.000Z",
      order: 0
   }

   // const action = addTodolistAC("new todolist")
   const action = addTodolistAC({ todolist: newTodolist })

   const endState = tasksReducer(startState, action)

   // получает все ключи объекта endState - ["todolistId1", "todolistId2", "todolistId3"]
   const keys = Object.keys(endState)
   const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2") // Находит новый ключ, который не был в начальном startState ("todolistId3")
   if (!newKey) {
      throw Error("new key should be added")
   }

   expect(keys.length).toBe(3) // Проверяет, что ключей стало 3, то есть был добавлен новый тудулист
   expect(endState[newTodolist.id]).toEqual([]) // Убеждается, что по новому ключу лежит пустой массив, так как новый тудулист ещё не содержит задач.
})

test("property with todolistId should be deleted", () => {
   const action = removeTodolistAC({ todolistId: "todolistId2" })

   const endState = tasksReducer(startState, action)

   const keys = Object.keys(endState)

   expect(keys.length).toBe(1)
   expect(endState["todolistId2"]).not.toBeDefined()
   // expect(endState['todolistId2']).toBeUndefined()
})
