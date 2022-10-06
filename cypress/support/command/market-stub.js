Cypress.Commands.add('stubMarketRequests', () => {
  cy.intercept('GET', `**/shell/v1.0/api/markets?size=500&cad-market=US`, { fixture: 'mie/markets.json' });
});
