import React from "react";

// * styles is referenced in stories/index.js file, we don't need to import it again

export default function Header(props) {
  return (
    <header className="appointment__time">
  <h4 className="text--semi-bold">{props.time}</h4>
  <hr className="appointment__separator" />
</header>

  )
}