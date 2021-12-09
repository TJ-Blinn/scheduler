describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should Navigate to Tuesday", () => {
    cy.visit("/");
    // get the list item that contains the text "Tuesday" and clicks on it.
    // verify that the day list item has a specific value for the background-color CSS property
    cy.contains("[data-testid=day]", "Tuesday").click().should("have.class", "day-list__item--selected");
  });
});
