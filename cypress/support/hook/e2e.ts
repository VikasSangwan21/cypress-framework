

before(() => {
  Cypress.on('uncaught:exception', () => {
    return false;
  });
});

beforeEach(() => {
  cy.visit('/');
  cy.clearCookies();
  cy.clearLocalStorage();
  Report.Tag('E2E Test');
});
