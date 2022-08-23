// Load cached data on timeout
function loadFromCache() {
  const data = {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
    source: 'cache',
  };

  return new Promise((resolve, reject) => {
    resolve(data);
  });
}

function fetchNewOrCached() {
  // const timeOut = 1; // cached data returned
  const timeOut = 100; // fresh data returned

  const cache = loadFromCache().then((data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject(data), timeOut);
    });
  });

  const freshData = fetch('https://jsonplaceholder.typicode.com/todos/1');
  return Promise.race([cache, freshData]);
}

fetchNewOrCached()
  .then((response) => {
    console.log('API success. Fresh data:');
    response.json().then((data) => console.log(data));
  })
  .catch((error) => {
    console.log('Time limit exceeded. Cached data:');
    console.log(error);
  });
