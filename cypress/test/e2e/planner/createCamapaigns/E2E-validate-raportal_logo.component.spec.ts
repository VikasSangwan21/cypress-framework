import { PageAction } from '../../../../support/PageAction';
import { equal } from 'assert';
import { config } from 'cypress/types/bluebird';
import 'cypress-file-upload';
import { parse } from 'path';
import { isInteger, toPairs } from 'cypress/types/lodash';
import { contains } from 'cypress/types/jquery';
import { exit } from 'process';

let epicName = 'Campaigns Create';
let featureName = 'E2E Validate Rapportal logo';
let tag = '';

describe(featureName, () => {

  beforeEach(() => {
    Report.testDetails(epicName, featureName, tag);
  });

  //**Validate correct Rapportal logo load */
  it('E2E Validate Rapportal logo ', () => {
    cy.loginAsPlanner();
    PageAction.campaignCreatePage()
      .visit();

    cy.get('cad-header-breadcrumb > .title > a > #subheader-app-logo-ooh').should('be.visible');

    cy.get('cad-header-breadcrumb > .title > a > #subheader-app-logo-ooh')
      .should('have.css', 'background-image')
      .should('include', 'c8173bcca5be6f206ae926fb01a794ed.png');
  });

});
