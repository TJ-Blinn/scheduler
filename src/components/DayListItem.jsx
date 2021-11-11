import React from "react";
import "./DayListItem.scss";
import classNames from "classnames";

// The <li> represents the entire day item
// The <h2> should display the day name
// The <h3> should display the spots remaining for a day

export default function DayLisItem(props) {
  const dayClass = classNames("day-list__item", {
    " day-list__item--full": props.spots === 0,
    " day-list__item--selected": props.selected,
  });
  
  
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}