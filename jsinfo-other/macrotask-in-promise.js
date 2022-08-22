let p = new Promise((res) => {
  console.log(1);
  setTimeout(() => console.log(2), 1000);
  res();
});

p.then(() => console.log(3));

setTimeout(() => console.log(4), 1000);

p.then(() => console.log(5));

console.log(6);

/*
Synchronous: console.log(1), console.log(6)
Microtasks: console.log(3), console.log(5)
Macrotasks: console.log(2), console.log(4)
*/
