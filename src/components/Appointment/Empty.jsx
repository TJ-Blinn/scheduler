import React from "react";

// * styles is referenced in stories/index.js file, we don't need to import it again

export default function Empty(props) {
  return (
    <main className="appointment__add">
  <img
    className="appointment__add-button"
    src="images/add.png"
    alt="Add"
    onClick={props.onAdd}
  />
</main>


  )
}