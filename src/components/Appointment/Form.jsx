import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

// * styles is referenced in stories/index.js file, we don't need to import it again

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
// console.log("Interviewer in Form component ////////", interviewer);

const reset= () => {
  setStudent("");
  setInterviewer(null);  
}

const cancel =() => {
  reset();          
  props.onCancel()
}     

const [error, setError] = useState("");

function validate() {
  console.log("Validate function  HERE ----------");
  if (student === "") {
    setError("Student name cannot be blank");
    return;
  }
  props.onSave(student, interviewer);
}

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        value={student}
        onChange={(event) => setStudent(event.target.value)}
        className="appointment__create-input text--semi-bold"
        name={props.student}
        type="text"
        placeholder="Enter Student Name"
        data-testid="student-name-input"
      />
    </form>

    <section className="appointment__validation">{error}</section>

    <InterviewerList
    interviewers={props.interviewers} 
    interviewer={interviewer}
    onChange={setInterviewer}
      /* your code goes here */
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel} >Cancel</Button>
      {/* <Button confirm onClick={() => props.onSave(student, interviewer)}  >Save</Button>              */}
    <Button confirm onClick={() => validate()}  >Save</Button>
    </section>
  </section>
</main>

  )
}