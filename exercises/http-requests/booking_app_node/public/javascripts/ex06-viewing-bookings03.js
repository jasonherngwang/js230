// Querying for bookings
document.addEventListener('DOMContentLoaded', () => {
  function createLi(data) {
    const li = document.createElement('li');
    li.textContent = data;
    return li;
  }

  function renderBookings(elem, bookingsArr) {
    const ul = document.createElement('ul');

    bookingsArr.forEach((booking) => {
      const li = createLi(booking.join(' | '));
      ul.append(li);
    });

    elem.append(ul);
  }

  // Toggle booking details by clicking on the date
  document.querySelector('#bookings').addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      const li = e.target;

      if (li.children.length === 0) {
        const request = new XMLHttpRequest();
        request.open('GET', `/api/bookings/${li.textContent}`);
        request.responseType = 'json';
        request.send();

        request.addEventListener('load', () => {
          const data = request.response;
          renderBookings(li, data);
        });
      } else {
        while (li.children.length > 0) {
          li.firstElementChild.remove();
        }
      }
    }
  });

  (() => {
    const request = new XMLHttpRequest();
    request.open('GET', `/api/bookings`);
    request.responseType = 'json';
    request.send();

    request.addEventListener('load', () => {
      const ul = document.querySelector('#bookings');
      const dates = request.response;

      dates.forEach((date) => {
        ul.append(createLi(date));
      });
    });
  })();
});
