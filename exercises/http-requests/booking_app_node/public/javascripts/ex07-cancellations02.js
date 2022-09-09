// Audry's solution
const schedulesAPI = '/api/schedules/';
const bookingsAPI = '/api/bookings/';

document.addEventListener('DOMContentLoaded', (e) => {
  let scheduleForm = document.querySelector('form.schedule');
  let bookingForm = document.querySelector('form.booking');
  let staffSchedules;
  let studentBookings;
  let staffList = [];

  loadSchedules();

  scheduleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    cancel(scheduleForm);
  });

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    cancel(bookingForm);
  });

  async function loadSchedules() {
    staffList = await getStaff();
    let allSchedules = await getSchedules();
    populateSchedules(allSchedules);
  }

  async function cancel(form) {
    await submitCancellation(form);
    alert('Cancelled!');
    document.location.reload();
  }

  function submitCancellation(form) {
    return new Promise(function (resolve, reject) {
      let formData = new FormData(form);
      let idType = formData.has('schedule_id') ? 'schedule_id' : 'booking_id';
      let id = formData.get(idType);
      console.log(`${idType}: ${id}`);

      let request = new XMLHttpRequest();

      if (idType === 'schedule_id') {
        request.open('DELETE', form.action + id);
      } else {
        request.open('PUT', form.action + id);
      }
      request.send();

      request.addEventListener('load', (e) => {
        if (request.status === 204) resolve(request.response);
        else alert('Failed:', request.responseText);
      });
    });
  }

  function getSchedules() {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      request.open('GET', schedulesAPI);
      request.responseType = 'json';
      request.send();

      request.addEventListener('load', (e) => {
        resolve(request.response);
      });
    });
  }

  function getStaff() {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      request.open('GET', '/api/staff_members');
      request.responseType = 'json';
      request.send();

      request.addEventListener('load', (e) => resolve(request.response));
    });
  }

  function populateSchedules(schedules) {
    mapStaffNames(staffList, schedules);

    staffSchedules = schedules.filter(({ student_email }) => !student_email);
    studentBookings = schedules.filter(({ student_email }) => student_email);

    let [scheduleSelect, bookingSelect] = [
      document.querySelector('#schedule'),
      document.querySelector('#booking'),
    ];

    //clear and reset options for each form. Need the semicolon or else parsing error!
    [scheduleSelect, bookingSelect].forEach(deleteChildren);
    appendOptions(scheduleSelect, staffSchedules);
    appendOptions(bookingSelect, studentBookings);
  }

  function mapStaffNames(staffList, schedules) {
    schedules.forEach((schedule) => {
      staffList.forEach((staff) => {
        if (schedule.staff_id === staff.id) {
          schedule['name'] = staff.name;
        }
      });
    });
  }
});

function deleteChildren(parent) {
  Array.from(parent.children).forEach((child) => {
    parent.remove(child);
  });
}

function appendOptions(parentElement, options) {
  let childrenElements = createOptions(options);

  childrenElements.forEach((child) => {
    parentElement.appendChild(child);
  });
}

function createOptions(objects) {
  return objects.map(({ id, name, student_email, date, time }) => {
    let option = document.createElement('option');
    option.setAttribute('value', id);

    if (!student_email) {
      option.textContent = `${name} | ${date} | ${time}`;
    } else {
      option.textContent = `${name} | ${student_email}| ${date} | ${time}`;
    }
    return option;
  });
}
