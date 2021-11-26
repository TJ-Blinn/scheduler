import React, { useState, useEffect } from "react";
import axios from "axios";

/*
useApplicationData Hook will returns:

    The state object maintains the same structure.
    The setDay action used to set the current day.
    The bookInterview makes an HTTP request and updates the local state.
    The cancelInterview makes an HTTP request and updates the local state.
*/

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  // Book an interview

  function bookInterview(id, interview) {
    // new appointment object with values copied from the existing appointment.
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const newAppointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // const interviewersAPI = ``;
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview }).then((response) => {
      // console.log("AXIOS PUT call ======", response);

      setState({
        ...state,
        appointments: newAppointments,
      });
    });
  }

  // Cancel an interview
  // use the appointment id to find the right appointment slot and set it's interview data to null.
  function cancelInterview(id) {
    // find appointments id | remove interview obj

    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const newAppointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // const interviewersAPI = ``;
    return axios.delete(`http://localhost:8001/api/appointments/${id}`).then((response) => {
      // console.log("AXIOS DELETE call ======", response);

      setState({
        ...state,
        appointments: newAppointments,
      });
    });
  }

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      // console.log(all); //
      setState((prev) => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  return { bookInterview, cancelInterview, setDay, state, setState };
}
