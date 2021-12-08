import React from "react";
import axios from "axios";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  debug,
  getByText,
  getByTestId,
  queryByText,
  queryByAltText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
} from "@testing-library/react";
// import { getByText, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

xit("renders without crashing", () => {
  render(<Application />);
});

// it("changes the schedule when a new day is selected", () => {
//   const { getByText } = render(<Application />);

//   return waitForElement(() => getByText("Monday")).then(() => {
//     fireEvent.click(getByText("Tuesday"));

//     expect(getByText("Leopold Silvers")).toBeInTheDocument();
//   });
// });

// async and await syntax
describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  // book interview and check student is rendered to <article> after save
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // search all elements in the DOM with the matching data-testid attribute, "appointment" in the container
    const appointments = getAllByTestId(container, "appointment");

    //appointment that references the first element in the appointments array.
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));
    // console.log(prettyDOM(appointment));
    // console.log(prettyDOM(day));
    expect(day).toBeTruthy();

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // console.log(prettyDOM(container));

    // 3. search all elements in the DOM with the matching data-testid attribute, "appointment" in the container
    const appointment = getAllByTestId(container, "appointment").find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, "Delete"));
    // console.log(prettyDOM(appointment));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to Delete?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //console.log(prettyDOM(container));

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Edit"));
    // 4. Check that the form appears with student name appearing and interviewer selected.
    // await waitForElement(() => {
    //   expect(container.getByTestId("student-name-input").value, "Archie Cohen");
    // });

    // console.log(container.getByTestId("student-name-input"));

    console.log(prettyDOM(container));

    // 5. Type in the input field and change the name.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    // 6. Click the "Save" button on the confirmation.
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check that the element with the text "SAVING" is displayed.
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    // 8. Wait until the appointment appears with new content.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // 9. Check that the DayListItem with the text "Monday" also has the text "1 spots remaining".
    const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));
    // console.log(prettyDOM(appointment));
    // console.log(prettyDOM(day));
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });

  // ERROR HANDLING: revert to the default behaviour after the single request that this test generates is complete.
  it("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
  });

  it("shows the delete error when failing to deelte an appointment", () => {
    axios.delete.mockRejectedValueOnce();
  });
});
