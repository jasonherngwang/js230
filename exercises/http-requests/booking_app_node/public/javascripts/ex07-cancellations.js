function cancelSchedule(scheduleId) {
  const xhr = new XMLHttpRequest();
  xhr.open('delete', `/api/schedules/${scheduleId}`);
  xhr.send();
  xhr.addEventListener('load', () => {
    if (xhr.status === 204) {
      alert('Schedule canceled.');
    } else {
      alert(xhr.responseText);
    }
  });
}
// cancelSchedule(17);

function cancelBooking(bookingId) {
  const xhr = new XMLHttpRequest();
  xhr.open('put', `/api/bookings/${bookingId}`);
  xhr.send();
  xhr.addEventListener('load', () => {
    if (xhr.status === 204) {
      alert('Booking canceled.');
    } else {
      alert(xhr.responseText);
    }
  });
}
cancelBooking(11);
