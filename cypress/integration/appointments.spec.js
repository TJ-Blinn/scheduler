// !!! make a GET request to our http://localhost:8001/api/debug/reset route to reset the database before each test.

describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    // Visits the root of our web server, verify that "Monday" is in the DOM before next step
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    // Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]").first().click();

    // Enters their name
    cy.get('[data-testid="student-name-input"]').type("Lydia Miller-Jones");

    // Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']").click();

    // Clicks the save button
    cy.contains("Save").click();

    // Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    // Clicks the edit button for the existing appointment
    cy.get("[alt='Edit']").first().click({ force: true });

    // Changes the name and interviewer
    cy.get("[alt='Tori Malcolm']").click();
    cy.get('[data-testid="student-name-input"]').clear().type("Lydia Miller-Jones");

    // Clicks the save button
    cy.contains("Save").click();

    // Sees the edit to the appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel and interview", () => {
    // Clicks the delete button for the existing appointment
    cy.get("[alt='Delete']").click({ force: true });

    // Clicks the confirm button
    cy.contains("Confirm").click();

    // Sees that the appointment slot is empty
    cy.contains("DELETING").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
