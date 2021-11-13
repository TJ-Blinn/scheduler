import React from "react";
import "./styles.scss";

export default function Appointment(props) {
  const appointmentString = () => {
    if (props.time) {
      return `Appointment at ${props.time}`;
    }
    return "No Appointments";
  };

  return <article className="appointment">{appointmentString()}</article>;
}
