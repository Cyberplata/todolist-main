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
		{ id: v1(), title: 'What to learn', filter: 'all' },
		{ id: v1(), title: 'What to buy', filter: 'all' },
	])

	const [tasks, setTasks] = useState<TaskType[]>([
		{id: v1(), title: 'HTML&CSS', isDone: true},
		{id: v1(), title: 'JS', isDone: true},
		{id: v1(), title: 'ReactJS', isDone: false},
	])

	const [filter, setFilter] = useState<FilterValuesType>('all')

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

	const changeFilter = (filter: FilterValuesType) => {
		setFilter(filter)
	}

	const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
		const newState = tasks.map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
		setTasks(newState)
	}

	let tasksForTodolist = tasks
	if (filter === 'active') {
		tasksForTodolist = tasks.filter(task => !task.isDone)
	}

	if (filter === 'completed') {
		tasksForTodolist = tasks.filter(task => task.isDone)
	}

	// const arr = [
	// 	{title: "What to learn-0"},//0
	// 	{title: "What to learn-1"},//1
	// 	{title: "What to learn-2"},//2
	// 	{title: "What to learn-3"},//3
	// ];



	return (
		<div className="App">
			{todolists.map((el) => {
				return <Todolist
					key={el.id}
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
