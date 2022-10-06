import Response = Cypress.Response;

// tslint:disable-next-line:no-reserved-keywords
const loginAsWrapper = ({ token, as }: { token: string; as: string }): void => {
  Report.Given(`Login as ${as}`);
  cy.log(`Login as: ${as}`);

  cy.request({
    method: 'POST',
    url: Cypress.env('tokenUrl'),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${token}`
    },
    form: false,
    body: { grant_type: 'client_credentials' }
  }).then((response: Response<any>) => {
    cy.intercept('GET', `**/authmgmt/v1/users/me`).as('authmgmtUsers');
    cy.intercept('GET', `**/authmgmt/v1/roles`).as('authmgmtRoles');
    cy.intercept('GET', `**/authmgmt/v1/agencies`).as('authmgmtAgencies');
    cy.intercept('GET', `**/authmgmt/v1/applications?*`).as('authmgmtApplications');
    cy.intercept('GET', `**/authmgmt/v1/applications/integrated/user/current`).as('authmgmtIntegratedUser');

    cy.visit(`login-redirect?at=${response.body.access_token}&rt=${response.body.access_token}`);

    cy.wait([
      '@authmgmtUsers',
      '@authmgmtRoles',
      '@authmgmtAgencies',
      '@authmgmtApplications',
      '@authmgmtIntegratedUser'
    ]);

    cy.wait(1000);
  });
};

Cypress.Commands.add('loginAsPlanner', (_) => {
  const token = Cypress.env('planner');
  loginAsWrapper({ token, as: 'Planner' });
});

Cypress.Commands.add('loginAsMoClearChannelUS', (_) => {
  const token = Cypress.env('moClearChannelUS');
  loginAsWrapper({ token, as: 'MO ClearChannel-US' });
});

Cypress.Commands.add('loginAsMoLamarUS', (_) => {
  const token = Cypress.env('moLamarUS');
  loginAsWrapper({ token, as: 'MO Lamar-US' });
});

Cypress.Commands.add('loginAsMoOutFrontUS', (_) => {
  const token = Cypress.env('moOutFrontUS');
  loginAsWrapper({ token, as: 'MO OutFront-US' });
});

Cypress.Commands.add('loginAsMoBrandedCitiesUS', (_) => {
  const token = Cypress.env('moBrandedCitiesUS');
  loginAsWrapper({ token, as: 'MO Branded Cities-US' });
});

Cypress.Commands.add('loginAsMoOrangeBarrelUS', (_) => {
  const token = Cypress.env('moOrangeBarrelUS');
  loginAsWrapper({ token, as: 'MO Orange Barrel-US' });
});
