import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string,
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, setTasks] = useState({
        // [], а не "" потому что нужно чтобы он сразу сгенерировал айдишку v1() и результат завернул в "" -> "xasdsasdasdnhzx12", а не стрингу "todolistID1"
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
    })

    // const [tasks, setTasks] = useState<TaskType[]>([
    //     {id: v1(), title: 'HTML&CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'ReactJS', isDone: false},
    // ])
    // const [filter, setFilter] = useState<FilterValuesType>('all')
    // filter(todolistId !== taskId)
    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]:tasks[todolistId].filter(el => el.id !== taskId)})

        // const filteredTasks = tasks.filter((task) => {
        //     return task.id !== taskId
        // })
        // setTasks(filteredTasks)
    }
    const addTask = (title: string) => {
        // const newTask = {
        //     id: v1(),
        //     title: title,
        //     isDone: false
        // }
        // const newTasks = [newTask, ...tasks]
        // setTasks(newTasks)
    }
    const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
        // const newState = tasks.map(t =>
        //     t.id == taskId
        //         ? {...t, isDone: taskStatus}
        //         : t
        // )
        // setTasks(newState)
    }
    //	{id, title, filter, filter:'completed'} === {...el}
    // [[]] убираем лишний массив, так как map и так создаёт новый массив
    const changeFilter = (todolistId: string, filterValue: FilterValuesType) => {
        setTodolists(todolists.map(el =>
            el.id === todolistId
                ? {...el, filter: filterValue}
                : el
        ))
        // const currentTodolist = todolists.find(el => el.id === todolistId)
        // console.log(currentTodolist)
        // if (currentTodolist) {
        // 	currentTodolist.filter = filterValue
        // 	setTodolists([...todolists]) // Передаём новый массив-матрёшек, чтобы реакт проснулся
        // 	// console.log(todolists)
        // }
    }

    return (
        <div className="App">
            {todolists.map((el) => {
                let tasksForTodolist = tasks[el.id]
                if (el.filter === 'active') {
                    tasksForTodolist = tasks[el.id].filter(task => !task.isDone)
                }
                if (el.filter === 'completed') {
                    tasksForTodolist = tasks[el.id].filter(task => task.isDone)
                }
                return <Todolist
                    key={el.id}
                    todolistId={el.id}
                    title={el.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={el.filter}
                />
            })}

        </div>
    );
}

export default App;
