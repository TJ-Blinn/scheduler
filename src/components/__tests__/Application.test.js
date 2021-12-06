import React from "react";

import { render, cleanup, waitForElement, fireEvent, prettyDOM } from "@testing-library/react";
import { getByText, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";

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
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // console.log(prettyDOM(container));

    // search all elements in the DOM with the matching data-testid attribute, "appointment" in the container
    const appointments = getAllByTestId(container, "appointment");
    // console.log(prettyDOM(appointments));

    // appointment that references the first element in the appointments array.
    const appointment = appointments[0];
    // const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    // console.log(prettyDOM(appointment));
  });
});
