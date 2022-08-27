const API_HOST = 'http://localhost:3000';

function getRequest(path) {
  // // Using XHR
  // return new Promise((resolve, reject) => {
  //   let request = new XMLHttpRequest();
  //   request.open('GET', `${API_HOST}${path}`);
  //   request.responseType = 'json';

  //   request.addEventListener('load', () => {
  //     resolve(request.response);
  //   });
  //   request.send();
  // });

  // Using fetch
  return fetch(`${API_HOST}${path}`).then((response) => response.json());
}

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
