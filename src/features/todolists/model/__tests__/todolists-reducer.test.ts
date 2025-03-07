import {
   addTodolistAC,
   changeTodolistFilterAC,
   removeTodolistAC,
   todolistsReducer,
   updateTodolistTitleAC,
   type DomainTodolist,
} from "../todolists-reducer"
import { v1 } from "uuid"

let todolistId1: string
let todolistId2: string

let startState: DomainTodolist[]

beforeEach(() => {
   todolistId1 = v1()
   todolistId2 = v1()

   // 1. Стартовый state
   startState = [
      {
         id: todolistId1,
         title: "What to learn",
         addedDate: "2024-12-17T00:00:00.000Z",
         order: 0,
         filter: "all",
         entityStatus: "idle",
      },
      {
         id: todolistId2,
         title: "What to buy",
         addedDate: "2024-12-17T00:00:00.000Z",
         order: 1,
         filter: "all",
         entityStatus: "idle",
      },
   ]
})

test("correct todolist should be removed", () => {
   // 2. Действие
   const endState = todolistsReducer(startState, removeTodolistAC({ todolistId: todolistId1 }))

   // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
   // в массиве останется один тудулист
   expect(endState.length).toBe(1)
   // удалится нужный тудулист, а не любой
   expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
   const newTitle = "New Todolist"
   const newTodolist = {
      id: "todolistId3",
      title: newTitle,
      addedDate: "2024-12-17T00:00:00.000Z",
      order: 2,
   }

   // const endState = todolistsReducer(startState, addTodolistAC(newTitle))
   const endState = todolistsReducer(startState, addTodolistAC({ todolist: newTodolist }))

   expect(endState.length).toBe(3)
   expect(endState[2].title).toBe(newTodolist.title)
   // expect(endState[2].title).toBe(action.payload.title)
})

test("correct todolist should change its name", () => {
   const newTitle = "New Todolist"

   const endState = todolistsReducer(
      startState,
      updateTodolistTitleAC({
         todolistId: todolistId2,
         title: newTitle,
      }),
   )

   expect(endState[0].title).toBe("What to learn")
   expect(endState[1].title).toBe(newTitle)
   // expect(endState[1].title).toBe(action.payload.title)
})

test("correct filter of todolist should be changed", () => {
   const newFilter = "completed"

   const endState = todolistsReducer(
      startState,
      changeTodolistFilterAC({
         todolistId: todolistId2,
         filter: newFilter,
      }),
   )

   expect(endState[0].filter).toBe("all")
   expect(endState[1].filter).toBe(newFilter)
})
