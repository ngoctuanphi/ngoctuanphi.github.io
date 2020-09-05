
// // 1. khai bien, ham
// // 3 tu khoa khai bao bien: var, let, const
// // undefined, null, NaN
// let und = undefined
// let nu = null
// let n = NaN
// let message = "Hello world!"
// console.log(message)

// let condition = true
// console.log(condition)

// let number = 10.5
// number = number + 10
// console.log(number)

// let array = [ 1, 2, 3 ]
// console.log(array)

// let object = {
//   name: "Nguyen Van A",
//   age: 20,
//   address: "Hà Nội"
// }
// console.log(object)

// // 2. Khai bao ham
// // chuoi: dung '' hoac "" hoac ``
// let sayHelloFunction = function() {
//   let ageString = prompt("How old are you:") // = "abc"
//   let age = parseInt(ageString) // = ??
//   console.log(age)
//   if(age > 60) {
//     alert("Old")
//   } else if(age > 20) {
//     alert("Common")
//   } else if(age > 0) {
//     alert("Young")
//   } else {
//     alert("Not an age!")
//   }
// }

// // sayHelloFunction()

// // 3. fori, forof, forin
// var arr = [2, 4, 1, 8] // length = 4

// for(let i = 0; i < arr.length; i++) {
//   console.log(arr[i])
// }

// for(let value of arr) {
//   console.log(value)
// }

// 4. object
let object = {
  name: "Nguyen Van A",
  gender: "male",
  age: 20,
  printName() {
    console.log(object.name)
  }
}
let marks = {
  'Nguyễn Ngọc Tuấn': 5,
  'Nguyễn Thế Linh': 5
}
// for(let key of Object.keys(marks)) {
//   console.log('key: ' + key)
//   console.log('value: ' + marks[key])
// }
// 5. array
let array = [2, 4, 6]
// array['functionName'](function(element, index) {
//   return 'something'
// })
// .forEach: luot qua tat ca phan tu
// .map: bien doi array
// .find/.findIndex: tim phan tu/vi tri
// .filter: loc mang
array.forEach(function(element, index) {
  console.log("element: " + element)
  console.log("index: " + index)
})
console.log(array.map(function(element) { // [2, 4, 6] >>> [4, 8, 12]
  return element * 2
}))
console.log(array.filter(function(element) { // [2, 4, 6] >>> [4, 6]
  return element >= 4
}))
// 6. string
// '', "", ``
let str = 'Nguyễn Thế Linh'
console.log(str.toLowerCase()) // "nguyễn thế linh"
console.log(str.toUpperCase()) // "NGUYỄN THẾ LINH"
console.log('    a b    \t\n'.trim()) // "a b"
console.log(str.substring(0, 6)) // "Nguyễn"
console.log(str.split(' ')) // ["Nguyễn", "Thế", "Linh"]
console.log(str.split('')) // ["N", "g", "u", "y"...]
// 7. number
parseInt('1') // 1
parseInt(10.5) // 10
parseInt('aa') // NaN
parseFloat('10.5') // 10.5
Math.sin(Math.PI / 2)
Math.floor(10.5) // 10
Math.ceil(10.5) // 11

// 8. typeof
console.log(typeof 1) // number
console.log(typeof [1, 2]) // object
console.log(typeof { a: 1 }) // object

// 9. instanceof
console.log({ a: 1 } instanceof Array) // false
console.log([1, 2] instanceof Array) // true
console.log(1 instanceof Object) // false
console.log({ a: 1 } instanceof Object) // true