// 1. Задача
// Реализация универсального фильтра в массиве
// Напиши дженериковую функцию filterArray, которая принимает массив элементов любого типа и функцию-предикат(predicate) ✳️, а возвращает новый массив, состоящий только из элементов, которые удовлетворяют условию предиката.
//
// ✳️ Функция-предикат - это функция, которая в результате своего выполнения возвращает булево значение
//
// Требования
// Функция должна быть дженериковой и работать с массивами любого типа.
//    Функция-предикат принимает элемент массива и возвращает boolean.
//    Если ни один элемент массива не удовлетворяет условию, функция должна возвращать пустой массив.

// const filterArray = <T>(array: T[], predicate: (val: T) => boolean) => {
//    return array.filter(predicate)
// }
//
// // Пример 1: Фильтрация чисел
// const numbers = [1, 2, 3, 4, 5]
// const isEven = (num: number) => num % 2 === 0
//
// const result = filterArray(numbers, isEven)
// console.log(result) // [2, 4]
//
// // Пример 2: Фильтрация строк
// const words = ["hello", "world", "typescript"]
// const startsWithT = (word: string) => word.startsWith("t")
//
// const result2 = filterArray(words, startsWithT)
// console.log(result2) // ["typescript"]


// // 2. Задача (2 дженерика)
// // Универсальная функция преобразования элементов массива
// // Напиши дженериковую функцию mapArray, которая принимает массив элементов любого типа и функцию-преобразователь (transform), применяет ее к каждому элементу массива и возвращает новый массив с результатами преобразований.
//
// const mapArray = <T, D>(array: T[], transform: (val: T) => D): D[] => {
//    return array.map(transform)
// }
//
// // Пример 1: Преобразование чисел в строки
// const numbers = [1, 2, 3, 4]
// const transformNumberToString = (num: number) => `Number: ${num}`
//
// const result = mapArray(numbers, transformNumberToString)
// console.log(result) // ["Number: 1", "Number: 2", "Number: 3", "Number: 4"]
//
// // Пример 2: Преобразование строк в их длины
// const words = ['hello', 'world', 'typescript']
// const getLength = (word: string) => word.length
//
// const lengthResults = mapArray(words, getLength)
// console.log(lengthResults) // [5, 5, 10]
//
// // Пример 3: Преобразование объектов в строки
// type Person = { name: string; age: number }
// const people: Person[] = [
//    { name: 'Alice', age: 25 },
//    { name: 'Bob', age: 30 },
// ]
// const toDescription = (person: Person) => `${person.name} is ${person.age} years old`
//
// const descriptions = mapArray(people, toDescription)
// console.log(descriptions) // ["Alice is 25 years old", "Bob is 30 years old"]

// // 3. Фильтрация и преобразование
// // Напишите функцию filterAndMap, которая:
// //
// // Принимает массив элементов типа T, функцию-предикат (val: T) => boolean и функцию-преобразователь (val: T) => D.
// //    Возвращает массив элементов типа D, преобразованных только из тех элементов, которые прошли проверку предикатом.
// //    Пример:

const filterAndMap = <T, D>(array: T[], predicate: (val: T) => boolean, transform: (val: T) => D): D[] => {
   return array.filter(predicate).map(transform)
}

const numbers = [1, 2, 3, 4, 5];
const isOdd = (num: number) => num % 2 !== 0;
const numberToString = (num: number) => `Odd number: ${num}`;
const result = filterAndMap(numbers, isOdd, numberToString);
console.log(result); // ["Odd number: 1", "Odd number: 3", "Odd number: 5"]