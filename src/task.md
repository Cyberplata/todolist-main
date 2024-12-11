        03Sprint-2week-add Redux for App.tsx and Todolist.tsx

1. Не понял, откуда Redux знает про initialState: TasksStateType и initialState: DomainTodolist[], если мы передаём туда пустой объект и массив соответственно. Я имею в виду, что когда идёт уже добавление тудулиста в поле инпут и тасок (а не про первую отрисовку), откуда он знает, что нужно добавить? Ведь раньше у нас стейт был описан в редюсерах и в App.tsx. А теперь у нас его нет в App, есть только типизация DomainTodolist[] и TasksStateType, если по ней перейти, то нас перебросит в App.tsx, с которым мы уже не работаем же?

        04Sprint-2week-add Санки
2. Как понять откуда из UI нужно обращаться к уровню DAL когда мы делаем dispatch thunkCreator?
