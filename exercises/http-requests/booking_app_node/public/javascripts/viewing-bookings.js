document.addEventListener('DOMContentLoaded', () => {
  let schedules;

  function bookingItem({ date }) {
    const li = document.createElement('li');
    li.textContent = date;

    return li;
  }

  function bookingDetails({ staff_name, student_email, time }) {
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    li.textContent = `${staff_name} | ${student_email} | ${time}`;
    ul.appendChild(li);

    return ul;
  }

  function createBookingList(schedules) {
    const bookingsUl = document.querySelector('#bookings');

    schedules.forEach((schedule) => {
      const li = bookingItem(schedule);

      li.addEventListener('click', function (event) {
        if (event.target === this) {
          nestedUl = bookingDetails(schedule);

          const existingUl = this.querySelector('ul');
          if (!existingUl) {
            this.appendChild(nestedUl);
          } else {
            existingUl.remove();
          }
        }
      });

      bookingsUl.appendChild(li);
    });
  }

  function convertStaffIdsToNames(schedules, staffs) {
    function getStaffName(id, staffs) {
      return staffs.filter((staff) => staff.id === id)[0].name;
    }

    schedules.forEach((schedule) => {
      schedule.staff_name = getStaffName(schedule.staff_id, staffs);
    });

    return schedules;
  }

  (() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/schedules');
    xhr.responseType = 'json';
    xhr.send();
    xhr.addEventListener('load', (event) => {
      schedules = xhr.response;
      schedules = schedules.filter(({ student_email }) => student_email);

      let staffs = [];

      (() => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/staff_members');
        xhr.responseType = 'json';
        xhr.send();
        xhr.addEventListener('load', (event) => {
          staffs = xhr.response;
          schedules = convertStaffIdsToNames(schedules, staffs);
          createBookingList(schedules);
        });
      })();
    });
  })();
});
