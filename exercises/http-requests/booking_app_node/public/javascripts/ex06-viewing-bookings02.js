/*
Elaine's solution
- Use a main render() function to direct all activity.
- Two async XHR functions that return promises.
  - We call these two functions with await, inside async functions.
  - GET /api/bookings (triggers once, upon page load)
  - GET /api/bookings/:date (triggers every time we click a date)
- Many helper functions for creating DOM elements.

*/
document.addEventListener('DOMContentLoaded', () => {
  render();

  async function render() {
    const bookingListUl = document.querySelector('#bookings');
    const bookingDates = await getBookingDates();
    renderBookingDates(bookingDates, bookingListUl);
    bookingListUl.addEventListener('click', renderBookingDetails);
  }

  // Async: Retrieve dates with bookings
  function getBookingDates() {
    return new Promise((resolve) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', '/api/bookings');
      xhr.responseType = 'json';
      xhr.send();

      xhr.addEventListener('load', () => {
        resolve(xhr.response);
      });
    });
  }

  function renderDate(date, bookingListUl) {
    const dateLi = document.createElement('li');
    dateLi.innerHTML = date;
    bookingListUl.appendChild(dateLi);
  }

  // Append dates to unordered list
  function renderBookingDates(bookingDates, bookingListUl) {
    bookingDates.forEach((date) => renderDate(date, bookingListUl));
  }

  async function renderBookingDetails(event) {
    if (event.target.nodeName === 'LI' && event.target.parentElement === this) {
      const existingUl = this.querySelector('ul');

      if (!existingUl) {
        const date = event.target.innerHTML;
        const dateDetails = await getDateDetails(date);
        createDateDetails(event.target, dateDetails);
      } else {
        existingUl.remove();
      }
    }
  }

  function getDateDetails(date) {
    return new Promise((resolve) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', `/api/bookings/${date}`);
      xhr.responseType = 'json';
      xhr.send();

      xhr.addEventListener('load', () => {
        resolve(xhr.response);
      });
    });
  }

  function createDateDetails(li, dateDetails) {
    const nestedUl = document.createElement('ul');
    dateDetails.forEach((date) => {
      const nestedLi = document.createElement('li');
      nestedLi.innerHTML = date.join(' | ');
      nestedUl.appendChild(nestedLi);
    });

    li.appendChild(nestedUl);
  }
});
