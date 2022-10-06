import { PageAction } from '../../../../support/PageAction';
import { equal } from 'assert';
import { config } from 'cypress/types/bluebird';
import 'cypress-file-upload';
import { parse } from 'path';
import { isInteger, toPairs } from 'cypress/types/lodash';
import { contains } from 'cypress/types/jquery';
import { exit } from 'process';

let epicName = 'Campaigns Create';
let featureName = 'E2E Negative Scenario - Backdated Campaign';
let tag = '';

let Objective: string[] = [];
let Agency: string[] = [];
let Client: string[] = [];
let mo: string[] = [];
let loopCount: any;
let campaignName = '';
let dupcampaignName = '';
let testDataPath = '';
let fileNamesUpload: string[] = [];
let moEmail: string[] = [];

describe(featureName, () => {

  beforeEach(() => {
    Report.testDetails(epicName, featureName, tag);
  });

  // read campaign configuration file
  it('read campaign configuration file', () => {
    cy.fixture('ooh/campaigns/campaign_config.json').then((config) => {
      Objective = config.Objective;
      Agency = config.Agency;
      Client = config.Client;
      mo = config.mo;
      loopCount = config.loopCount;
      dupcampaignName = config.dupcampaignName;
      testDataPath = config.testDataPath;
      fileNamesUpload = config.fileNamesUpload
      moEmail = config.moEmail
      campaignName = `e2e test - ${PageAction.campaignCreatePage().campaignNameSuffix()}`;

      cy.task('setCampaignName', campaignName);
    })
  })

  // Create campaign
  it('E2E Negative Scenario - Backdated Campaign', () => {
    cy.loginAsPlanner();
    PageAction.campaignCreatePage()
      .visit();

    cy.get('.cad-global-create-modern__button > .cad-button').click();
    cy.get('.cad-row_clear > .title').contains('New Campaign');

    cy.get(PageAction.campaignCreatePage().campaignName).focus().blur();
    cy.get('.cad-validation-errors__item').should('contain', 'Campaign Name is Required.');
    cy.get(PageAction.campaignCreatePage().campaignName).type(campaignName).blur();
    cy.get(PageAction.campaignCreatePage().campaignName).should('have.value', campaignName);
    cy.get('.cad-validation-errors__item').should('not.exist');

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    cy.get(PageAction.campaignCreatePage().campaignDesc).focus().blur();
    cy.get('.cad-validation-errors__item').should('contain', 'Campaign Description is Required.');
    cy.get(PageAction.campaignCreatePage().campaignDesc).type(campaignName).blur();
    cy.get(PageAction.campaignCreatePage().campaignDesc).should('have.value', campaignName);
    cy.get('.cad-validation-errors__item').should('not.exist');

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    // PageAction.campaignCreatePage()
    //   .selectObjective(Objective[2])
    //   .selectAgency(Agency[2])
    //   .selectClient(Client[2]);

    cy.get(PageAction.campaignCreatePage().objective).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().objectiveSelect).should('contain', 'Select Objective')
    cy.get(PageAction.campaignCreatePage().objective).click();
    cy.get(PageAction.campaignCreatePage().objectiveSearch)
      .should('have.attr', 'placeholder', 'Search').type(Objective[2]).wait(1000);
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').first().click();
    cy.get(PageAction.campaignCreatePage().objective).click();

    cy.get(PageAction.campaignCreatePage().agency).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().agencySelect).should('contain', 'Select Agency')
    cy.get(PageAction.campaignCreatePage().agency).click();
    cy.get(PageAction.campaignCreatePage().agencySearch)
      .should('have.attr', 'placeholder', 'Search').type(Agency[2]).wait(1000);
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').last().click();
    cy.get(PageAction.campaignCreatePage().agency).click();

    cy.get(PageAction.campaignCreatePage().client).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().clientSelect).should('contain', 'Select Client')
    cy.get(PageAction.campaignCreatePage().client).click();
    cy.get(PageAction.campaignCreatePage().clientSearch)
      .should('have.attr', 'placeholder', 'Search').type(Client[2]).wait(1000);
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').first().click();
    cy.get(PageAction.campaignCreatePage().client).click();

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    cy.get(PageAction.campaignCreatePage().campaignBudget).focus().blur();
    cy.get('.cad-validation-errors__item').should('contain', 'Budget is Required.');
    cy.get(PageAction.campaignCreatePage().campaignBudget).type('ABC').blur();
    cy.get(PageAction.campaignCreatePage().campaignBudget).should('be.empty');
    cy.get('.cad-validation-errors__item').should('contain', 'Budget is Required.');
    cy.get(PageAction.campaignCreatePage().campaignBudget).type('800000').blur();
    cy.get(PageAction.campaignCreatePage().campaignBudget).should('have.value', '800,000.00');
    cy.get('.cad-validation-errors__item').should('not.exist');

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    cy.get(PageAction.campaignCreatePage().campaignDateRange).click();
    cy.get(`${PageAction.campaignCreatePage().applyBtn} > .cad-button`).should('be.disabled');
    cy.get(
      `${PageAction.campaignCreatePage().calendarLeft}
          > .cad-month-calendar
          > .cad-month-calendar__header
          > .cad-month-calendar__header__icon--left`
    ).click();
    cy.get('[data-automation="calendar-left"] > .cad-month-calendar > .cad-month-calendar__matrix').contains('12').click();
    cy.get('[data-automation="calendar-left"] > .cad-month-calendar > .cad-month-calendar__matrix').contains('25').click();
    cy.get(`${PageAction.campaignCreatePage().applyBtn} > .cad-button`).should('be.visible');
    cy.get(`${PageAction.campaignCreatePage().applyBtn} > .cad-button`).click();

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled'); 

    cy.get(PageAction.campaignCreatePage().campaignResDate).click();
    cy.get(
      '.cad-month-calendar__header__icon--right > cad-icon > .icon'
    ).click();
    cy.get('.cad-month-calendar__matrix')
      .contains('10').click();
    cy.get('[priority="primary"] > .cad-button').should('be.disabled');

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled'); 

    cy.get(PageAction.campaignCreatePage().marketRegion).click();
    cy.get(PageAction.campaignCreatePage().marketRegion).type('Los');
    cy.get(PageAction.campaignCreatePage().marketRegionList1).click();
    // cy.get('.icon-clear > .icon > use').click();

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled'); 

    //**Demographics */
    cy.get(PageAction.campaignCreatePage().primaryAudience).should('be.visible').click();
    cy.get(PageAction.campaignCreatePage().primaryAudience).find('cad-search-input')
      .click()
      .type('Adults 18-34')
      .wait(1000);
    cy.get('[style=""] > :nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item')
      .should('contain.text','Adults 18-34')
      .click();

    cy.get(PageAction.campaignCreatePage().secondaryAudience).should('be.visible');

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled'); 

    cy.get(PageAction.campaignCreatePage().comment).type(campaignName)

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled'); 
  });

});
