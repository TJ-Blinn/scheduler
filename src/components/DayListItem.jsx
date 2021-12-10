import React from "react";
import "./DayListItem.scss";
import classNames from "classnames";

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
  
  // The <li> represents the entire day item | <h2> displays day name | <h3> displays spots remaining for a day
  return (
    <li className={dayClass} data-testid="day" onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light" >{availableSpots} </h3>
    </li>
  );
}