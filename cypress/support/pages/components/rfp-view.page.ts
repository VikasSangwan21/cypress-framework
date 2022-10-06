import { oohRfpCampaignCoke, oohRfpCoke } from '../../../fixtures/ooh/rfp'

export class ViewRFPPage {
  pageName = 'RfpViewPage';
  url =
    '/ooh/rfp/view/6ae53ef8-008a-4aa4-9106-fbfcc99564a2/true/09e7e7e6-1f84-4dcd-b868-9aedd4caded1/9d2fa6dc-94b0-41ba-9317-57ddfc714555&/PROPOSAL_SENT';

  rfpCampaignGetApiUrl = '**/ooh/v1.0/api/campaigns/*?*';
  rfpRFPGetApiUrl = '**/ooh/v1.0/api/rfp/*?*';

  visit() {
    Report.Step(this.pageName);
    cy.visit(this.url);
    return this;
  }

  loadCokeCampaign() {
    cy.intercept('GET', this.rfpCampaignGetApiUrl, {
      body: oohRfpCampaignCoke,
    }).as('loadCokeCampaign');
    return this;
  }

  loadCokeRFP() {
    cy.intercept('GET', this.rfpRFPGetApiUrl, {
      body: oohRfpCoke,
    }).as('loadCokeRFP');
    return this;
  }
}
