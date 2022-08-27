# Exploring the Booking App

How many staff are there? 5

```js
GET /api/staff_members HTTP/1.1
Host: localhost:3000
```

How many students are there? 5

```js
GET /api/students HTTP/1.1
Host: localhost:3000
```

How many schedules exist? 9

```js
GET /api/schedules HTTP/1.1
Host: localhost:3000
```

How many schedules have bookings? 3

Do all staff have schedules? No, only 3. There is no route that will provide this information.

Did all students book a schedule? No, only 3. There is no route that will provide this information.