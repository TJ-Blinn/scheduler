import React from "react";
import classNames from "classnames";
import "./InterviewerListItem.scss"

export default function InterviewerListItem(props) {  

  const InterviewerClass = classNames("interviewers__item", {   
    " interviewers__item--selected": props.selected
  });

  return (
    <li className={InterviewerClass} >
      <img
      onClick={props.onChange}
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
      />
      {props.selected && props.name}      
    </li>
  )
}