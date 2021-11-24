// Recall that it is npm run test to start the Jest testing environment.

// find day obj in days arr (state.days)
// for each day's appt id
// add matching appt to results

/*
  an empty array is created called result
  created a variable with value of the state.days array (accessing days inside state obj)
  creating a variable, dayFound obj, iterates over says to find the matching day
  creating a var appointmentIds, a list of ids found inside the dayFound obj (the spoecific day that matches the parameter) 
  iterate over 

  */

export function getAppointmentsForDay(state, dayName) {
  const result = [];
  const days = state.days;

  const dayFound = days.find((day) => day.name === dayName);
  if (dayFound) {
    const appointmentIds = dayFound.appointments;

    for (let appointmentId of appointmentIds) {
      const appointment = state.appointments[appointmentId];
      result.push(appointment);
    }
  }

  return result;
}
/*
- it is passed an object ( interviewers)  that contains an interviewer
- return an object that contains the interview data
- return a new object containing the interview data
- get student name
// the "interview" parameter passed to the getInterview function = { student: "Archie Cohen", interviewer: 2 }
*/

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const result = {};
  const studentName = interview.student;
  const interviewerId = interview.interviewer;

  result.student = studentName;
  result.interviewer = { ...state.interviewers[interviewerId] };

  // console.log("Results: ", result);

  return result;
}

// getInterviewersForDay selector

export function getInterviewersForDay(state, dayName) {
  const result = [];
  const { days } = state;

  const dayFound = days.find((day) => day.name === dayName);

  if (dayFound) {
    const interviewerIds = dayFound.interviewers;

    for (let interviewerID of interviewerIds) {
      const interview = state.interviewers[interviewerID];
      result.push(interview);
    }
  }

  // console.log("selector =========", result);

  return result;
}
