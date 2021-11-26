import React, { Fragment, useState } from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import { getInterviewersForDay } from "helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
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

  // --------------Delete
  function deleteAppointment() {
    transition(DELETING);
    props.cancelInterview(props.id).then(() => {
      transition(EMPTY);
    });
  }
  // --------------

  // -------------- EDIT
  function editAppointment() {
    console.log("Edit Appointment function", props.id, props.interview);
    transition(CREATE);
    props.editInterview(props.id, props.interview).then(() => {
      transition(SHOW);
    });
  }
  // --------------

  // console.log("APPOINTMENT PROPS", props);
  // console.log("//////////", props.interview);
  return (
    <>
      <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview && props.interview.student}
            interviewer={(props.interview && props.interview.interviewer) || {}}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(CREATE)}
          />
        )}

        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={() => back()}
            onSave={save}
            student={props.interview && props.interview.student}
            interviewer={props.interview && props.interview.interviewer}
          />
        )}

        {mode === CONFIRM && <Confirm onCancel={() => back()} onConfirm={deleteAppointment} message={"Are you sure you would like to Delete?"} />}

        {mode === EDIT && <Form save={() => save(props.id, props.newInterview)} />}

        {mode === SAVING && <Status message={SAVING} />}
        {mode === DELETING && <Status message={DELETING} />}
      </article>
    </>
  );
}
