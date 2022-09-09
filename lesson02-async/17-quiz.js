// Question 11
// let p = new Promise((resolve, reject) => {
//   let value = Math.random();
//   if (value < 0.75) {
//     resolve(value);
//   } else {
//     reject(value);
//   }
// });

// let p = Promise.resolve(1);

// Doesn't work as expected; `p` is still a pending promise at this point.
// async function showResult(p) {
//   try {
//     console.log(`In range: ${p}`);
//   } catch (error) {
//     console.log(`Out of range: ${error}`);
//   }
// }

// showResult(p); // In range: [object Promise]

// Works
// async function showResult(p) {
//   try {
//     console.log(`In range: ${await p}`);
//   } catch (error) {
//     console.log(`Out of range: ${error}`);
//   }
// }

// showResult(p);

// Using then
// p.then((r) => console.log(r));

// Question 16
// let obj = {
//   names: ['Sue', 'Kim', 'Bob'],
//   [Symbol.iterator]() {
//     return {
//       list: this.names,
//       index: this.names.length,
//       next() {
//         if (this.index === 0) return { done: true };
//         this.index -= 1;
//         return {
//           done: false,
//           value: this.list[this.index],
//         };
//       },
//     };
//   },
// };

// console.log([...obj]); // ['Bob', 'Kim', 'Sue']

let objAsync = {
  names: ['Sue', 'Kim', 'Bob'],
  [Symbol.asyncIterator]() {
    return {
      list: this.names,
      index: this.names.length,
      next() {
        if (this.index === 0) return { done: true };
        this.index -= 1;
        return {
          done: false,
          value: this.list[this.index],
        };
      },
    };
  },
};

console.log([...objAsync]); // ['Bob', 'Kim', 'Sue']
