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

    const newDays = [];
    state.days.forEach((dayObj) => {
      if (dayObj.name === state.day) {
        console.log(dayObj.name, ":", dayObj.spots);
        console.log("selected day = : ", state.day);
        newDays.push({ ...dayObj, spots: dayObj.spots - 1 });
      } else {
        newDays.push({ ...dayObj });
      }
    });

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview }).then((response) => {
      setState({
        ...state,
        appointments: newAppointments,
        days: newDays,
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

    const newDays = [];
    state.days.forEach((dayObj) => {
      if (dayObj.name === state.day) {
        console.log(dayObj.name, ":", dayObj.spots);
        console.log("selected day = : ", state.day);
        newDays.push({ ...dayObj, spots: dayObj.spots + 1 });
      } else {
        newDays.push({ ...dayObj });
      }
    });

    return axios.delete(`/api/appointments/${id}`).then((response) => {
      setState({
        ...state,
        appointments: newAppointments,
        days: newDays,
      });
    });
  }

  const setDay = (day) => setState({ ...state, day });

  // API calls
  useEffect(() => {
    Promise.all([axios.get("/api/days"), axios.get("/api/appointments"), axios.get("/api/interviewers")]).then((all) => {
      console.log(all); //
      setState((prev) => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  return { bookInterview, cancelInterview, setDay, state, setState };
}
