import React from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

// * styles is referenced in stories/index.js file, we don't need to import it again

export default function Form(props) {
  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name={props.student}
        type="text"
        placeholder="Enter Student Name"
        /*
          This must be a controlled component
          your code goes here
        */
      />
    </form>
    <InterviewerList
    interviewers={props.interviewers} 
    interviewer={props.interviewer}
    onChange={props.onChange}
      /* your code goes here */
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={props.onCancel}>Cancel</Button>
      <Button confirm onClick={props.onSave}>Save</Button>
    </section>
  </section>
</main>

  )
}