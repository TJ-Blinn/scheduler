import React from "react";
// import classNames from "classnames";
import "./InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  console.log("PROPS -----------------", props);

  // const {interviewers, setInterviewer, interviewer} = props;

  const interviewerComponent = props.interviewers.map(interviewer => {
    // console.log(interviewer);
    return <InterviewerListItem
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id === props.interviewer}
    setInterviewer={props.setInterviewer}
    />
  })
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewer__list">{interviewerComponent} </ul>
    </section>
  )
}