import { PageAction } from '../../../support/PageAction';

let epicName = 'RFP List';
let featureName = 'RFP List Page';
let tag = '';

describe.skip(featureName, () => {
  beforeEach(() => {
    Report.testDetails(epicName, featureName, tag);
    cy.loginAsMediaOwnerStub();
  });

  it('Should load RFP list and Expected RPF should exist', () => {
    PageAction.rfpListPage()
      .loadCampaignRFP()
      .loadListRFP()
      .visit();

    cy.get('table > tbody > tr:nth-child(1) > td > div[data-automation="ooh-rfp-list--name"]').should('contain', 'Coke x Lamar');
  });
});
