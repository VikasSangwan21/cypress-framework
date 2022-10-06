import { PageAction } from '../../../../support/PageAction';
import { equal } from 'assert';
import { config } from 'cypress/types/bluebird';
import 'cypress-file-upload';
import { parse } from 'path';
import { eq, isInteger, toPairs } from 'cypress/types/lodash';
import { contains } from 'cypress/types/jquery';
import { integer } from 'aws-sdk/clients/cloudfront';

let epicName = 'RFP Response';
let featureName = 'Response to RFP\'s';
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
let imageName: string[] = [];
let mediaType: string[] = [];
let importFromFile: string[] = [];
let addByID: string[] = [];
let packUnits: string[] = [];
let campaignDate = '';
let campaignMarket = '';

let index = -2;


describe(featureName, () => {

  before(() => {
    cy.fixture('ooh/campaigns/response_config.json').then((config) => {
      Objective = config.Objective;
      Agency = config.Agency;
      Client = config.Client;
      mo = config.mo;
      loopCount = config.loopCount;
      dupcampaignName = config.dupcampaignName;
      testDataPath = config.testDataPath;
      fileNamesUpload = config.fileNamesUpload;
      importFromFile = config.importFromFile;
      addByID = config.addByID;
      imageName = config.imageName;
      mediaType = config.mediaType;
      packUnits = config.packUnits;
    })

    cy.fixture('ooh/campaigns/campaign_config.json').then((config) => {
      campaignName = config.campaignName[1].name;
      campaignDate = config.campaignDate;
      campaignMarket = config.campaignMarket;
    })
  })

  beforeEach(() => {
    Report.testDetails(epicName, featureName, tag);

    cy.loginAsMoOutFrontUS();

    cy.wait(10000);
  });

  it('E2E Positive Scenario - Data Set 2 - RFP View and Respond', () => {

    cy.get('.icon-search > .icon-search').click();
    cy.get('.cad-search-global__input').type(campaignName).wait(10000);


    cy.get(PageAction.rfpResponsePage().campaignName).should('contain', campaignName);
    cy.get(PageAction.rfpResponsePage().clientname).should('contain', Client[5]);

    cy.get('.center').contains(campaignName).click().wait(1000);

    //Basic details
    cy.get('.global-links > .title').should('contain', 'RFPs')
    //cy.get('.cad-status__text').should('contain', 'RFP Viewed')

    cy.get('.campaign-container__title--holder > .title').should('contain', campaignName);

    cy.get(PageAction.rfpResponsePage().btnDecline).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().btnDecline).should('contain', 'Decline');
    cy.get(PageAction.rfpResponsePage().btnSendRFP).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().btnSendRFP).should('contain', 'Add Response');

    cy.get(PageAction.rfpResponsePage().toggle).should('contain', 'Basic Details').should('contain', 'Inventory')

    //** Basic details - General Information Section */
    cy.get('campaign-detail-basic.ng-star-inserted > :nth-child(1) > .col-md-12 > .title').should('contain', 'General Information')

    cy.get(':nth-child(2) > :nth-child(1) > .campaign-container__element > .campaign-container__element__label').should('contain', 'Objective')
    cy.get(PageAction.rfpResponsePage().object).should('contain', Objective[1]);

    cy.get(':nth-child(2) > :nth-child(2) > .campaign-container__element > .campaign-container__element__label').should('contain', 'Agency')
    cy.get(PageAction.rfpResponsePage().agency).should('contain', Agency[1]);

    cy.get(':nth-child(3) > .campaign-container__element > .campaign-container__element__label').should('contain', 'Client')
    cy.get(PageAction.rfpResponsePage().client).should('contain', Client[5]);

    cy.get(':nth-child(3) > :nth-child(1) > .campaign-container__element > .campaign-container__element__label').should('contain', 'Budget')
    cy.get(PageAction.rfpResponsePage().budget).should('contain', '$600,000.00')

    cy.get(':nth-child(3) > :nth-child(2) > .campaign-container__element > .campaign-container__element__label').should('contain', 'Campaign Dates')
    cy.get(':nth-child(3) > :nth-child(2) > .campaign-container__element > .campaign-container__element__text').should('contain', campaignDate)

    cy.get(':nth-child(4) > .campaign-container__element > .campaign-container__element__label').should('contain', 'Campaign Description')
    cy.get(':nth-child(4) > .campaign-container__element > .campaign-container__element__text').should('contain', campaignName)

    //** Basic details - Markets Section */
    cy.get('.campaign-market-view__header > .title > :nth-child(1)').should('contain', 'Markets');

    cy.get('.content-market-table__pl-0').should('contain', campaignMarket)
    cy.get('.content-market-table__tr > :nth-child(2)').should('contain', 'DMA')
    // cy.get('.content-market-table__tr > :nth-child(3) > .ng-star-inserted').should('contain', 'Jul 15, 2021')
    // cy.get(':nth-child(4) > .ng-star-inserted').should('contain', 'Jul 27, 2021');

    cy.get('.content-count')
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gte', 0)
        if (parseInt(count) > 0) {
          if (parseInt(count) > 10) {
            cy.get(PageAction.rfpResponsePage().nextPage).should('not.be.disabled');
          }
          else
            cy.get('.table > tbody').find('tr').should('have.length', count);
        }
      });

    //** Basic details - Demographic Section */
    cy.get('.col-md-8 > .title').should('contain', 'Demographics');
    // cy.get('.mb-20 > :nth-child(1) > .campaign-container__element__label').should('contain', 'Primary Audience');
    // cy.get('.mb-20 > :nth-child(1) > .campaign-container__element__text').should('contain', 'Adult 18+');

    // cy.get(':nth-child(2) > .campaign-container__element__label').should('contain', 'Secondary Audience');
    // cy.get(':nth-child(2) > .campaign-container__element__text').should('contain', PageAction.campaignList[2]);

    // cy.get('.shared-attachment__header').should('contain', 'Attachments');
    // cy.get('.title_2 > .title')
    //   .then(($span) => {
    //     var count = $span.text().trim();
    //     cy.wrap(parseInt(count)).should('be.gte', 0)
    //     if (parseInt(count) > 5)
    //       cy.get(PageAction.rfpResponsePage().nextPage).should('not.be.disabled');
    //   });
    // cy.get(PageAction.rfpResponsePage().download).should('not.be.disabled');

    cy.get(':nth-child(12) > .campaign-container__element > .title').should('contain', 'Comment')
    // cy.get(':nth-child(12) > .campaign-container__element > .campaign-container__element__text')
    //   .should('contain', PageAction.campaignList[2]);

    //Inventory
    cy.get('[value="Inventory"] > .button-toggle > a').should('contain', 'Inventory').click().wait(1000);
    cy.get(PageAction.rfpResponsePage().viewInMap).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().viewInMap).should('contain', 'VIEW IN MAP');

    cy.get('.campaign-container__media-formatwrap > .panel-head__text').should('contain', 'Media Formats')
    cy.get(PageAction.rfpResponsePage().mediaFormatCount)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gte', 0)
        if (parseInt(count) > 0) {
          if (parseInt(count) > 10)
            cy.get(PageAction.rfpResponsePage().nextPage).should('not.be.disabled');
          else
            cy.get(PageAction.rfpResponsePage().mediaFormatRow).should('have.length', count);
        }
      });

    cy.get('.col-12 > .row > .panel-head__text').should('contain', 'Units');
    cy.get(PageAction.rfpResponsePage().unitsCount)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gte', 0)
        if (parseInt(count) > 0) {
          if (parseInt(count) > 10)
            cy.get(PageAction.rfpResponsePage().nextPage).should('not.be.disabled');
          else
            cy.get(PageAction.rfpResponsePage().unitsRow).should('have.length', count);
        }
      });

    cy.get(PageAction.rfpResponsePage().poiTitle).should('contain', 'Points of Interest');
    cy.get(PageAction.rfpResponsePage().poiCount)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gte', 0)
        if (parseInt(count) > 0) {
          if (parseInt(count) > 10)
            cy.get(PageAction.rfpResponsePage().nextPage).should('not.be.disabled');
          else
            cy.get(PageAction.rfpResponsePage().poiRow).should('have.length', count);
        }
      });

    //Add response
    cy.get(PageAction.rfpResponsePage().btnDecline).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().btnSendRFP).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().btnSendRFP).click().wait(1000);
    //// cy.get('.cad-toast__title').should('contain', 'RFP Accepted');

    cy.get('.rfp-container__header-back > .cad-button').should('not.be.disabled');
    cy.get('.rfp-container__header__holder__wrapper-title').should('contain', 'Response to ' + campaignName);

    cy.get(PageAction.rfpResponsePage().headerCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().headerSave).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().headerSendResponse).should('be.disabled');

    cy.get(PageAction.rfpResponsePage().cancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().save).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().sendResponse).should('be.disabled');

    cy.get('.rfp-container__sticky-breadcrumb-title').should('contain', 'Response to ' + campaignName);

    cy.get('rfp-response-frames > .rfp-container__body-title').should('contain', 'Units');
    cy.get('.rfp-container__body-title > span').wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        assert.equal(parseInt(count), 0, 'units count should be 0')
      });

    cy.get('.col-md-8 > .ng-star-inserted').wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        //     cy.wrap(parseInt(count)).should('be.gte', 0)
        if (parseInt(count) > 0) {
          if (parseInt(count) > 10) {
            cy.get(PageAction.rfpResponsePage().nextPage).should('not.be.disabled');
          }
          else
            cy.get(`[data-automation="ooh-rfp-packages-table"] > ag-grid-angular > .ag-root-wrapper  
                    > .ag-root-wrapper-body > .ag-root > .ag-body-viewport > .ag-center-cols-clipper  
                    > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row`)
              .should('have.length', count);
        }
      });

    cy.get('.rfp-container__body__sections__section__search-message')
      .should('contain', 'You can download a template and browse uploaded files below.');

    cy.get('.rfp-container__body__sections__section-none-title')
      .should('contain', 'No units');

    cy.get(PageAction.rfpResponsePage().addByID).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().importFromFile).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().importFromFile).should('contain', 'Import from File');

    cy.get(PageAction.rfpResponsePage().downloadTemplate).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().downloadTemplate).should('contain', 'Download Template');

    // cy.get('.cad-search__input').should('not.be.disabled');

    cy.get('.col-md-8 > .ng-star-inserted').wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        //     cy.wrap(parseInt(count)).should('be.gte', 0)
        if (parseInt(count) > 0) {
          if (parseInt(count) > 10) {
            cy.get(PageAction.rfpResponsePage().nextPage).should('not.be.disabled');
          }
          else
            cy.get(`[data-automation="ooh-rfp-packages-table"] > ag-grid-angular > .ag-root-wrapper  
                  > .ag-root-wrapper-body > .ag-root > .ag-body-viewport > .ag-center-cols-clipper  
                  > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row`)
              .should('have.length', count);
        }
      });

    cy.get('.pkg-btn > .cad-button').should('not.be.disabled');
    cy.get('.pkg-btn > .cad-button').should('contain', 'Create Package');

    cy.get('.shared-attachment__header > .title_2').should('contain', 'Attachments')
    cy.get('.title_2 > .title')
      .then(($span) => {
        var count = $span.text().trim();
        assert.equal(parseInt(count), 0, 'Attachments count should be 0');
      });

    cy.get('.panel-head__beforecontent').should('contain', 'No Attachments');
    cy.get('.row > cad-button > .cad-button').should('not.be.disabled');
    cy.get('.row > cad-button > .cad-button').should('contain', 'Add Attachments');

    //// cy.get('.title_2 > cad-link.ng-star-inserted > .cad-link').should('not.be.disabled');

    cy.get(':nth-child(5) > .rfp-container__body-title').should('contain', 'Comments');
    cy.get('.rfp-container__body__sections__section-white-wrapper > .ng-valid')
      .should('have.attr', 'placeholder', 'Maximum limit: 4000 Characters')
    cy.get('.rfp-container__body__sections__section-white-wrapper').should('not.be.disabled');
    cy.get('.maxCharsLabel').should('contain', '4000 Characters left');

    cy.get(PageAction.rfpResponsePage().footerCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().footerSave).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().footerSendResponse).should('be.disabled');

    //Add units by ID
    cy.get(PageAction.rfpResponsePage().addByID).click();
    cy.get(`.response__list__modal__search-field > cad-search-input > .cad-search >
       .cad-search__input`).should('not.be.disabled');

    cy.get('[data-automation="popup_close"] > .icon').should('not.be.disabled');

    cy.get('.response__list__modal__header').should('contain', 'Add by ID');
    cy.get(`.response__list__modal__search-field > cad-search-input >
        .cad-search > .cad-search__input > .ng-pristine`)
      .should('have.attr', 'placeholder', 'Search by Unit ID or Geopath ID')

    cy.get(PageAction.rfpResponsePage().addByIdSearchBtn)
      .should('not.be.disabled');
    cy.get('.response__list__modal__search-helptext').should('contain',
      'Key in ID\'s (multiple ID separated by a comma ‘,’ ) and hit Search button to browse the units.');
    cy.get('.response__list__modal__body-table-none-title').should('contain',
      'Use search to browse the units');
    cy.get('.response__list__modal__body-message').should('contain',
      'Please note: To propose Non-Audited Units, Please use Import from File Option');

    cy.get(PageAction.rfpResponsePage().addByIdCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().addByIdDone).should('be.disabled');

    cy.get(`.response__list__modal__search-field > cad-search-input > .cad-search >
        .cad-search__input`).type(addByID[3]);
    cy.get(PageAction.rfpResponsePage().addByIdSearchBtn).click();

    let idsLen: string[] = addByID[0].split(',');
    // if (idsLen.length > 0) {
    //   if (idsLen.length > 10)
    //     cy.get(PageAction.rfpResponsePage().nextPage).should('not.be.disabled');
    //   else
    //     cy.get('.response__list__modal__body > .ng-star-inserted > tbody').find('tr').should('have.length', (idsLen.length));
    // }
    if (idsLen.length > 0) {
      for (var i = 1; i <= idsLen.length; i++) {
        cy.get(':nth-child(' + i + ') > :nth-child(6) > cad-link > .cad-link').should('not.be.disabled');
        cy.get(':nth-child(' + i + ') > :nth-child(6) > cad-link > .cad-link').click();
      }
    }

    cy.get(PageAction.rfpResponsePage().addByIdDone).click();

    cy.get('.rfp-container__body-title > span').wait(1000)
      .then(($span) => {
        var Unitscount = $span.text().trim();
        cy.wrap(parseInt(Unitscount)).should('be.gt', 0)

        if (parseInt(Unitscount) > 0) {
          if (parseInt(Unitscount) > 200)
            cy.get(PageAction.rfpResponsePage().nextPage).should('not.be.disabled');
          // else
          //   cy.get('.ag-pinned-left-cols-container > .ag-row').should('have.length', parseInt(Unitscount) + 2);
        }
      });

    cy.get('.col-md-8 > .ng-star-inserted').wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        //cy.wrap(parseInt(count)).should('be.gte', 0)
        if (parseInt(count) > 0) {
          if (parseInt(count) > 10) {
            cy.get(PageAction.rfpResponsePage().nextPage).should('not.be.disabled');
          }
          else
            cy.get(`[data-automation="ooh-rfp-packages-table"] > ag-grid-angular > .ag-root-wrapper  
                    > .ag-root-wrapper-body > .ag-root > .ag-body-viewport > .ag-center-cols-clipper  
                    > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row`)
              .should('have.length', count);
        }
      });

    cy.get(PageAction.rfpResponsePage().headerCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().headerSave).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().headerSendResponse).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().headerSave).click();

    cy.get('.rfp-container__body__sections__section-error')
      .should('contain', 'The row(s) with unit Id highlighted in red have error(s). Scroll right to identify the error(s) and apply the fix.');

    // cy.get('.cad-toast__title').should('contain', 'Proposal Unit(s) have missing required field(s)');
    cy.get('.cad-toast__message').should('contain', 'Proposal Unit(s) have missing required field(s)');

    cy.get('.pkg-btn > .cad-button').should('not.be.disabled');
    cy.get('.pkg-btn > .cad-button').click();

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

    cy.get('cad-modal-content-pure > :nth-child(1) > cad-icon.ng-star-inserted > .icon').should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().leaveBtn).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().stayBtn).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().stayBtn).click();

    let splString = 'asdfghjklPOIUYTREWQ~!@#,\'$%^&*()_+|}{":?><\/1234567890'

    for (var i = 0; i < idsLen.length; i++) {
      cy.get('div[row-index=' + i + '] > div.invalidCell[col-id="startDate"]').wait(1000).click().type(splString.substring(0, 10)).focus().blur();
      cy.get('div[row-index=' + i + '] > div.invalidCell[col-id="startDate"]').wait(1000).should('contain', splString.substring(0, 10));

      cy.get('div[row-index=' + i + '] > div.invalidCell[col-id="endDate"]').wait(1000).first().click().type(splString.substring(22, 35)).focus().blur();
      cy.get('div[row-index=' + i + '] > div.invalidCell[col-id="endDate"]').wait(1000).first().should('contain', splString.substring(22, 35));

      cy.get('div[row-index=' + i + '] > div.invalidCell[col-id="cycleType"]').wait(1000).first().click().type(splString.substring(6, 14)).focus().blur();
      cy.get('div[row-index=' + i + '] > div.invalidCell[col-id="cycleType"]').wait(1000).first().should('contain', splString.substring(6, 14));
    }

    cy.get(PageAction.rfpResponsePage().headerSave).click();

    // //import units from file
    // const yourFixturePath = testDataPath + importFromFile[0];
    // cy.get("input[type='file']").attachFile(yourFixturePath).wait(1000);

    //// cy.get('.popup-title').should('contain', 'Import from File');
    //// cy.get('.popup-text > .ng-star-inserted').should('contain',
    ////   `Unit(s) in the Response will be overwritten with the data that is in the selected file. Do you still want to import it?`);

    //// cy.get('[view="primary"] > .cad-button').should('not.be.disabled');
    //// cy.get('[modal-footer=""] > [view="secondary"] > .cad-button').should('not.be.disabled');

    //// cy.get('[view="primary"] > .cad-button').click();

    // cy.get('.cad-toast__title').should('contain', 'proposal unit(s) have been added');

    // cy.get(PageAction.rfpResponsePage().headerCancel).should('not.be.disabled');
    // cy.get(PageAction.rfpResponsePage().headerSave).should('not.be.disabled');
    // cy.get(PageAction.rfpResponsePage().headerSendResponse).should('not.be.disabled');

    // cy.get(PageAction.rfpResponsePage().headerSave).click();
    // cy.get('.cad-toast__title').should('contain', 'Save as draft');

    // cy.get(PageAction.rfpResponsePage().btnDecline).should('not.be.disabled');
    // cy.get(PageAction.rfpResponsePage().btnSendRFP).should('not.be.disabled');

    // cy.get(PageAction.rfpResponsePage().btnSendRFP).click();

    // cy.get('.cad-search__input').should('not.be.disabled');
    // cy.get('.cad-search__input > .ng-pristine')
    //   .should('have.attr', 'placeholder', 'Filter Results');

    //delete added unit 
    //cy.get('rfp-response-frames > .rfp-container__body-title').should('contain', 'Units');

    cy.get('.ag-cell > .icons > .trash').first().click().wait(1000);
    cy.get('.ag-cell > .icons > .trash').last().click().wait(1000);

    cy.get('.rfp-container__body-title > span').wait(1000)
      .then(($span) => {
        let unitsCount = parseInt($span.text().trim());
        cy.get('.ag-pinned-left-cols-container > .ag-row').should('have.length', unitsCount);
      });

    cy.get('.col-md-8 > .ng-star-inserted').wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        if (parseInt(count) > 0) {
          if (parseInt(count) > 10) {
            cy.get(PageAction.rfpResponsePage().nextPage).should('not.be.disabled');
          }
          else
            cy.get(`[data-automation="ooh-rfp-packages-table"] > ag-grid-angular > .ag-root-wrapper  
                    > .ag-root-wrapper-body > .ag-root > .ag-body-viewport > .ag-center-cols-clipper  
                    > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row`)
              .should('have.length', count);
        }
      });

    //attach images to audited units
    // for (var i = 0; i < imageName.length; i++) {
    //   cy.get('[row-index="' + (i) + '"] > .ag-cell > .icons > .img').click();

    //   cy.get('.response__header').should('contain', 'Pictures')
    //   cy.get('cad-modal-content > :nth-child(1) > cad-icon.ng-star-inserted > .icon')
    //     .should('not.be.disabled');

    //   if (cy.find('div.modal-window-body > div > img').length > 0) {

    //     cy.log('Image already exist')

    //   } else {
    //     cy.get('.response__body > cad-icon.ng-star-inserted > .icon > use').click();

    //     cy.get('.uploader > .title_2').should('contain', 'Drop your picture here');
    //     cy.get('.title_6').should('contain', 'Only .jpg or .png files less than 5 MB are allowed.')

    //     cy.get(PageAction.rfpResponsePage().imgBrowseBtn).should('not.be.disabled');
    //     cy.get('.uploader > :nth-child(3) > cad-button > .cad-button').should('contain', 'Browse');

    //     const imageFixturePath = testDataPath + imageName[i];
    //     cy.get('cad-button > input[type="file"]').attachFile(imageFixturePath).wait(1000)

    //     cy.get(PageAction.rfpResponsePage().imgDoneBtn).should('not.be.disabled');
    //     cy.get(PageAction.rfpResponsePage().imgDoneBtn).should('contain', 'Done')
    //     cy.get(PageAction.rfpResponsePage().imgDoneBtn).click()
    //   }

    // }

    //attach images to non-audited units
    // for (var i = 0; i < 5; i++) {
    //   cy.get('[row-index="' + (i + 11) + '"] > .ag-cell > .icons > .img').click();

    //   cy.get('.response__header').should('contain', 'Pictures')
    //   cy.get('cad-modal-content > :nth-child(1) > cad-icon.ng-star-inserted > .icon')
    //     .should('not.be.disabled');

    //   cy.get('.uploader > .title_2').should('contain', 'Drop your picture here');
    //   cy.get('.title_6').should('contain', 'Only .jpg or .png files less than 5 MB are allowed.')

    //   cy.get(PageAction.rfpResponsePage().imgBrowseBtn).should('not.be.disabled');
    //   cy.get('.uploader > :nth-child(3) > cad-button > .cad-button').should('contain', 'Browse');

    //   const imageFixturePath = testDataPath + imageName[i];
    //   cy.get('cad-button > input[type="file"]').attachFile(imageFixturePath).wait(1000)

    //   cy.get(PageAction.rfpResponsePage().imgDoneBtn).should('not.be.disabled');
    //   cy.get(PageAction.rfpResponsePage().imgDoneBtn).should('contain', 'Done')
    //   cy.get(PageAction.rfpResponsePage().imgDoneBtn).click()
    // }

    cy.get(PageAction.rfpResponsePage().headerCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().headerSave).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().headerSendResponse).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().headerSave).click().wait(1000);

    // cy.get(PageAction.rfpResponsePage().btnDecline).should('not.be.disabled');
    // cy.get(PageAction.rfpResponsePage().btnSendRFP).should('not.be.disabled');

    // cy.get(PageAction.rfpResponsePage().btnSendRFP).click();

    cy.get('.rfp-container__body-title > span').wait(1000)
      .then(($span) => {
        let unitsCount = parseInt($span.text().trim());
        cy.get('.ag-pinned-left-cols-container > .ag-row').should('have.length', unitsCount);
      });

    cy.get('.col-md-8 > .ng-star-inserted').wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        //     cy.wrap(parseInt(count)).should('be.gte', 0)
        if (parseInt(count) > 0) {
          if (parseInt(count) > 10) {
            cy.get(PageAction.rfpResponsePage().nextPage).should('not.be.disabled');
          }
          else
            cy.get(`[data-automation="ooh-rfp-packages-table"] > ag-grid-angular > .ag-root-wrapper  
                   > .ag-root-wrapper-body > .ag-root > .ag-body-viewport > .ag-center-cols-clipper  
                   > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row`)
              .should('have.length', count);
        }
      });

    //create package 1
    cy.get('.pkg-btn > .cad-button').should('not.be.disabled');
    cy.get('.pkg-btn > .cad-button').should('contain', 'Create Package');
    cy.get('.pkg-btn > .cad-button').click();

    cy.get('.rfp-container__header__holder__wrapper-title').should('contain', 'New Package');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(1) > .campaign-form__header > .title').should('contain', 'General Information');

    cy.get('.cad-panel > :nth-child(2) > :nth-child(1) > .title').should('contain', 'Type');
    cy.get(PageAction.rfpResponsePage().selectType).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().selectType).should('contain', 'Select Type');
    cy.get(PageAction.rfpResponsePage().selectType).click().wait(1000);
    cy.get('.cad-search__input').type(mediaType[0]).wait(1000);
    cy.get('.list-item').click();

    cy.get(':nth-child(2) > :nth-child(2) > .title').should('contain', 'Market');
    cy.get(PageAction.rfpResponsePage().selectMarket).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().selectMarket).should('contain', 'Select Market');
    cy.get(PageAction.rfpResponsePage().selectMarket).click().wait(1000);
    cy.get('.list-item__text').eq(0).click();

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(2) > :nth-child(3) > .title').should('contain', 'Size (Optional)');
    cy.get(PageAction.rfpResponsePage().packageSize).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSize).type('400"x400"').blur();
    cy.get(PageAction.rfpResponsePage().packageSize).should('have.value', '400"x400"');

    cy.get(':nth-child(3) > :nth-child(1) > .title').should('contain', 'Location Description');
    cy.get(PageAction.rfpResponsePage().locationDesc).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().locationDesc).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Location Description is required');
    cy.get(PageAction.rfpResponsePage().locationDesc).type('Location Description 1').blur();
    cy.get(PageAction.rfpResponsePage().locationDesc).should('have.value', 'Location Description 1');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(3) > :nth-child(2) > .title').should('contain', 'Rationale (Optional)');
    cy.get(PageAction.rfpResponsePage().rationale).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().rationale).type('Rationale 1').blur();
    cy.get(PageAction.rfpResponsePage().rationale).should('have.value', 'Rationale 1');

    cy.get(PageAction.rfpResponsePage().packageCancel).click();

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().leaveBtn).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().stayBtn).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().stayBtn).click();

    cy.get(':nth-child(5) > .campaign-form__header > .title').should('contain', 'Net Rates');

    cy.get(':nth-child(6) > :nth-child(1) > .title').should('contain', 'Units');
    cy.get(PageAction.rfpResponsePage().units).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().units).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Units is required');

    cy.get(PageAction.rfpResponsePage().units).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().units).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Units is required');

    cy.get(PageAction.rfpResponsePage().units).type('1000').blur();
    cy.get(PageAction.rfpResponsePage().units).should('have.value', '1000');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(6) > :nth-child(2) > .title').should('contain', 'Net Rate Card');
    cy.get(PageAction.rfpResponsePage().netRateCard).should('not.be.disabled');
    cy.get(`:nth-child(6) > :nth-child(2) > .field > cad-input-group > .cad-input-group 
    > .cad-input-group__label > .cad-input-group__addon > .cad-input-group__addon-icon`)
      .should('contain', '$');
    cy.get(PageAction.rfpResponsePage().netRateCard).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Rate Card is required');

    cy.get(PageAction.rfpResponsePage().netRateCard).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().netRateCard).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Rate Card is required');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(PageAction.rfpResponsePage().netRateCard).type('1500').blur();
    cy.get(PageAction.rfpResponsePage().netRateCard).should('have.value', '1,500.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(':nth-child(6) > :nth-child(3) > .title').should('contain', 'Net Negotiated Rate');
    cy.get(PageAction.rfpResponsePage().netNegoRate).should('not.be.disabled');
    cy.get(`:nth-child(3) > .field > cad-input-group > .cad-input-group > .cad-input-group__label 
    > .cad-input-group__addon > .cad-input-group__addon-icon`)
      .should('contain', '$');
    cy.get(PageAction.rfpResponsePage().netNegoRate).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Negotiated Rate is required');

    cy.get(PageAction.rfpResponsePage().netNegoRate).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().netNegoRate).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Negotiated Rate is required');

    cy.get(PageAction.rfpResponsePage().netNegoRate).type('1450').blur();
    cy.get(PageAction.rfpResponsePage().netNegoRate).should('have.value', '1,450.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(PageAction.rfpResponsePage().packageCancel).click();

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().leaveBtn).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().stayBtn).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().stayBtn).click();

    cy.get(':nth-child(4) > .mb-15').should('contain', '% Discount');
    cy.get(PageAction.rfpResponsePage().discount).should('contain', '3.33%');

    cy.get(':nth-child(8) > .campaign-form__header > .title').should('contain', 'Flight Dates');
    cy.get(':nth-child(9) > :nth-child(1) > .title').should('contain', 'Start Date');
    cy.get(PageAction.rfpResponsePage().flightDateStart).should('not.be.disabled');
    cy.get(`${PageAction.rfpResponsePage().flightDateStart} > div > cad-dropdown > div > div > div 
    > div > .cad-datepicker__head > .cad-datepicker__input`)
      .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    cy.get(PageAction.rfpResponsePage().flightDateStart).click();
    cy.get('.rfp-container__body-message-error').should('contain', 'Start Date is required');
    cy.get(`.cad-month-calendar__header__icon--right > cad-icon > .icon`).click();
    cy.contains('10').click();
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(9) > :nth-child(2) > .title').should('contain', 'End Date');
    cy.get('cad-datepicker[data-automation="ooh-package-flight-end-date"] > div > cad-dropdown > div > div > div > div > div').should('not.be.disabled');
    cy.get(`${PageAction.rfpResponsePage().flightDateEnd} > div > cad-dropdown > div > div > div 
    > div > .cad-datepicker__head > .cad-datepicker__input`)
      .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    cy.get(PageAction.rfpResponsePage().flightDateEnd).click();
    cy.get('.rfp-container__body-message-error').should('contain', 'End Date is required');
    cy.get(`.cad-month-calendar__header__icon--right > cad-icon > .icon`).click();
    cy.contains('25').click();
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(PageAction.rfpResponsePage().packageCancel).click();

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().leaveBtn).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().stayBtn).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().stayBtn).click();

    cy.get(':nth-child(11) > .campaign-form__header > .title').should('contain', 'Media Cost');
    cy.get(':nth-child(12) > :nth-child(1) > .title').should('contain', 'Cycle Type');
    cy.get(PageAction.rfpResponsePage().cycleType).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().cycleType).should('contain', 'Select Cycle Type');
    cy.get(PageAction.rfpResponsePage().cycleType).click();
    cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').click();

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(12) > :nth-child(2) > .title').should('contain', 'Number of Cycles');
    cy.get(PageAction.rfpResponsePage().NumberOfCycles).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().NumberOfCycles).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Number of Cycles is required');

    cy.get(PageAction.rfpResponsePage().NumberOfCycles).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().NumberOfCycles).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Number of Cycles is required');

    cy.get(PageAction.rfpResponsePage().NumberOfCycles).type('3.74').blur();
    cy.get(PageAction.rfpResponsePage().NumberOfCycles).should('have.value', '3.74');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(12) > :nth-child(3) > .mb-15').should('contain', 'Total Net Media Cost');
    cy.get(PageAction.rfpResponsePage().totalMediaCost).should('contain', '$5,423.00')

    cy.get(':nth-child(14) > .campaign-form__header > .title').should('contain', 'Program Cost');
    cy.get(':nth-child(15) > :nth-child(1) > .title').should('contain', 'Net Install');
    cy.get(PageAction.rfpResponsePage().netInstall).should('not.be.disabled');
    cy.get(`:nth-child(1) > .field > cad-input-group > .cad-input-group > .cad-input-group__label 
    > .cad-input-group__addon > .cad-input-group__addon-icon`).should('contain', '$');

    cy.get(PageAction.rfpResponsePage().netInstall).type('{del}{selectall}{backspace}').focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Install is required');

    cy.get(PageAction.rfpResponsePage().netInstall).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().netInstall).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Install is required');

    cy.get(PageAction.rfpResponsePage().netInstall).type('200').blur();
    cy.get(PageAction.rfpResponsePage().netInstall).should('have.value', '200.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(PageAction.rfpResponsePage().packageCancel).click();

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().leaveBtn).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().stayBtn).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().stayBtn).click();

    cy.get(':nth-child(15) > :nth-child(2) > .title').should('contain', 'Production (Only if forced)');
    cy.get(PageAction.rfpResponsePage().production).should('not.be.disabled');
    cy.get(`:nth-child(15) > :nth-child(2) > .field > cad-input-group > .cad-input-group 
    > .cad-input-group__label > .cad-input-group__addon > .cad-input-group__addon-icon`).should('contain', '$');

    cy.get(PageAction.rfpResponsePage().production).type('{del}{selectall}{backspace}').focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Production (Only if forced) is required');

    cy.get(PageAction.rfpResponsePage().production).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().production).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Production (Only if forced) is required');

    cy.get(PageAction.rfpResponsePage().production).type('150').blur();
    cy.get(PageAction.rfpResponsePage().production).should('have.value', '150.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(15) > :nth-child(3) > .mb-15').should('contain', 'Total Program Cost');
    cy.get(PageAction.rfpResponsePage().programCost).should('contain', '$5,773.00');

    cy.get(':nth-child(17) > .campaign-form__header > .title').should('contain', 'Expires');
    cy.get(':nth-child(18) > .campaign-form__element > .title').should('contain', 'Hold Expiration Date');
    cy.get(PageAction.rfpResponsePage().holdExpireDate).should('not.be.disabled');
    cy.get(`${PageAction.rfpResponsePage().holdExpireDate} .cad-datepicker__input`)
      .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    cy.get(PageAction.rfpResponsePage().holdExpireDate).click();
    // cy.get('.rfp-container__body-message-error').should('contain', 'End Date is required');
    cy.get(`.cad-month-calendar__header__icon--right > cad-icon > .icon`).click();
    cy.contains('25').click();

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(20) > .campaign-form__header > .title').should('contain', 'Methodology');

    cy.get(':nth-child(21) > :nth-child(1) > .title').should('contain', 'Illuminated');

    cy.get(PageAction.rfpResponsePage().illuminated).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().illumYes).should('contain', 'Yes');
    cy.get(PageAction.rfpResponsePage().illumYes)
      .should('be.visible')//.should('be.checked');

    cy.get(PageAction.rfpResponsePage().illumNo).should('contain', 'No');
    cy.get(PageAction.rfpResponsePage().illumNo)
      .should('be.visible').should('not.be.checked')
      .click({ force: true })//.wait(500).should('be.checked');

    cy.get(PageAction.rfpResponsePage().various).should('contain', 'Various');
    cy.get(PageAction.rfpResponsePage().various)
      .should('be.visible').should('not.be.checked');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(22) > :nth-child(1) > .title').should('contain', 'Universe: 18+ yrs Weekly Geopath Impressions');
    cy.get(PageAction.rfpResponsePage().Universe).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().Universe).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Universe: 18+ yrs Weekly Geopath Impressions is required');

    cy.get(PageAction.rfpResponsePage().Universe).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().Universe).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Universe: 18+ yrs Weekly Geopath Impressions is required');

    cy.get(PageAction.rfpResponsePage().Universe).type('1342356767').blur();
    cy.get(PageAction.rfpResponsePage().Universe).should('have.value', '1,342,356,767.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');
/* feature removed as enhancement
    cy.get(':nth-child(22) > :nth-child(2) > .title').should('contain', 'All: Adults by Age-Group - 18-49 yrs Weekly Geopath Impressions')
    cy.get(PageAction.rfpResponsePage().all).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().all).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'All: Adults by Age-Group - 18-49 yrs Weekly Geopath Impressions is required');

    cy.get(PageAction.rfpResponsePage().all).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().all).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'All: Adults by Age-Group - 18-49 yrs Weekly Geopath Impressions is required');

    cy.get(PageAction.rfpResponsePage().all).type('87634537568').blur();
    cy.get(PageAction.rfpResponsePage().all).should('have.value', '87,634,537,568.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');
*/
    cy.get(':nth-child(21) > :nth-child(2) > .title').should('contain', 'Methodology of Measurement');

    cy.get(PageAction.rfpResponsePage().geoPath).should('contain', 'Geopath');
    cy.get(PageAction.rfpResponsePage().geoPath)
      .should('be.visible')//.should('be.checked');

    cy.get(PageAction.rfpResponsePage().other).should('contain', 'Other');
    cy.get(PageAction.rfpResponsePage().other)
      .should('be.visible').should('not.be.checked')
      .click({ force: true })//.wait(500).should('be.checked');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(22) > .campaign-form__element > .title').should('contain', 'Weekly Non-Geopath Measurement');
    cy.get(PageAction.rfpResponsePage().NonGeopath).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().NonGeopath).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Weekly Non-Geopath Measurement is required');

    cy.get(PageAction.rfpResponsePage().NonGeopath).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().NonGeopath).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Weekly Non-Geopath Measurement is required');

    cy.get(PageAction.rfpResponsePage().NonGeopath).type('4654321654').blur();
    cy.get(PageAction.rfpResponsePage().NonGeopath).should('have.value', '4,654,321,654.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('not.be.disabled');

    cy.get(':nth-child(24) > .campaign-form__header > .title').should('contain', 'Comments');
    cy.get(PageAction.rfpResponsePage().comment).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().comment).type('sample test comment 1');
    cy.get(PageAction.rfpResponsePage().comment).should('have.value', 'sample test comment 1');

    cy.get('.rfp-response-packages-title').should('contain', 'Units');
    cy.get('.uploader > .title_2').should('contain', 'Drop your file here');

    cy.get(PageAction.rfpResponsePage().browse).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().browse).should('contain', 'Browse');

    cy.get('.title_6').should('contain', 'Supported file formats: .xls, .xlsx, .xlsm');
    cy.get('.mt-5').should('contain', 'Template (package-frames-template)');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().browse).click();

    for (var i = 0; i < packUnits.length; i++) {
      const imageFixturePath = testDataPath + packUnits[i];
      cy.log(imageFixturePath);
      cy.get('cad-button > input[type="file"]').attachFile(imageFixturePath).wait(8000)
    }
    cy.get('.cad-toast__title').should('contain', 'Proposal Unit(s) have been added.');

    cy.get('[data-automation="cad-link"]').should('not.be.disabled');
    cy.get('[data-automation="cad-link"]').should('contain', 'Import from File');

    cy.get('.cad-search__input').should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().packageCancel).click();

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().leaveBtn).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().stayBtn).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().stayBtn).click();

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).click().wait(3000);

    cy.get('.cad-toast__title').should('contain', ' RFP Package successfully created')
      .wait(1000);

    cy.get('.col-md-8 > .ng-star-inserted').wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        //     cy.wrap(parseInt(count)).should('be.gt', 0)
        if (parseInt(count) > 0) {
          if (parseInt(count) > 10) {
            cy.get(PageAction.rfpResponsePage().nextPage).should('not.be.disabled');
          }
          else
            cy.get(`[data-automation="ooh-rfp-packages-table"] > ag-grid-angular > .ag-root-wrapper  
                 > .ag-root-wrapper-body > .ag-root > .ag-body-viewport > .ag-center-cols-clipper  
                 > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row`)
              .should('have.length', count);
        }
      });

    //create package 2
    cy.get('.pkg-btn > .cad-button').should('not.be.disabled');
    cy.get('.pkg-btn > .cad-button').should('contain', 'Create Package');
    cy.get('.pkg-btn > .cad-button').click();

    cy.get('.rfp-container__header__holder__wrapper-title').should('contain', 'New Package');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(1) > .campaign-form__header > .title').should('contain', 'General Information');

    cy.get('.cad-panel > :nth-child(2) > :nth-child(1) > .title').should('contain', 'Type');
    cy.get(PageAction.rfpResponsePage().selectType).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().selectType).should('contain', 'Select Type');
    cy.get(PageAction.rfpResponsePage().selectType).click().wait(1000);
    cy.get('.cad-search__input').type(mediaType[1]).wait(1000);
    cy.get('.list-item').click();

    cy.get(':nth-child(2) > :nth-child(2) > .title').should('contain', 'Market');
    cy.get(PageAction.rfpResponsePage().selectMarket).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().selectMarket).should('contain', 'Select Market');
    cy.get(PageAction.rfpResponsePage().selectMarket).click().wait(1000);
    cy.get('.list-item__text').eq(1).click();

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(2) > :nth-child(3) > .title').should('contain', 'Size (Optional)');
    cy.get(PageAction.rfpResponsePage().packageSize).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSize).type('150"x170"').blur();
    cy.get(PageAction.rfpResponsePage().packageSize).should('have.value', '150"x170"');

    cy.get(':nth-child(3) > :nth-child(1) > .title').should('contain', 'Location Description');
    cy.get(PageAction.rfpResponsePage().locationDesc).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().locationDesc).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Location Description is required');
    cy.get(PageAction.rfpResponsePage().locationDesc).type('Location Description 2').blur();
    cy.get(PageAction.rfpResponsePage().locationDesc).should('have.value', 'Location Description 2');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(3) > :nth-child(2) > .title').should('contain', 'Rationale (Optional)');
    cy.get(PageAction.rfpResponsePage().rationale).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().rationale).type('Rationale 2').blur();
    cy.get(PageAction.rfpResponsePage().rationale).should('have.value', 'Rationale 2');

    cy.get(PageAction.rfpResponsePage().packageCancel).click();

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().leaveBtn).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().stayBtn).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().stayBtn).click();

    cy.get(':nth-child(5) > .campaign-form__header > .title').should('contain', 'Net Rates');

    cy.get(':nth-child(6) > :nth-child(1) > .title').should('contain', 'Units');
    cy.get(PageAction.rfpResponsePage().units).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().units).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Units is required');

    cy.get(PageAction.rfpResponsePage().units).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().units).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Units is required');

    cy.get(PageAction.rfpResponsePage().units).type('750').blur();
    cy.get(PageAction.rfpResponsePage().units).should('have.value', '750');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(6) > :nth-child(2) > .title').should('contain', 'Net Rate Card');
    cy.get(PageAction.rfpResponsePage().netRateCard).should('not.be.disabled');
    cy.get(`:nth-child(6) > :nth-child(2) > .field > cad-input-group > .cad-input-group 
    > .cad-input-group__label > .cad-input-group__addon > .cad-input-group__addon-icon`)
      .should('contain', '$');
    cy.get(PageAction.rfpResponsePage().netRateCard).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Rate Card is required');

    cy.get(PageAction.rfpResponsePage().netRateCard).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().netRateCard).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Rate Card is required');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(PageAction.rfpResponsePage().netRateCard).type('130').blur();
    cy.get(PageAction.rfpResponsePage().netRateCard).should('have.value', '130.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(':nth-child(6) > :nth-child(3) > .title').should('contain', 'Net Negotiated Rate');
    cy.get(PageAction.rfpResponsePage().netNegoRate).should('not.be.disabled');
    cy.get(`:nth-child(3) > .field > cad-input-group > .cad-input-group > .cad-input-group__label 
    > .cad-input-group__addon > .cad-input-group__addon-icon`)
      .should('contain', '$');
    cy.get(PageAction.rfpResponsePage().netNegoRate).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Negotiated Rate is required');

    cy.get(PageAction.rfpResponsePage().netNegoRate).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().netNegoRate).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Negotiated Rate is required');

    cy.get(PageAction.rfpResponsePage().netNegoRate).type('973').blur();
    cy.get(PageAction.rfpResponsePage().netNegoRate).should('have.value', '973.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(PageAction.rfpResponsePage().packageCancel).click();

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().leaveBtn).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().stayBtn).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().stayBtn).click();

    cy.get(':nth-child(4) > .mb-15').should('contain', '% Discount');
    cy.get(PageAction.rfpResponsePage().discount).should('contain', '-648.46%');

    // cy.get(':nth-child(8) > .campaign-form__header > .title').should('contain', 'Flight Dates');
    // cy.get(':nth-child(9) > :nth-child(1) > .title').should('contain', 'Start Date');
    // cy.get(PageAction.rfpResponsePage().flightDateStart).should('not.be.disabled');
    // cy.get(`${PageAction.rfpResponsePage().flightDateStart} > div > cad-dropdown > div > div > div 
    // > div > .cad-datepicker__head > .cad-datepicker__input`)
    //   .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    // cy.get(PageAction.rfpResponsePage().flightDateStart).click();
    // cy.get('.rfp-container__body-message-error').should('contain', 'Start Date is required');
    // cy.get(`.cad-month-calendar__header__icon--right > cad-icon > .icon`).click();
    // cy.contains('10').click();
    // cy.get('.rfp-container__body-message-error').should('not.exist');

    // cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    // cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    // cy.get(':nth-child(9) > :nth-child(2) > .title').should('contain', 'End Date');
    // cy.get('.ng-tns-c25-7 > [cad-dropdown-head=""] > .cad-datepicker__head').should('not.be.disabled');
    // cy.get(`${PageAction.rfpResponsePage().flightDateEnd} > div > cad-dropdown > div > div > div 
    // > div > .cad-datepicker__head > .cad-datepicker__input`)
    //   .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    // cy.get(PageAction.rfpResponsePage().flightDateEnd).click();
    // cy.get('.rfp-container__body-message-error').should('contain', 'End Date is required');
    // cy.get(`.cad-month-calendar__header__icon--right > cad-icon > .icon`).click();
    // cy.contains('25').click();
    // cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(PageAction.rfpResponsePage().packageCancel).click();

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().leaveBtn).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().stayBtn).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().stayBtn).click();

    cy.get(':nth-child(11) > .campaign-form__header > .title').should('contain', 'Media Cost');
    cy.get(':nth-child(12) > :nth-child(1) > .title').should('contain', 'Cycle Type');
    cy.get(PageAction.rfpResponsePage().cycleType).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().cycleType).should('contain', 'Select Cycle Type');
    cy.get(PageAction.rfpResponsePage().cycleType).click();
    cy.get(':nth-child(2) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').click();

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(12) > :nth-child(2) > .title').should('contain', 'Number of Cycles');
    cy.get(PageAction.rfpResponsePage().NumberOfCycles).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().NumberOfCycles).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Number of Cycles is required');

    cy.get(PageAction.rfpResponsePage().NumberOfCycles).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().NumberOfCycles).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Number of Cycles is required');

    cy.get(PageAction.rfpResponsePage().NumberOfCycles).type('1.24').blur();
    cy.get(PageAction.rfpResponsePage().NumberOfCycles).should('have.value', '1.24');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(12) > :nth-child(3) > .mb-15').should('contain', 'Total Net Media Cost');
    cy.get(PageAction.rfpResponsePage().totalMediaCost).should('contain', '$1,206.52')

    cy.get(':nth-child(14) > .campaign-form__header > .title').should('contain', 'Program Cost');
    cy.get(':nth-child(15) > :nth-child(1) > .title').should('contain', 'Net Install');
    cy.get(PageAction.rfpResponsePage().netInstall).should('not.be.disabled');
    cy.get(`:nth-child(1) > .field > cad-input-group > .cad-input-group > .cad-input-group__label 
    > .cad-input-group__addon > .cad-input-group__addon-icon`).should('contain', '$');

    cy.get(PageAction.rfpResponsePage().netInstall).type('{del}{selectall}{backspace}').focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Install is required');

    cy.get(PageAction.rfpResponsePage().netInstall).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().netInstall).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Install is required');

    cy.get(PageAction.rfpResponsePage().netInstall).type('153').blur();
    cy.get(PageAction.rfpResponsePage().netInstall).should('have.value', '153.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(PageAction.rfpResponsePage().packageCancel).click();

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().leaveBtn).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().stayBtn).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().stayBtn).click();

    cy.get(':nth-child(15) > :nth-child(2) > .title').should('contain', 'Production (Only if forced)');
    cy.get(PageAction.rfpResponsePage().production).should('not.be.disabled');
    cy.get(`:nth-child(15) > :nth-child(2) > .field > cad-input-group > .cad-input-group 
    > .cad-input-group__label > .cad-input-group__addon > .cad-input-group__addon-icon`).should('contain', '$');

    cy.get(PageAction.rfpResponsePage().production).type('{del}{selectall}{backspace}').focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Production (Only if forced) is required');

    cy.get(PageAction.rfpResponsePage().production).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().production).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Production (Only if forced) is required');

    cy.get(PageAction.rfpResponsePage().production).type('215').blur();
    cy.get(PageAction.rfpResponsePage().production).should('have.value', '215.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(15) > :nth-child(3) > .mb-15').should('contain', 'Total Program Cost');
    cy.get(PageAction.rfpResponsePage().programCost).should('contain', '$1,574.52 ');

    // cy.get(':nth-child(17) > .campaign-form__header > .title').should('contain', 'Expires');
    // cy.get(':nth-child(18) > .campaign-form__element > .title').should('contain', 'Hold Expiration Date');
    // cy.get(PageAction.rfpResponsePage().holdExpireDate).should('not.be.disabled');
    // cy.get(`${PageAction.rfpResponsePage().holdExpireDate} .cad-datepicker__input`)
    //   .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    // cy.get(PageAction.rfpResponsePage().holdExpireDate).click();
    // // cy.get('.rfp-container__body-message-error').should('contain', 'End Date is required');
    // cy.get(`.cad-month-calendar__header__icon--right > cad-icon > .icon`).click();
    // cy.contains('25').click();

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(20) > .campaign-form__header > .title').should('contain', 'Methodology');

    cy.get(':nth-child(21) > :nth-child(1) > .title').should('contain', 'Illuminated');

    cy.get(PageAction.rfpResponsePage().illuminated).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().illumYes).should('contain', 'Yes');
    cy.get(PageAction.rfpResponsePage().illumYes)
      .should('be.visible')//.should('be.checked');

    cy.get(PageAction.rfpResponsePage().illumNo).should('contain', 'No');
    cy.get(PageAction.rfpResponsePage().illumNo)
      .should('be.visible').should('not.be.checked')
      .click({ force: true })//.should('be.checked');

    cy.get(PageAction.rfpResponsePage().various).should('contain', 'Various');
    cy.get(PageAction.rfpResponsePage().various)
      .should('be.visible').should('not.be.checked');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(22) > :nth-child(1) > .title').should('contain', 'Universe: 18+ yrs Weekly Geopath Impressions');
    cy.get(PageAction.rfpResponsePage().Universe).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().Universe).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Universe: 18+ yrs Weekly Geopath Impressions is required');

    cy.get(PageAction.rfpResponsePage().Universe).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().Universe).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Universe: 18+ yrs Weekly Geopath Impressions is required');

    cy.get(PageAction.rfpResponsePage().Universe).type('1342356767').blur();
    cy.get(PageAction.rfpResponsePage().Universe).should('have.value', '1,342,356,767.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');
/* feature removed as enhancement
    cy.get(':nth-child(22) > :nth-child(2) > .title').should('contain', 'All: Adults by Age-Group - 18-49 yrs Weekly Geopath Impressions')
    cy.get(PageAction.rfpResponsePage().all).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().all).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'All: Adults by Age-Group - 18-49 yrs Weekly Geopath Impressions is required');

    cy.get(PageAction.rfpResponsePage().all).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().all).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'All: Adults by Age-Group - 18-49 yrs Weekly Geopath Impressions is required');

    cy.get(PageAction.rfpResponsePage().all).type('34565765').blur();
    cy.get(PageAction.rfpResponsePage().all).should('have.value', '34,565,765.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');
*/
    cy.get(':nth-child(21) > :nth-child(2) > .title').should('contain', 'Methodology of Measurement');

    cy.get(PageAction.rfpResponsePage().geoPath).should('contain', 'Geopath');
    cy.get(PageAction.rfpResponsePage().geoPath)
      .should('be.visible')//.should('be.checked');

    cy.get(PageAction.rfpResponsePage().other).should('contain', 'Other');
    cy.get(PageAction.rfpResponsePage().other)
      .should('be.visible').should('not.be.checked')
      .click({ force: true })//.should('be.checked');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(22) > .campaign-form__element > .title').should('contain', 'Weekly Non-Geopath Measurement');
    cy.get(PageAction.rfpResponsePage().NonGeopath).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().NonGeopath).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Weekly Non-Geopath Measurement is required');

    cy.get(PageAction.rfpResponsePage().NonGeopath).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().NonGeopath).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Weekly Non-Geopath Measurement is required');

    cy.get(PageAction.rfpResponsePage().NonGeopath).type('2345567').blur();
    cy.get(PageAction.rfpResponsePage().NonGeopath).should('have.value', '2,345,567.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('not.be.disabled');

    cy.get(':nth-child(24) > .campaign-form__header > .title').should('contain', 'Comments');
    cy.get(PageAction.rfpResponsePage().comment).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().comment).type('sample test comment 2');
    cy.get(PageAction.rfpResponsePage().comment).should('have.value', 'sample test comment 2');

    cy.get('.rfp-response-packages-title').should('contain', 'Units');
    cy.get('.uploader > .title_2').should('contain', 'Drop your file here');

    cy.get(PageAction.rfpResponsePage().browse).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().browse).should('contain', 'Browse');

    cy.get('.title_6').should('contain', 'Supported file formats: .xls, .xlsx, .xlsm');
    cy.get('.mt-5').should('contain', 'Template (package-frames-template)');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().browse).click();

    for (var i = 0; i < packUnits.length; i++) {
      const imageFixturePath = testDataPath + packUnits[i];
      cy.get('cad-button > input[type="file"]').attachFile(imageFixturePath).wait(8000)
    }
    cy.get('.cad-toast__title').should('contain', 'Proposal Unit(s) have been added.');

    cy.get('[data-automation="cad-link"]').should('not.be.disabled');
    cy.get('[data-automation="cad-link"]').should('contain', 'Import from File');

    cy.get('.cad-search__input').should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().packageCancel).click();

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().leaveBtn).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().stayBtn).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().stayBtn).click();

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).click().wait(3000);

    cy.get('.cad-toast__title').should('contain', ' RFP Package successfully created')
      .wait(1000);

    cy.get('.col-md-8 > .ng-star-inserted').wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        //     cy.wrap(parseInt(count)).should('be.gt', 0)
        if (parseInt(count) > 0) {
          if (parseInt(count) > 10) {
            cy.get(PageAction.rfpResponsePage().nextPage).should('not.be.disabled');
          }
          else
            cy.get(`[data-automation="ooh-rfp-packages-table"] > ag-grid-angular > .ag-root-wrapper  
                 > .ag-root-wrapper-body > .ag-root > .ag-body-viewport > .ag-center-cols-clipper  
                 > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row`)
              .should('have.length', count);
        }
      });

    //delete package
    var count;
    cy.get('.col-md-8 > .ng-star-inserted').wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        //cy.wrap(parseInt(count)).should('be.gt', 0)
        if (parseInt(count) > 0) {
          if (parseInt(count) > 10) {
            cy.get(PageAction.rfpResponsePage().nextPage).should('not.be.disabled');
          }
          else
            cy.get(`[data-automation="ooh-rfp-packages-table"] > ag-grid-angular > .ag-root-wrapper  
                  > .ag-root-wrapper-body > .ag-root > .ag-body-viewport > .ag-center-cols-clipper  
                  > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row`)
              .should('have.length', count);

          cy.get('[row-index="0"] > .ag-cell > .icons > .rfp-container__body-table__actions-edit')
            .should('not.be.disabled');
          cy.get(`.rfp-container__body-table > ag-grid-angular > .ag-root-wrapper > .ag-root-wrapper-body > .ag-root 
                > .ag-body-viewport > .ag-pinned-right-cols-container > [row-index="0"] > .ag-cell > .icons > .trash`)
            .should('not.be.disabled');

          cy.get(`.rfp-container__body-table > ag-grid-angular > .ag-root-wrapper > .ag-root-wrapper-body > .ag-root 
                > .ag-body-viewport > .ag-pinned-right-cols-container > [row-index="0"] > .ag-cell > .icons > .trash`).click();

          cy.get('.popup-title').should('contain', 'Delete Pacakge');
          cy.get('[data-automation="popup_close"] > .icon > use')
            .should('not.be.disabled');

          cy.get('.popup-description').should('contain',
            'Are you sure want to delete selected package(s)? This action will delete the package and saving is not required');

          cy.get(PageAction.rfpResponsePage().deletaPackPopCancel)
            .should('not.be.disabled');
          cy.get(PageAction.rfpResponsePage().deletaPackPopCancel)
            .should('contain', 'Cancel');
          cy.get(PageAction.rfpResponsePage().deletaPackPopYes)
            .should('not.be.disabled');
          cy.get(PageAction.rfpResponsePage().deletaPackPopYes)
            .should('contain', 'Yes');

          // Cancel first time
          cy.get(PageAction.rfpResponsePage().deletaPackPopCancel).click();

          cy.get('.col-md-8 > .ng-star-inserted').wait(1000)
            .then(($span) => {
              var count = $span.text().trim();
              //cy.wrap(parseInt(count)).should('be.gt', 0)
              if (parseInt(count) > 0) {
                if (parseInt(count) > 10) {
                  cy.get(PageAction.rfpResponsePage().nextPage).should('not.be.disabled');
                }
                else
                  cy.get(`[data-automation="ooh-rfp-packages-table"] > ag-grid-angular > .ag-root-wrapper  
                  > .ag-root-wrapper-body > .ag-root > .ag-body-viewport > .ag-center-cols-clipper  
                  > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row`)
                    .should('have.length', count);
              }
            });

          cy.get('[row-index="0"] > .ag-cell > .icons > .rfp-container__body-table__actions-edit')
            .should('not.be.disabled');
          cy.get(`.rfp-container__body-table > ag-grid-angular > .ag-root-wrapper > .ag-root-wrapper-body > .ag-root 
                > .ag-body-viewport > .ag-pinned-right-cols-container > [row-index="0"] > .ag-cell > .icons > .trash`)
            .should('not.be.disabled');

          cy.get(`.rfp-container__body-table > ag-grid-angular > .ag-root-wrapper > .ag-root-wrapper-body > .ag-root 
                > .ag-body-viewport > .ag-pinned-right-cols-container > [row-index="0"] > .ag-cell > .icons > .trash`).click();

          cy.get('.popup-title').should('contain', 'Delete Pacakge');
          cy.get('[data-automation="popup_close"] > .icon > use')
            .should('not.be.disabled');

          cy.get('.popup-description').should('contain',
            'Are you sure want to delete selected package(s)? This action will delete the package and saving is not required');

          cy.get(PageAction.rfpResponsePage().deletaPackPopCancel)
            .should('not.be.disabled');
          cy.get(PageAction.rfpResponsePage().deletaPackPopCancel)
            .should('contain', 'Cancel');
          cy.get(PageAction.rfpResponsePage().deletaPackPopYes)
            .should('not.be.disabled');
          cy.get(PageAction.rfpResponsePage().deletaPackPopYes)
            .should('contain', 'Yes');

          cy.get(PageAction.rfpResponsePage().deletaPackPopYes).click();
        }
      });

    cy.get('.col-md-8 > .ng-star-inserted').wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        //cy.wrap(parseInt(count)).should('be.gte', count)
        if (parseInt(count) > 0) {
          if (parseInt(count) > 10) {
            cy.get(PageAction.rfpResponsePage().nextPage).should('not.be.disabled');
          }
          else
            cy.get(`[data-automation="ooh-rfp-packages-table"] > ag-grid-angular > .ag-root-wrapper  
                  > .ag-root-wrapper-body > .ag-root > .ag-body-viewport > .ag-center-cols-clipper  
                  > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row`)
              .should('have.length', count);
        }
      });

    //create package 3
    cy.get('.pkg-btn > .cad-button').should('not.be.disabled');
    cy.get('.pkg-btn > .cad-button').should('contain', 'Create Package');
    cy.get('.pkg-btn > .cad-button').click();

    cy.get('.rfp-container__header__holder__wrapper-title').should('contain', 'New Package');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(1) > .campaign-form__header > .title').should('contain', 'General Information');

    cy.get('.cad-panel > :nth-child(2) > :nth-child(1) > .title').should('contain', 'Type');
    cy.get(PageAction.rfpResponsePage().selectType).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().selectType).should('contain', 'Select Type');
    cy.get(PageAction.rfpResponsePage().selectType).click().wait(1000);
    cy.get('.cad-search__input').type(mediaType[2]).wait(1000);
    cy.get('.list-item').click();

    cy.get(':nth-child(2) > :nth-child(2) > .title').should('contain', 'Market');
    cy.get(PageAction.rfpResponsePage().selectMarket).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().selectMarket).should('contain', 'Select Market');
    cy.get(PageAction.rfpResponsePage().selectMarket).click().wait(1000);
    cy.get('.list-item__text').eq(2).click();

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(2) > :nth-child(3) > .title').should('contain', 'Size (Optional)');
    cy.get(PageAction.rfpResponsePage().packageSize).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSize).type('200"x100"').blur();
    cy.get(PageAction.rfpResponsePage().packageSize).should('have.value', '200"x100"');

    cy.get(':nth-child(3) > :nth-child(1) > .title').should('contain', 'Location Description');
    cy.get(PageAction.rfpResponsePage().locationDesc).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().locationDesc).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Location Description is required');
    cy.get(PageAction.rfpResponsePage().locationDesc).type('Location Description 3').blur();
    cy.get(PageAction.rfpResponsePage().locationDesc).should('have.value', 'Location Description 3');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(3) > :nth-child(2) > .title').should('contain', 'Rationale (Optional)');
    cy.get(PageAction.rfpResponsePage().rationale).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().rationale).type('Rationale 3').blur();
    cy.get(PageAction.rfpResponsePage().rationale).should('have.value', 'Rationale 3');

    cy.get(PageAction.rfpResponsePage().packageCancel).click();

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().leaveBtn).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().stayBtn).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().stayBtn).click();

    cy.get(':nth-child(5) > .campaign-form__header > .title').should('contain', 'Net Rates');

    cy.get(':nth-child(6) > :nth-child(1) > .title').should('contain', 'Units');
    cy.get(PageAction.rfpResponsePage().units).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().units).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Units is required');

    cy.get(PageAction.rfpResponsePage().units).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().units).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Units is required');

    cy.get(PageAction.rfpResponsePage().units).type('950').blur();
    cy.get(PageAction.rfpResponsePage().units).should('have.value', '950');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(6) > :nth-child(2) > .title').should('contain', 'Net Rate Card');
    cy.get(PageAction.rfpResponsePage().netRateCard).should('not.be.disabled');
    cy.get(`:nth-child(6) > :nth-child(2) > .field > cad-input-group > .cad-input-group 
    > .cad-input-group__label > .cad-input-group__addon > .cad-input-group__addon-icon`)
      .should('contain', '$');
    cy.get(PageAction.rfpResponsePage().netRateCard).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Rate Card is required');

    cy.get(PageAction.rfpResponsePage().netRateCard).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().netRateCard).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Rate Card is required');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(PageAction.rfpResponsePage().netRateCard).type('1750').blur();
    cy.get(PageAction.rfpResponsePage().netRateCard).should('have.value', '1,750.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(':nth-child(6) > :nth-child(3) > .title').should('contain', 'Net Negotiated Rate');
    cy.get(PageAction.rfpResponsePage().netNegoRate).should('not.be.disabled');
    cy.get(`:nth-child(3) > .field > cad-input-group > .cad-input-group > .cad-input-group__label 
    > .cad-input-group__addon > .cad-input-group__addon-icon`)
      .should('contain', '$');
    cy.get(PageAction.rfpResponsePage().netNegoRate).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Negotiated Rate is required');

    cy.get(PageAction.rfpResponsePage().netNegoRate).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().netNegoRate).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Negotiated Rate is required');

    cy.get(PageAction.rfpResponsePage().netNegoRate).type('1170').blur();
    cy.get(PageAction.rfpResponsePage().netNegoRate).should('have.value', '1,170.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(PageAction.rfpResponsePage().packageCancel).click();

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().leaveBtn).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().stayBtn).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().stayBtn).click();

    cy.get(':nth-child(4) > .mb-15').should('contain', '% Discount');
    cy.get(PageAction.rfpResponsePage().discount).should('contain', '33.14%');

    // cy.get(':nth-child(8) > .campaign-form__header > .title').should('contain', 'Flight Dates');
    // cy.get(':nth-child(9) > :nth-child(1) > .title').should('contain', 'Start Date');
    // cy.get(PageAction.rfpResponsePage().flightDateStart).should('not.be.disabled');
    // cy.get(`${PageAction.rfpResponsePage().flightDateStart} > div > cad-dropdown > div > div > div 
    // > div > .cad-datepicker__head > .cad-datepicker__input`)
    //   .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    // cy.get(PageAction.rfpResponsePage().flightDateStart).click();
    // cy.get('.rfp-container__body-message-error').should('contain', 'Start Date is required');
    // cy.get(`.cad-month-calendar__header__icon--right > cad-icon > .icon`).click();
    // cy.contains('12').click();
    // cy.get('.rfp-container__body-message-error').should('not.exist');

    // cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    // cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    // cy.get(':nth-child(9) > :nth-child(2) > .title').should('contain', 'End Date');
    // cy.get('.ng-tns-c25-7 > [cad-dropdown-head=""] > .cad-datepicker__head').should('not.be.disabled');
    // cy.get(`${PageAction.rfpResponsePage().flightDateEnd} > div > cad-dropdown > div > div > div 
    // > div > .cad-datepicker__head > .cad-datepicker__input`)
    //   .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    // cy.get(PageAction.rfpResponsePage().flightDateEnd).click();
    // cy.get('.rfp-container__body-message-error').should('contain', 'End Date is required');
    // cy.get(`.cad-month-calendar__header__icon--right > cad-icon > .icon`).click();
    // cy.contains('26').click();
    // cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(PageAction.rfpResponsePage().packageCancel).click();

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().leaveBtn).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().stayBtn).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().stayBtn).click();

    cy.get(':nth-child(11) > .campaign-form__header > .title').should('contain', 'Media Cost');
    cy.get(':nth-child(12) > :nth-child(1) > .title').should('contain', 'Cycle Type');
    cy.get(PageAction.rfpResponsePage().cycleType).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().cycleType).should('contain', 'Select Cycle Type');
    cy.get(PageAction.rfpResponsePage().cycleType).click();
    cy.get(':nth-child(3) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').click();

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(12) > :nth-child(2) > .title').should('contain', 'Number of Cycles');
    cy.get(PageAction.rfpResponsePage().NumberOfCycles).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().NumberOfCycles).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Number of Cycles is required');

    cy.get(PageAction.rfpResponsePage().NumberOfCycles).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().NumberOfCycles).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Number of Cycles is required');

    cy.get(PageAction.rfpResponsePage().NumberOfCycles).type('2.60').blur();
    cy.get(PageAction.rfpResponsePage().NumberOfCycles).should('have.value', '2.60');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(12) > :nth-child(3) > .mb-15').should('contain', 'Total Net Media Cost');
    cy.get(PageAction.rfpResponsePage().totalMediaCost).should('contain', '$3,042.00')

    cy.get(':nth-child(14) > .campaign-form__header > .title').should('contain', 'Program Cost');
    cy.get(':nth-child(15) > :nth-child(1) > .title').should('contain', 'Net Install');
    cy.get(PageAction.rfpResponsePage().netInstall).should('not.be.disabled');
    cy.get(`:nth-child(1) > .field > cad-input-group > .cad-input-group > .cad-input-group__label 
    > .cad-input-group__addon > .cad-input-group__addon-icon`).should('contain', '$');

    cy.get(PageAction.rfpResponsePage().netInstall).type('{del}{selectall}{backspace}').focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Install is required');

    cy.get(PageAction.rfpResponsePage().netInstall).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().netInstall).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Install is required');

    cy.get(PageAction.rfpResponsePage().netInstall).type('320').blur();
    cy.get(PageAction.rfpResponsePage().netInstall).should('have.value', '320.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(PageAction.rfpResponsePage().packageCancel).click();

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().leaveBtn).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().stayBtn).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().stayBtn).click();

    cy.get(':nth-child(15) > :nth-child(2) > .title').should('contain', 'Production (Only if forced)');
    cy.get(PageAction.rfpResponsePage().production).should('not.be.disabled');
    cy.get(`:nth-child(15) > :nth-child(2) > .field > cad-input-group > .cad-input-group 
    > .cad-input-group__label > .cad-input-group__addon > .cad-input-group__addon-icon`).should('contain', '$');

    cy.get(PageAction.rfpResponsePage().production).type('{del}{selectall}{backspace}').focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Production (Only if forced) is required');

    cy.get(PageAction.rfpResponsePage().production).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().production).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Production (Only if forced) is required');

    cy.get(PageAction.rfpResponsePage().production).type('270').blur();
    cy.get(PageAction.rfpResponsePage().production).should('have.value', '270.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(15) > :nth-child(3) > .mb-15').should('contain', 'Total Program Cost');
    cy.get(PageAction.rfpResponsePage().programCost).should('contain', '$3,632.00');

    // cy.get(':nth-child(17) > .campaign-form__header > .title').should('contain', 'Expires');
    // cy.get(':nth-child(18) > .campaign-form__element > .title').should('contain', 'Hold Expiration Date');
    // cy.get(PageAction.rfpResponsePage().holdExpireDate).should('not.be.disabled');
    // cy.get(`${PageAction.rfpResponsePage().holdExpireDate} .cad-datepicker__input`)
    //   .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    // cy.get(PageAction.rfpResponsePage().holdExpireDate).click();
    // // cy.get('.rfp-container__body-message-error').should('contain', 'End Date is required');
    // cy.get(`.cad-month-calendar__header__icon--right > cad-icon > .icon`).click();
    // cy.contains('16').click();

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(20) > .campaign-form__header > .title').should('contain', 'Methodology');

    cy.get(':nth-child(21) > :nth-child(1) > .title').should('contain', 'Illuminated');

    cy.get(PageAction.rfpResponsePage().illuminated).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().illumYes).should('contain', 'Yes');
    cy.get(PageAction.rfpResponsePage().illumYes)
      .should('be.visible')//.should('be.checked');

    cy.get(PageAction.rfpResponsePage().illumNo).should('contain', 'No');
    cy.get(PageAction.rfpResponsePage().illumNo)
      .should('be.visible').should('not.be.checked')
    //.click({ force: true })//.should('be.checked');

    cy.get(PageAction.rfpResponsePage().various).should('contain', 'Various');
    cy.get(PageAction.rfpResponsePage().various)
      .should('be.visible').should('not.be.checked');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(22) > :nth-child(1) > .title').should('contain', 'Universe: 18+ yrs Weekly Geopath Impressions');
    cy.get(PageAction.rfpResponsePage().Universe).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().Universe).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Universe: 18+ yrs Weekly Geopath Impressions is required');

    cy.get(PageAction.rfpResponsePage().Universe).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().Universe).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Universe: 18+ yrs Weekly Geopath Impressions is required');

    cy.get(PageAction.rfpResponsePage().Universe).type('1342356767').blur();
    cy.get(PageAction.rfpResponsePage().Universe).should('have.value', '1,342,356,767.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');
/* feature removed as enhancement
    cy.get(':nth-child(22) > :nth-child(2) > .title').should('contain', 'All: Adults by Age-Group - 18-49 yrs Weekly Geopath Impressions')
    cy.get(PageAction.rfpResponsePage().all).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().all).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'All: Adults by Age-Group - 18-49 yrs Weekly Geopath Impressions is required');

    cy.get(PageAction.rfpResponsePage().all).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().all).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'All: Adults by Age-Group - 18-49 yrs Weekly Geopath Impressions is required');

    cy.get(PageAction.rfpResponsePage().all).type('87634537568').blur();
    cy.get(PageAction.rfpResponsePage().all).should('have.value', '87,634,537,568.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');
*/
    cy.get(':nth-child(21) > :nth-child(2) > .title').should('contain', 'Methodology of Measurement');

    cy.get(PageAction.rfpResponsePage().geoPath).should('contain', 'Geopath');
    cy.get(PageAction.rfpResponsePage().geoPath)
      .should('be.visible')//.should('be.checked');

    cy.get(PageAction.rfpResponsePage().other).should('contain', 'Other');
    cy.get(PageAction.rfpResponsePage().other)
      .should('be.visible').should('not.be.checked')

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('be.disabled');

    cy.get(':nth-child(22) > :nth-child(3) > .title').should('contain', '(Target Demo) 4 Wk IMPs ');
    cy.get(PageAction.rfpResponsePage().TargetDemo).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().TargetDemo).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', '(Target Demo) 4 Wk IMPs is required');

    cy.get(PageAction.rfpResponsePage().TargetDemo).type('ABC').blur();
    cy.get(PageAction.rfpResponsePage().TargetDemo).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', '(Target Demo) 4 Wk IMPs is required');

    cy.get(PageAction.rfpResponsePage().TargetDemo).type('4654321654').blur();
    cy.get(PageAction.rfpResponsePage().TargetDemo).should('have.value', '4,654,321,654.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('not.be.disabled');

    cy.get(':nth-child(24) > .campaign-form__header > .title').should('contain', 'Comments');
    cy.get(PageAction.rfpResponsePage().comment).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().comment).type('sample test comment 3');
    cy.get(PageAction.rfpResponsePage().comment).should('have.value', 'sample test comment 3');

    cy.get('.rfp-response-packages-title').should('contain', 'Units');
    cy.get('.uploader > .title_2').should('contain', 'Drop your file here');

    cy.get(PageAction.rfpResponsePage().browse).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().browse).should('contain', 'Browse');

    cy.get('.title_6').should('contain', 'Supported file formats: .xls, .xlsx, .xlsm');
    cy.get('.mt-5').should('contain', 'Template (package-frames-template)');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('not.be.disabled');

    // cy.get(PageAction.rfpResponsePage().browse).click();

    // for (var i = 0; i < packUnits.length; i++) {
    //   const imageFixturePath = testDataPath + packUnits[i];
    //   cy.get('cad-button > input[type="file"]').attachFile(imageFixturePath).wait(8000)
    // }
    // cy.get('.cad-toast__title').should('contain', 'Proposal Unit(s) have been added.');

    // cy.get('[data-automation="cad-link"]').should('not.be.disabled');
    // cy.get('[data-automation="cad-link"]').should('contain', 'Import from File');

    // cy.get('.cad-search__input').should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().packageCancel).click();

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().leaveBtn).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().stayBtn).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().stayBtn).click();

    cy.get(PageAction.rfpResponsePage().packageCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().packageSave).click().wait(3000);

    cy.get('.cad-toast__title').should('contain', ' RFP Package successfully created')
      .wait(1000);

    cy.get('.col-md-8 > .ng-star-inserted').wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        //     cy.wrap(parseInt(count)).should('be.gt', 0)
        if (parseInt(count) > 0) {
          if (parseInt(count) > 10) {
            cy.get(PageAction.rfpResponsePage().nextPage).should('not.be.disabled');
          }
          else
            cy.get(`[data-automation="ooh-rfp-packages-table"] > ag-grid-angular > .ag-root-wrapper  
                 > .ag-root-wrapper-body > .ag-root > .ag-body-viewport > .ag-center-cols-clipper  
                 > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row`)
              .should('have.length', count);
        }
      });

    // Attachments  
    cy.get('.shared-attachment__header > .title_2').should('contain', 'Attachments')
    cy.get('.title_2 > .title')
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gte', 0)

        cy.get('.panel-head__beforecontent').should('contain', 'No Attachments');
        cy.get('.row > cad-button > .cad-button').should('not.be.disabled');
        cy.get('.row > cad-button > .cad-button').should('contain', 'Add Attachments');

        for (var i = 0; i < fileNamesUpload.length; i++) {
          const yourFixturePath = testDataPath + fileNamesUpload[i];
          if (i == 0)
            cy.get('.row > cad-button > .cad-button').click();
          else
            cy.get('.shared-attachment__header > .title_2 > cad-link.ng-star-inserted > .cad-link > .cad-link__text').click();

          cy.get("input[type='file']").last().attachFile(yourFixturePath).wait(1000);
          cy.get('.cad-toast__title').should('contain', 'Attachment added');
        }
      });

    cy.get('.title_2 > .title').wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        // cy.wrap(parseInt(count)).should('be.gte', 0)
        if (parseInt(count) > 0) {
          if (parseInt(count) > 5) {
            cy.get(`.shared-attachment__header-pag > cad-pagination.ng-star-inserted > .cad-pagination 
            > [data-automation="cad-pagination__btn_next"]`).should('not.be.disabled');
          }
          else
            cy.get('.title_2 > .title').should('have.length', count);
        }
      });

    cy.get(':nth-child(5) > .rfp-container__body-title').should('contain', 'Comments');
    cy.get('.rfp-container__body__sections__section-white-wrapper > .ng-valid')
      .should('have.attr', 'placeholder', 'Maximum limit: 4000 Characters')
    cy.get('.rfp-container__body__sections__section-white-wrapper').should('not.be.disabled');
    cy.get('.maxCharsLabel').should('contain', '4000 Characters left');

    cy.get('.rfp-container__body__sections__section-white-wrapper').type("sample comment to response");

    cy.get('.maxCharsLabel').should('contain', '3974 Characters left');

    cy.get(PageAction.rfpResponsePage().footerCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().footerSave).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().footerSendResponse).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().footerSave).click();

    cy.get('.cad-toast__title').should('contain', 'Save as draft');

    // cy.get('.cad-status__text').should('contain', 'Proposal Started');

    // cy.get(PageAction.rfpResponsePage().btnDecline).should('not.be.disabled');
    // cy.get(PageAction.rfpResponsePage().btnDecline).should('contain', 'Decline');
    // cy.get(PageAction.rfpResponsePage().btnSendRFP).should('not.be.disabled');
    // cy.get(PageAction.rfpResponsePage().btnSendRFP).should('contain', 'Add Response');

    // cy.get(PageAction.rfpResponsePage().btnSendRFP).click();

    cy.get(PageAction.rfpResponsePage().footerCancel).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().footerSave).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().footerSendResponse).should('not.be.disabled');

    cy.get(PageAction.rfpResponsePage().footerSendResponse).click();

    cy.get('.popup-title').should('contain', 'Send Response');
    cy.get('[data-automation="popup_close"] > .icon > use')
      .should('not.be.disabled');

    cy.get('.popup-description').should('contain',
      'Are you sure that you want to send the response? After sending, you will be able to edit it only if the planner changes RFP');

    cy.get(PageAction.rfpResponsePage().deletaPackPopCancel)
      .should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().deletaPackPopCancel)
      .should('contain', 'Cancel');
    cy.get(PageAction.rfpResponsePage().deletaPackPopYes)
      .should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().deletaPackPopYes)
      .should('contain', 'Send');

    cy.get(PageAction.rfpResponsePage().deletaPackPopYes).click();

    // cy.get('.cad-toast__title').should('contain', 'Proposal Unit(s) have been submitted.');
    cy.get('.cad-toast__title').should('contain', 'Proposal Sent');

    cy.get(PageAction.rfpResponsePage().btnDecline).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().btnDecline).should('contain', 'Decline');
    cy.get(PageAction.rfpResponsePage().viewResponse).eq(4).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().viewResponse).eq(4).should('contain', 'View Response');
    cy.get(PageAction.rfpResponsePage().btnSendRFP).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().btnSendRFP).should('contain', 'Add Response');

    cy.get('.cad-status__text').should('contain', 'Proposal Sent');

    cy.get(PageAction.rfpResponsePage().viewResponse).eq(4).click();
    cy.get(PageAction.rfpResponsePage().viewRFP).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().viewRFP).should('contain', 'View Rfp');

    cy.get(PageAction.rfpResponsePage().viewRFP).click();

    cy.get(PageAction.rfpResponsePage().btnDecline).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().btnDecline).should('contain', 'Decline');
    cy.get(PageAction.rfpResponsePage().viewResponse).eq(4).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().viewResponse).eq(4).should('contain', 'View Response');
    cy.get(PageAction.rfpResponsePage().btnSendRFP).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().btnSendRFP).should('contain', 'Add Response');

  })

});
