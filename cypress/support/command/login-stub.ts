// tslint:disable:max-line-length
import { oohClients, oohAgency, oohAudienceSegment, oohCampaignConfig, oohDemographic, oohMarketRegion, oohObjective } from '../../fixtures/ooh/';
import { Permissions } from 'Pages';
import { campaigns } from '../../fixtures/ooh/campaigns/';
import { mieRoles, mieAgencies, mieTokenInfo, mieDynamicApps, mieSupport, mieMarkets } from '../../fixtures/mie/';

declare const btoa: any;
declare const localStorage: any;

// tslint:disable-next-line:no-reserved-keywords
const loginAsWrapper = (permissions: Permissions[] = []) => ({ as }: { as: string }): void => {
  // Report.When(`Login as ${as}`);
  cy.log(`Login as: ${ as }`);

  cy.fixture('mie/user-data').then((userData) => {
    const noPermissionsStub = {
      ...userData,
      roles: [...permissions]
    };

    localStorage.setItem('userData', btoa(JSON.stringify(noPermissionsStub)));
    localStorage.setItem('accessToken', 'ACCESS_TOKEN');
    localStorage.setItem('refreshToken', 'REFRESH_TOKEN');
    localStorage.setItem('apc_user_id', `WJ3bmEudGVzdDFAbWJ3dy5jb20=b`);
    localStorage.setItem('env', btoa('qa'));

  });
  cy.fixture('mie/storage-market.json').then((market) => {
    localStorage.setItem('markets', btoa(JSON.stringify(market)));
  });

  cy.fixture('mie/dynamic-apps').then((dynamicApps) => {
    localStorage.setItem('dynamicApplications', btoa(JSON.stringify(dynamicApps)));
  });
};

Cypress.Commands.add('loginAsPlannerStub', _ => loginAsWrapper([
  Permissions.OOH_USER,
  Permissions.OOH_PLANNER
])({ as: 'Planner' }));

Cypress.Commands.add('loginAsMediaOwnerStub', _ => loginAsWrapper([
  Permissions.OOH_USER,
  Permissions.OOH_MO
  // Permissions.OOH_MO_CAMPAIGN
])({ as: 'MediaOwner' }));

Cypress.Commands.add('stubInitialRequests', () => {
  cy.intercept('GET', `**/authmgmt/v1/roles`, { body: mieRoles }).as('stubbedRoles');
  cy.intercept('GET', `**/authmgmt/v1/agencies`, { body: mieAgencies }).as('stubbedAgencies');
  cy.intercept('GET', `**/oauth/v1/token-info`, { body: mieTokenInfo }).as('stubbedToken');
  cy.intercept('GET', `**/authmgmt/v1/applications?dynamic=true&native=true&app-management=true`, { body: mieDynamicApps }).as('stubbedDynamicApp');
  cy.intercept('GET', `**/authmgmt/v1/applications/integrated/user/current`, { body: mieSupport }).as('stubbedCurrentUser');
  cy.intercept('GET', `**/authmgmt/v1/applications?dynamic=true&native=true`, []).as('stubbedApplications');
  cy.intercept('GET', `**/shell/v1.0/api/markets?size=500`, { body: mieMarkets }).as('stubbedShellMarkets');
  cy.intercept('GET', `**/shell/v1.0/api/markets?page=*&size=*`, `{}`);
  cy.intercept('GET', `**/shell/v1.0/api/markets/*`,'{}');

  cy.intercept('GET', `**/ooh/v1.0/api/campaigns?name=*`, { body: campaigns }).as('stubbedCampaigns');
  cy.intercept('GET', `**/ooh/v1.0/api/clients?*`, { body: oohClients }).as('stubbedClients');
  cy.intercept('GET', `**/ooh/v1.0/api/campaigns/configs/objective?*`, { body: oohObjective }).as('stubbedObjectives');
  cy.intercept('GET', `**/ooh/v1.0/api/campaigns/configs/agency?*`, { body: oohAgency }).as('stubbedOOHAgencies');
  cy.intercept('GET', `**/ooh/v1.0/api/marketRegion?*`, { body: oohMarketRegion }).as('stubbedMarketRegion');
  cy.intercept('GET', `**/ooh/v1.0/api/audienceSegment?*`, { body: oohAudienceSegment }).as('stubbedAudienceSegment');
  cy.intercept('GET', `**/ooh/v1.0/api/audienceSegment/config/demographic*`, { body: oohDemographic }).as('stubbedDemographic');
});
