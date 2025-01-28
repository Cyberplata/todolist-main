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
var filterArray = function (array, predicate) {
   return array.filter(predicate)
}
// Пример 1: Фильтрация чисел
var numbers = [1, 2, 3, 4, 5]
var isEven = function (num) {
   return num % 2 === 0
}
var result = filterArray(numbers, isEven)
console.log(result) // [2, 4]
// Пример 2: Фильтрация строк
var words = ["hello", "world", "typescript"]
var startsWithT = function (word) {
   return word.startsWith("t")
}
var result2 = filterArray(words, startsWithT)
console.log(result2) // ["typescript"]
