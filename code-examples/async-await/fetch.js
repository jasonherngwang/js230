function display(data) {
  console.log(data);
}

const futureData = fetch('https://jsonplaceholder.typicode.com/users/1');

futureData.then((response) => response.json()).then(display);

setTimeout(function () {
  display('Callback queue');
}, 0);

Promise.resolve('Fast promise!').then(display);

console.log('Me first');

// Me first
// Fast promise!
// callback queue
// user data
