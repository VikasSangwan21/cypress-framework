import { PageAction } from '../../../support/PageAction';
import { start } from 'repl';
import 'cypress-file-upload';

let epicName = 'Campaigns Create';
let featureName = 'Campaigns Create Page';
let tag = '';

// let campaignName = `e2e test - ${PageAction.campaignCreatePage().campaignNameSuffix()}`;
let campaignName = 'test_attachement';
let Objective: string[] = [];
let Agency: string[] = [];
let Client: string[] = [];
let fileNamesUpload: string[] = [];
let testDataPath = '';
let index = 1

describe(featureName, () => {

  beforeEach(() => {
    Report.testDetails(epicName, featureName, tag);
    cy.loginAsPlannerStub();

    cy.exec('npm cache clear --force');

    PageAction.campaignCreatePage()
      .loadCampaignsWithData()
      .loadDemographicData()
      .loadaudienceSegmentData()
      .loadClientData()
      .loadobjectiveData()
      .loadagencyData()
      .loadMarketRegionData()
      .loadCountryData()
      .loadmediaformatsData()
      .loadAttachmentsData()
      .loadInventoryData()
      .loadGetRFPData()
      .visit();

  });

  describe('Load Configuration File', () => {
    it('read campaign configuration file', () => {
      cy.fixture('ooh/campaigns/campaign_config.json').then((config) => {
        Objective = config.Objective;
        Agency = config.Agency;
        Client = config.Client;
        fileNamesUpload = config.fileNamesUpload;
        testDataPath = config.testDataPath;
      })
    })
  });

  describe('Create Complete Campaign ', () => {
    it('create campaign with attachments', () => {

      cy.wait(3000)
      // cy.get('.cad-global-create-modern__button > .cad-button').click();
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
      // cy.get(PageAction.campaignCreatePage().objectiveSearch)
      //   .should('have.attr', 'placeholder', 'Search').type(Objective[index]).wait(1000);
      cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').first().click();
      cy.get(PageAction.campaignCreatePage().objective).click();

      cy.get(PageAction.campaignCreatePage().agency).should('not.be.disabled');
      cy.get(PageAction.campaignCreatePage().agencySelect).should('contain', 'Select Agency')
      cy.get(PageAction.campaignCreatePage().agency).click();
      // cy.get(PageAction.campaignCreatePage().agencySearch)
      //   .should('have.attr', 'placeholder', 'Search').type(Agency[index]).wait(1000);
      cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').last().click();
      cy.get(PageAction.campaignCreatePage().agency).click();

      cy.get(PageAction.campaignCreatePage().client).should('not.be.disabled');
      cy.get(PageAction.campaignCreatePage().clientSelect).should('contain', 'Select Client')
      cy.get(PageAction.campaignCreatePage().client).click();
      // cy.get(PageAction.campaignCreatePage().clientSearch)
      //   .should('have.attr', 'placeholder', 'Search').type(Client[index]).wait(1000);
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

      cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
      cy.get(PageAction.campaignCreatePage().marketRegion).click();
      cy.get(PageAction.campaignCreatePage().marketRegion).type('New York').wait(1000);
      cy.get(PageAction.campaignCreatePage().marketRegionList).click();
      cy.get('.cad-search__clear > .icon > use').click();
      cy.get('cad-icon[name="tick"]').should('be.visible');
      cy.get('cad-icon[name="close"]').should('be.visible');
      cy.get('cad-icon[name="close"]').click({ multiple: true })
      cy.get(PageAction.campaignCreatePage().marketRegion).click();
      cy.get('tr.content-market-table__tr > td').eq(0).should('contain.text', 'New York,');
      cy.get('tr.content-market-table__tr > td').eq(1).should('contain.text', 'DMA');
      cy.get(PageAction.campaignCreatePage().continueBtn).should('be.enabled');


      // cy.get(PageAction.campaignCreatePage().marketRegion).click();
      // cy.get(PageAction.campaignCreatePage().marketRegion).type('New').wait(1000);
      // cy.get(PageAction.campaignCreatePage().marketRegionList).click();
      // cy.get('.icon-clear > .icon > use').click();

      // cy.get(PageAction.campaignCreatePage().contentcontinueBtn).should('not.be.disabled');
      // cy.get(PageAction.campaignCreatePage().continueBtn).should('not.be.disabled');
      // cy.get(PageAction.campaignCreatePage().savedraftBtn).should('not.be.disabled');

      // // cy.get('.mb-25').should('contain', ' Primary Audience : Adults 18+')
      // cy.get('[value="create_audience"] > .button-toggle > a').should('not.be.disabled').click();
      // cy.get('[value="create_audience"] > .button-toggle > a').click();
      // cy.get('.mr-10 > .cad-button').contains('CANCEL');
      // cy.get('.mr-10 > .cad-button').should('not.be.disabled');
      // cy.get(PageAction.campaignCreatePage().createDemographic).should('be.disabled');
      // cy.get('.col-sm-4 > .input').type(campaignName);
      // cy.get(PageAction.campaignCreatePage().createDemographic).should('not.be.disabled');
      // cy.get(PageAction.campaignCreatePage().createDemographic).contains('Create');
      // cy.get(PageAction.campaignCreatePage().createDemographic).click().wait(1000);
      // cy.get('.cad-toast__title').should('contain', 'Audience Saved Successfully');
      // // cy.get('[value="selected_audience"] > .button-toggle > .is-active').click();
      // cy.get('[value="selected_audience"] > .button-toggle > a > .button-toggle__text').click();
      // // cy.get('cad-dropdown.ng-tns-c24-69 > .cad-dropdown > .dropdown__head > .dropdown__head__content').click();
      // // cy.get('.dropdown__head__content__icon > .ng-tns-c19-97 > .icon icon-arrow-down').click();
      // cy.get(PageAction.campaignCreatePage().targetAudience).click();
      // // cy.get('.div.ng-star-inserted > cad-smart-search-list-item > .list-item').contains(campaignName).click();
      // cy.get(`.smartWidth > cad-smart-search-list.ng-untouched > .smart-search-list > .smart-search-list__list`).contains(campaignName).click();
      // // cy.get(PageAction.campaignCreatePage().targetAudience).click();

      //Attachment
      cy.get('.shared-attachment__header > .title_2').contains('Attachments');
      cy.get(PageAction.campaignCreatePage().addAttachment).contains('Add attachment');

      var fileCount = 0
      for (var i = 0; i < fileNamesUpload.length; i++) {
        const yourFixturePath = testDataPath + fileNamesUpload[i];
        cy.get(PageAction.campaignCreatePage().addAttachment).click();

        cy.get('[modal-header=""] > .title').should('contain', 'Upload File')
        cy.get('cad-modal-content > :nth-child(1) > cad-icon.ng-star-inserted > .icon > use')
          .should('not.be.disabled')
        cy.get('upload > .uploader > .title').should('contain', 'Drop your file here')
        cy.get('upload > .uploader > :nth-child(3) > cad-button > .cad-button')
          .should('not.be.disabled').should('contain', 'Browse')

        cy.get("input[type='file']").eq(1).attachFile(yourFixturePath).wait(1000);

        if (fileNamesUpload[i].toString() == 'Sample-QA-PDF.pdf') {
          fileCount++
          if (fileCount > 1) {
            cy.get('.cad-standard-upload__title').should('contain', 'Error while uploading file');
            cy.get('.cad-standard-upload__text > span')
              .should('contain', 'The file you are uploading is already attached');
            cy.get('.cad-standard-upload__wrapper > cad-button > .cad-button')
              .should('not.be.disabled').should('contain', 'CHANGE FILE')
            cy.get('cad-modal-content > :nth-child(1) > cad-icon.ng-star-inserted > .icon > use')
              .should('not.be.disabled').click();
          }
        }
        else if (fileNamesUpload[i].toString() == 'Sample-QA-PDF-25MB.pdf') {
          cy.get('.cad-standard-upload__title').should('contain', 'Error while uploading file');
          cy.get('.cad-standard-upload__text > span')
            .should('contain', 'The uploaded file cannot exceed the size of 20 MB');
          cy.get('.cad-standard-upload__wrapper > cad-button > .cad-button')
            .should('not.be.disabled').should('contain', 'CHANGE FILE')
          cy.get('cad-modal-content > :nth-child(1) > cad-icon.ng-star-inserted > .icon > use')
            .should('not.be.disabled').click();
        }
        else
          cy.get('.cad-toast__title').should('contain', 'Attachment added');
      }

      cy.get(PageAction.campaignCreatePage().attachmentCount)
        .then(($span) => {
          var count = $span.text().trim();
          cy.log(count)

          // cy.wrap(parseInt(count)).should('be.gte', fileNamesUpload.length - 1)

          if (parseInt(count) <= 5) {
            cy.get(PageAction.campaignCreatePage().attachmentgrid)
              .should('have.length', parseInt(count));
            cy.get(`${PageAction.campaignCreatePage().attachmentgrid} > div`)
              .should('have.length', (parseInt(count) * 3));

            for (var i = 0; i < parseInt(count); i++) {
              cy.get(`${PageAction.campaignCreatePage().attachmentgrid} > .col-2`).eq(i)
                .should('contain', 'Download')
              cy.get(PageAction.campaignCreatePage().deleteAttachment).eq(i)
                .should('contain', 'Delete')
            }
          }
          else {
            // if (parseInt(count) > 5) {
            var loopcount = (parseInt(count) / 5)
            cy.log(loopcount.toString())
            var pagesCount = loopcount.toString().split('.')[0]
            cy.log(pagesCount.toString())
            var attaCount = loopcount.toString().split('.')[1]
            cy.log(attaCount.toString())

            cy.get(PageAction.campaignCreatePage().unitsPagination).eq(0).should('not.be.disabled')

            for (var i = 1; i <= parseInt(pagesCount); i++) {
              cy.get(PageAction.campaignCreatePage().attachmentgrid)
                .should('have.length', 5);
              cy.get(`${PageAction.campaignCreatePage().attachmentgrid} > div`)
                .should('have.length', 15);

              for (var i = 0; i < 5; i++) {
                cy.get(`${PageAction.campaignCreatePage().attachmentgrid} > .col-2`).eq(i)
                  .should('contain', 'Download')
                cy.get(PageAction.campaignCreatePage().deleteAttachment).eq(i)
                  .should('contain', 'Delete')
              }

              //cy.get(PageAction.campaignCreatePage().unitsPagination).eq(0).click();
              cy.get(PageAction.campaignCreatePage().unitsPagination).click({ force: true });
            }

            if ((parseInt(attaCount) / 2) > 0) {
              cy.get(PageAction.campaignCreatePage().attachmentgrid)
                .should('have.length', (parseInt(attaCount) / 2));
              cy.get(`${PageAction.campaignCreatePage().attachmentgrid} > div`)
                .should('have.length', ((parseInt(attaCount) / 2) * 3));

              for (var i = 0; i < (parseInt(attaCount) / 2); i++) {
                cy.get(`${PageAction.campaignCreatePage().attachmentgrid} > .col-2`).eq(i)
                  .should('contain', 'Download')
                cy.get(PageAction.campaignCreatePage().deleteAttachment).eq(i)
                  .should('contain', 'Delete')
              }

            }
          }

        });

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
      > .list-item > .list-item__text`).wait(1000).click()
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

      cy.get(PageAction.campaignCreatePage().createCampaignBtn).click();

      cy.get('.cad-toast__title').should('contain', 'Campaign Created');

      // cy.waitFor('1000');

      // cy.get('.title_black').should('contain', campaignName);
      // cy.get('.cad-status__text').should('contain', 'Draft');

      // cy.get(PageAction.campaignCreatePage().sendRfpCancelBtn).should('not.be.disabled');
      // cy.get(PageAction.campaignCreatePage().deleteCampaign).should('not.be.disabled');
      // cy.get(PageAction.campaignCreatePage().editBtn).should('not.be.disabled');
      // cy.get(PageAction.campaignCreatePage().prevCampaign).should('not.be.disabled');

      // //view campaign
      // cy.get(PageAction.campaignCreatePage().attachmentCount)
      //   .then(($span) => {
      //     var count = $span.text().trim();
      //     cy.log(count)

      //     // cy.wrap(parseInt(count)).should('be.gte', fileNamesUpload.length - 1)

      //     if (parseInt(count) <= 5) {
      //       cy.get(PageAction.campaignCreatePage().attachmentgrid)
      //         .should('have.length', parseInt(count));
      //       cy.get(`${PageAction.campaignCreatePage().attachmentgrid} > div`)
      //         .should('have.length', (parseInt(count) * 4));

      //       for (var i = 0; i < parseInt(count); i++) {
      //         cy.get(`${PageAction.campaignCreatePage().attachmentgrid} > .col-1`).eq(i)
      //           .should('contain', 'Yes')
      //         cy.get(`${PageAction.campaignCreatePage().attachmentgrid} > .col-2`).eq(i)
      //           .should('contain', 'Download')
      //         // cy.get(PageAction.campaignCreatePage().deleteAttachment).eq(i)
      //         //   .should('contain', 'Delete')
      //       }
      //     }
      //     else {
      //       // if (parseInt(count) > 5) {
      //       var loopcount = (parseInt(count) / 5)
      //       cy.log(loopcount.toString())
      //       var pagesCount = loopcount.toString().split('.')[0]
      //       cy.log(pagesCount.toString())
      //       var attaCount = loopcount.toString().split('.')[1]
      //       cy.log(attaCount.toString())

      //       cy.get(PageAction.campaignCreatePage().unitsPagination).eq(0).should('not.be.disabled')

      //       for (var i = 1; i <= parseInt(pagesCount); i++) {
      //         cy.get(PageAction.campaignCreatePage().attachmentgrid)
      //           .should('have.length', 5);
      //         cy.get(`${PageAction.campaignCreatePage().attachmentgrid} > div`)
      //           .should('have.length', 20);

      //         for (var i = 0; i < 5; i++) {
      //           cy.get(`${PageAction.campaignCreatePage().attachmentgrid} > .col-1`).eq(i)
      //             .should('contain', 'Yes')
      //           cy.get(`${PageAction.campaignCreatePage().attachmentgrid} > .col-2`).eq(i)
      //             .should('contain', 'Download')
      //           // cy.get(PageAction.campaignCreatePage().deleteAttachment).eq(i)
      //           //   .should('contain', 'Delete')
      //         }

      //         //cy.get(PageAction.campaignCreatePage().unitsPagination).eq(0).click();
      //         cy.get(PageAction.campaignCreatePage().unitsPagination).click({force: true});
      //       }

      //       if ((parseInt(attaCount) / 2) > 0) {
      //         cy.get(PageAction.campaignCreatePage().attachmentgrid)
      //           .should('have.length', (parseInt(attaCount) / 2));
      //         cy.get(`${PageAction.campaignCreatePage().attachmentgrid} > div`)
      //           .should('have.length', ((parseInt(attaCount) / 2) * 4));

      //         for (var i = 0; i < (parseInt(attaCount) / 2); i++) {
      //           cy.get(`${PageAction.campaignCreatePage().attachmentgrid} > .col-1`).eq(i)
      //             .should('contain', 'Yes')
      //           cy.get(`${PageAction.campaignCreatePage().attachmentgrid} > .col-2`).eq(i)
      //             .should('contain', 'Download')
      //           // cy.get(PageAction.campaignCreatePage().deleteAttachment).eq(i)
      //           //   .should('contain', 'Delete')
      //         }

      //       }
      //     }

      //   });

      // PageAction.campaignCreatePage()
      //   .loadinventoryRfpmediaOwnerData()
      //   .loadinventoryRfpframeData()
      //   .loadinventoryRfpData()
      //   .loadRfpClientData()
      //   .loadRfpObjectiveData()
      //   .loadRfpAgencyData();

      // //edit camapaign
      // cy.get(PageAction.campaignCreatePage().editBtn).click().wait(2000);

      // cy.get(PageAction.campaignCreatePage().addAttachment).should('not.be.disabled')

      // cy.get(PageAction.campaignCreatePage().attachmentCount)
      //   .then(($span) => {
      //     var count = $span.text().trim();
      //     cy.log(count)

      //     // cy.wrap(parseInt(count)).should('be.gte', fileNamesUpload.length - 1)

      //     if (parseInt(count) <= 5) {
      //       cy.get(PageAction.campaignCreatePage().attachmentgrid)
      //         .should('have.length', parseInt(count));
      //       cy.get(`${PageAction.campaignCreatePage().attachmentgrid} > div`)
      //         .should('have.length', (parseInt(count) * 4));

      //       for (var i = 0; i < parseInt(count); i++) {
      //         // cy.get(`${PageAction.campaignCreatePage().attachmentgrid} > .col-1`).eq(i)
      //         //   .should('contain', 'Yes')
      //         cy.get(PageAction.campaignCreatePage().attachemntToggle).eq(i)
      //           .should('have.attr', 'class', 'toggle toggle--on')
      //         cy.get(`${PageAction.campaignCreatePage().attachmentgrid} > .col-2`).eq(i)
      //           .should('contain', 'Download')
      //         cy.get(PageAction.campaignCreatePage().deleteAttachment).eq(i)
      //           .should('contain', 'Delete')
      //       }
      //     }
      //     else {
      //       // if (parseInt(count) > 5) {
      //       var loopcount = (parseInt(count) / 5)
      //       cy.log(loopcount.toString())
      //       var pagesCount = loopcount.toString().split('.')[0]
      //       cy.log(pagesCount.toString())
      //       var attaCount = loopcount.toString().split('.')[1]
      //       cy.log(attaCount.toString())

      //       cy.get(PageAction.campaignCreatePage().unitsPagination).eq(0).should('not.be.disabled')

      //       for (var i = 1; i <= parseInt(pagesCount); i++) {
      //         cy.get(PageAction.campaignCreatePage().attachmentgrid)
      //           .should('have.length', 5);
      //         cy.get(`${PageAction.campaignCreatePage().attachmentgrid} > div`)
      //           .should('have.length', 20);

      //         for (var i = 0; i < 5; i++) {
      //           // cy.get(`${PageAction.campaignCreatePage().attachmentgrid} > .col-1`).eq(i)
      //           //   .should('contain', 'Yes')
      //           cy.get(PageAction.campaignCreatePage().attachemntToggle).eq(i)
      //             .should('have.attr', 'class', 'toggle toggle--on')
      //           cy.get(`${PageAction.campaignCreatePage().attachmentgrid} > .col-2`).eq(i)
      //             .should('contain', 'Download')
      //           cy.get(PageAction.campaignCreatePage().deleteAttachment).eq(i)
      //             .should('contain', 'Delete')
      //         }

      //         //cy.get(PageAction.campaignCreatePage().unitsPagination).eq(0).click();
      //         cy.get(PageAction.campaignCreatePage().unitsPagination).click({force: true});
      //       }

      //       if ((parseInt(attaCount) / 2) > 0) {
      //         cy.get(PageAction.campaignCreatePage().attachmentgrid)
      //           .should('have.length', (parseInt(attaCount) / 2));
      //         cy.get(`${PageAction.campaignCreatePage().attachmentgrid} > div`)
      //           .should('have.length', ((parseInt(attaCount) / 2) * 4));

      //         for (var i = 0; i < (parseInt(attaCount) / 2); i++) {
      //           // cy.get(`${PageAction.campaignCreatePage().attachmentgrid} > .col-1`).eq(i)
      //           //   .should('contain', 'Yes')
      //           cy.get(PageAction.campaignCreatePage().attachemntToggle).eq(i)
      //             .should('have.attr', 'class', 'toggle toggle--on')
      //           cy.get(`${PageAction.campaignCreatePage().attachmentgrid} > .col-2`).eq(i)
      //             .should('contain', 'Download')
      //           cy.get(PageAction.campaignCreatePage().deleteAttachment).eq(i)
      //             .should('contain', 'Delete')
      //         }

      //       }
      //     }

      //   });


      // var fileCount = 0
      // for (var i = 0; i < fileNamesUpload.length; i++) {
      //   const yourFixturePath = testDataPath + fileNamesUpload[i];
      //   cy.get(PageAction.campaignCreatePage().addAttachment).click();

      //   cy.get('[modal-header=""] > .title').should('contain', 'Upload File')
      //   cy.get('cad-modal-content > :nth-child(1) > cad-icon.ng-star-inserted > .icon > use')
      //     .should('not.be.disabled')
      //   cy.get('.cad-standard-upload__title').should('contain', 'Drop your file here')
      //   cy.get('.cad-standard-upload__btn > .cad-button')
      //     .should('not.be.disabled').should('contain', 'Browse')

      //   cy.get("input[type='file']").eq(1).attachFile(yourFixturePath).wait(1000);

      //   cy.get('.cad-standard-upload__title').should('contain', 'Error while uploading file');
      //   cy.get('.cad-standard-upload__text > span')
      //     .should('contain', 'The file you are uploading is already attached');
      //   cy.get('.cad-standard-upload__wrapper > cad-button > .cad-button')
      //     .should('not.be.disabled').should('contain', 'CHANGE FILE')
      //   cy.get('cad-modal-content > :nth-child(1) > cad-icon.ng-star-inserted > .icon > use')
      //     .should('not.be.disabled').click();

      //   if (fileNamesUpload[i].toString() == 'Sample-QA-PDF-25MB.pdf') {
      //     cy.get('.cad-standard-upload__title').should('contain', 'Error while uploading file');
      //     cy.get('.cad-standard-upload__text > span')
      //       .should('contain', 'The uploaded file cannot exceed the size of 20 MB');
      //     cy.get('.cad-standard-upload__wrapper > cad-button > .cad-button')
      //       .should('not.be.disabled').should('contain', 'CHANGE FILE')
      //     cy.get('cad-modal-content > :nth-child(1) > cad-icon.ng-star-inserted > .icon > use')
      //       .should('not.be.disabled').click();
      //   }
      // }

    });
  });

  describe('Campaign - General Information', () => {
    it('Should throw validation error if campaign name is touched and empty', () => {
      cy.get('.cad-row_clear > .title').should('contain', 'New Campaign');
      cy.get(PageAction.campaignCreatePage().campaignName).focus().blur();
      cy.get('.cad-validation-errors__item').should('contain', 'Campaign Name is Required.');
    });

    it('Should have campaign name same as provided', () => {
      cy.get(PageAction.campaignCreatePage().campaignName).type(`integration test`).blur();
      cy.get(PageAction.campaignCreatePage().campaignName).should('have.value', 'integration test');
      cy.get('.cad-validation-errors__item').should('not.exist');
    });

    it('Should throw validation error if campaign description is touched and empty', () => {
      cy.get(PageAction.campaignCreatePage().campaignDesc).focus().blur();
      cy.get('.cad-validation-errors__item').should('contain', 'Campaign Description is Required.');
    });

    it('Should have campaign description same as provided', () => {
      cy.get(PageAction.campaignCreatePage().campaignDesc).type('test').blur();
      cy.get(PageAction.campaignCreatePage().campaignDesc).should('have.value', 'test');
      cy.get('.cad-validation-errors__item').should('not.exist');
    });

    it('Should Select Objective, Agency and Client data', () => {
      PageAction.campaignCreatePage()
        .selectObjective('Brand Launch')
        .selectAgency('Deutsch')
        .selectClient('Amazon.com, Inc.');
    });

    it('Should throw validation error if Budget field is empty', () => {
      cy.get(PageAction.campaignCreatePage().campaignBudget).focus().blur();
      cy.get('.cad-validation-errors__item').should('contain', 'Budget is Required.');
    });

    it('Should be empty if anything apart from numeric value is provided', () => {
      cy.get(PageAction.campaignCreatePage().campaignBudget).type('ABC').blur();
      cy.get(PageAction.campaignCreatePage().campaignBudget).should('be.empty');
      cy.get('.cad-validation-errors__item').should('contain', 'Budget is Required.');
    });

    it('Should format provided numeric value to 2 decimal points', () => {
      cy.get(PageAction.campaignCreatePage().campaignBudget).type('50000').blur();
      cy.get(PageAction.campaignCreatePage().campaignBudget).should('have.value', '50,000.00');
      cy.get('.cad-validation-errors__item').should('not.exist');
    });

    it('Should not allow to choose Deadline of Response if campaign start end date selected from past', () => {
      cy.get(PageAction.campaignCreatePage().campaignDateRange).click();
      cy.get(`${PageAction.campaignCreatePage().applyBtn} > .cad-button`).should('be.disabled');
      cy.get(
        `${PageAction.campaignCreatePage().calendarLeft}
          > .cad-month-calendar
          > .cad-month-calendar__header
          > .cad-month-calendar__header__icon--left`
      ).click();
      cy.contains('12').click();
      cy.contains('25').click();
      cy.get(`${PageAction.campaignCreatePage().applyBtn} > .cad-button`).should('be.visible');
      cy.get(`${PageAction.campaignCreatePage().applyBtn} > .cad-button`).click();

      cy.get(PageAction.campaignCreatePage().campaignResDate).click();
      cy.get(
        '.cad-month-calendar__header__icon--right > cad-icon > .icon'
      ).click();
      cy.contains('10').click();
      cy.get('[priority="primary"] > .cad-button').should('be.disabled');
    });

    it('Should allow to choose Deadline of Response if campaign start end date selected from future', () => {
      cy.get(PageAction.campaignCreatePage().campaignDateRange).click();
      cy.get(
        `${PageAction.campaignCreatePage().calendarLeft}
          > .cad-month-calendar 
          > .cad-month-calendar__header 
          > .cad-month-calendar__header__icon--right 
          > cad-icon > .icon`
      ).click();
      cy.contains('12').click();
      cy.contains('25').click();
      cy.get(`${PageAction.campaignCreatePage().applyBtn} > .cad-button`).should('be.visible');
      cy.get(`${PageAction.campaignCreatePage().applyBtn} > .cad-button`).click();

      cy.get(PageAction.campaignCreatePage().campaignResDate).click();
      cy.get('.cad-datepicker__time').should('be.visible');
      cy.get(':nth-child(5) > :nth-child(4)').click();

      cy.get('[priority="primary"] > .cad-button').should('be.visible');
      cy.get('[priority="primary"] > .cad-button').click();
    });

    it('Select market by entering value', () => {
      cy.get(PageAction.campaignCreatePage().continueBtn).should('be.disabled');
      cy.get(PageAction.campaignCreatePage().marketRegion).click();
      cy.get(PageAction.campaignCreatePage().marketRegion).type('New York').wait(1000);
      cy.get(PageAction.campaignCreatePage().marketRegionList).click();
      cy.get('.cad-search__clear > .icon').click();
      cy.get(PageAction.campaignCreatePage().marketRegion).click();
      cy.get('tr.content-market-table__tr > td').eq(0).should('contain.text', 'New York,');
      cy.get('tr.content-market-table__tr > td').eq(1).should('contain.text', 'DMA');
    })

  });
});
