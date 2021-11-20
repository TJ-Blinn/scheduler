import React, { Fragment } from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  // Conditional Expressions using Fragments o render <Show> or <Empty> based on props.interview.
  return (
    <>
      <article className="appointment">
        {/* {appointmentString()} */}
        <Header time={props.time} />
        {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />}
      </article>
    </>
  );
}
