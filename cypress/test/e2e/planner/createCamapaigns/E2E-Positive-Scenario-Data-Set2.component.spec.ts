import { PageAction } from '../../../../support/PageAction';
import { equal } from 'assert';
import { config } from 'cypress/types/bluebird';
import 'cypress-file-upload';
import { parse } from 'path';
import { isInteger, toPairs } from 'cypress/types/lodash';
import { contains } from 'cypress/types/jquery';
import { exit } from 'process';
import { CampaignPage, CampaignCreatePage, RfpListPage, rfpResponsePage, HomePage, ViewResponsePage } from '@support/pages'; 


const rfpResponsepage = new rfpResponsePage();
const createCampaignPage = new CampaignCreatePage();
let epicName = 'Campaigns Create';
let featureName = 'E2E Positive Scenario - Data Set 2';
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

  before(() => {
    cy.fixture('ooh/campaigns/campaign_config.json').then((config) => {
      Objective = config.Objective;
      Agency = config.Agency;
      Client = config.Client;
      mo = config.mo;
      loopCount = config.loopCount;
      dupcampaignName = config.dupcampaignName;
      testDataPath = config.testDataPath;
      fileNamesUpload = config.cfileNamesUpload
      moEmail = config.moEmail
      campaignName = `e2e test - ${PageAction.campaignCreatePage().campaignNameSuffix()}`;

      cy.readFile("cypress/fixtures/ooh/campaigns/campaign_config.json").then((data) => {
        data.campaignName[1].name = campaignName

        cy.writeFile("cypress/fixtures/ooh/campaigns/campaign_config.json", JSON.stringify(data))
      })

    })
  })

  beforeEach(() => {
    Report.testDetails(epicName, featureName, tag);

    cy.loginAsPlanner();
    cy.wait(10000);
  });

  // Create campaign
  it('E2E Positive Scenario - Data Set 2', () => {

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
    //   .selectObjective(Objective[1])
    //   .selectAgency(Agency[1])
    //   .selectClient(Client[1]);

    cy.get(PageAction.campaignCreatePage().objective).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().objectiveSelect).should('contain', 'Select Objective')
    cy.get(PageAction.campaignCreatePage().objective).click();
    cy.get(PageAction.campaignCreatePage().objectiveSearch)
      .should('have.attr', 'placeholder', 'Search').type(Objective[1]).wait(1000);
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').first().click();
    cy.get(PageAction.campaignCreatePage().objective).click();

    cy.get(PageAction.campaignCreatePage().agency).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().agencySelect).should('contain', 'Select Agency')
    cy.get(PageAction.campaignCreatePage().agency).click();
    cy.get(PageAction.campaignCreatePage().agencySearch)
      .should('have.attr', 'placeholder', 'Search').type(Agency[1]).wait(1000);
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').last().click();
    cy.get(PageAction.campaignCreatePage().agency).click();

    cy.get(PageAction.campaignCreatePage().client).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().clientSelect).should('contain', 'Select Client')
    cy.get(PageAction.campaignCreatePage().client).click();
    cy.get(PageAction.campaignCreatePage().clientSearch)
      .should('have.attr', 'placeholder', 'Search').type(Client[5]).wait(1000);
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
    cy.get(rfpResponsepage.activeDates).contains('27').click();
   // cy.get('[data-automation="calendar-right"] > .cad-month-calendar > .cad-month-calendar__matrix').contains('27').click();
    cy.get(createCampaignPage.applyBtn).click();

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
    cy.get(PageAction.campaignCreatePage().marketRegion).type('Chicago');
    cy.get(PageAction.campaignCreatePage().marketRegionList).first().click();
    // cy.get('.icon-clear > .icon > use').click();

    cy.get(PageAction.campaignCreatePage().primaryAudience).should('be.visible').click();
    cy.get('.smartWidth > cad-smart-search-list.ng-untouched > .smart-search-list > .smart-search-list__search > .smart-search-list__search-input > .cad-search > .cad-search__input > .ng-untouched')
      .click()
      .type('Adults 18-34')
      .wait(1000);
    cy.get('[style=""] > div.ng-star-inserted > cad-smart-search-list-item > .list-item > .list-item__text > .highlighted-search-text')
      .should('contain.text','Adults 18-34')
      .click();

    cy.get(PageAction.campaignCreatePage().secondaryAudience).should('be.visible');

    cy.get(PageAction.campaignCreatePage().continueBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');

    // // cy.get('.mb-25').should('contain', ' Primary Audience : Adults 18+')
    // cy.get('[value="create_audience"] > .button-toggle > a').click();
    // cy.get('.mr-10 > .cad-button').should('not.be.disabled');
    // cy.get('.campaign-form__text-right > cad-button.ng-star-inserted > .cad-button').should('be.disabled');
    // cy.get('.col-sm-4 > .input').type(campaignName);
    // cy.get('.campaign-form__text-right > cad-button.ng-star-inserted > .cad-button').should('not.be.disabled');
    // cy.get('.campaign-form__text-right > cad-button.ng-star-inserted > .cad-button').click();
    // cy.get('.cad-toast__title').should('contain', 'Audience Saved Successfully');
    // // cy.get('[value="selected_audience"] > .button-toggle > .is-active').click();
    // cy.get('[value="selected_audience"] > .button-toggle > a > .button-toggle__text').click();
    // // cy.get('cad-dropdown.ng-tns-c24-69 > .cad-dropdown > .dropdown__head > .dropdown__head__content').click();
    // // cy.get('.dropdown__head__content__icon > .ng-tns-c19-97 > .icon icon-arrow-down').click();
    // cy.get(PageAction.campaignCreatePage().targetAudience).click();
    // // cy.get('.div.ng-star-inserted > cad-smart-search-list-item > .list-item').contains(campaignName).click();
    // cy.get(`.smartWidth > cad-smart-search-list.ng-untouched > .smart-search-list > .smart-search-list__list`).contains(campaignName).click();
    // // cy.get(PageAction.campaignCreatePage().targetAudience).click();
    //**Demographics */
   

    //**Comments */
    cy.get(PageAction.campaignCreatePage().comment).type(campaignName)

    cy.get(PageAction.campaignCreatePage().continueBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');

    cy.get(PageAction.campaignCreatePage().continueBtn).click();

    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().previousstepBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().createCampaignBtn).should('not.be.disabled');

    cy.get(PageAction.campaignCreatePage().staticframe).click();
    cy.get('.pl-0 > .cad-button').click();

    cy.get(`:nth-child(16) > div.ng-star-inserted > cad-smart-search-list-item > .list-item > .list-item__text`).click()
    cy.get(`:nth-child(17) > div.ng-star-inserted > cad-smart-search-list-item > .list-item > .list-item__text`).click()
    cy.get('.display-inline > .cad-button').click();
    cy.get(':nth-child(1) > .row > .col-3 > .input').type('20');
    cy.get(':nth-child(2) > .row > .col-3 > .input').type('50');

    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().previousstepBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().createCampaignBtn).should('not.be.disabled');

    cy.get(PageAction.campaignCreatePage().mediaowner).click().type('Lamar');
    cy.get(`#mediaOwner > .smart-search-list > .smart-search-list__list > :nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item > .list-item__text > .highlighted-search-text`).click();
     cy.get('section > div.col-md-12 > .row > :nth-child(2)').click();
    cy.get(`.display-inline > .cad-dropdown > .dropdown__head 
      > .dropdown__head__content > .dropdown__head__content__title`).click()
    cy.get(`.ooh-filter-control > .ng-valid > .smart-search-list > .smart-search-list__list > > div.ng-star-inserted > cad-smart-search-list-item > .list-item`).contains(moEmail[2]).click();
   
    //cy.get(`.ng-untouched > .smart-search-list > .smart-search-list__list > :nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item`).click();


    cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().previousstepBtn).should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().createCampaignBtn).should('not.be.disabled');

    cy.get(PageAction.campaignCreatePage().createCampaignBtn).click();

    cy.get('.cad-toast__title').should('contain', 'Campaign Created');

    cy.get('.title_black').should(
      'contain', campaignName);
    cy.get('.cad-status__text').should(
      'contain', 'Draft');

    //** Update Campaign Date Range to JSON */
    cy.get(PageAction.campaignCreatePage().viewCampaignDate).then(($date) => {
      const txt = $date.text()

      console.log(txt);

      cy.readFile("cypress/fixtures/ooh/campaigns/campaign_config.json").then((data) => {
        data.campaignDate = txt;

        cy.writeFile("cypress/fixtures/ooh/campaigns/campaign_config.json", JSON.stringify(data));
      })

    })

    //** Update Campaign Market to JSON */
    cy.get('td.content-market-table__pl-0').then(($date) => {
      const market = $date.text()

      console.log(market);

      cy.readFile("cypress/fixtures/ooh/campaigns/campaign_config.json").then((data) => {
        data.campaignMarket = market;

        cy.writeFile("cypress/fixtures/ooh/campaigns/campaign_config.json", JSON.stringify(data));
      })

    })

  });

  //Edit campaign 
  it('Add Media Owners Inventory to Campaign (POIs Only)', () => {
    PageAction.campaignCreatePage()
      .visit();
    cy.get('cad-icon.icon-search > .icon').click();
    cy.get(PageAction.campaignCreatePage().globalSearch).type(campaignName).wait(1000);

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
//          cy.get('.cad-toast__title').should('contain', 'Attachment added');
        }
      });

    //OOH-4312 commented as feature removed
    // for (var i = 3; i < 6; i += 2) {
    //   cy.get(':nth-child(' + (i) + ') > .col-1 > .ng-untouched > .toggle > .toggle__el > small').click();
    //   cy.get('.cad-toast__title').should('contain', 'Attachment Status changed');
    // }

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

    cy.get(PageAction.campaignCreatePage().searchLocation).type('Pasadena CA, US').click().wait(2000);
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

/*    cy.get(`:nth-child(1) > :nth-child(2) > .display-inline > .cad-dropdown
      > .dropdown__head > .dropdown__head__content`).click()
    cy.get(`.ooh-filter-control > .ng-untouched > .smart-search-list > .smart-search-list__list 
      > .ng-star-inserted > .ng-star-inserted > .ng-star-inserted > cad-smart-search-list-item 
      > .list-item > .list-item__text`).contains(moEmail[2]).click();
    cy.get(`:nth-child(1) > :nth-child(2) > .display-inline > .cad-dropdown
      > .dropdown__head > .dropdown__head__content`).click()
*/
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
        if (parseInt(count) > 10)
          cy.get('[data-automation="cad-pagination__btn_next"]').should('not.be.disabled');
        // assert.notEqual(parseInt(count), 0, 'Units count should be greater than 0')
      });

//    cy.get(PageAction.campaignCreatePage().unitsPagination).should('not.be.disabled');

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
    cy.get('.title_5').should('contain', campaignName.toString());
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

});
