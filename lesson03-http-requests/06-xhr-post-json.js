const ENDPOINT = 'https://ls-230-book-catalog.herokuapp.com/books';

let request = new XMLHttpRequest();
request.open('POST', ENDPOINT);

request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

let data = { title: 'Eloquent Javascript', author: 'Martin Haverbeke' };
let json = JSON.stringify(data);

request.addEventListener('load', () => {
  if (request.status === 201) {
    console.log('Added: ' + request.responseText);
  }
});

request.send(json);

// Raw text of HTTP request

// POST /books HTTP/1.1
// Accept: */*
// Accept-Encoding: gzip, deflate
// Authorization: Basic YWRtaW46cGFzc3dvcmQ=
// Connection: keep-alive
// Content-Length: 41
// Content-Type: application/json; charset=utf-8
// Host: ls-230-book-example.herokuapp.com
// User-Agent: HTTPie/3.2.1

// { title: "Eloquent Javascript", author: "Martin Haverbeke" }
