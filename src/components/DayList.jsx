import React from "react";
import DayListItem from "./DayListItem";

// iterate over the days array and use its data to create a new array of <DayListItem>
// components which can be rendered in the <ul> of our <DayList> (use the .map method). 

export default function DayList(props) {
  // console.log("DayList props: ----------", props);
  const {day, days, setDay} = props;

  // const daysArray = props.days;
  // console.log("daysArray Map results --------", daysArray.map);
  const daysComponent = days.map(day => {
    console.log("---------------", day);
    return <DayListItem
    name={day.name}
    spots={day.spots}
    selected={day.name === day}
    setDay={setDay}
     />
  })

  return <ul>
    {daysComponent}
  </ul>
};