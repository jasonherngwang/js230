// Promise.allSettled
const p1 = Promise.resolve(1);
const p2 = new Promise((res, rej) => setTimeout(reject, 100, 'foo'));
const p = [p1, p2];

Promise.allSettled(p).then((results) => 
  results.forEach(res => console.log(res.status, res.value)))
// fulfilled 1
// rejected undefined