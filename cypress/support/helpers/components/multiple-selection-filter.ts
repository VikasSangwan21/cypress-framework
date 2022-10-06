export class MultipleSelectionFilter {
  selectOption(fieldLocator: string, option: string) {
    cy.get(`${ fieldLocator }`).click();
    cy.get(`${ fieldLocator }`).within(() => cy.get('.smart-search-list__search input').type(option));
    cy.get(`${ fieldLocator }`).within(() => cy.get('cad-smart-search-list-item .list-item').contains(option).click());
    cy.get(`${ fieldLocator }`).within(() => cy.get('cad-button').contains('Apply').click({ force: true }));
    cy.get(`${ fieldLocator }`).within(() => cy.get('.dropdown__head').should('contain', option));
  }
}
