const deepEqual = function(a, b){

}

let a, b;
const arr = [1,2,3];

a = { id: 1 };
b = { id: 1 };
console.log(deepEqual(a, b));

a = { id: 1 };
b = { id: 2 };
console.log(deepEqual(a, b));

a = { id: 1 };
b = 1;
console.log(deepEqual(a, b));

a = { arr: arr, id: 1 };
b = { arr: arr, id: 1 };
console.log(deepEqual(a, b));

a = { arr: arr, id: 1 };
b = { arr: [1,2,3,4], id: 1 };
console.log(deepEqual(a, b));