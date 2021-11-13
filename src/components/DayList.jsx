import React from "react";
import DayListItem from "./DayListItem";

// iterate over the days array and use its data to create a new array of <DayListItem>
// components which can be rendered in the <ul> of our <DayList> (use the .map method). 

export default function DayList(props) {
  // const {day, days, setDay} = props;
  // props.day | refers to the props in the storybook index.js DayList component
  const daysComponent = props.days.map(day => {
    console.log("---------------", day);
    return <DayListItem
    key={day.id}
    name={day.name}
    spots={day.spots}
    selected={day.name === props.value}
    setDay={() => props.onChange(props.name)}
     />
  })

  return <ul>
    {daysComponent}
  </ul>
};