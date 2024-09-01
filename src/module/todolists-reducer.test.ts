import {addTodolistAC, changeFilterAC, removeTodolistAC, todolistsReducer, changeTodolistTitleAC} from './todolists-reducer'
import {v1} from 'uuid'
import {TodolistType} from '../app/App'

let todolistId1: string
let todolistId2: string

let startState: TodolistType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    // 1. Стартовый state
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
})

test('correct todolist should be removed', () => {

    // 2. Действие
    // const action = {
    //     type: 'REMOVE-TODOLIST',
    //     payload: {
    //         id: todolistId1,
    //     },
    // } as const

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    // let todolistId1 = v1()
    // let todolistId2 = v1()
    //
    // const startState: TodolistType[] = [
    //     { id: todolistId1, title: 'What to learn', filter: 'all' },
    //     { id: todolistId2, title: 'What to buy', filter: 'all' },
    // ]

    // const action = {
    //     type: 'ADD-TODOLIST',
    //     payload: {
    //         title: 'New Todolist',
    //     },
    // } as const

    const newTitle = 'New Todolist'

    const endState = todolistsReducer(startState, addTodolistAC(newTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTitle)
    // expect(endState[2].title).toBe(action.payload.title)
})

test('correct todolist should change its name', () => {
    // let todolistId1 = v1()
    // let todolistId2 = v1()
    //
    // const startState: TodolistType[] = [
    //     { id: todolistId1, title: 'What to learn', filter: 'all' },
    //     { id: todolistId2, title: 'What to buy', filter: 'all' },
    // ]

    // const action = {
    //     type: 'CHANGE-TODOLIST-TITLE',
    //     payload: {
    //         id: todolistId2,
    //         title: 'New Todolist',
    //     },
    // } as const

    const newTitle = 'New Todolist'

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2,newTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTitle)
    // expect(endState[1].title).toBe(action.payload.title)
})

test('correct filter of todolist should be changed', () => {
    // let todolistId1 = v1()
    // let todolistId2 = v1()
    //
    // const startState: TodolistType[] = [
    //     { id: todolistId1, title: 'What to learn', filter: 'all' },
    //     { id: todolistId2, title: 'What to buy', filter: 'all' },
    // ]

    // const action = {
    //     type: 'CHANGE-TODOLIST-FILTER',
    //     payload: {
    //         id: todolistId2,
    //         filter: 'completed',
    //     },
    // } as const

    const newFilter = 'completed'

    const endState = todolistsReducer(startState, changeFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})