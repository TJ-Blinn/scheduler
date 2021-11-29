// Recall that it is npm run test to start the Jest testing environment.

// find day obj in days arr (state.days)
// for each day's appt id
// add matching appt to results

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

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const result = {};
  const studentName = interview.student;
  const interviewerId = interview.interviewer;

  result.student = studentName;
  result.interviewer = { ...state.interviewers[interviewerId] };

  return result;
}

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

  return result;
}
