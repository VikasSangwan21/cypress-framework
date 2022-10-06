import { PageAction } from '../../../../support/PageAction';
import { equal } from 'assert';
import { config } from 'cypress/types/bluebird';
import 'cypress-file-upload';
import { parse } from 'path';
import { isInteger, toPairs } from 'cypress/types/lodash';
import { contains } from 'cypress/types/jquery';
import { exit } from 'process';

let epicName = 'Campaigns Create';
let featureName = 'Campaigns Create Page';
let tag = '';

// cy.fixture('ooh/campaigns/campaign_config.json').as('campConfig')

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

// const campaignList: string[] = [];
let index = -2;

// let campaignName = ``;
// const dupcampaignName = `Test Campaign Name`;

describe(featureName, () => {

  beforeEach(() => {
    Report.testDetails(epicName, featureName, tag);

    cy.loginAsPlanner();

    PageAction.campaignCreatePage()
      .visit();
    campaignName = `e2e test - ${PageAction.campaignCreatePage().campaignNameSuffix()}`;
    // campaignList.push(campaignName);
    PageAction.campaignList.push(campaignName);
    index++;
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
      fileNamesUpload = config.fileNamesUpload;
      moEmail = config.moEmail
    })
  })

  // Create campaign
  it('E2E Positive Scenario - Data Set 1', () => {
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
    //   .selectObjective(Objective[index])
    //   .selectAgency(Agency[index])
    //   .selectClient(Client[index]);

    cy.get(PageAction.campaignCreatePage().objective).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().objectiveSelect).should('contain', 'Select Objective')
    cy.get(PageAction.campaignCreatePage().objective).click();
    cy.get(PageAction.campaignCreatePage().objectiveSearch)
      .should('have.attr', 'placeholder', 'Search').type(Objective[index]).wait(1000);
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').first().click();
    cy.get(PageAction.campaignCreatePage().objective).click();

    cy.get(PageAction.campaignCreatePage().agency).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().agencySelect).should('contain', 'Select Agency')
    cy.get(PageAction.campaignCreatePage().agency).click();
    cy.get(PageAction.campaignCreatePage().agencySearch)
      .should('have.attr', 'placeholder', 'Search').type(Agency[index]).wait(1000);
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').last().click();
    cy.get(PageAction.campaignCreatePage().agency).click();

    cy.get(PageAction.campaignCreatePage().client).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().clientSelect).should('contain', 'Select Client')
    cy.get(PageAction.campaignCreatePage().client).click();
    cy.get(PageAction.campaignCreatePage().clientSearch)
      .should('have.attr', 'placeholder', 'Search').type(Client[index]).wait(1000);
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').first().click();
    cy.get(PageAction.campaignCreatePage().client).click();

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    cy.get(PageAction.campaignCreatePage().campaignBudget).focus().blur();
    cy.get('.cad-validation-errors__item').should('contain', 'Budget is Required.');
    cy.get(PageAction.campaignCreatePage().campaignBudget).type('ABC').blur();
    cy.get(PageAction.campaignCreatePage().campaignBudget).should('be.empty');
    cy.get('.cad-validation-errors__item').should('contain', 'Budget is Required.');
    cy.get(PageAction.campaignCreatePage().campaignBudget).type('500000').blur();
    cy.get(PageAction.campaignCreatePage().campaignBudget).should('have.value', '500,000.00');
    cy.get('.cad-validation-errors__item').should('not.exist');

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    cy.get(PageAction.campaignCreatePage().campaignDateRange).click();
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
    cy.get('.cad-month-calendar__header__icon--right > cad-icon > .icon').click();
    cy.get('.cad-month-calendar__matrix')
      .contains('10').click();
    cy.get('[priority="primary"] > .cad-button').click();

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');

    cy.get(PageAction.campaignCreatePage().marketRegion).click();
    cy.get(PageAction.campaignCreatePage().marketRegion).type('New');
    cy.get(PageAction.campaignCreatePage().marketRegionList).click();
    // cy.get('.ng-tns-c19-37 > .icon').click();
    cy.get('.icon-clear > .icon > use').click();

    cy.get(PageAction.campaignCreatePage().contentcontinueBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().continueBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');

    // cy.get('.mb-25').should('contain', ' Primary Audience : Adults 18+')
    cy.get('[value="create_audience"] > .button-toggle > a').click();
    cy.get('.mr-10 > .cad-button').should('not.be.disabled');
    cy.get('.campaign-form__text-right > cad-button.ng-star-inserted > .cad-button').should('be.disabled');
    cy.get('.col-sm-4 > .input').type(campaignName);
    cy.get('.campaign-form__text-right > cad-button.ng-star-inserted > .cad-button').should('not.be.disabled');
    cy.get('.campaign-form__text-right > cad-button.ng-star-inserted > .cad-button').click();
    cy.get('.cad-toast__title').should('contain', 'Audience Saved Successfully');
    // cy.get('[value="selected_audience"] > .button-toggle > .is-active').click();
    cy.get('[value="selected_audience"] > .button-toggle > a > .button-toggle__text').click();
    // cy.get('cad-dropdown.ng-tns-c24-69 > .cad-dropdown > .dropdown__head > .dropdown__head__content').click();
    // cy.get('.dropdown__head__content__icon > .ng-tns-c19-97 > .icon icon-arrow-down').click();
    cy.get(PageAction.campaignCreatePage().targetAudience).click();
    // cy.get('.div.ng-star-inserted > cad-smart-search-list-item > .list-item').contains(campaignName).click();
    cy.get(`.smartWidth > cad-smart-search-list.ng-untouched > .smart-search-list > .smart-search-list__list`).contains(campaignName).click();
    // cy.get(PageAction.campaignCreatePage().targetAudience).click();

    cy.get(PageAction.campaignCreatePage().comment).type(campaignName)

    cy.get(PageAction.campaignCreatePage().continueBtn).click();

    cy.get(PageAction.campaignCreatePage().digitalframe).click();
    cy.get('.pl-0 > .cad-button').click();

    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().previousstepBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().createCampaignBtn).should('not.be.disabled');

    cy.get(`${PageAction.campaignCreatePage().mediaformat} 
      > .smart-search-list__list > :nth-child(1) > :nth-child(1) 
      > div.ng-star-inserted > cad-smart-search-list-item 
      > .list-item > .list-item__text`).click()
    cy.get(`${PageAction.campaignCreatePage().mediaformat} 
      > .smart-search-list__list > :nth-child(1) > :nth-child(2) 
      > div.ng-star-inserted > cad-smart-search-list-item
      > .list-item > .list-item__text`).click()

    cy.get(`.media-select-popup__list-in > .smart-search-list >
     .smart-search-list__search > cad-search-input.ng-pristine >
     .cad-search > .cad-search__input > .ng-pristine`).type('Liveboards').wait(1000)

    cy.get('.list-item').eq(0).should('contain', 'Liveboards').click()

    cy.get('.display-inline > .cad-button').click();
    cy.get(':nth-child(1) > .row > .col-3 > .input').type('40');
    cy.get(':nth-child(2) > .row > .col-3 > .input').type('30');
    cy.get(':nth-child(3) > .row > .col-3 > .input').type('20');

    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().previousstepBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().createCampaignBtn).should('not.be.disabled');

    // cy.get(`${PageAction.campaignCreatePage().mediaowner} 
    //   > .smart-search-list__search > cad-search-input.ng-valid 
    //   > .cad-search > .cad-search__input`).type(mo[1]);
    // cy.get(`${PageAction.campaignCreatePage().mediaowner} 
    //   > .smart-search-list__list > :nth-child(1) > :nth-child(1) 
    //   > div.ng-star-inserted > cad-smart-search-list-item > .list-item`).click();
    // cy.get('section > div.col-md-12 > .row > :nth-child(2)').click();
    // cy.get(`.display-inline > .cad-dropdown > .dropdown__head 
    //   > .dropdown__head__content > .dropdown__head__content__title`).click()
    // cy.get(`.ng-untouched > .smart-search-list > .smart-search-list__list 
    //   > :nth-child(1) > :nth-child(1) > div.ng-star-inserted 
    //   > cad-smart-search-list-item > .list-item`).click();

    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().previousstepBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().createCampaignBtn).should('not.be.disabled');
    // Wait for audience popup to disappear
    cy.wait(2000);
    cy.get(PageAction.campaignCreatePage().createCampaignBtn).click();

    cy.get('.cad-toast__title').should('contain', 'Campaign Created');

    cy.get('.title_black').should(
      'contain', campaignName);
    cy.get('.cad-status__text').should(
      'contain', 'Draft');

    cy.get(PageAction.campaignCreatePage().sendRfpCancelBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().deleteCampaign).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().prevCampaign).should('not.be.disabled');

    // cy.get(PageAction.campaignCreatePage().continueBtn).click()
    // cy.get(PageAction.campaignCreatePage().editInMap).click()

    // cy.get(PageAction.campaignCreatePage().searchMedia).click()

    // cy.get(PageAction.campaignCreatePage().searchLocation).type('Pasadena CA, US');
    // cy.get('.pac-item').first().click();

    // cy.get(PageAction.campaignCreatePage().mediaOwner).click()
    // for(var i =1; i <= 4; i++){
    //   cy.get(`:nth-child(` + i +`) > .sideSlidePanel__types__table__body__row-last 
    //   > .sideSlidePanel__types__table__body__row-spacer > .bg-icon > .icon`).click()
    //   cy.get(`:nth-child(` + i +`) > .sideSlidePanel__types__table__body__row-last 
    //   > :nth-child(2) > .bg-icon > .icon`).click()
    // }

    // cy.get(PageAction.campaignCreatePage().units).click()
    // for(var i =1; i <= 4; i++){
    //   cy.get(':nth-child('+ i +') > .sideSlidePanel__types__table__body__row-last > span > .bg-icon > .icon').click()
    // }

    // cy.get(PageAction.campaignCreatePage().POI).click()
    // cy.get('.col-md-7 > .input').type('starbucks{enter}').blur()
    // // for(var i =1; i <= 4; i++){
    // //   cy.get(':nth-child('+ i +') > .sideSlidePanel__types__table__body__row-last > span > .bg-icon > .icon').click()
    // // }

    // // cy.get('.ooh-header__button').click()
    // // cy.get(PageAction.campaignCreatePage().saveOwnerPOI).click()

    // cy.get('.nav-arrow').click()

    // cy.get('[title="ChIJCV56KAzDwoARxHl6h-E3ZhI"] > img').click();
    // // cy.get(PageAction.campaignCreatePage().poiSlider).trigger('mouseright');
    // // cy.get(PageAction.campaignCreatePage().poiSlider).scrollTo('right')
    // // cy.get(PageAction.campaignCreatePage().poiSlider).scrollTo('right')
    // // cy.get('.float-right').type('1500')
    // // cy.get('.ooh-marker__poi > .gm-ui-hover-effect').click()

    // // cy.get('[title="ChIJc7U_MjPDwoARbKlkBDauD3A"] > img').click();
    // // // cy.get('#radius').scrollTo('right');
    // // cy.get('.ooh-marker__poi > .gm-ui-hover-effect').click()

    // // cy.get('[title="ChIJv7DNMVDDwoARRlQOVv48P9g"] > img').click();
    // // // cy.get('#radius').scrollTo('right');
    // // cy.get('.ooh-marker__poi > .gm-ui-hover-effect').click()

    // // cy.get('[title="ChIJV2T6V1zDwoARlg9wxdxN_oM"] > img').click();
    // // // cy.get('#radius').scrollTo('right');
    // // cy.get('.ooh-marker__poi > .gm-ui-hover-effect').click()

    // // cy.get('.ooh-header__button').click()
    // // cy.get(PageAction.campaignCreatePage().saveOwnerPOI).click()

    // // cy.get('[data-automation="ohh-map-container"] > .map-container__map > .gm-style > .title').click()

  });

  it('E2E Positive Scenario - Data Set 2', () => {
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
    //   .selectObjective(Objective[index])
    //   .selectAgency(Agency[index])
    //   .selectClient(Client[index]);

    cy.get(PageAction.campaignCreatePage().objective).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().objectiveSelect).should('contain', 'Select Objective')
    cy.get(PageAction.campaignCreatePage().objective).click();
    cy.get(PageAction.campaignCreatePage().objectiveSearch)
      .should('have.attr', 'placeholder', 'Search').type(Objective[index]).wait(1000);
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').first().click();
    cy.get(PageAction.campaignCreatePage().objective).click();

    cy.get(PageAction.campaignCreatePage().agency).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().agencySelect).should('contain', 'Select Agency')
    cy.get(PageAction.campaignCreatePage().agency).click();
    cy.get(PageAction.campaignCreatePage().agencySearch)
      .should('have.attr', 'placeholder', 'Search').type(Agency[index]).wait(1000);
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').last().click();
    cy.get(PageAction.campaignCreatePage().agency).click();

    cy.get(PageAction.campaignCreatePage().client).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().clientSelect).should('contain', 'Select Client')
    cy.get(PageAction.campaignCreatePage().client).click();
    cy.get(PageAction.campaignCreatePage().clientSearch)
      .should('have.attr', 'placeholder', 'Search').type(Client[index]).wait(1000);
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').first().click();
    cy.get(PageAction.campaignCreatePage().client).click();

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    cy.get(PageAction.campaignCreatePage().campaignBudget).focus().blur();
    cy.get('.cad-validation-errors__item').should('contain', 'Budget is Required.');
    cy.get(PageAction.campaignCreatePage().campaignBudget).type('ABC').blur();
    cy.get(PageAction.campaignCreatePage().campaignBudget).should('be.empty');
    cy.get('.cad-validation-errors__item').should('contain', 'Budget is Required.');
    cy.get(PageAction.campaignCreatePage().campaignBudget).type('600000').blur();
    cy.get(PageAction.campaignCreatePage().campaignBudget).should('have.value', '600,000.00');
    cy.get('.cad-validation-errors__item').should('not.exist');

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
    cy.get('[data-automation="calendar-left"] > .cad-month-calendar > .cad-month-calendar__matrix').contains('10').click();
    cy.get(
      `${PageAction.campaignCreatePage().calendarLeft}
        > .cad-month-calendar
        > .cad-month-calendar__header
        > .cad-month-calendar__header__icon--right`
    ).click();
    cy.get('[data-automation="calendar-right"] > .cad-month-calendar > .cad-month-calendar__matrix').contains('27').click();
    cy.get(`${PageAction.campaignCreatePage().applyBtn} > .cad-button`).click();

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    cy.get(PageAction.campaignCreatePage().campaignResDate).click();
    cy.get(`.cad-month-calendar__header__icon--right`).click();
    cy.get('.cad-month-calendar__matrix')
      .contains('25').click();
    for (var i = 1; i <= loopCount; i++) {
      cy.get('.cad-time-input > :nth-child(1) > [name="arrow-down"] > .icon').click();
    }
    cy.get('.cad-select__head__icon > .icon').click()
    cy.get('.cad-select__items-list > :nth-child(1) > .ng-star-inserted').click();
    cy.get('[priority="primary"] > .cad-button').click();

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    cy.get(PageAction.campaignCreatePage().marketRegion).click();
    cy.get(PageAction.campaignCreatePage().marketRegion).type('Chi');
    cy.get(PageAction.campaignCreatePage().marketRegionList1).click();
    cy.get('.icon-clear > .icon > use').click();

    cy.get(PageAction.campaignCreatePage().continueBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');

    // cy.get('.mb-25').should('contain', ' Primary Audience : Adults 18+')
    cy.get('[value="create_audience"] > .button-toggle > a').click();
    cy.get('.mr-10 > .cad-button').should('not.be.disabled');
    cy.get('.campaign-form__text-right > cad-button.ng-star-inserted > .cad-button').should('be.disabled');
    cy.get('.col-sm-4 > .input').type(campaignName);
    cy.get('.campaign-form__text-right > cad-button.ng-star-inserted > .cad-button').should('not.be.disabled');
    cy.get('.campaign-form__text-right > cad-button.ng-star-inserted > .cad-button').click();
    cy.get('.cad-toast__title').should('contain', 'Audience Saved Successfully');
    // cy.get('[value="selected_audience"] > .button-toggle > .is-active').click();
    cy.get('[value="selected_audience"] > .button-toggle > a > .button-toggle__text').click();
    // cy.get('cad-dropdown.ng-tns-c24-69 > .cad-dropdown > .dropdown__head > .dropdown__head__content').click();
    // cy.get('.dropdown__head__content__icon > .ng-tns-c19-97 > .icon icon-arrow-down').click();
    cy.get(PageAction.campaignCreatePage().targetAudience).click();
    // cy.get('.div.ng-star-inserted > cad-smart-search-list-item > .list-item').contains(campaignName).click();
    cy.get(`.smartWidth > cad-smart-search-list.ng-untouched > .smart-search-list > .smart-search-list__list`).contains(campaignName).click();
    // cy.get(PageAction.campaignCreatePage().targetAudience).click();

    cy.get(PageAction.campaignCreatePage().comment).type(campaignName)

    cy.get(PageAction.campaignCreatePage().continueBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');

    cy.get(PageAction.campaignCreatePage().continueBtn).click();

    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().previousstepBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().createCampaignBtn).should('not.be.disabled');

    cy.get(PageAction.campaignCreatePage().staticframe).click();
    cy.get('.pl-0 > .cad-button').click();

    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().previousstepBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().createCampaignBtn).should('not.be.disabled');

    cy.get(`${PageAction.campaignCreatePage().mediaformat} 
      > .smart-search-list__list > :nth-child(1) > :nth-child(3) 
      > div.ng-star-inserted > cad-smart-search-list-item 
      > .list-item > .list-item__text`).click()
    cy.get(`${PageAction.campaignCreatePage().mediaformat} 
      > .smart-search-list__list > :nth-child(1) > :nth-child(4) 
      > div.ng-star-inserted > cad-smart-search-list-item
      > .list-item > .list-item__text`).click()
    cy.get('.display-inline > .cad-button').click();
    cy.get(':nth-child(1) > .row > .col-3 > .input').type('20');
    cy.get(':nth-child(2) > .row > .col-3 > .input').type('50');

    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().previousstepBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().createCampaignBtn).should('not.be.disabled');

    cy.get(`${PageAction.campaignCreatePage().mediaowner} 
      > .smart-search-list__search > cad-search-input.ng-valid 
      > .cad-search > .cad-search__input`).type('OutFront');
    cy.get(`${PageAction.campaignCreatePage().mediaowner} 
      > .smart-search-list__list > :nth-child(1) > :nth-child(1) 
      > div.ng-star-inserted > cad-smart-search-list-item > .list-item`).click();
    cy.get('section > div.col-md-12 > .row > :nth-child(2)').click();
    cy.get(`.display-inline > .cad-dropdown > .dropdown__head 
      > .dropdown__head__content > .dropdown__head__content__title`).click()
    cy.get(`.ng-untouched > .smart-search-list > .smart-search-list__list 
      > :nth-child(1) > :nth-child(2) > div.ng-star-inserted 
      > cad-smart-search-list-item > .list-item`).click();

    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().previousstepBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().createCampaignBtn).should('not.be.disabled');

    cy.get(PageAction.campaignCreatePage().createCampaignBtn).click();

    cy.get('.cad-toast__title').should('contain', 'Campaign Created');

    cy.get('.title_black').should(
      'contain', campaignName);
    cy.get('.cad-status__text').should(
      'contain', 'Draft');
  });

  it.skip('E2E General Information - Missing Required Statement', () => {
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
    //   .selectObjective(Objective[index])
    //   .selectAgency(Agency[index])
    //   .selectClient(Client[index]);

    cy.get(PageAction.campaignCreatePage().objective).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().objectiveSelect).should('contain', 'Select Objective')
    cy.get(PageAction.campaignCreatePage().objective).click();
    cy.get(PageAction.campaignCreatePage().objectiveSearch)
      .should('have.attr', 'placeholder', 'Search').type(Objective[index]).wait(1000);
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').first().click();
    cy.get(PageAction.campaignCreatePage().objective).click();

    cy.get(PageAction.campaignCreatePage().agency).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().agencySelect).should('contain', 'Select Agency')
    cy.get(PageAction.campaignCreatePage().agency).click();
    cy.get(PageAction.campaignCreatePage().agencySearch)
      .should('have.attr', 'placeholder', 'Search').type(Agency[index]).wait(1000);
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').last().click();
    cy.get(PageAction.campaignCreatePage().agency).click();

    cy.get(PageAction.campaignCreatePage().client).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().clientSelect).should('contain', 'Select Client')
    cy.get(PageAction.campaignCreatePage().client).click();
    cy.get(PageAction.campaignCreatePage().clientSearch)
      .should('have.attr', 'placeholder', 'Search').type(Client[index]).wait(1000);
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
    cy.get('.icon-clear > .icon > use').click();

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    // cy.get('.mb-25').should('contain', ' Primary Audience : Adults 18+')
    cy.get('[value="create_audience"] > .button-toggle > a').click();
    cy.get('.mr-10 > .cad-button').should('not.be.disabled');
    cy.get('.campaign-form__text-right > cad-button.ng-star-inserted > .cad-button').should('be.disabled');
    cy.get('.col-sm-4 > .input').type(campaignName);
    cy.get('.campaign-form__text-right > cad-button.ng-star-inserted > .cad-button').should('not.be.disabled');
    cy.get('.campaign-form__text-right > cad-button.ng-star-inserted > .cad-button').click();
    cy.get('.cad-toast__title').should('contain', 'Audience Saved Successfully');
    // cy.get('[value="selected_audience"] > .button-toggle > .is-active').click();
    cy.get('[value="selected_audience"] > .button-toggle > a > .button-toggle__text').click();
    // cy.get('cad-dropdown.ng-tns-c24-69 > .cad-dropdown > .dropdown__head > .dropdown__head__content').click();
    // cy.get('.dropdown__head__content__icon > .ng-tns-c19-97 > .icon icon-arrow-down').click();
    cy.get(PageAction.campaignCreatePage().targetAudience).click();
    // cy.get('.div.ng-star-inserted > cad-smart-search-list-item > .list-item').contains(campaignName).click();
    cy.get(`.smartWidth > cad-smart-search-list.ng-untouched > .smart-search-list > .smart-search-list__list`).contains(campaignName).click();
    // cy.get(PageAction.campaignCreatePage().targetAudience).click();

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');
  });

  it.skip('E2E General Information - Unselect Required Fields', () => {
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

    cy.get(PageAction.campaignCreatePage().campaignBudget).focus().blur();
    cy.get('.cad-validation-errors__item').should('contain', 'Budget is Required.');
    cy.get(PageAction.campaignCreatePage().campaignBudget).type('ABC').blur();
    cy.get(PageAction.campaignCreatePage().campaignBudget).should('be.empty');
    cy.get('.cad-validation-errors__item').should('contain', 'Budget is Required.');
    cy.get(PageAction.campaignCreatePage().campaignBudget).type('700000').blur();
    cy.get(PageAction.campaignCreatePage().campaignBudget).should('have.value', '700,000.00');
    cy.get('.cad-validation-errors__item').should('not.exist');

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    cy.get(PageAction.campaignCreatePage().campaignDateRange).click();
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
    cy.get('.cad-month-calendar__header__icon--right > cad-icon > .icon').click();
    cy.get('.cad-month-calendar__matrix')
      .contains('10').click();
    cy.get('[priority="primary"] > .cad-button').click();

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');
  });

  it.skip('E2E Negative Scenario - Existing Campaign name', () => {
    cy.get('.cad-global-create-modern__button > .cad-button').click();
    cy.get('.cad-row_clear > .title').contains('New Campaign');

    cy.get(PageAction.campaignCreatePage().campaignName).focus().blur();
    cy.get('.cad-validation-errors__item').should('contain', 'Campaign Name is Required.');
    cy.get(PageAction.campaignCreatePage().campaignName).type(dupcampaignName).blur();
    cy.get(PageAction.campaignCreatePage().campaignName).should('have.value', dupcampaignName);
    cy.get('.cad-validation-errors__item').should('not.exist');

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    cy.get(PageAction.campaignCreatePage().campaignDesc).focus().blur();
    cy.get('.cad-validation-errors__item').should('contain', 'Campaign Description is Required.');
    cy.get(PageAction.campaignCreatePage().campaignDesc).type(dupcampaignName).blur();
    cy.get(PageAction.campaignCreatePage().campaignDesc).should('have.value', dupcampaignName);
    cy.get('.cad-validation-errors__item').should('not.exist');

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    // PageAction.campaignCreatePage()
    //   .selectObjective(Objective[index])
    //   .selectAgency(Agency[index])
    //   .selectClient(Client[index]);

    cy.get(PageAction.campaignCreatePage().objective).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().objectiveSelect).should('contain', 'Select Objective')
    cy.get(PageAction.campaignCreatePage().objective).click();
    cy.get(PageAction.campaignCreatePage().objectiveSearch)
      .should('have.attr', 'placeholder', 'Search').type(Objective[index]).wait(1000);
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').first().click();
    cy.get(PageAction.campaignCreatePage().objective).click();

    cy.get(PageAction.campaignCreatePage().agency).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().agencySelect).should('contain', 'Select Agency')
    cy.get(PageAction.campaignCreatePage().agency).click();
    cy.get(PageAction.campaignCreatePage().agencySearch)
      .should('have.attr', 'placeholder', 'Search').type(Agency[index]).wait(1000);
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').last().click();
    cy.get(PageAction.campaignCreatePage().agency).click();

    cy.get(PageAction.campaignCreatePage().client).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().clientSelect).should('contain', 'Select Client')
    cy.get(PageAction.campaignCreatePage().client).click();
    cy.get(PageAction.campaignCreatePage().clientSearch)
      .should('have.attr', 'placeholder', 'Search').type(Client[index]).wait(1000);
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').first().click();
    cy.get(PageAction.campaignCreatePage().client).click();

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    cy.get(PageAction.campaignCreatePage().campaignBudget).focus().blur();
    cy.get('.cad-validation-errors__item').should('contain', 'Budget is Required.');
    cy.get(PageAction.campaignCreatePage().campaignBudget).type('ABC').blur();
    cy.get(PageAction.campaignCreatePage().campaignBudget).should('be.empty');
    cy.get('.cad-validation-errors__item').should('contain', 'Budget is Required.');
    cy.get(PageAction.campaignCreatePage().campaignBudget).type('700000').blur();
    cy.get(PageAction.campaignCreatePage().campaignBudget).should('have.value', '700,000.00');
    cy.get('.cad-validation-errors__item').should('not.exist');

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    cy.get(PageAction.campaignCreatePage().campaignDateRange).click();
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
    cy.get('.cad-month-calendar__header__icon--right > cad-icon > .icon').click();
    cy.get('.cad-month-calendar__matrix')
      .contains('10').click();
    cy.get('[priority="primary"] > .cad-button').click();

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    cy.get(PageAction.campaignCreatePage().marketRegion).click();
    cy.get(PageAction.campaignCreatePage().marketRegion).type('Cal');
    cy.get(PageAction.campaignCreatePage().marketRegionList).click();
    cy.get('.icon-clear > .icon > use').click();

    cy.get(PageAction.campaignCreatePage().continueBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');

    // cy.get('.mb-25').should('contain', ' Primary Audience : Adults 18+')
    cy.get('[value="create_audience"] > .button-toggle > a').click();
    cy.get('.mr-10 > .cad-button').should('not.be.disabled');
    cy.get('.campaign-form__text-right > cad-button.ng-star-inserted > .cad-button').should('be.disabled');
    cy.get('.col-sm-4 > .input').type(campaignName);
    cy.get('.campaign-form__text-right > cad-button.ng-star-inserted > .cad-button').should('not.be.disabled');
    cy.get('.campaign-form__text-right > cad-button.ng-star-inserted > .cad-button').click();
    cy.get('.cad-toast__title').should('contain', 'Audience Saved Successfully');
    // cy.get('[value="selected_audience"] > .button-toggle > .is-active').click();
    cy.get('[value="selected_audience"] > .button-toggle > a > .button-toggle__text').click();
    // cy.get('cad-dropdown.ng-tns-c24-69 > .cad-dropdown > .dropdown__head > .dropdown__head__content').click();
    // cy.get('.dropdown__head__content__icon > .ng-tns-c19-97 > .icon icon-arrow-down').click();
    cy.get(PageAction.campaignCreatePage().targetAudience).click();
    // cy.get('.div.ng-star-inserted > cad-smart-search-list-item > .list-item').contains(campaignName).click();
    cy.get(`.smartWidth > cad-smart-search-list.ng-untouched > .smart-search-list > .smart-search-list__list`).contains(campaignName).click();
    // cy.get(PageAction.campaignCreatePage().targetAudience).click();

    cy.get(PageAction.campaignCreatePage().continueBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');

    cy.get(PageAction.campaignCreatePage().comment).type(dupcampaignName)

    cy.get(PageAction.campaignCreatePage().continueBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');

    cy.get(PageAction.campaignCreatePage().continueBtn).click();

    cy.get(PageAction.campaignCreatePage().digitalframe).click();
    cy.get('.pl-0 > .cad-button').click();

    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().previousstepBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().createCampaignBtn).should('not.be.disabled');

    cy.get(`${PageAction.campaignCreatePage().mediaformat} 
      > .smart-search-list__list > :nth-child(1) > :nth-child(1) 
      > div.ng-star-inserted > cad-smart-search-list-item 
      > .list-item > .list-item__text`).click()
    cy.get(`${PageAction.campaignCreatePage().mediaformat} 
      > .smart-search-list__list > :nth-child(1) > :nth-child(2) 
      > div.ng-star-inserted > cad-smart-search-list-item
      > .list-item > .list-item__text`).click()
    cy.get('.display-inline > .cad-button').click();
    cy.get(':nth-child(1) > .row > .col-3 > .input').type('40');
    cy.get(':nth-child(2) > .row > .col-3 > .input').type('30');

    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().previousstepBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().createCampaignBtn).should('not.be.disabled');

    cy.get(`${PageAction.campaignCreatePage().mediaowner} 
      > .smart-search-list__search > cad-search-input.ng-valid 
      > .cad-search > .cad-search__input`).type('lamar');
    cy.get(`${PageAction.campaignCreatePage().mediaowner} 
      > .smart-search-list__list > :nth-child(1) > :nth-child(1) 
      > div.ng-star-inserted > cad-smart-search-list-item > .list-item`).click();
    cy.get('section > div.col-md-12 > .row > :nth-child(2)').click();
    cy.get(`.display-inline > .cad-dropdown > .dropdown__head 
      > .dropdown__head__content > .dropdown__head__content__title`).click()
    cy.get(`.ng-untouched > .smart-search-list > .smart-search-list__list 
      > :nth-child(1) > :nth-child(1) > div.ng-star-inserted 
      > cad-smart-search-list-item > .list-item`).click();

    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().previousstepBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().createCampaignBtn).should('not.be.disabled');

    cy.get(PageAction.campaignCreatePage().createCampaignBtn).click()

    cy.get('.cad-toast__title').should('contain', 'Campaign Failed to Load');
    // cy.get('.cad-toast__title > .ng-tns-c71-19')

  });

  it.skip('E2E Negative Scenario - Backdated Campaign', () => {
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
    //   .selectObjective(Objective[index - 1])
    //   .selectAgency(Agency[index - 1])
    //   .selectClient(Client[index - 1]);

    cy.get(PageAction.campaignCreatePage().objective).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().objectiveSelect).should('contain', 'Select Objective')
    cy.get(PageAction.campaignCreatePage().objective).click();
    cy.get(PageAction.campaignCreatePage().objectiveSearch)
      .should('have.attr', 'placeholder', 'Search').type(Objective[index - 1]).wait(1000);
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').first().click();
    cy.get(PageAction.campaignCreatePage().objective).click();

    cy.get(PageAction.campaignCreatePage().agency).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().agencySelect).should('contain', 'Select Agency')
    cy.get(PageAction.campaignCreatePage().agency).click();
    cy.get(PageAction.campaignCreatePage().agencySearch)
      .should('have.attr', 'placeholder', 'Search').type(Agency[index - 1]).wait(1000);
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').last().click();
    cy.get(PageAction.campaignCreatePage().agency).click();

    cy.get(PageAction.campaignCreatePage().client).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().clientSelect).should('contain', 'Select Client')
    cy.get(PageAction.campaignCreatePage().client).click();
    cy.get(PageAction.campaignCreatePage().clientSearch)
      .should('have.attr', 'placeholder', 'Search').type(Client[index - 1]).wait(1000);
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
    cy.get('.icon-clear > .icon > use').click();

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled'); 

    // cy.get('.mb-25').should('contain', ' Primary Audience : Adults 18+')
    cy.get('[value="create_audience"] > .button-toggle > a').click();
    cy.get('.mr-10 > .cad-button').should('not.be.disabled');
    cy.get('.campaign-form__text-right > cad-button.ng-star-inserted > .cad-button').should('be.disabled');
    cy.get('.col-sm-4 > .input').type(campaignName);
    cy.get('.campaign-form__text-right > cad-button.ng-star-inserted > .cad-button').should('not.be.disabled');
    cy.get('.campaign-form__text-right > cad-button.ng-star-inserted > .cad-button').click();
    cy.get('.cad-toast__title').should('contain', 'Audience Saved Successfully');
    // cy.get('[value="selected_audience"] > .button-toggle > .is-active').click();
    cy.get('[value="selected_audience"] > .button-toggle > a > .button-toggle__text').click();
    // cy.get('cad-dropdown.ng-tns-c24-69 > .cad-dropdown > .dropdown__head > .dropdown__head__content').click();
    // cy.get('.dropdown__head__content__icon > .ng-tns-c19-97 > .icon icon-arrow-down').click();
    cy.get(PageAction.campaignCreatePage().targetAudience).click();
    // cy.get('.div.ng-star-inserted > cad-smart-search-list-item > .list-item').contains(campaignName).click();
    cy.get(`.smartWidth > cad-smart-search-list.ng-untouched > .smart-search-list > .smart-search-list__list`).contains(campaignName).click();
    // cy.get(PageAction.campaignCreatePage().targetAudience).click();

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled'); 

    cy.get(PageAction.campaignCreatePage().comment).type(campaignName)

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled'); 
  });

  it('E2E Create Campaign from Map', () => {
    cy.get('.dropdown__head__content__title').click();
    cy.get('[href="#/ooh/discover"]').click().wait(1000);

    cy.get(PageAction.campaignCreatePage().searchLocation).type('Pasadena CA, US').click();
    cy.get('.pac-item').first().click().wait(1000);

    // cy.get('.cad-button').click();
    // cy.get(`ooh-media-owner-filter.ng-star-inserted > .display-inline 
    // > .cad-dropdown > .dropdown__head > .dropdown__head__content`).click();

    // // const mo = ['Outfront', 'Lamar', 'Clear Channel', 'JCDecaux']

    // for (var j = 1; j <= loopCount; j++) {
    //   cy.get('.cad-search > .cad-search__input').type(mo[j - 1]);
    //   cy.get('.highlighted-search-text').click();
    //   cy.get('.cad-search > .cad-search__input > .ng-valid').clear();
    // }

    // cy.get('.ml-10 > .cad-button').click();
    // cy.get('.ml-7 > .cad-button').click().wait(1000);

    cy.get(PageAction.campaignCreatePage().mediaOwner).click()
    cy.get('.is-active > .button-toggle__label').wait(2000)
      .then(($span) => {
        var count = $span.text().trim();
        for (var i = 1; i <= parseInt(count); i++) {
          cy.get(`:nth-child(` + i + `) > .sideSlidePanel__types__table__body__row-left > div`)
            .then(($span) => {
              var moName = $span.text().trim();
              if (moName.toString() == mo[1].toString()) {
                cy.get(`:nth-child(` + (i - 8) + `) > .sideSlidePanel__types__table__body__row-last 
                > :nth-child(2) > .bg-icon > .icon > use`).click();
              }
            });
        }
      });

    // cy.get(`:nth-child(8) > .sideSlidePanel__types__table__body__row-last 
    //   > :nth-child(2) > .bg-icon > .icon`).click();

    // cy.get(PageAction.campaignCreatePage().units).click()
    // for (var i = 1; i <= loopCount; i++) {
    //   cy.get(':nth-child(' + i + ') > .sideSlidePanel__types__table__body__row-last > span > .bg-icon > .icon').click()
    // }

    cy.get(PageAction.campaignCreatePage().POI).click()
    cy.get('.col-md-7 > .input').type('shopping{enter}').blur()

    for (var i = 1; i <= loopCount * 4; i++) {
      // cy.get(`[style="width: 38px; height: 46px; overflow: hidden; position: absolute; 
      // cursor: pointer; touch-action: none; left: 125px; top: 34px; z-index: 80;"] > img`).click();
      // cy.get(PageAction.campaignCreatePage().enterPOIValue).type('{del}{selectall}{backspace}').type('2.40');
      // cy.get('cad-link.ng-star-inserted > .cad-link > .cad-link__text').should('contain', 'Select').click()

      // cy.get(`[style="width: 38px; height: 46px; overflow: hidden; position: absolute;
      //  cursor: pointer; touch-action: none; left: -113px; top: 10px; z-index: 56;"] > img`).click();
      // cy.get(PageAction.campaignCreatePage().enterPOIValue).type('{del}{selectall}{backspace}').type('1.75');
      // cy.get('cad-link.ng-star-inserted > .cad-link > .cad-link__text').should('contain', 'Select').click()
      // cy.get('[title="ChIJV2T6V1zDwoARlg9wxdxN_oM"] > img').click();
      // cy.get('[title="ChIJv7DNMVDDwoARRlQOVv48P9g"] > img').click();
      // cy.get('[title="ChIJhRhLHXzDwoARG2ILb6HBHaM"] > img').click();
      // cy.get('[title="ChIJCV56KAzDwoARxHl6h-E3ZhI"] > img').click();
      // cy.get('[title="ChIJv7DNMVDDwoARRlQOVv48P9g"] > img').click();
      // cy.get('[title="ChIJj-hCZ6jcwoARxpqHGZ_MIx8"] > img').click();

      cy.get(':nth-child(' + i + ') > .sideSlidePanel__types__table__body__row-last > span > .bg-icon > .icon').click()
    }

    cy.get('.ooh-header__button').click();
    cy.get('.sideSlidePanel__selectedMedia__header__right-save > .cad-button').click();

    cy.get('.input').type(campaignName).blur();
    cy.get(PageAction.campaignCreatePage().submitCampaign).click()

    cy.get('.cad-row_clear > .title').contains(campaignName);
    cy.get(PageAction.campaignCreatePage().campaignName).should('have.value', campaignName);
    cy.get('.cad-validation-errors__item').should('not.exist');

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    // cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    cy.get(PageAction.campaignCreatePage().campaignDesc).focus().blur();
    cy.get('.cad-validation-errors__item').should('contain', 'Campaign Description is Required.');
    cy.get(PageAction.campaignCreatePage().campaignDesc).type(campaignName).blur();
    cy.get(PageAction.campaignCreatePage().campaignDesc).should('have.value', campaignName);
    cy.get('.cad-validation-errors__item').should('not.exist');

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    // PageAction.campaignCreatePage()
    //   .selectObjective(Objective[Objective.length - 1])
    //   .selectAgency(Agency[Agency.length - 1])
    //   .selectClient(Client[Client.length - 1]);

    cy.get(PageAction.campaignCreatePage().objective).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().objectiveSelect).should('contain', 'Select Objective')
    cy.get(PageAction.campaignCreatePage().objective).click();
    cy.get(PageAction.campaignCreatePage().objectiveSearch)
      .should('have.attr', 'placeholder', 'Search').type(Objective[(Objective.length - 1)]).wait(1000);
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').first().click();
    cy.get(PageAction.campaignCreatePage().objective).click();

    cy.get(PageAction.campaignCreatePage().agency).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().agencySelect).should('contain', 'Select Agency')
    cy.get(PageAction.campaignCreatePage().agency).click();
    cy.get(PageAction.campaignCreatePage().agencySearch)
      .should('have.attr', 'placeholder', 'Search').type(Agency[(Agency.length - 1)]).wait(1000);
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').last().click();
    cy.get(PageAction.campaignCreatePage().agency).click();

    cy.get(PageAction.campaignCreatePage().client).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().clientSelect).should('contain', 'Select Client')
    cy.get(PageAction.campaignCreatePage().client).click();
    cy.get(PageAction.campaignCreatePage().clientSearch)
      .should('have.attr', 'placeholder', 'Search').type(Client[(Client.length - 1)]).wait(1000);
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').first().click();
    cy.get(PageAction.campaignCreatePage().client).click();

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    cy.get(PageAction.campaignCreatePage().campaignBudget).type('500000').blur();
    cy.get(PageAction.campaignCreatePage().campaignBudget).should('have.value', '500,000.00');
    cy.get('.cad-validation-errors__item').should('not.exist');

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
    cy.get('[data-automation="calendar-left"] > .cad-month-calendar > .cad-month-calendar__matrix').contains('24').click();

    cy.get('[data-automation="calendar-left"] > .cad-month-calendar > .cad-month-calendar__matrix').get('.content-count')
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gt', 0)
        // assert.notEqual(parseInt(count), 0, 'markets count should be greater than 0')
      });

    cy.get(`${PageAction.campaignCreatePage().applyBtn} > .cad-button`).click();

    cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
    //cy.get(PageAction.campaignCreatePage().savedraftBtn).should('be.disabled');

    cy.get(PageAction.campaignCreatePage().campaignResDate).click();
    cy.get('.cad-month-calendar__header__icon--right > cad-icon > .icon').click();
    cy.get('.cad-month-calendar__matrix')
      .contains('10').click();
    cy.get('[priority="primary"] > .cad-button').click();

    cy.get(PageAction.campaignCreatePage().continueBtn).should('not.be.disabled');


    cy.get('.shared-attachment__header > .title_2 > .title')
      .then(($span) => {
        var count = $span.text().trim();
        if (parseInt(count) != 0) {
          for (var i = 0; i < parseInt(count); i++) {
            cy.get(':nth-child(2) > .col-2 > .cad-flex > cad-link.ng-star-inserted > .cad-link > .cad-link__text').click();
            cy.get('[data-automation="ooh-confirm-popup-delete"] > .cad-button').click().wait(1000);
            cy.get('.cad-toast__title').should('contain', 'Attachment deleted');
          }
        }
        for (var i = 0; i < fileNamesUpload.length; i++) {
          cy.get('.shared-attachment__header > .title_2 > cad-link.ng-star-inserted > .cad-link > .cad-link__text').click();
          const yourFixturePath = testDataPath + fileNamesUpload[i];
          cy.get("input[type='file']").last().attachFile(yourFixturePath).wait(1000);
          cy.get('.cad-toast__title').should('contain', 'Attachment added');
        }

      });

    for (var i = 2; i <= 3; i++) {
      // let iValue = (i / 2).toString();
      // if (iValue.includes('.5'))
      cy.get(':nth-child(' + i + ') > .col-1 > .ng-untouched > .toggle > .toggle__el > small').click();
      cy.get('.cad-toast__title').should('contain', 'Attachment Status changed');
    }

    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().continueBtn).should('not.be.disabled');
    // cy.get(PageAction.campaignCreatePage().createCampaignBtn).should('not.be.disabled');

    cy.get('.mb-25').should('contain', 'Primary Audience : Adult 18+')
    cy.get('[value="create_audience"] > .button-toggle > a').click();
    cy.get('.mr-10 > .cad-button').should('not.be.disabled');
    cy.get('.campaign-form__text-right > cad-button.ng-star-inserted > .cad-button').should('be.disabled');
    cy.get('.col-sm-4 > .input').type(campaignName);
    cy.get('.campaign-form__text-right > cad-button.ng-star-inserted > .cad-button').should('not.be.disabled');
    cy.get('.campaign-form__text-right > cad-button.ng-star-inserted > .cad-button').click();
    cy.get('.cad-toast__title').should('contain', 'Audience Saved Successfully');
    // cy.get('[value="selected_audience"] > .button-toggle > .is-active').click();
    cy.get('[value="selected_audience"] > .button-toggle > a > .button-toggle__text').click();
    // cy.get('cad-dropdown.ng-tns-c24-69 > .cad-dropdown > .dropdown__head > .dropdown__head__content').click();
    // cy.get('.dropdown__head__content__icon > .ng-tns-c19-97 > .icon icon-arrow-down').click();
    cy.get(PageAction.campaignCreatePage().targetAudience).click();
    // cy.get('.div.ng-star-inserted > cad-smart-search-list-item > .list-item').contains(campaignName).click();
    cy.get(`.smartWidth > cad-smart-search-list.ng-untouched > .smart-search-list > .smart-search-list__list`).contains(campaignName).click();
    // cy.get(PageAction.campaignCreatePage().targetAudience).click();

    cy.get(PageAction.campaignCreatePage().comment).type(campaignName)
    cy.get(PageAction.campaignCreatePage().continueBtn).click();

    cy.get(PageAction.campaignCreatePage().editInMap).should('not.be.disabled');
    cy.get('.pl-20 > .cad-button').should('not.be.disabled');

    cy.get(PageAction.campaignCreatePage().digitalframe).click();
    // cy.get('.pl-0 > .cad-button').click();

    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().previousstepBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().createCampaignBtn).should('not.be.disabled');

    cy.get(PageAction.campaignCreatePage().mediaFormatCount)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gt', 0)
        // assert.notEqual(parseInt(count), 0, 'Media format count should be greater than 0')
      });

    cy.get('.pl-0 > .cad-button').should('not.be.disabled');

    cy.get(PageAction.campaignCreatePage().mediaOwnerCount)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gt', 0)
        // assert.notEqual(parseInt(count), 0, 'Media owner count should be greater than 0')
      });

    cy.get(`:nth-child(1) > :nth-child(2) > .display-inline > .cad-dropdown
      > .dropdown__head > .dropdown__head__content`).click()
    cy.get(`.ooh-filter-control > .ng-untouched > .smart-search-list > .smart-search-list__list 
      > .ng-star-inserted > .ng-star-inserted > .ng-star-inserted > cad-smart-search-list-item 
      > .list-item > .list-item__text`)
      .contains(moEmail[1]).click();
    cy.get(`:nth-child(1) > :nth-child(2) > .display-inline > .cad-dropdown
     > .dropdown__head > .dropdown__head__content`).click()

    cy.get(PageAction.campaignCreatePage().unitsCount)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gt', 0)
        // assert.notEqual(parseInt(count), 0, 'Units count should be greater than 0')
      });

    cy.get(PageAction.campaignCreatePage().poiCount)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gt', 0)
        // assert.notEqual(parseInt(count), 0, 'POI count should be greater than 0')
      });

    // for (var i = 1; i <= loopCount; i++) {
    //   cy.get(`:nth-child(` + i + `) > :nth-child(2) > .display-inline > .cad-dropdown 
    //     > .dropdown__head > .dropdown__head__content`).click();
    //   cy.get(`:nth-child(` + i + `) > div.ng-star-inserted > cad-smart-search-list-item 
    //     > .list-item > .list-item__text`).click();
    //   cy.get(`:nth-child(` + (i + 1) + `) > div.ng-star-inserted > cad-smart-search-list-item 
    //     > .list-item > .list-item__text`).click()
    //   cy.get(`:nth-child(` + i + `) > :nth-child(2) > .display-inline > .cad-dropdown 
    //     > .dropdown__head > .dropdown__head__content`).click();
    // }

    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().previousstepBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().createCampaignBtn).should('not.be.disabled');

    // for (var i = 1; i <= loopCount; i++) {
    // cy.get('.col-12 > section > :nth-child(3) > :nth-child(' + i + ') > .row > .col-1').then(($span) => {
    //   var poi = $span.text().trim();
    //   poi = poi.slice(0, -1).trim();
    // cy.wrap(parseInt(poi)).should('be.gt', 0)
    //// assert.notEqual(parseInt(poi), 0, 'POI radius should be greater than 0 m')
    // })
    // }

    cy.get(PageAction.campaignCreatePage().createCampaignBtn).click();

    cy.get('.cad-toast__title').should('contain', 'Campaign Saved Successfully');

    cy.get('.title_black').should(
      'contain', campaignName);
    cy.get('.cad-status__text').should(
      'contain', 'Draft');

    cy.get(PageAction.campaignCreatePage().deleteCampaign).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().editCampaign).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().prevCampaign).should('not.be.disabled');

    cy.get(PageAction.campaignCreatePage().prevCampaign).last().click();

    cy.get('[modal-footer=""] > [view="secondary"] > .cad-button').should('not.be.disabled');
    cy.get('[view="primary"] > .cad-button').should('not.be.disabled');

    cy.get('[view="primary"] > .cad-button').click();

    cy.get(PageAction.campaignCreatePage().rfpCancel).should('not.be.disabled');
    cy.get('.ooh-header__pl-10 > .cad-button').should('not.be.disabled');

    cy.get('.ooh-header__pl-10 > .cad-button').click();

    cy.get('.cad-toast__title').should('contain', 'RFP Sent');

    cy.get('.cad-status__text').should('contain', 'RFP Sent');

    // cy.get(PageAction.campaignCreatePage().rfpCancel).should('not.be.disabled');
    // cy.get('.ooh-header__pl-10 > .cad-button').should('not.be.disabled');

    // cy.get('.ooh-header__pl-10 > .cad-button').click();

    // cy.get('.cad-toast__title').should('contain', 'RFP Sent Failed');

  });

  //Edit campaign 
  it('Add Media Owners Inventory to Campaign (Frames Only)', () => {
    cy.get('cad-icon.icon-search > .icon').click();
    cy.get(PageAction.campaignCreatePage().globalSearch).type(PageAction.campaignList[1]).wait(1000);

    cy.get('.cad-status__text').should('contain', 'Draft')
    cy.get('.cad-context-menu__dots').last().click();

    cy.get(PageAction.campaignCreatePage().view).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().edit).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().delete).should('not.be.disabled');

    cy.get(PageAction.campaignCreatePage().edit).click().wait(1000);

    cy.get(PageAction.campaignCreatePage().contentcontinueBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().continueBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');

    cy.get('.shared-attachment__header > .title_2 > .title')
      .then(($span) => {
        var count = $span.text().trim();
        if (parseInt(count) != 0) {
          for (var i = 0; i < parseInt(count); i++) {
            cy.get(':nth-child(2) > .col-2 > .cad-flex > cad-link.ng-star-inserted > .cad-link > .cad-link__text').click();
            cy.get('[data-automation="ooh-confirm-popup-delete"] > .cad-button').click().wait(1000);
            cy.get('.cad-toast__title').should('contain', 'Attachment deleted');
          }
        }
        for (var i = 0; i < fileNamesUpload.length; i++) {
          cy.get('.shared-attachment__header > .title_2 > cad-link.ng-star-inserted > .cad-link > .cad-link__text').click();
          const yourFixturePath = testDataPath + fileNamesUpload[i];
          cy.get("input[type='file']").last().attachFile(yourFixturePath).wait(1000);
          cy.get('.cad-toast__title').should('contain', 'Attachment added');
        }

      });

    for (var i = 0; i < 6; i += 2) {
      // let iValue = (i / 2).toString();
      // if (iValue.includes('.5'))
      cy.get(':nth-child(' + (i + 2) + ') > .col-1 > .ng-untouched > .toggle > .toggle__el > small').click();
      cy.get('.cad-toast__title').should('contain', 'Attachment Status changed');
    }

    cy.get('.shared-attachment__header > .title_2 > .title')
      .then(($span) => {
        var count = $span.text().trim();
        assert.equal(fileNamesUpload.length, parseInt(count));
        if (parseInt(count) > 5)
          cy.get('[data-automation="cad-pagination__btn_next"]').should('not.be.disabled');
      });

    cy.get(PageAction.campaignCreatePage().continueBtn).click();

    cy.get(PageAction.campaignCreatePage().mediaOwnerCount)
      .then(($span) => {
        var count = $span.text().trim();
        if (parseInt(count) > 0)
          cy.get(PageAction.campaignCreatePage().removeMO).click();
      });

    cy.get(PageAction.campaignCreatePage().poiCount)
      .then(($span) => {
        var count = $span.text().trim();
        if (parseInt(count) > 0)
          cy.get(PageAction.campaignCreatePage().removePOI).click();
      });

    cy.get('[data-automation="ooh-campaign-manage-linktomap"] > .cad-button').click().wait(1000);
    cy.get('.ooh-header--right > cad-button.ng-star-inserted > .cad-button').click();

    cy.get(PageAction.campaignCreatePage().searchLocation).type('Pasadena CA, US').click().wait(1000);
    cy.get('.pac-item').first().click().wait(1000);

    // cy.get(PageAction.campaignCreatePage().mediaOwner).click()
    // for (var i = 1; i <= loopCount; i++) {
    //   cy.get(`:nth-child(` + i + `) > .sideSlidePanel__types__table__body__row-last 
    //   > .sideSlidePanel__types__table__body__row-spacer > .bg-icon > .icon`).click()
    //   // cy.get(`:nth-child(` + i + `) > .sideSlidePanel__types__table__body__row-last 
    //   // > :nth-child(2) > .bg-icon > .icon`).click()
    // }

    // cy.get('.cad-button').click();
    // cy.get(`ooh-media-owner-filter.ng-star-inserted > .display-inline 
    // > .cad-dropdown > .dropdown__head > .dropdown__head__content`).click();

    // const mo = ['Outfront', 'Lamar', 'Clear Channel', 'JCDecaux']

    // for (var j = 1; j <= loopCount; j++) {
    //   cy.get('.cad-search > .cad-search__input').type(mo[j - 1]);
    //   cy.get('.highlighted-search-text').click();
    //   cy.get('.cad-search > .cad-search__input > .ng-valid').clear();
    // }

    // cy.get('.ml-10 > .cad-button').click();
    // cy.get('.ml-7 > .cad-button').click().wait(1000);

    // cy.get(PageAction.campaignCreatePage().mediaOwner).click()
    // for (var i = 1; i <= loopCount; i++) {
    //   cy.get(`:nth-child(` + i + `) > .sideSlidePanel__types__table__body__row-last 
    //   > .sideSlidePanel__types__table__body__row-spacer > .bg-icon > .icon`).click()
    //   cy.get(`:nth-child(` + i + `) > .sideSlidePanel__types__table__body__row-last 
    //   > :nth-child(2) > .bg-icon > .icon`).click();
    // }

    // cy.get(`:nth-child(2) > .sideSlidePanel__types__table__body__row-last 
    // > .sideSlidePanel__types__table__body__row-spacer > .bg-icon > .icon > use`).click()
    // cy.get(`:nth-child(2) > .sideSlidePanel__types__table__body__row-last 
    //   > :nth-child(2) > .bg-icon > .icon`).click();

    cy.get('.is-active > .button-toggle__label').wait(2000)
      .then(($span) => {
        var count = $span.text().trim();
        for (var i = 1; i <= parseInt(count); i++) {
          cy.get(`:nth-child(` + i + `) > .sideSlidePanel__types__table__body__row-left > div`)
            .then(($span) => {
              var moName = $span.text().trim();
              if (moName.toString() == mo[0].toString()) {
                cy.get(`:nth-child(` + (i - 8) + `) > .sideSlidePanel__types__table__body__row-last 
                > :nth-child(2) > .bg-icon > .icon > use`).click();
              }
            });
        }
      });

    // for (var i = 1; i <= 14; i++) {
    // cy.get(`:nth-child(` + i + `) > .sideSlidePanel__types__table__body__row-last 
    // > .sideSlidePanel__types__table__body__row-spacer > .bg-icon > .icon`).click()
    // cy.get(`:nth-child(` + i + `) > .sideSlidePanel__types__table__body__row-last 
    // > :nth-child(2) > .bg-icon > .icon`).click()





    // cy.get(PageAction.campaignCreatePage().units).click()
    // for (var i = 1; i <= 20; i++) {
    //   cy.get(':nth-child(' + i + ') > .sideSlidePanel__types__table__body__row-last > span > .bg-icon > .icon').click()
    // }

    cy.get('.ooh-header__button').click().wait(1000);

    cy.get('.sideSlidePanel__frame-details__header__right-save > .cad-button').click();

    cy.get('.cad-toast__title').should('contain', 'has been successfully updated');

    cy.get(PageAction.campaignCreatePage().continueBtn).click();

    cy.get(PageAction.campaignCreatePage().mediaOwnerCount).wait(2000)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gte', 1)
        assert.notEqual(parseInt(count), 0, 'Media owner count should be greater than 0');

        // for (var i = 1; i <= parseInt(count); i++) {
        // for (var i = 1; i <= 1; i++) {
        //   cy.get(`:nth-child(` + (i + 1) + `) > :nth-child(2) > .display-inline > .cad-dropdown
        //     > .dropdown__head > .dropdown__head__content`).click()
        //   cy.get(`.ooh-filter-control > .ng-untouched > .smart-search-list > .smart-search-list__list 
        //     > .ng-star-inserted > .ng-star-inserted > .ng-star-inserted > cad-smart-search-list-item 
        //     > .list-item > .list-item__text`)
        //     .contains(moEmail[i]).click();
        //   cy.get(`:nth-child(` + (i + 1) + `) > :nth-child(2) > .display-inline > .cad-dropdown
        //    > .dropdown__head > .dropdown__head__content`).click()
        // }

        cy.get(`:nth-child(1) > :nth-child(2) > .display-inline > .cad-dropdown
            > .dropdown__head > .dropdown__head__content`).click()
        cy.get(`.ooh-filter-control > .ng-untouched > .smart-search-list > .smart-search-list__list 
            > .ng-star-inserted > .ng-star-inserted > .ng-star-inserted > cad-smart-search-list-item 
            > .list-item > .list-item__text`)
          .contains(moEmail[0]).click();
        cy.get(`:nth-child(1) > :nth-child(2) > .display-inline > .cad-dropdown
           > .dropdown__head > .dropdown__head__content`).click()

      });

    cy.get(PageAction.campaignCreatePage().unitsCount)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gt', 0)
        // assert.notEqual(parseInt(count), 0, 'Units count should be greater than 0')
      });

    //cy.get(PageAction.campaignCreatePage().unitsPagination).should('not.be.disabled');

    cy.get(PageAction.campaignCreatePage().saveBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().previousstepBtn).should('not.be.disabled');

    cy.get(PageAction.campaignCreatePage().saveBtn).click();

    cy.get('.cad-toast__title').should('contain', 'Campaign Saved Successfully');

    cy.get(PageAction.campaignCreatePage().headerEdit)
      .should('not.be.disabled')
      .should('contain', 'Edit');
    cy.get(PageAction.campaignCreatePage().footerEdit)
      .should('not.be.disabled')
      .should('contain', 'Edit');

    cy.get(PageAction.campaignCreatePage().headerDelete)
      .should('not.be.disabled')
      .should('contain', 'Delete');
    cy.get(PageAction.campaignCreatePage().footerDelete)
      .should('not.be.disabled')
      .should('contain', 'Delete');

    cy.get(PageAction.campaignCreatePage().headerDelete).click();

    cy.get('cad-modal-content > :nth-child(1) > cad-icon.ng-star-inserted > .icon')
      .should('not.be.disabled');
    cy.get('[modal-header=""] > .title').should('contain', 'Delete Campaign');
    cy.get('.title_6.mb-3').should('contain', 'You want to delete this campaign:');
    cy.get('.title_5').should('contain', PageAction.campaignList[1].toString());
    cy.get('[style="width: 77%;"] > :nth-child(3)').should('contain', 'Please, confirm the deletion');

    cy.get('[data-automation="popup_cancel_button"] > .cad-button')
      .should('not.be.disabled')
      .should('contain', 'Cancel');

    cy.get('[data-automation="popup_apply_button"] > .cad-button')
      .should('not.be.disabled')
      .should('contain', 'Delete');

    cy.get('[data-automation="popup_cancel_button"] > .cad-button').click();

    cy.get(PageAction.campaignCreatePage().headerPreview)
      .should('not.be.disabled')
      .should('contain', 'Preview and Send Rfp');
    cy.get(PageAction.campaignCreatePage().footerPreview)
      .should('not.be.disabled')
      .should('contain', 'Preview and Send Rfp')
      .click();

    cy.get('cad-modal-content > :nth-child(1) > cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get('.popup-title').should('contain', 'Preview and Send RFP');
    cy.get('.popup-text > .ng-star-inserted').should('contain', `You will be now redirected to the RFP Preview screen to review all the information before sending.`);

    cy.get('[modal-footer=""] > [view="secondary"] > .cad-button')
      .should('not.be.disabled')
      .should('contain', 'Cancel');

    cy.get('[view="primary"] > .cad-button')
      .should('not.be.disabled')
      .should('contain', 'Preview RFP')
      .click();

    cy.get('.ooh-header__text')
      .should('contain', 'This is a preview of how Media Owner will see your RFP. Check if everything is correct before sending')

    cy.get(PageAction.campaignCreatePage().sendRfpCancelBtn)
      .should('not.be.disabled')
      .should('contain', 'Cancel');
    cy.get(PageAction.campaignCreatePage().sendRfpBtn)
      .should('not.be.disabled')
      .should('contain', 'Send Rfp').click();

    cy.get('.cad-toast__title').should('contain', 'RFP Sent');

    cy.get('.cad-status__text').should('contain', 'RFP Sent');
  })

  it('Add Media Owners Inventory to Campaign (POIs Only)', () => {
    cy.get('cad-icon.icon-search > .icon').click();
    cy.get(PageAction.campaignCreatePage().globalSearch).type(PageAction.campaignList[2]).wait(1000);

    cy.get('.cad-status__text').should('contain', 'Draft')
    cy.get('.cad-context-menu__dots').last().click();

    cy.get(PageAction.campaignCreatePage().view).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().edit).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().delete).should('not.be.disabled');

    cy.get(PageAction.campaignCreatePage().edit).click();

    cy.get(PageAction.campaignCreatePage().contentcontinueBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().continueBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');

    cy.get('.shared-attachment__header > .title_2 > .title')
      .then(($span) => {
        var count = $span.text().trim();
        if (parseInt(count) != 0) {
          for (var i = 0; i < parseInt(count); i++) {
            cy.get(':nth-child(2) > .col-2 > .cad-flex > cad-link.ng-star-inserted > .cad-link > .cad-link__text').click();
            cy.get('[data-automation="ooh-confirm-popup-delete"] > .cad-button').click().wait(1000);
            cy.get('.cad-toast__title').should('contain', 'Attachment deleted');
          }
        }
        for (var i = 0; i < fileNamesUpload.length; i++) {
          cy.get('.shared-attachment__header > .title_2 > cad-link.ng-star-inserted > .cad-link > .cad-link__text').click();
          const yourFixturePath = testDataPath + fileNamesUpload[i];
          cy.get("input[type='file']").last().attachFile(yourFixturePath).wait(1000);
          cy.get('.cad-toast__title').should('contain', 'Attachment added');
        }
      });

    for (var i = 3; i < 6; i += 2) {
      cy.get(':nth-child(' + (i) + ') > .col-1 > .ng-untouched > .toggle > .toggle__el > small').click();
      cy.get('.cad-toast__title').should('contain', 'Attachment Status changed');
    }

    cy.get('.shared-attachment__header > .title_2 > .title')
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.lte', fileNamesUpload.length)
        if (parseInt(count) > 5)
          cy.get('[data-automation="cad-pagination__btn_next"]').should('not.be.disabled');
      });

    cy.get(PageAction.campaignCreatePage().continueBtn).click();

    cy.get(PageAction.campaignCreatePage().mediaOwnerCount)
      .then(($span) => {
        var count = $span.text().trim();
        if (parseInt(count) > 0)
          cy.get(PageAction.campaignCreatePage().removeMO).click();
      });

    cy.get(PageAction.campaignCreatePage().poiCount)
      .then(($span) => {
        var count = $span.text().trim();
        if (parseInt(count) > 0)
          cy.get(PageAction.campaignCreatePage().removePOI).click();
      });

    cy.get('[data-automation="ooh-campaign-manage-linktomap"] > .cad-button').click().wait(1000);
    cy.get('.ooh-header--right > cad-button.ng-star-inserted > .cad-button').click();

    cy.get(PageAction.campaignCreatePage().searchLocation).type('Pasadena CA, US').click().wait(1000);
    cy.get('.pac-item').first().click().wait(1000);

    // cy.get(PageAction.campaignCreatePage().mediaOwner).click()
    // cy.get(`:nth-child(1) > .sideSlidePanel__types__table__body__row-last 
    //   > .sideSlidePanel__types__table__body__row-spacer > .bg-icon > .icon`).click()

    cy.get(PageAction.campaignCreatePage().POI).click()
    cy.get('.col-md-7 > .input').type('starbucks{enter}').blur()

    cy.get('.is-active > .button-toggle__label').wait(2000)
      .then(($span) => {
        var count = $span.text().trim();
        for (var i = 1; i <= parseInt(count); i++) {
          cy.get(':nth-child(' + i + ') > .sideSlidePanel__types__table__body__row-last > span > .bg-icon > .icon').click()
        }
      });

    cy.get('.ooh-header__button').click().wait(1000);

    cy.get('.sideSlidePanel__frame-details__header__right-save > .cad-button').click();

    cy.get('.cad-toast__title').should('contain', 'has been successfully updated');

    cy.get(PageAction.campaignCreatePage().continueBtn).click();

    cy.get(`:nth-child(1) > :nth-child(2) > .display-inline > .cad-dropdown
      > .dropdown__head > .dropdown__head__content`).click()
    cy.get(`.ooh-filter-control > .ng-untouched > .smart-search-list > .smart-search-list__list 
      > .ng-star-inserted > .ng-star-inserted > .ng-star-inserted > cad-smart-search-list-item 
      > .list-item > .list-item__text`).contains(moEmail[2]).click();
    cy.get(`:nth-child(1) > :nth-child(2) > .display-inline > .cad-dropdown
      > .dropdown__head > .dropdown__head__content`).click()

    cy.get(PageAction.campaignCreatePage().mediaOwnerCount)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gt', 0)
        // assert.equal(parseInt(count), 1, 'Media owner count should be 1')
      });

    cy.get(`:nth-child(7) > :nth-child(1) > :nth-child(1) > section > .row > .panel-head__text > .title`)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gte', 0)
        // assert.equal(parseInt(count), 0, 'Units count should be 0')
      });

    cy.get(PageAction.campaignCreatePage().poiCount)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gt', 10)
        // assert.notEqual(parseInt(count), 0, 'Units count should be greater than 0')
      });

    //cy.get(PageAction.campaignCreatePage().unitsPagination).should('not.be.disabled');

    cy.get(PageAction.campaignCreatePage().saveBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().previousstepBtn).should('not.be.disabled');

    cy.get(PageAction.campaignCreatePage().saveBtn).click();

    cy.get('.cad-toast__title').should('contain', 'Campaign Saved Successfully');

    cy.get(PageAction.campaignCreatePage().headerEdit)
      .should('not.be.disabled')
      .should('contain', 'Edit');
    cy.get(PageAction.campaignCreatePage().footerEdit)
      .should('not.be.disabled')
      .should('contain', 'Edit');

    cy.get(PageAction.campaignCreatePage().headerDelete)
      .should('not.be.disabled')
      .should('contain', 'Delete');
    cy.get(PageAction.campaignCreatePage().footerDelete)
      .should('not.be.disabled')
      .should('contain', 'Delete');

    cy.get(PageAction.campaignCreatePage().headerDelete).click();

    cy.get('cad-modal-content > :nth-child(1) > cad-icon.ng-star-inserted > .icon')
      .should('not.be.disabled');
    cy.get('[modal-header=""] > .title').should('contain', 'Delete Campaign');
    cy.get('.title_6.mb-3').should('contain', 'You want to delete this campaign:');
    cy.get('.title_5').should('contain', PageAction.campaignList[2].toString());
    cy.get('[style="width: 77%;"] > :nth-child(3)').should('contain', 'Please, confirm the deletion');

    cy.get('[data-automation="popup_cancel_button"] > .cad-button')
      .should('not.be.disabled')
      .should('contain', 'Cancel');

    cy.get('[data-automation="popup_apply_button"] > .cad-button')
      .should('not.be.disabled')
      .should('contain', 'Delete');

    cy.get('[data-automation="popup_cancel_button"] > .cad-button').click();

    cy.get(PageAction.campaignCreatePage().headerPreview)
      .should('not.be.disabled')
      .should('contain', 'Preview and Send Rfp');
    cy.get(PageAction.campaignCreatePage().footerPreview)
      .should('not.be.disabled')
      .should('contain', 'Preview and Send Rfp')
      .click();

    cy.get('cad-modal-content > :nth-child(1) > cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get('.popup-title').should('contain', 'Preview and Send RFP');
    cy.get('.popup-text > .ng-star-inserted').should('contain', `You will be now redirected to the RFP Preview screen to review all the information before sending.`);

    cy.get('[modal-footer=""] > [view="secondary"] > .cad-button')
      .should('not.be.disabled')
      .should('contain', 'Cancel');

    cy.get('[view="primary"] > .cad-button')
      .should('not.be.disabled')
      .should('contain', 'Preview RFP')
      .click();

    cy.get('.ooh-header__text')
      .should('contain', 'This is a preview of how Media Owner will see your RFP. Check if everything is correct before sending')

    cy.get(PageAction.campaignCreatePage().sendRfpCancelBtn)
      .should('not.be.disabled')
      .should('contain', 'Cancel');
    cy.get(PageAction.campaignCreatePage().sendRfpBtn)
      .should('not.be.disabled')
      .should('contain', 'Send Rfp').click();

    cy.get('.cad-toast__title').should('contain', 'RFP Sent');

    cy.get('.cad-status__text').should('contain', 'RFP Sent');
  })

  //Delete campaign
  it.skip('Delete Campaigns Draft/not in Draft Status', () => {
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
