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
  /*
  an empty array is created called result
  created a variable with value of the state.days array (accessing days inside state obj)
  creating a variable, dayFound obj, iterates over says to find the matching day
  creating a var appointmentIds, a list of ids found inside the dayFound obj (the spoecific day that matches the parameter) 
  iterate over 

  */
}
