import { PageAction } from '../../../../support/PageAction';
import { equal } from 'assert';
import { config } from 'cypress/types/bluebird';
import 'cypress-file-upload';
import { parse } from 'path';
import { isInteger, toPairs } from 'cypress/types/lodash';
import { contains } from 'cypress/types/jquery';
import { exit } from 'process';

let epicName = 'Campaigns delete';
let featureName = 'Delete Campaigns Draft/not in Draft Status';
let tag = '';

let campaignName = '';

describe(featureName, () => {

  beforeEach(() => {
    Report.testDetails(epicName, featureName, tag);

  });

  //Delete campaign
  it('Delete Campaigns Draft/not in Draft Status', () => {
    cy.loginAsPlanner();
    PageAction.campaignCreatePage()
      .visit();

    cy.get('cad-icon.icon-search > .icon').click();
    for (var i = 0; i < PageAction.campaignList.length; i++) {
      cy.get(PageAction.campaignCreatePage().globalSearch).clear().type(PageAction.campaignList[i]).wait(1000);
      cy.get("campaign-list.ng-star-inserted > .center").then($body => {
        if ($body.find('tbody.ng-star-inserted').length > 0) {   //evaluates as true

          cy.get('.cad-status__text').then(($cell) => {
            if ($cell.text().includes('Draft')) {
              cy.get('.cad-context-menu__dots').last().click();
              cy.get(PageAction.campaignCreatePage().view).should('not.be.disabled');
              cy.get(PageAction.campaignCreatePage().edit).should('not.be.disabled');
              cy.get(PageAction.campaignCreatePage().delete).should('not.be.disabled');

              cy.get(PageAction.campaignCreatePage().delete).click();

              cy.get(PageAction.campaignCreatePage().confirmCancel).should('not.be.disabled');
              cy.get(PageAction.campaignCreatePage().confirmDelete).should('not.be.disabled');

              cy.get(PageAction.campaignCreatePage().confirmDelete).click();

              cy.get('.cad-toast__title').should('contain', 'Campaign deleted successfully');
            }
            // delete campaign not in draft status
            else
              if (($cell.text().includes('RFP Sent')) || ($cell.text().includes('Response Received'))) {
                cy.get('.cad-context-menu__dots').last().click();

                cy.get(PageAction.campaignCreatePage().view).should('not.be.disabled');
                cy.get(PageAction.campaignCreatePage().edit).should('not.be.disabled');
                cy.get(PageAction.campaignCreatePage().delete).should('not.be.disabled');

                cy.get(PageAction.campaignCreatePage().delete).click();

                cy.get(PageAction.campaignCreatePage().confirmCancel).should('not.be.disabled');
                cy.get(PageAction.campaignCreatePage().confirmDelete).should('not.be.disabled');

                cy.get(PageAction.campaignCreatePage().confirmDelete).click();

                cy.get('.cad-toast__title').should('contain', 'Campaign not in draft status');
              }
          })
        }
      });
    }
    cy.get(PageAction.campaignCreatePage().globalSearch).clear();
  });

});
