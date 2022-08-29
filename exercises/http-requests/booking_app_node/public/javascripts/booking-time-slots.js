/*
Upon page load, use fetch to retrieve all staff.
- This will be used in the display value for the schedules drop-down.

Upon page load, use fetch to retrieve the schedules.
- Filter to open schedules only.

Wait for both promises to resolve.
- Populate the `select` element with one `option` for each open schedule.
  - Use info from staffs and schedules to create the display value.
  - The value is the `id` of each schedule.

Add event listener to form submission:
- Make a POST request using the schedule id and email.
- Successful response 204 No Content
  - Alert "Booked"
  - Clear form
- Error 404 Not Found
  - If ScheduleNotFound Error, display alert with response text.
  - If StudentNotFound Error:
    - Call helper function to render a new student form. Append to DOM.
    - Prefill the booking sequence value.
    - On submission:
      - Create the student by making a POST request
        - If successful:
          - Display alert message.
          - Create the booking
          - Display alert message.
          - Clear form.
          - Remove Add Student form.
        - If error, display the error message.
  */

document.addEventListener('DOMContentLoaded', () => {
  let schedules;
  let staffs;
  const addScheduleForm = document.querySelector('#add_schedule');
  const addStudentDiv = document.querySelector('#student_details');
  const addStudentForm = document.querySelector('#add_student');
  const select = document.querySelector('#id');

  const fetchJson = (path) => fetch(path).then((response) => response.json());

  const createOptions = (schedules, staff) => {
    const options = [];

    schedules.forEach(({ id, staff_id, date, time }) => {
      const staffName = staffs.find((staff) => staff.id === staff_id).name;
      options.push({
        schedule: `${staffName} | ${date} | ${time}`,
        id,
      });
    });

    return options;
  };

  const populateOptions = async () => {
    schedules = await fetchJson('/api/schedules');
    staffs = await fetchJson('/api/staff_members');

    schedules = schedules.filter((schedule) => !schedule.student_email);

    const options = createOptions(schedules, staffs);

    while (select.firstChild) select.firstChild.remove();

    options.forEach(({ schedule, id }) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = schedule;
      select.appendChild(option);
    });
  };

  const formDataToJson = (formData) => {
    const json = {};

    for (const [key, val] of formData) {
      json[key] = val;
    }

    return json;
  };

  const createBooking = async (formData) => {
    const response = await fetch('/api/bookings', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 204) {
      alert('Booked');
      addScheduleForm.reset();
      populateOptions();
    } else {
      const responseText = await response.text();

      if (responseText.includes('booking_sequence')) {
        const components = responseText.split(' ');
        const bookingSequence = components[components.length - 1];

        showStudentForm(bookingSequence);
      } else {
        alert(responseText);
      }
    }
  };

  const showStudentForm = (bookingSequence) => {
    const bookingSequenceInput = document.querySelector('#booking_sequence');

    addStudentDiv.removeAttribute('hidden');
    bookingSequenceInput.value = bookingSequence;
  };

  const addStudent = (formData) => {
    return fetch('/api/students', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(formData),
    });
  };

  populateOptions();

  addScheduleForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const scheduleData = formDataToJson(new FormData(addScheduleForm));
    createBooking(scheduleData);
  });

  addStudentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const studentData = formDataToJson(new FormData(addStudentForm));

    addStudent(studentData).then(async (response) => {
      const responseText = await response.text();

      if (response.ok) {
        alert(responseText);
        const scheduleData = formDataToJson(new FormData(addScheduleForm));
        // Update with newly-created student's email
        scheduleData.student_email = studentData.email;
        createBooking(scheduleData);
        addStudentForm.reset();
        addStudentDiv.setAttribute('hidden', true);
      } else {
        alert(responseText);
      }
    });
  });
});
