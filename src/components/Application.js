// import React from "react";
import DayList from "./DayList";
import React, { useState, useEffect } from "react";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

import "components/Application.scss";

export default function Application(props) {
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
      console.log("AXIOS PUT call ======", response);

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
      console.log("AXIOS DELETE call ======", response);

      setState({
        ...state,
        appointments: newAppointments,
      });
    });
  }

  // function delete(name, interview) {

  // }

  // hold a list of appointments for that day.
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      console.log(all); //
      setState((prev) => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);
  // console.log("state ----------", state);

  const appointmentList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    console.log("interview content -----", interview);

    // holds the array of interviewerIDs for a given day.
    const interviewers = getInterviewersForDay(state, state.day);
    console.log("Interviewers --------", interviewers);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        {appointmentList}
        {/* ! Appointment component is hard-coded to work-around the 5pm slot not showing on render */}
        <Appointment time={"5pm"} key={"last"} />
      </section>
    </main>
  );
}
