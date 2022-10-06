export class SmartSearchList {
  findOption(listLocator: string, option: string) {
    cy.get(`${ listLocator }`)
      .find('.smart-search-list__search input')
      .clear()
      .type(option)
      // TODO: WAIT FOR OPTIONS TO LOAD OR IT WILL FAIL
      .wait(200)
      .then(() => this.getOption(listLocator, option).click({ force: true }));
  }
  
  selectOption(listLocator: string, option: string) {
    this.findOption(listLocator, option);
    this.isOptionSelected(listLocator, option);
  }
  
  deselectOption(listLocator: string, option: string) {
    this.findOption(listLocator, option);
    this.isOptionNotSelected(listLocator, option);
  }
  
  isOptionDisabledVerification(listLocator: string, option: string) {
    this.getOption(listLocator, option).should('have.class', 'list-item--disabled');
  }
  
  isOptionEnabledVerification(listLocator: string, option: string) {
    this.getOption(listLocator, option).should('not.have.class', 'list-item--disabled');
  }
  
  isOptionSelected(listLocator: string, option: string) {
    this.getOption(listLocator, option).should('have.class', 'list-item--selected');
  }
  
  isOptionNotSelected(listLocator: string, option: string) {
    this.getOption(listLocator, option).should('not.have.class', 'list-item--selected');
  }
  
  getOption(listLocator: string, option: string) {
    return cy.get(`${ listLocator }`)
      .find('cad-smart-search-list .list-item')
      .contains(option)
      .parents('.list-item');
  }

}
