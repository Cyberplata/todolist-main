import { TaskPriority, TaskStatus } from "../../lib/enums"
import {
   addTaskAC,
   changeTaskStatusAC,
   changeTaskTitleAC,
   removeTaskAC,
   tasksReducer,
   type TasksStateType
} from "../tasks-reducer"
import { addTodolistAC, removeTodolistAC } from "../todolists-reducer"

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

test("correct task should be deleted from correct array", () => {
   const action = removeTaskAC({ todolistId: "todolistId2", taskId: "2" })

   const endState = tasksReducer(startState, action)

   expect(endState).toEqual({
      todolistId1: [
         { id: "1", title: "CSS", isDone: false },
         { id: "2", title: "JS", isDone: true },
         { id: "3", title: "React", isDone: false },
      ],
      todolistId2: [
         { id: "1", title: "bread", isDone: false },
         { id: "3", title: "tea", isDone: false },
      ],
   })
})

test("correct task should be added to correct array", () => {
   const action = addTaskAC({ todolistId: "todolistId2", title: "juce" })

   const endState = tasksReducer(startState, action)

   // expect(endState.todolistId1.length).toBe(3)
   expect(endState["todolistId1"].length).toBe(3)
   expect(endState["todolistId2"].length).toBe(4)
   expect(endState["todolistId2"][0].id).toBeDefined()
   // expect(endState['todolistId2'][0].id).not.toBeUndefined()
   expect(endState["todolistId2"][0].title).toBe("juce")
   expect(endState["todolistId2"][0].isDone).toBe(false)
   // expect(endState['todolistId2'][0].isDone).toBeFalsy()
})

test("status of specified task should be changed", () => {
   const action = changeTaskStatusAC({ todolistId: "todolistId2", taskId: "2", status: false })

   const endState = tasksReducer(startState, action)

   expect(endState["todolistId2"][1].isDone).toBe(false)
   expect(endState["todolistId1"][1].isDone).toBe(true)
})

test("title of specified task should be changed", () => {
   const newTaskTitle = "New Task"

   const action = changeTaskTitleAC({ todolistId: "todolistId2", taskId: "2", title: newTaskTitle })

   const endState = tasksReducer(startState, action)

   expect(endState["todolistId2"][1].title).toBe(newTaskTitle)
   expect(endState["todolistId1"][1].title).toBe("JS")
})

test("new array should be added when new todolist is added", () => {
   const action = addTodolistAC("new todolist")

   const endState = tasksReducer(startState, action)

   const keys = Object.keys(endState)
   const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2")
   if (!newKey) {
      throw Error("new key should be added")
   }

   expect(keys.length).toBe(3)
   expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
   const action = removeTodolistAC("todolistId2")

   const endState = tasksReducer(startState, action)

   const keys = Object.keys(endState)

   expect(keys.length).toBe(1)
   expect(endState["todolistId2"]).not.toBeDefined()
   // expect(endState['todolistId2']).toBeUndefined()
})
