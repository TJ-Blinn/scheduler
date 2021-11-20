import React from "react";
import "./DayListItem.scss";
import classNames from "classnames";

// The <li> represents the entire day item
// The <h2> should display the day name
// The <h3> should display the spots remaining for a day

// DayList Item is requiring arguments passed into it called "props'"
// we then destructuring the spots parameter which was passed the singular values of spots
// taking out spots arguments from the list of arguments "props" (in the DayListItem function)


export default function DayListItem(props) {
  
  const {spots} = props

  function formatSpots(spots) {
    if (spots === 1) {
      return `${spots} spot remaining`
    } 
    if (spots > 1) {
      return `${spots} spots remaining`
    }
    return `no spots remaining`
  
 }

 const availableSpots = formatSpots(spots)

  const dayClass = classNames("day-list__item", {
    " day-list__item--full": props.spots === 0,
    " day-list__item--selected": props.selected,
  });  
  
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{availableSpots}</h3>
    </li>
  );
}