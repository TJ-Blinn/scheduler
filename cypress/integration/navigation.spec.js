describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should Navigate to Tuesday", () => {
    cy.visit("/");
    // get the list item that contains the text "Tuesday" and clicks on it.
    cy.get("li").contains("Tuesday").click();

    // verify that the day list item has a specific value for the background-color CSS property
    cy.contains("li", "Tuesday").should("have.css", "background-color", "rgb(242, 242, 242)");
  });
});
