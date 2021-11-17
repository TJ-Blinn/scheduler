import React, { Fragment } from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  console.log("Appointment props ------- ", props);
  // const appointmentString = () => {
  //   if (props.time) {
  //     return `Appointment at ${props.time}`;
  //   }
  //   return "No Appointments";
  // };

  // Conditional Expressions using Fragments o render <Show> or <Empty> based on props.interview.
  return (
    <>
      <article className="appointment">
        {/* {appointmentString()} */}
        <Header time={props.time} />
        {props.interview ? <Show student={props.student} interviewer={props.interview.interviewer} /> : <Empty />}
      </article>
    </>
  );
}
