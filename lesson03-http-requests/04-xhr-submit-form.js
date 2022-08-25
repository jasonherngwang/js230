const ENDPOINT = 'https://ls-230-book-catalog.herokuapp.com/books';

let form = document.getElementById('form');

// When form is submitted, implement custom handling of data processing and
// submission.
form.addEventListener('submit', event => {
  event.preventDefault();
  
  // // Manually collecting data from form elements
  // let keysAndValues = [];
  
  // // Serialize form elements into encoded strings
  // for (const element of form.elements) {
  //   if (element !== 'submit') {
  //     key = encodeURIComponent(element.name);
  //     value = encodeURIComponent(element.value);
  //     keysAndValues.push(`${key}=${value}`);
  //   }
  // }
  
  // let data = keysAndValues.join('&');
  
  // Using FormData with multipart form serialization
  let data = new FormData(form);
  
  let request = new XMLHttpRequest();
  request.open('POST', ENDPOINT);
  
  // Part of manual processing; FormData uses multipart/form-data
  // request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  
  request.addEventListener('load', () => {
    if (request.status === 201) {
      console.log('Added: ' + request.responseText);
    }
  })
  
  request.send(data);
})