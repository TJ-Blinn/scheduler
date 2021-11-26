import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

// * styles is referenced in stories/index.js file, we don't need to import it again

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

const reset= () => {
  setStudent("");
  setInterviewer(null);
  // console.log("Handle reset from Form component");  
}

const cancel =() => {
    reset();          
    props.onCancel()
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
        
      />
    </form>
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
      <Button confirm onClick={() => props.onSave(student, interviewer)}  >Save</Button>             
    </section>
  </section>
</main>

  )
}