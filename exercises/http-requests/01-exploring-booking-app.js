const API_HOST = 'http://localhost:3000';

// // Using XHR
// let request = new XMLHttpRequest();
// request.open('GET', `${API_HOST}/api/staff_members`);
// request.responseType = 'json';
// request.addEventListener('load', () => {
//   if (request.status === 200) {
//     console.log(`${request.response.length} staff`);
//   }
// });
// request.send();

// // Using fetch
// fetch(`${API_HOST}/api/staff_members`)
//   .then((response) => response.json())
//   .then((json) => console.log(`${json.length} staff`));

// Adding in async/await
function getRequest(path) {
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

document.addEventListener('DOMContentLoaded', async (event) => {
  let [staffMembers, students, schedules, bookings] = (
    await Promise.allSettled([
      getRequest('/api/staff_members'),
      getRequest('/api/students'),
      getRequest('/api/schedules'),
      getRequest('/api/bookings'),
    ])
  ).map((result) => result.value);

  [staffMembers, students, schedules, bookings].forEach((result) =>
    console.log(result)
  );
});
