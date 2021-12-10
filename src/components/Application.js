import DayList from "./DayList";
import React from "react";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";
import "components/Application.scss";

export default function Application(props) {
  const { bookInterview, cancelInterview, setDay, state } = useApplicationData();

  // holds the array of interviewerIDs for a given day.
  const interviewers = getInterviewersForDay(state, state.day);

  // holds a list of appointments for that day.
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

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
