import { PageAction } from '../../../support/PageAction';

let epicName = 'RFP View';
let featureName = 'RFP View Page';
let tag = '';

describe.skip(featureName, () => {
    
    beforeEach(() => {
      Report.testDetails(epicName, featureName, tag);
      cy.loginAsMediaOwnerStub();

      PageAction.ViewRFPPage()
      .loadCokeCampaign()
      .loadCokeRFP()
      .visit();
    });

    it('Should click on RPF and selected RFP loaded', () => {
      cy.get('div.campaign-container__title--holder > div.title').should('contain', 'Coke x Lamar');
    });

    it('RFP action buttons should be visible', () => {
        cy.get('cad-button[data-automation="ooh-campaign-detail-action-reject-rfp"]').should('be.visible').should('contain.text','Decline');
        cy.get('cad-button[data-automation="ooh-campaign-detail-action-send-rfp"]').should('be.visible').should('contain.text','Add Response');
      });
});
