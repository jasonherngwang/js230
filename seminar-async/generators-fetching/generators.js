const collection = {
  a: 10,
  b: 20,
  c: 30,
  
  [Symbol.iterator]: function* () {
    
    for (let key in this) {
      yield this[key];
    }
  }
}

const iterator = collection[Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
// { value: 10, done: false }
// { value: 20, done: false }
// { value: 30, done: false }
// { value: undefined, done: true }


// Example 2
function* dogGenerator() {
  const dogs = ['fido', 'spots', 'paws'];
  
  for (const dog of dogs) {
    yield dog
  }
}

const generator = dogGenerator(); // generator object
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
// fido
// spots
// paws
// undefined