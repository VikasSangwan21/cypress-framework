// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-wait-until';
Cypress.Commands.add('getByDataAutomation', {prevSubject: 'optional'}, (subject, id) => {
  if (subject) {
    return cy.wrap(subject).find(`[data-automation="${id}"]`);
  } else {
    return cy.get(`[data-automation="${id}"]`);
  }
});

Cypress.Commands.add('clickButton', {prevSubject: 'optional'}, (subject, buttonText) => {
  if (subject) {
    return cy.wrap(subject)
      .find('button').contains(buttonText).click();
  } else {
    return cy.get('button').contains(buttonText).click();
  }
});

