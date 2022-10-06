export class ChipsDropDown {
  selectOption(fieldLocator: string, option: string, isOpened?: boolean) {
    if (!isOpened) {
      cy.get(`${fieldLocator} cad-dropdown`).click();
    }
    cy.get(`${fieldLocator}`).within(() =>
      cy.get('.smart-search-list__search input').type(option));
    cy.get(`${fieldLocator}`).within(() =>
      cy.get('cad-smart-search-list .list-item').contains(option).click({force: true} ));
    cy.get(`${fieldLocator}`).within(() =>
      cy.get('.chips-dropdown__item').should('contain', option));
  }
}
