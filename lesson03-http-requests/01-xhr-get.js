const ENDPOINT = 'https://api.github.com/repos/rails/rails';

let request = new XMLHttpRequest();

// Request sent to server
request.addEventListener('loadstart', event => {
    const xhr = event.target;
    console.log('Request sent');
})

// Complete response loaded
request.addEventListener('load', event => {
    const request = event.target; // Not necessary; these are the same.

    // console.log(request.responseText);
    console.log(request.status);
    console.log(request.statusText);
    console.log(request.getResponseHeader('Content-Type'));
})

// Response aborted
request.addEventListener('abort', event => {
    const xhr = event.target;
    console.log('Request aborted');
})

// Error
request.addEventListener('error', event => {
    const xhr = event.target;
    console.log('Error occurred');
})

// Response timeout
request.addEventListener('timeout', event => {
    const xhr = event.target;
    console.log('Request timed out');
})

// All events complete
request.addEventListener('loadend', event => {
    const xhr = event.target;
    console.log('All events are complete');
})

request.open('GET', ENDPOINT);
request.send()