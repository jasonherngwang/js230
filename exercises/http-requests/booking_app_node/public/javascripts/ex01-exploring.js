const API_HOST = 'http://127.0.0.1:3000';

// Using XHR and event handler -------------------------------------------------
function getRequestXhr(path) {
  let request = new XMLHttpRequest();
  request.open('GET', `${API_HOST}${path}`);
  request.responseType = 'json';

  request.addEventListener('load', () => {
    if (request.status === 200) {
      console.log(request.response);
    }
  });

  request.send();
}

// getRequestXhr('/api/staff_members');
// getRequestXhr('/api/students');
// getRequestXhr('/api/schedules');
// getRequestXhr('/api/bookings');

// Using XHR and promises ------------------------------------------------------
function getRequestXhrPromise(path) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open('GET', `${API_HOST}${path}`);
    request.responseType = 'json';

    request.addEventListener('load', () => {
      resolve(request.response);
    });

    request.send();
  });
}

// getRequest('/api/staff_members').then((response) => console.log(response));

// Using fetch -----------------------------------------------------------------
function getRequestFetch(path) {
  return fetch(`${API_HOST}${path}`).then((response) => response.json());
}

// document.addEventListener('DOMContentLoaded', async (event) => {
//   let [staffMembers, students, schedules, bookings] = (
//     await Promise.allSettled([
//       // getRequestXhrPromise('/api/staff_members'),
//       // getRequestXhrPromise('/api/students'),
//       // getRequestXhrPromise('/api/schedules'),
//       // getRequestXhrPromise('/api/bookings'),
//       getRequestFetch('/api/staff_members'),
//       getRequestFetch('/api/students'),
//       getRequestFetch('/api/schedules'),
//       getRequestFetch('/api/bookings'),
//     ])
//   ).map((result) => result.value);

//   [staffMembers, students, schedules, bookings].forEach((result) =>
//     console.log(result)
//   );
// });

// Using jQuery ----------------------------------------------------------------
function getRequestJquery(path) {
  $(() => {
    // $.ajax({
    //   method: 'GET',
    //   url: `${API_HOST}${path}`,
    //   dataType: 'json',
    // }).done((json) => console.log(json));
    $.get(`${API_HOST}${path}`, (json) => console.log(json), 'json');
  });
}
// getRequestJquery('/api/staff_members');
// getRequestJquery('/api/students');
// getRequestJquery('/api/schedules');
// getRequestJquery('/api/bookings');
