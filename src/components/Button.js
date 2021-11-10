import React from "react";

import "components/Button.scss";

export default function Button(props) {
  let buttonClass = "button";

  //   Confirm uses the confirm prop to apply the .button--confirm modifier class
  if (props.confirm) {
    buttonClass += " button--confirm";
  }
  //   Danger uses the danger prop to apply the .button--danger modifier class
  if (props.danger) {
    buttonClass += " button--danger";
  }

  return (
    <button className={buttonClass} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
}
