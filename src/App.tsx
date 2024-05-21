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

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])

    // const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskId: string) => {
        const filteredTasks = tasks.filter((task) => {
            return task.id !== taskId
        })
        setTasks(filteredTasks)
    }

    const addTask = (title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
        const newState = tasks.map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
        setTasks(newState)
    }
    //	{id, title, filter, filter:'completed'} === {...el}
    // [[]] убираем лишний массив, так как map и так создаёт новый массив
    const changeFilter = (todolistId: string, filterValue: FilterValuesType) => {
        setTodolists(todolists.map(
            el => el.id === todolistId
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
                let tasksForTodolist = tasks
                if (el.filter === 'active') {
                    tasksForTodolist = tasks.filter(task => !task.isDone)
                }
                if (el.filter === 'completed') {
                    tasksForTodolist = tasks.filter(task => task.isDone)
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
