export class Header {
  navigateBack() {
    cy.get('.cad-button--back-regular').click();
  }
}