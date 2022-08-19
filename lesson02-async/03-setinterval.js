// let helloLogger = setInterval(() => console.log('hello'), 1000);
// setTimeout(() => clearInterval(helloLogger), 5010);

// Problem 1
function startCounting(num = 0) {
  return setInterval(() => {
    num += 1;
    console.log(num);
  }, 1000);
}
function stopCounting(intervalObj) {
  clearInterval(intervalObj);
}
let numCounter = startCounting(0);
setTimeout(() => stopCounting(numCounter), 5010);
