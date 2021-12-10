import React from "react";
import DayListItem from "./DayListItem";

// iterate over the days array and use its data to create a new array of <DayListItem>

export default function DayList(props) {
  
  const daysComponent = props.days.map(day => {
    
    return <DayListItem
    key={day.id}
    name={day.name}
    spots={day.spots}
    selected={day.name === props.value}
    setDay={props.onChange}
     />
  })

  return <ul>
    {daysComponent}
  </ul>
};