// key collision
let a = Symbol('a');
let a2 = Symbol('a');
console.log(a === a2); // false

let obj = {};
obj[a] = 1;
obj[a2] = 2;
obj.a = 3;
obj.a = 4;

console.log(obj[a]); // 1

// Both descriptors are 'a', but Symbols are still unique.
// Regular string key 'a' is not unique; can be overwritten.
console.log(obj); // { a: 4, [Symbol(a)]: 1, [Symbol(a)]: 2 }

console.log(Object.keys(obj)); // [ 'a' ]
console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(a), Symbol(a) ]

console.log(Object.getOwnPropertyNames(Symbol));
// Note iterator and asyncIterator
// [
//   'length',      'name',
//   'prototype',   'for',
//   'keyFor',      'asyncIterator',
//   'hasInstance', 'isConcatSpreadable',
//   'iterator',    'match',
//   'matchAll',    'replace',
//   'search',      'species',
//   'split',       'toPrimitive',
//   'toStringTag', 'unscopables'
// ]

console.log(Object.getOwnPropertySymbols(Array.prototype));
// [ Symbol(Symbol.iterator), Symbol(Symbol.unscopables) ]
