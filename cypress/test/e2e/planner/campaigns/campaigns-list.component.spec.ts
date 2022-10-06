import { PageAction } from '../../../../support/PageAction';

let epicName = 'Campaigns List';
let featureName = 'Campaigns List Page';
let tag = '';

describe(featureName, () => {
  // before(() => {
  //   cy.loginAsPlanner();
  // });
  
  beforeEach(() => {
    Report.testDetails(epicName, featureName, tag);
    
    cy.loginAsPlanner();

    PageAction.campaignPage()
      .visit();
  });

  it('Should not list campaign with less than 1 item', () => {
    cy.get(':nth-child(2)').find('tr').should('not.have.length.lessThan', 1);
  });
});
