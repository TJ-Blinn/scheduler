import React from "react";
import Button from "../Button"

// * styles is referenced in stories/index.js file, we don't need to import it again

export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
  <h1 className="text--semi-bold">{props.message}</h1>
  <section className="appointment__actions">
    <Button onClick={props.onCancel} danger>Cancel</Button>
    <Button danger onClick={props.onConfirm} confirm>Confirm</Button>
  </section>
</main>

  )
}