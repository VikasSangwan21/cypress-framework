import { PageAction } from '../../../../support/PageAction';
import { equal } from 'assert';
import { config } from 'cypress/types/bluebird';
import 'cypress-file-upload';
import { parse } from 'path';
import { isInteger, toPairs } from 'cypress/types/lodash';
import { contains } from 'cypress/types/jquery';
import { exit } from 'process';

let epicName = 'Campaigns Create';
let featureName = 'E2E General Information - Missing Required Statement';
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
  it('E2E General Information - Missing Required Statement', () => {
    cy.loginAsPlanner();
    PageAction.campaignCreatePage()
      .visit();

    cy.get('.cad-global-create-modern__button > .cad-button').click();
    cy.get('.cad-row_clear > .title').contains('New Campaign');

    cy.get(PageAction.campaignCreatePage().campaignName).focus().blur();
    cy.get('.cad-validation-errors__item').should('contain', 'Campaign Name is Required.');
    cy.get('.cad-validation-errors__item').should('be.visible');

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    cy.get(PageAction.campaignCreatePage().campaignDesc).focus().blur();
    cy.get('.cad-validation-errors__item').should('contain', 'Campaign Description is Required.');
    cy.get('.cad-validation-errors__item').should('be.visible');

    // PageAction.campaignCreatePage()
    //   .selectObjective(Objective[3])
    //   .selectAgency(Agency[3])
    //   .selectClient(Client[3]);

    cy.get(PageAction.campaignCreatePage().objective).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().objectiveSelect).should('contain', 'Select Objective')
    cy.get(PageAction.campaignCreatePage().objective).click();
    cy.get(PageAction.campaignCreatePage().objectiveSearch)
      .should('have.attr', 'placeholder', 'Search').type(Objective[3]).wait(1000);
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').first().click();
    cy.get(PageAction.campaignCreatePage().objective).click();

    cy.get(PageAction.campaignCreatePage().agency).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().agencySelect).should('contain', 'Select Agency')
    cy.get(PageAction.campaignCreatePage().agency).click();
    cy.get(PageAction.campaignCreatePage().agencySearch)
      .should('have.attr', 'placeholder', 'Search').type(Agency[3]).wait(1000);
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').last().click();
    cy.get(PageAction.campaignCreatePage().agency).click();

    cy.get(PageAction.campaignCreatePage().client).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().clientSelect).should('contain', 'Select Client')
    cy.get(PageAction.campaignCreatePage().client).click();
    cy.get(PageAction.campaignCreatePage().clientSearch)
      .should('have.attr', 'placeholder', 'Search').type(Client[3]).wait(1000);
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').first().click();
    cy.get(PageAction.campaignCreatePage().client).click();

    cy.get(PageAction.campaignCreatePage().campaignBudget).focus().blur();
    cy.get('.cad-validation-errors__item').should('contain', 'Budget is Required.');
    cy.get(PageAction.campaignCreatePage().campaignBudget).type('ABC').blur();
    cy.get(PageAction.campaignCreatePage().campaignBudget).should('be.empty');
    cy.get('.cad-validation-errors__item').should('contain', 'Budget is Required.');
    cy.get('.cad-validation-errors__item').should('be.visible');

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    cy.get(PageAction.campaignCreatePage().campaignDateRange).click();
    cy.get(
      `${PageAction.campaignCreatePage().calendarLeft}
        > .cad-month-calendar
        > .cad-month-calendar__header
        > .cad-month-calendar__header__icon--right`
    ).click();
    cy.get(
      `${PageAction.campaignCreatePage().calendarLeft}
        > .cad-month-calendar
        > .cad-month-calendar__header
        > .cad-month-calendar__header__icon--right`
    ).click();
    cy.get('[data-automation="calendar-left"] > .cad-month-calendar > .cad-month-calendar__matrix').contains('12').click();
    cy.get('[data-automation="calendar-left"] > .cad-month-calendar > .cad-month-calendar__matrix').contains('25').click();
    cy.get(`${PageAction.campaignCreatePage().applyBtn} > .cad-button`).click();

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    cy.get(PageAction.campaignCreatePage().campaignResDate).click();
    cy.get(`.cad-month-calendar__header__icon--right`).click();
    cy.get('.cad-month-calendar__matrix')
      .contains('22').click();
    cy.get('[priority="primary"] > .cad-button').click();

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    cy.get(PageAction.campaignCreatePage().marketRegion).click();
    cy.get(PageAction.campaignCreatePage().marketRegion).type('Las');
    cy.get(PageAction.campaignCreatePage().marketRegionList).click();
    // cy.get('.icon-clear > .icon > use').click();

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');
  });

});
