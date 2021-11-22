import React, { Fragment, useState } from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import { getInterviewersForDay } from "helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  // Conditional Expressions using Fragments o render <Show> or <Empty> based on props.interview.

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  return (
    <>
      <article className="appointment">
        {/* {appointmentString()} */}
        <Header time={props.time} />
        {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />} */}
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} />}
        {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)} />}
      </article>
    </>
  );
}
