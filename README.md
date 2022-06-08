# 🗓 Interview Scheduler

!["Screenshot of Interview Scheduler"](https://github.com/TJ-Blinn/scheduler/blob/master/docs/Interview_Scheduler_header.png?raw=true)

### Purpose

**_BEWARE:_ This app was designed for learning purposes. It is strictly intended for use as an exercise.**

_This project was created and published by me as part of my learnings at [Lighthouse Labs](https://www.lighthouselabs.ca/)._

## Functional Requirements

- Development focuses on a single page application (SPA) called Interview Scheduler, built using React.
- Data is persisted by the API server using a PostgreSQL database.
- Have the client application communicate with an API server over HTTP, using Axios to make calls to the API.
  <br/><br/>

## About Interview Scheduler

Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database.  
<br/><br/>

## Behavioural Requirements

    1. Interviews can be booked between Monday and Friday.
    2. A user can switch between weekdays.
    3. A user can book an interview in an empty appointment slot.
    4. Interviews are booked by typing in a student name and clicking on an interviewer
       from a list of available interviewers.
    5. A user can cancel an existing interview.
    6. A user can edit the details of an existing interview.
    7. The list of days informs the user how many slots are available for each day.
    8. The expected day updates the number of spots available when an interview is booked
       or canceled.
    9. A user is presented with a confirmation when they attempt to cancel an interview.
    10. A user is shown an error if an interview cannot be saved or deleted.
    11. A user is shown a status indicator while asynchronous operations are in progress.
    12. When the user presses the close button of the error they are returned to the Form
        or Show view (skipping Status and Confirm).
    13. The application makes API requests to load and persist data. We do not lose data
        after a browser refresh.

## Dependencies

- axios
- classnames
- normalize.css
- react  
   react-dom  
   react-scripts
- babel/core  
   babel-loader
- storybook/addon-actions  
   storybook/addon-backgrounds  
   storybook/addon-links  
   storybook/addons  
   storybook/react
- node-sass
- prop-types

---

<br/>

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress Test Framework

1. test server

```sh
npm run test:server
```

2. webpack development server

```sh
npm start
```

3. test runner

```sh
npm run cypress
```

## Folder Structure

```
├── src
│   ├── __mocks__
│   │   └── axios.js
│   ├── components
│   │   ├── Application.js
│   │   ├── Application.scss
│   │   ├── Appointment
│   │   │   ├── Confirm.jsx
│   │   │   ├── Empty.jsx
│   │   │   ├── Error.jsx
│   │   │   ├── Form.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Show.jsx
│   │   │   ├── Status.jsx
│   │   │   ├── index.js
│   │   │   └── styles.scss
│   │   ├── Button.js
│   │   ├── Button.scss
│   │   ├── DayList.jsx
│   │   ├── DayListItem.jsx
│   │   ├── DayListItem.scss
│   │   ├── InterviewerList.jsx
│   │   ├── InterviewerList.scss
│   │   ├── InterviewerListItem.jsx
│   │   ├── InterviewerListItem.scss
│   │   └── __tests__
│   │       ├── Application.test.js
│   │       ├── Appointment.test.js
│   │       ├── Button.test.js
│   │       ├── DayListItem.test.js
│   │       ├── Form.test.js
│   │       └── useVisualMode.test.js
│   ├── helpers
│   │   ├── selectors.js
│   │   └── selectors.test.js
│   ├── hooks
│   │   ├── useApplicationData.js
│   │   └── useVisualMode.js
│   ├── index.js
│   ├── index.scss
│   ├── setupTests.js
│   └── styles
│       ├── animations.scss
│       ├── mixins.scss
│       ├── reset.scss
│       ├── typography.scss
│       └── variables.scss
└── stories
    └── index.js
```

---

<br/>

## Final Product

### Interview Scheduler in motion

![Animation of functionality](https://github.com/TJ-Blinn/scheduler/blob/master/docs/Interview_Scheduler.gif?raw=true)

### Adding new appointment

!["Screenshot of adding new appointment"](https://github.com/TJ-Blinn/scheduler/blob/master/docs/Interview_Scheduler_add_new.png?raw=true)

### Interview Form

!["Screenshot of Interview Form"](https://github.com/TJ-Blinn/scheduler/blob/master/docs/Interview_Scheduler_edit_window.png?raw=true)

### Form student restrictions - name cannot be blank

!["Screenshot of Form student_restrictions"](https://github.com/TJ-Blinn/scheduler/blob/master/docs/Interview_Scheduler_editName_restrictions.png?raw=true)

### Form interviewer restrictions - cannot save without interviewer selection

!["Screenshot of Form interviewer_restrictions"](https://github.com/TJ-Blinn/scheduler/blob/master/docs/Interview_Scheduler_addInterviewer_restriction.png?raw=true)

### Async save confirmation

!["Screenshot of async save confirmation"](https://github.com/TJ-Blinn/scheduler/blob/master/docs/Interview_Scheduler_saving_confirm.png?raw=true)

### Interview delete confirmation

!["Screenshot of delete confirmation"](https://github.com/TJ-Blinn/scheduler/blob/master/docs/Interview_Scheduler_delete_confirm.png?raw=true)

### No spots remaining

!["Screenshot of no spots remaining"](https://github.com/TJ-Blinn/scheduler/blob/master/docs/Interview_Scheduler_np_spots_remaining.png?raw=true)

### Dynamic database

!["Screenshot of dynamic database"](https://github.com/TJ-Blinn/scheduler/blob/master/docs/Interview_Scheduler_dynamic_db.png?raw=true)
