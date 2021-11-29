import React, { Fragment, useState } from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  // pass to Form component. Form capture the name and interviewer and pass them to props.onSave as arguments
  function save(name, interviewer) {
    const newInterview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props
      .bookInterview(props.id, newInterview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => transition(ERROR_SAVE, true));
  }

  // --------------Delete
  function deleteAppointment() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        // console.log("Delete Error message: ", error);
        transition(ERROR_DELETE, true);
      });
  }

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
            onEdit={() => transition(EDIT)}
          />
        )}

        {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}

        {mode === CONFIRM && <Confirm onCancel={() => back()} onConfirm={deleteAppointment} message={"Are you sure you would like to Delete?"} />}

        {mode === EDIT && (
          <Form
            onSave={save}
            interviewers={props.interviewers}
            onCancel={() => back()}
            student={props.interview && props.interview.student}
            interviewer={props.interview && props.interview.interviewer.id}
          />
        )}

        {mode === SAVING && <Status message={SAVING} />}
        {mode === ERROR_SAVE && <Error message={"Error saving appointment"} onClose={() => back()} />}
        {mode === DELETING && <Status message={DELETING} />}
        {mode === ERROR_DELETE && <Error message={"Error deleting appointment"} onClose={() => back()} />}
      </article>
    </>
  );
}
