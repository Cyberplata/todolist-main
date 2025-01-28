import { addTodolistAC, todolistsReducer, type DomainTodolist } from "../todolists-reducer"
import { tasksReducer, type TasksStateType } from "../tasks-reducer"

test("ids should be equals", () => {
   const startTasksState: TasksStateType = {}
   const startTodolistsState: Array<DomainTodolist> = []

   const newTitle = "New Todolist"
   const newTodolist = {
      id: "todolistId3",
      title: newTitle,
      addedDate: "2024-12-17T00:00:00.000Z",
      order: 2,
   }

   // const action = addTodolistAC("new todolist")
   const action = addTodolistAC({ todolist: newTodolist })

   // Прогоняем оба редьюсера
   const endTasksState = tasksReducer(startTasksState, action)
   const endTodolistsState = todolistsReducer(startTodolistsState, action)

   // Достаём id из задач и тудулистов
   const keys = Object.keys(endTasksState) // ['todolistId3']
   const idFromTasks = keys[0] // 'todolistId3'
   const idFromTodolists = endTodolistsState[0].id // 'todolistId3'

   // Проверяем, что id совпадают
   expect(idFromTasks).toBe(action.payload.todolist.id)
   expect(idFromTodolists).toBe(action.payload.todolist.id)
})
