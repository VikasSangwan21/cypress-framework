Cypress.Commands.add('stubNotificenterRequests', () => {
  cy.intercept('GET', `**/notificenter/v1.0/api/processes/register`, {
    sessionId: 'processes_14db35f7-670c-46d4-a027-95d572cb169d',
    totalElements: 0
  });

  cy.intercept('GET', `**/notificenter/v1.0/api/**`, {
    fixture: 'mie/paged-empty.json'
  }).as('StubbedNotification');
});

