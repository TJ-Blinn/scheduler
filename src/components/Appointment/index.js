import React, { Fragment, useState } from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import { getInterviewersForDay } from "helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
// const STATUS = "STATUS";
const ERROR_SAVE = "ERROR_SAVE";

export default function Appointment(props) {
  // Conditional Expressions using Fragments o render <Show> or <Empty> based on props.interview.

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  // pass this func to Form component. Form capture the name and interviewer and pass them to props.onSave as arguments
  function save(name, interviewer) {
    const newInterview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props.bookInterview(props.id, newInterview).then(() => {
      transition(SHOW);
    });

    // .catch(() => {
    //   transition(ERROR_SAVE, true);
    // });
  }

  // console.log("APPOINTMENT PROPS", props);
  console.log("//////////", props.interview);
  return (
    <>
      <article className="appointment">
        {/* {appointmentString()} */}
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && <Show student={props.interview && props.interview.student} interviewer={(props.interview && props.interview.interviewer) || {}} />}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={() => back(EMPTY)}
            onSave={save}
            // name={props.name}
            // name={props.interview && props.interview.student}
            student={props.interview && props.interview.student}
            interviewer={props.interview && props.interview.interviewer}
          />
        )}
        {mode === SAVING && <Status message={SAVING} />}
      </article>
    </>
  );
}
