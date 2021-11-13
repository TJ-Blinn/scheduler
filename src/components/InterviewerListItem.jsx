import React from "react";
import classNames from "classnames";
import "./InterviewerListItem.scss"

export default function InterviewerListItem(props) {
  console.log("PROPS -----------------", props);

  // function name(params) {
  //   let name = {props.name}
  //   if (props.selected = true) {
  //     return {name}
  //   }
    
  // }


  const InterviewerClass = classNames("interviewers__item", {
    " interviewers__item-image": props.avatar,
    " interviewers__item--selected": props.selected
  });

  return (
    <li className={InterviewerClass} onClick={()=> props.setInterviewer(props.id)}>
      <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}