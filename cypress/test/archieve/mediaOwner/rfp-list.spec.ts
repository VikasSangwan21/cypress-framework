import { PageAction } from '../../../support/PageAction';

let epicName = 'Load RFP Page';
let featureName = 'List Down all related RFP';
let tag = 'RFP List';

describe.skip(featureName, () => {
  beforeEach(() => {
    Report.testDetails(epicName, featureName, tag);
    cy.loginAsMediaOwnerStub();
  });

  it('Should load RFP list page', () => {
    PageAction.rfpListPage()
//    .loadMockCampaign()
//    .loadMockRFP()
    .visit();
  });
});
