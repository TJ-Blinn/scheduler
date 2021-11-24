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

  // pass this func to Form component. Form capture the name and interviewer and pass them to props.onSave as arguments
  function save(name, interviewer) {
    const newInterview = {
      student: name,
      interviewer,
    };
    // console.log("created interview", newInterview, "sending bookInterview");
    props.bookInterview(props.id, newInterview);
    // set mode
    transition(SHOW);
  }

  // console.log("APPOINTMENT PROPS", props);

  return (
    <>
      <article className="appointment">
        {/* {appointmentString()} */}
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} />}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={() => back(EMPTY)}
            onSave={(name, interviewer) => save(name, interviewer)}
            // name={props.name}
            // name={props.interview && props.interview.student}
            student={props.interview && props.interview.student}
            interviewer={props.interview && props.interview.interviewer}
          />
        )}
      </article>
    </>
  );
}
