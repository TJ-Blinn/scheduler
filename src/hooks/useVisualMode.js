// Custom hooks to seperate logic from rendering of components.
// need to keep track of the history of the modes, so we can go backwards.
// import Appointment from "components/Appointment";
import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // When transition is called, we need to add the new mode to our history.
  // replace is a Default Parameter to set default value for parameter
  function transition(mode, replace = false) {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), mode]);

      // const newHistory = [...history];
      // const indexOfLast = newHistory.length - 1;
      // newHistory[indexOfLast] = mode;

      setMode(mode);
    } else {
      setHistory((prev) => [...prev, mode]);
      setMode(mode);
    }
  }

  // When back is called, we should set the mode to the previous item in our history array.
  function back() {
    // [0, 1, 2, 3]
    // history.length - 2
    // history = array of modes | Ex: ["create", "show", "delete", "view"]
    if (history.length > 1) {
      history.pop();
      const indexOfPrevious = history.length - 1;
      setMode(history[indexOfPrevious]);
    }
  }

  return { mode, transition, back };
}
