import fetch from 'node-fetch';

const srcArr = [
  'https://jsonplaceholder.typicode.com/todos/3',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/1',
];

srcArr[Symbol.asyncIterator] = async function* () {
    let i = 0;
    
    for (const url of this) {
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Unable to retrieve: ' + response.status);
        }
        
        yield response.json();
    }
}

const iterator = srcArr[Symbol.asyncIterator]();

iterator.next().then(res => console.log(res.value.title));
iterator.next().then(res => console.log(res.value.title));
iterator.next().then(res => console.log(res.value.title));