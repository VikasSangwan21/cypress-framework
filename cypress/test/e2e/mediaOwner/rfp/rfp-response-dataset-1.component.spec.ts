import { PageAction } from '../../../../support/PageAction';
import { equal } from 'assert';
import { config } from 'cypress/types/bluebird';
import 'cypress-file-upload';
import { parse } from 'path';
import { eq, isInteger, toPairs } from 'cypress/types/lodash';
import { contains } from 'cypress/types/jquery';
import { integer } from 'aws-sdk/clients/cloudfront';
import { exit } from 'process';
import { ScrollToTopComponent } from '@kinesso/ui-core';


const rfpResponsePage = PageAction.rfpResponsePage()
let epicName = 'RFP Response';
let featureName = 'Response to Dataset 1 RFP\'s';
let tag = '';

let Objective: string[] = [];
let Agency: string[] = [];
let Client: string[] = [];
let mo: string[] = [];
let loopCount: any;
let campaignName: string = "";
let dupcampaignName = '';
let testDataPath = '';
let fileNamesUpload: string[] = [];
let imageName: string[] = [];
let mediaType: string[] = [];
let importFromFile: string[] = [];
let addByID: string[] = [];
let packUnits: string[] = [];
let faces: string[] = [];
let mandColumns: string[] = []
let packMandColumns: string[] = []
let packNonMandColumnsEditable: string[] = []
let optColumns: string[] = []
let customColumns: string[] = [];
let multi_Client: string = "multi_Client";
let validimg: string = "";
let inValidimg: string = "";

let index = -2;

describe(featureName, () => {

  before(function () {
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
      faces = config.faces;
      mandColumns = config.mandColumns;
      packMandColumns = config.packMandColumns;
      packNonMandColumnsEditable = config.packNonMandColumnsEditable;
      optColumns = config.optColumns;
      validimg = config.validimg;
      inValidimg = config.inValidimg;
    })
    cy.fixture('ooh/campaigns/campaign_config.json').then((config) => {
      campaignName = config.campaignName[0].name;
    })
  })

  beforeEach(() => {
    Report.testDetails(epicName, featureName, tag);

    cy.loginAsMoClearChannelUS();

    cy.get('.global-links > .title').should('contain', 'RFPs')
      .wait(3000);
    // cy.get('.ooh-rfp > :nth-child(1)').should('contain', 'RFPs')

    cy.get('.icon-search > .icon-search').click();
    cy.get('.cad-search-global__input').type(campaignName)
      .wait(1000);

    cy.get(rfpResponsePage.campaignName).should('contain', campaignName);
    cy.get(rfpResponsePage.clientname).should('contain', Client[6]);
    // cy.get(rfpResponsePage.viewResopnse).should('not.be.disabled');

    cy.get(':nth-child(1) > .table__col-120 > .rfp-table__rfp-title')
      .contains(campaignName).click().wait(2000);
    // cy.get('.cad-status__text').should('contain', 'RFP Viewed')

    cy.get(rfpResponsePage.btnDecline).should('not.be.disabled');
    cy.get(rfpResponsePage.btnDecline).should('contain', 'Decline');
    cy.get(rfpResponsePage.btnSendRFP).eq(1).should('not.be.disabled');
    cy.get(rfpResponsePage.btnSendRFP).eq(1).should('contain', 'Add Response');

    cy.get('.campaign-container__title--holder > .title').should('contain', campaignName);
    // cy.get('.cad-status__text').should('contain', 'RFP Accepted')

  });

  it('E2E Data Set 1 - View RFP Basic and Inventory details', () => {
    var shortMonth = new Date();
    shortMonth.setMonth(shortMonth.getMonth() + 1);
    let month = shortMonth.toLocaleString('en-us', { month: 'short' });

    cy.get('.campaign-container__backBtn > .cad-button').should('not.be.disabled');
    cy.get(rfpResponsePage.toggle).should('contain', 'Basic Details').should('contain', 'Inventory')

    cy.get('campaign-detail-basic.ng-star-inserted > :nth-child(1) > .col-md-12 > .title').should('contain', 'General Information')

    cy.get(':nth-child(2) > :nth-child(1) > .campaign-container__element > .campaign-container__element__label')
      .should('contain', 'Objective')
    cy.get(rfpResponsePage.object).should('contain', Objective[5]);

    cy.get(rfpResponsePage.agency).should('contain', Agency[5]);
    cy.get(':nth-child(2) > :nth-child(2) > .campaign-container__element > .campaign-container__element__label')
      .should('contain', 'Agency')

    cy.get(':nth-child(3) > .campaign-container__element > .campaign-container__element__label')
      .should('contain', 'Client')
    cy.get(rfpResponsePage.client).should('contain', Client[6]);

    cy.get(':nth-child(3) > :nth-child(1) > .campaign-container__element > .campaign-container__element__label')
      .should('contain', 'Budget')
    cy.get(rfpResponsePage.budget).should('contain', '$500,000.00')

    cy.get(':nth-child(3) > :nth-child(2) > .campaign-container__element > .campaign-container__element__label')
      .should('contain', 'Campaign Dates')
    cy.get(':nth-child(3) > :nth-child(2) > .campaign-container__element > .campaign-container__element__text')
      .should('contain', month + ' 12, 2022 - ' + month + ' 27, 2022')

    cy.get(':nth-child(4) > .campaign-container__element > .campaign-container__element__label')
      .should('contain', 'Campaign Description')
    cy.get(':nth-child(4) > .campaign-container__element > .campaign-container__element__text')
      .should('contain', campaignName)

    cy.get('.content-market-table__pl-0').should('contain', 'Washington, DC (Hagerstown, MD)')
    cy.get('.content-market-table__tr > :nth-child(2)').should('contain', 'DMA')
    cy.get('.content-market-table__tr > :nth-child(3) > .ng-star-inserted').should('contain', month + ' 12, 2022')
    cy.get(':nth-child(4) > .ng-star-inserted').should('contain', month + ' 27, 2022');

    cy.get('.content-market-table__pl-0').should('contain', 'Los Angeles, CA')
    cy.get('.content-market-table__tr > :nth-child(2)').should('contain', 'DMA')
    cy.get('.content-market-table__tr > :nth-child(3) > .ng-star-inserted').should('contain', month + ' 12, 2022')
    cy.get(':nth-child(4) > .ng-star-inserted').should('contain', month + ' 27, 2022');

    cy.get('.campaign-market-view__header > .title > :nth-child(1)').should('contain', 'Markets');
    cy.get('.content-count')
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gte', 0)
        if (parseInt(count) > 0) {
          cy.get('.table > tbody').find('tr').should('have.length', count);
        }
      });

    cy.get('.col-md-8 > .title').should('contain', 'Demographics');
    cy.get('.mb-20 > :nth-child(1) > .campaign-container__element__label').should('contain', 'Primary Audience');
    cy.get('.mb-20 > :nth-child(1) > .campaign-container__element__text').should('contain', 'Adults 18-24');

    cy.get(':nth-child(2) > .campaign-container__element__label').should('contain', 'Secondary Audience');
    cy.get(':nth-child(2) > .campaign-container__element__text').should('contain', campaignName);

    cy.get('.shared-attachment__header').should('contain', 'Attachments');
    cy.get('.title_2 > .title')
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gte', 0)
        if (parseInt(count) > 5)
          cy.get(rfpResponsePage.nextPage).should('not.be.disabled');
      });
    cy.get(rfpResponsePage.download).should('not.be.disabled');

    cy.get(':nth-child(12) > .campaign-container__element > .title').should('contain', 'Comment')
    // cy.get(':nth-child(12) > .campaign-container__element > .campaign-container__element__text')
    //   .should('contain', campaignName);

    //Inventory
    cy.get('[value="Inventory"] > .button-toggle > a').should('contain', 'Inventory').click().wait(1000);
    cy.get(rfpResponsePage.viewInMap).should('not.be.disabled');
    cy.get(rfpResponsePage.viewInMap).should('contain', 'VIEW IN MAP');

    cy.get('.campaign-container__media-formatwrap > .panel-head__text').should('contain', 'Media Formats')
    cy.get(rfpResponsePage.mediaFormatCount)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gte', 0)
        if (parseInt(count) > 0) {
          cy.get(rfpResponsePage.mediaFormatRow).should('have.length', count);
        }
      });

    cy.get('section.ng-star-inserted > :nth-child(1) > .panel-head__text').should('contain', 'Units').wait(1000);
    cy.get(rfpResponsePage.invUnitsCount)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gte', 0)
        if (parseInt(count) > 0) {

          var pages = (parseInt(count) / 10).toString().split('.')[0].trim()
          var rows = (parseInt(count) / 10).toString().split('.')[1].trim()

          if (parseInt(count) > 10)
            cy.get(rfpResponsePage.nextPage).first().should('not.be.disabled');

          for (var i = 0; i < parseInt(pages); i++)
            cy.get(rfpResponsePage.nextPage).first().click().wait(2000)

          cy.get(rfpResponsePage.unitsRow).should('have.length', rows);
        }
      });

    cy.get(rfpResponsePage.poiTitle).should('contain', 'Points of Interest');
    cy.get(rfpResponsePage.poiCount)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gte', 0)
        if (parseInt(count) > 0) {
          var pages = (parseInt(count) / 10).toString().split('.')[0].trim()
          var rows = (parseInt(count) / 10).toString().split('.')[1].trim()

          if (parseInt(count) > 10)
            cy.get(rfpResponsePage.nextPage).last().should('not.be.disabled');

          for (var i = 0; i < parseInt(pages); i++)
            cy.get(rfpResponsePage.nextPage).last().click()

          cy.get(rfpResponsePage.poiRow).should('have.length', rows);
        }
      });

  })

  it('E2E Data Set 1 - Add Response by ID', () => {
    cy.get(rfpResponsePage.btnDecline)
      .should('not.be.disabled')
      .should('contain', 'Decline');
    cy.get(rfpResponsePage.btnSendRFP).eq(1)
      .should('not.be.disabled')
      .should('contain', 'Add Response')
      .click().wait(1000);

    // cy.get('.cad-status__text').should('contain', 'Proposal Started');

    cy.get('.rfp-container__header-back > .cad-button').should('not.be.disabled');
    cy.get('.rfp-container__header__holder__wrapper-title').should('contain', 'Response to ' + campaignName);

    cy.get(rfpResponsePage.headerCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.headerSave).should('not.be.disabled');
    cy.get(rfpResponsePage.headerSendResponse).should('be.disabled');

    cy.get(rfpResponsePage.cancel).should('not.be.disabled');
    cy.get(rfpResponsePage.save).should('not.be.disabled');
    cy.get(rfpResponsePage.sendResponse).should('be.disabled');

    cy.get('.rfp-container__sticky-breadcrumb-title').should('contain', 'Response to ' + campaignName);

    cy.get('rfp-response-frames > .rfp-container__body-title').should('contain', 'Units');
    cy.get(rfpResponsePage.responseUnitsCount).wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        assert.equal(parseInt(count), 0, 'units count should be 0')
      });

    cy.get('.col-md-8 > .ng-star-inserted').wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        //     cy.wrap(parseInt(count)).should('be.gte', 0)
        if (parseInt(count) <= 10) {
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

    cy.get(rfpResponsePage.addByID)
      .should('not.be.disabled');

    cy.get(rfpResponsePage.importFromFile)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.importFromFile)
      .should('contain', 'Import from File');

    cy.get(rfpResponsePage.downloadTemplate)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.downloadTemplate)
      .should('contain', 'Download Template');

    // cy.get(rfpResponsePage.responseFilterResults).should('not.be.disabled');

    cy.get('.pkg-btn > .cad-button')
      .should('not.be.disabled');
    cy.get('.pkg-btn > .cad-button')
      .should('contain', 'Create Package');

    cy.get('.shared-attachment__header > .title_2')
      .should('contain', 'Attachments')
    cy.get('.title_2 > .title')
      .then(($span) => {
        var count = $span.text().trim();
        assert.equal(parseInt(count), 0, 'Attachments count should be 0');
      });

    cy.get('.panel-head__beforecontent')
      .should('contain', 'No Attachments');
    cy.get('.row > cad-button > .cad-button')
      .should('not.be.disabled');
    cy.get('.row > cad-button > .cad-button')
      .should('contain', 'Add Attachments');

    //// cy.get('.title_2 > cad-link.ng-star-inserted > .cad-link').should('not.be.disabled');

    cy.get(':nth-child(5) > .rfp-container__body-title').should('contain', 'Comments');
    cy.get('.rfp-container__body__sections__section-white-wrapper > .ng-valid')
      .should('have.attr', 'placeholder', 'Maximum limit: 4000 Characters')
    cy.get('.rfp-container__body__sections__section-white-wrapper').should('not.be.disabled');
    cy.get('.maxCharsLabel').should('contain', '4000 Characters left');

    cy.get(rfpResponsePage.footerCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.footerSave).should('not.be.disabled');
    cy.get(rfpResponsePage.footerSendResponse).should('be.disabled');

    //Add units by ID
    cy.get(rfpResponsePage.downloadUnits)
      .should('contain', ' Download Units ')
      .should('not.be.enabled');
    cy.get(rfpResponsePage.deleteAll)
      .should('contain', ' Delete All ')
      .should('not.be.enabled');

    cy.get(rfpResponsePage.addByID)
      .click();
    cy.get('[data-automation="popup_close"] > .icon')
      .should('not.be.disabled');
    cy.get('.response__list__modal__header')
      .should('contain', 'Add by ID');
    cy.get(rfpResponsePage.addByIdSearch)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.addByIdSearch)
      .should('have.attr', 'placeholder', 'Search by Unit ID or Geopath ID');

    cy.get(rfpResponsePage.addByIdSearch)
      .type(addByID[0]);
    cy.get(rfpResponsePage.addByIdSearchBtn)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.addByIdSearchBtn)
      .click().wait(1000);

    cy.get(rfpResponsePage.copyErrors)
      .should('contain', 'Copy All Error Ids')
      .should('not.be.disabled');

    cy.get(rfpResponsePage.addByIDErrorTitle)
      .should('contain', 'IDs Not Found (1):');

    cy.get(rfpResponsePage.addByIDErrorList)
      .should('contain', 'abc123xyz');

    let idsLen: string[] = addByID[0].split(',');
    if (idsLen.length <= 10) {
      cy.get('.response__list__modal__body > .ng-star-inserted > tbody').find('tr').should('have.length', (idsLen.length - 1));
    }
    if (idsLen.length > 0) {
      for (var i = 1; i <= idsLen.length - 1; i++) {
        cy.get(':nth-child(' + i + ') > :nth-child(6) > cad-link > .cad-link')
          .should('not.be.disabled')
          .click();
      }
    }

    cy.get(rfpResponsePage.addByIdDone).click();

    //validate units count
    cy.get(rfpResponsePage.responseUnitsCount).wait(1000)
      .then(($span) => {
        var Unitscount = $span.text().trim();
        cy.wrap(parseInt(Unitscount)).should('be.gt', 0)

        if (parseInt(Unitscount) <= 10)
          cy.get('.ag-pinned-left-cols-container > .ag-row').should('have.length', parseInt(Unitscount));

        if (parseInt(Unitscount) > 0) {
          cy.get(rfpResponsePage.deleteAll)
            .should('contain', ' Delete All ')
            .should('not.be.disabled');

          cy.get(rfpResponsePage.downloadUnits)
            .should('contain', ' Download Units ')
            .should('not.be.disabled')
            .click().wait(500);

          cy.get('.cad-toast').should('contain', 'Proposal units downloaded')
        }
      });

    //validate package count
    cy.get('.col-md-8 > .ng-star-inserted').wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        //cy.wrap(parseInt(count)).should('be.gte', 0)
        if (parseInt(count) > 0) {

          cy.get(`[data-automation="ooh-rfp-packages-table"] > ag-grid-angular > .ag-root-wrapper  
                    > .ag-root-wrapper-body > .ag-root > .ag-body-viewport > .ag-center-cols-clipper  
                    > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row`)
            .should('have.length', count);
        }
      });

    cy.get(rfpResponsePage.headerCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.headerSave).should('not.be.disabled');
    cy.get(rfpResponsePage.headerSendResponse).should('not.be.disabled');

    cy.get(rfpResponsePage.headerSave).click();

    cy.get('.rfp-container__body__sections__section-error')
      .should('contain', 'The row(s) with unit Id highlighted in red have error(s). Scroll right to identify the error(s) and apply the fix.');

    cy.get(rfpResponsePage.statusMessage).should('contain', 'Proposal Unit(s) have missing required field(s)');
    cy.get(rfpResponsePage.collapsableErrors).should('contain', 'Multiple Errors: Expand to see all errors.');
    cy.get(rfpResponsePage.expandErrors).click();
    cy.get(rfpResponsePage.errorlist).should('contain', 'Start Date is required for Unit ID ');
    cy.get(rfpResponsePage.errorlist).should('contain', 'End Date is required for Unit ID ');
    cy.get(rfpResponsePage.errorlist).should('contain', 'Cycle Type is required for Unit ID ');
   // cy.get(rfpResponsePage.errorlist).should('contain', 'Unit Image is required for Unit ID ');

    cy.get('.pkg-btn > .cad-button').should('not.be.disabled');
    cy.get('.pkg-btn > .cad-button').click();

    cy.get('.unsaved-popup__title')
      .should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(2)')
      .should('contain', 'You have unsaved changes on this page.')
    cy.get('.unsaved-popup__text > :nth-child(1)')
      .should('contain', 'Are you sure you want to leave this page?')

    cy.get('cad-modal-content-pure > :nth-child(1) > cad-icon.ng-star-inserted > .icon').should('not.be.disabled');
    cy.get(rfpResponsePage.leaveBtn).should('not.be.disabled');
    cy.get(rfpResponsePage.stayBtn).should('not.be.disabled');

    cy.get(rfpResponsePage.stayBtn).click();

    for (var i = 0; i < 5; i++) {
      if (i < 3) {
        cy.get('[row-index="' + i + '"] > [col-id=' + mandColumns[0] + ']').eq(0).should('have.class', 'invalidCell');
//        cy.get('[row-index="' + i + '"] > .ag-cell > .icons > .img')
//         .should('have.attr', 'src', inValidimg[0])
      } else {
        cy.get('[row-index="' + i + '"] > [col-id=' + mandColumns[0] + ']').eq(0).should('have.class', 'ag-cell-value');
//        cy.get('[row-index="' + i + '"] > .ag-cell > .icons > .img')
//          .should('have.attr', 'src', validimg[0])
      }

      for (var c = 2; c < mandColumns.length; c++) {
        cy.get('[row-index="' + i + '"] > [col-id=' + mandColumns[c] + ']').eq(0).should('have.class', 'invalidCell');
      }
    }

    let splString = 'asdfghjklPOIUYTREWQ~!@#,\'$%^&*()_+|}{":?><\/1234567890'
/*    for (var i = 0; i < 5; i++) {
      if (i == 0) {
        cy.get('[row-index="' + i + '"] > [col-id="startDate"]').click().type(splString.substring(0, 10)).focus().blur();
        cy.get('[row-index="' + i + '"] > [col-id="startDate"]').should('contain', splString.substring(0, 10));

        cy.get('[row-index="' + i + '"] > [col-id="endDate"]').click().type(splString.substring(22, 35)).focus().blur();
        cy.get('[row-index="' + i + '"] > [col-id="endDate"]').should('contain', splString.substring(22, 35));

        cy.get('[row-index="' + i + '"] > [col-id="cycleType"]').click().type(splString.substring(6, 14)).focus().blur();
        cy.get('[row-index="' + i + '"] > [col-id="cycleType"]').should('contain', splString.substring(6, 14));
      }
      else {
        cy.get('[row-index="' + i + '"] > [col-id="startDate"]').click().type(splString.substring((i * 6), ((i * 2) * 6))).focus().blur();
        cy.get('[row-index="' + i + '"] > [col-id="startDate"]').should('contain', splString.substring((i * 6), ((i * 2) * 6)));

        cy.get('[row-index="' + i + '"] > [col-id="endDate"]').click().type(splString.substring((i * 3), ((i * 3) * 6))).focus().blur();
        cy.get('[row-index="' + i + '"] > [col-id="endDate"]').should('contain', splString.substring((i * 3), ((i * 3) * 6)));

        cy.get('[row-index="' + i + '"] > [col-id="cycleType"]').click().type(splString.substring((i * 10), (i * 4))).focus().blur();
        cy.get('[row-index="' + i + '"] > [col-id="cycleType"]').should('contain', splString.substring((i * 10), (i * 4)));
      }
    }
*/

    
  rfpResponsePage.enterRequiredFileds(5, splString);
/*
    for (var i = 0; i < 5; i++) {
      if (i < 3) {
        cy.get('[row-index="' + (i) + '"] > .ag-cell > .icons > .img').click();
        cy.get('.response__header').should('contain', 'Pictures')
        cy.get('body').then((body) => {
          if (body.find('img.ng-star-inserted').length > 0) {
            cy.get('.response__body > cad-icon.ng-star-inserted > .icon').click();
          }
        });

        cy.get('[row-index="' + i + '"] > .ag-cell > .icons > .img')
          .should('have.attr', 'src', inValidimg[0])
        cy.get('[row-index="' + i + '"] > [col-id=' + mandColumns[0] + ']').eq(0).should('have.class', 'invalidCell');

        cy.get('.uploader > .title_2').should('contain', 'Drop your picture here');
        cy.get('.title_6').should('contain', 'Only .jpg or .png files less than 5 MB are allowed.')

        cy.get('cad-modal-content > :nth-child(1) > cad-icon.ng-star-inserted > .icon')
          .should('not.be.disabled');
        cy.get(rfpResponsePage.imgBrowseBtn).should('not.be.disabled');
        cy.get(rfpResponsePage.imgDoneBtn).should('not.be.disabled');

        cy.get(rfpResponsePage.imgBrowseBtn).should('contain', 'Browse');
        cy.get(rfpResponsePage.imgDoneBtn).should('contain', 'Close');

        const imageFixturePath = testDataPath + imageName[parseInt(i.toString().substr(i.toString().length - 1))];
        cy.get('cad-button > input[type="file"]').attachFile(imageFixturePath).wait(1000)

        cy.get(rfpResponsePage.imgDoneBtn).should('not.be.disabled');
        cy.get(rfpResponsePage.imgDoneBtn).should('contain', 'Done')
        cy.get(rfpResponsePage.imgDoneBtn).click()

        cy.get('[row-index="' + i + '"] > [col-id=' + mandColumns[0] + ']').eq(0).should('have.class', 'ag-cell-value');
        cy.get('[row-index="' + i + '"] > .ag-cell > .icons > .img').should('have.attr', 'src', validimg[0])
      }
      else {
        cy.get('[row-index="' + i + '"] > [col-id=' + mandColumns[0] + ']').eq(0).should('have.class', 'ag-cell-value');
        cy.get('[row-index="' + i + '"] > .ag-cell > .icons > .img').should('have.attr', 'src', validimg[0])
      }
    }

    cy.get(rfpResponsePage.headerCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.headerSave).should('not.be.disabled');
    cy.get(rfpResponsePage.headerSendResponse).should('not.be.disabled');
*/
    cy.get(rfpResponsePage.headerSave).click().wait(3000);

    cy.get('.cad-toast__title').should('contain', 'Saved as draft');
    cy.get(':nth-child(1) > .cad-toast').should('contain', 'Proposal Unit(s) have been saved');

    //validate units count
    cy.get(rfpResponsePage.unitsCount).wait(1000)
      .then(($span) => {
        var Unitscount = $span.text().trim();
        cy.wrap(parseInt(Unitscount)).should('be.gt', 0)

        if (parseInt(Unitscount) <= 10)
          cy.get('.ag-pinned-left-cols-container > .ag-row').should('have.length', parseInt(Unitscount));

        if (parseInt(Unitscount) > 0) {
          cy.get(rfpResponsePage.deleteAll)
            .should('contain', ' Delete All ')
            .should('not.be.disabled');

          cy.get(rfpResponsePage.downloadUnits)
            .should('contain', ' Download Units ')
            .should('not.be.disabled')
            .click().wait(500);

          cy.get('.cad-toast').should('contain', 'Proposal units downloaded')
        }
      });

  })

  it('E2E Data Set 1 - Add Response Import from file', () => {
    cy.get(rfpResponsePage.btnDecline)
      .should('not.be.disabled')
      .should('contain', 'Decline');
    cy.get(rfpResponsePage.btnSendRFP).eq(1)
      .should('not.be.disabled')
      .should('contain', 'Add Response')
      .click().wait(1000);

    cy.get('.rfp-container__body__sections__section__search-message')
      .should('contain', 'You can download a template and browse uploaded files below.');

    //validate units count
    cy.get(rfpResponsePage.responseUnitsCount).wait(1000)
      .then(($span) => {
        var Unitscount = $span.text().trim();

        if (parseInt(Unitscount) <= 10)
          cy.get('.ag-pinned-left-cols-container > .ag-row').should('have.length', parseInt(Unitscount));

        if (parseInt(Unitscount) > 0) {
          cy.wrap(parseInt(Unitscount)).should('be.gt', 0)

          cy.get(rfpResponsePage.deleteAll)
            .should('contain', ' Delete All ')
            .should('not.be.disabled');

          cy.get(rfpResponsePage.downloadUnits)
            .should('contain', ' Download Units ')
            .should('not.be.disabled')
        }
        else {
          cy.wrap(parseInt(Unitscount)).should('not.be.gt', 0)

          cy.get('.rfp-container__body__sections__section-none-title')
            .should('contain', 'No units');

          cy.get(rfpResponsePage.deleteAll)
            .should('contain', ' Delete All ')
            .should('not.be.enabled');

          cy.get(rfpResponsePage.downloadUnits)
            .should('contain', ' Download Units ')
            .should('not.be.enabled')
        }
      });

    cy.get(rfpResponsePage.addByID).should('not.be.disabled');

    cy.get(rfpResponsePage.importFromFile).should('not.be.disabled');
    cy.get(rfpResponsePage.importFromFile).should('contain', 'Import from File');

    cy.get(rfpResponsePage.downloadTemplate).should('not.be.disabled');
    cy.get(rfpResponsePage.downloadTemplate).should('contain', 'Download Template');

    //import units from file
    const yourFixturePath = testDataPath + importFromFile[0];
    cy.fixture(yourFixturePath, 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then(fileContent => {
        cy.get("input[type='file']").attachFile({
          fileContent,
          fileName: importFromFile[0],
          mimeType: 'application/vnd.ms-excel.sheet.macroEnabled.12',
          encoding: 'utf-8',
          filePath: yourFixturePath
        });
      }).wait(1000);


    cy.get('.cad-toast__title').should('contain', 'Following Geopath Id does not exist:');
    cy.get(':nth-child(1) > .cad-toast > .cad-toast__actions > .cad-toast__button').click();
    cy.get('.cad-toast__title').should('contain', 'Geopath Id is missing for 1 audited unit(s), hence not imported.');
    cy.get('.cad-toast__button').eq(1).click();
    cy.get('.cad-toast__title').should('contain', 'proposal unit(s) have been added');

    // Uploaded Template is Incorrect
    const yourFixturePath1 = testDataPath + importFromFile[1];
    cy.fixture(yourFixturePath1, 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then(fileContent => {
        cy.get("input[type='file']").attachFile({
          fileContent,
          fileName: importFromFile[0],
          mimeType: 'application/vnd.ms-excel.sheet.macroEnabled.12',
          encoding: 'utf-8',
          filePath: yourFixturePath
        });
      }).wait(1000);

    cy.get('.cad-toast__title').should('contain', 'Uploaded Template is Incorrect');
    cy.get(':nth-child(1) > .cad-toast > .cad-toast__actions > .cad-toast__button').click();

    cy.get(rfpResponsePage.headerCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.headerSave).should('not.be.disabled');
    cy.get(rfpResponsePage.headerSendResponse).should('not.be.disabled');

    //validate units count
    cy.get(rfpResponsePage.responseUnitsCount).wait(1000)
      .then(($span) => {
        var Unitscount = $span.text().trim();
        cy.wrap(parseInt(Unitscount)).should('be.gt', 0)

        if (parseInt(Unitscount) <= 10)
          cy.get('.ag-pinned-left-cols-container > .ag-row').should('have.length', parseInt(Unitscount));

        if (parseInt(Unitscount) > 0) {
          cy.get(rfpResponsePage.deleteAll)
            .should('contain', ' Delete All ')
            .should('not.be.disabled');

          cy.get(rfpResponsePage.downloadUnits)
            .should('contain', ' Download Units ')
            .should('not.be.disabled')
            .click().wait(500);

          cy.get('.cad-toast').should('contain', 'Proposal units downloaded')
        }
      });

    cy.get(rfpResponsePage.headerSave).click().wait(90000);

    cy.get('.rfp-container__body__sections__section-error')
      .should('contain', 'The row(s) with unit Id highlighted in red have error(s). Scroll right to identify the error(s) and apply the fix.');

    cy.get(rfpResponsePage.statusMessage).should('contain', 'Proposal Unit(s) have missing required field(s)');
    cy.get(rfpResponsePage.collapsableErrors).should('contain', 'Multiple Errors: Expand to see all errors.');
    cy.get(rfpResponsePage.expandErrors).click();
/*    cy.get(rfpResponsePage.errorlist).should('contain', 'Unit Image is required for Unit ID ');

    //add images to required fields to save 
    for (var i = 0; i < 10; i++) {

      cy.get('[row-index="' + (i) + '"] > .ag-cell > .icons > .img').click();
      cy.get('.response__header').should('contain', 'Pictures')

      cy.get('body').then((body) => {
        if (body.find('img.ng-star-inserted').length > 0) {
          cy.get('.response__body > cad-icon.ng-star-inserted > .icon').click();
        }
      });

      if (i < 5) {
        cy.get('[row-index="' + i + '"] > .ag-cell > .icons > .img')
          .should('have.attr', 'src', inValidimg[0])
        cy.get('[row-index="' + i + '"] > [col-id=' + mandColumns[0] + ']').eq(0).should('have.class', 'invalidCell');

        cy.get('.uploader > .title_2').should('contain', 'Drop your picture here');
        cy.get('.title_6').should('contain', 'Only .jpg or .png files less than 5 MB are allowed.')

        cy.get('cad-modal-content > :nth-child(1) > cad-icon.ng-star-inserted > .icon')
          .should('not.be.disabled');
        cy.get(rfpResponsePage.imgBrowseBtn).should('not.be.disabled');
        cy.get(rfpResponsePage.imgDoneBtn).should('not.be.disabled');

        cy.get(rfpResponsePage.imgBrowseBtn).should('contain', 'Browse');
        cy.get(rfpResponsePage.imgDoneBtn).should('contain', 'Close');
      }
      else {
        cy.get('[row-index="' + i + '"] > .ag-cell > .icons > .img').should
          ('have.attr', 'src', validimg[0])
        cy.get('[row-index="' + i + '"] > [col-id=' + mandColumns[0] + ']').eq(0).should('have.class', 'ag-cell-value');
      }

      const imageFixturePath = testDataPath + imageName[parseInt(i.toString().substr(i.toString().length - 1))];
      cy.get('cad-button > input[type="file"]').attachFile(imageFixturePath).wait(1000)

      cy.get(rfpResponsePage.imgDoneBtn).should('not.be.disabled');
      cy.get(rfpResponsePage.imgDoneBtn).should('contain', 'Done')
      cy.get(rfpResponsePage.imgDoneBtn).click()

      cy.get('[row-index="' + i + '"] > .ag-cell > .icons > .img').should
        ('have.attr', 'src', validimg[0])
      cy.get('[row-index="' + i + '"] > [col-id=' + mandColumns[0] + ']').eq(0).should('have.class', 'ag-cell-value');

    }
*/    

    cy.get(rfpResponsePage.headerSave).click().wait(1000);

    cy.get('.cad-toast__title').should('contain', 'Saved as draft');
    cy.get(':nth-child(1) > .cad-toast').should('contain', 'Proposal Unit(s) have been saved');

    //validate units count
    cy.get(rfpResponsePage.responseUnitsCount).wait(1000)
      .then(($span) => {
        var Unitscount = $span.text().trim();
        cy.wrap(parseInt(Unitscount)).should('be.gt', 0)

        if (parseInt(Unitscount) <= 10)
          cy.get('.ag-pinned-left-cols-container > .ag-row').should('have.length', parseInt(Unitscount));

        if (parseInt(Unitscount) > 0) {
          cy.get(rfpResponsePage.deleteAll)
            .should('contain', ' Delete All ')
            .should('not.be.disabled');

          cy.get(rfpResponsePage.downloadUnits)
            .should('contain', ' Download Units ')
            .should('not.be.disabled')
            .click().wait(500);

          cy.get('.cad-toast').should('contain', 'Proposal units downloaded')
        }
      });

    // cy.get(rfpResponsePage.btnDecline).should('not.be.disabled');
    // cy.get(rfpResponsePage.btnSendRFP).eq(1).eq(1).should('not.be.disabled');

    // cy.get(rfpResponsePage.btnSendRFP).eq(1).eq(1).click();

    cy.get(rfpResponsePage.responseFilterResults).should('not.be.disabled');
    cy.get('.cad-search__input > .ng-pristine')
      .should('have.attr', 'placeholder', 'Filter Results');
  })

  it('E2E Data Set 1 - Mandatory fields validation', () => {
    cy.get(rfpResponsePage.btnDecline)
      .should('not.be.disabled')
      .should('contain', 'Decline');
    cy.get(rfpResponsePage.btnSendRFP).eq(1)
      .should('not.be.disabled')
      .should('contain', 'Add Response')
      .click().wait(2000);

    let scrollRight: number = 700;
    for (var j = 0; j < 3; j++) {
      scrollRight = (scrollRight) + parseInt("150")
      let scroll : any = scrollRight + 'px';
      cy.get(PageAction.campaignPage().agGridScroll).scrollTo(scroll);

      //mandatory
      for (var c = 1; c < mandColumns.length; c++) {
        if (j > 1) {
          cy.get('[row-index="' + (j - 1) + '"] > [col-id=' + mandColumns[c] + ']').eq(0).should('have.class', 'ag-cell-value');
          cy.get('[row-index="' + (j - 1) + '"] > [col-id=' + mandColumns[0] + ']').eq(0).should('have.class', 'ag-cell-value');
        }

        cy.get('[row-index="' + j + '"] > [col-id=' + mandColumns[0] + ']').eq(0).should('have.class', 'ag-cell-value');

        cy.get('[row-index="' + j + '"] > [col-id=' + mandColumns[c] + ']').eq(0).trigger('mousedown', { button: 0 }).dblclick()
          .type('{del}{selectall}{backspace}').focus().blur();
        cy.get('[row-index="' + j + '"] > [col-id=' + mandColumns[c] + ']').eq(0).should('contain', '');
        cy.get('[row-index="' + j + '"] > [col-id=' + mandColumns[c] + ']').eq(0).should('have.class', 'invalidCell');

        cy.get('[row-index="' + j + '"] > [col-id=' + mandColumns[0] + ']').eq(0).should('have.class', 'invalidCell');
      }

      //optonal
      for (var c = 0; c < optColumns.length; c++) {
        cy.get('[row-index="' + j + '"] > [col-id=' + mandColumns[0] + ']').eq(0).should('have.class', 'invalidCell');

        cy.get('[row-index="' + j + '"] > [col-id=' + optColumns[c] + ']').eq(0).trigger('mousedown', { button: 0 }).dblclick()
          .type('{del}{selectall}{backspace}').focus().blur();
        cy.get('[row-index="' + j + '"] > [col-id=' + optColumns[c] + ']').eq(0).should('contain', '0.00');
        cy.get('[row-index="' + j + '"] > [col-id=' + optColumns[c] + ']').eq(0).should('have.class', 'ag-cell-value');
        cy.get('[row-index="' + j + '"] > [col-id=' + mandColumns[0] + ']').eq(0).should('have.class', 'invalidCell');

        if (j > 1) {
          cy.get('[row-index="' + (j - 1) + '"] > [col-id=' + optColumns[c] + ']').eq(0).should('have.class', 'ag-cell-value');
          cy.get('[row-index="' + (j - 1) + '"] > [col-id=' + mandColumns[0] + ']').eq(0).should('have.class', 'ag-cell-value');
        }
      }
      j++
    }

    cy.get(rfpResponsePage.headerSave).click().wait(3000);
    cy.get('.cad-toast').should('contain', 'Proposal Unit(s) have missing required field(s)')

    cy.get(PageAction.campaignPage().agGridVerScorll).scrollTo('top')

    let splString = 'asdfghjklPOIUYTREWQ~!@#,\'$%^&*()_+|}{":?><\/1234567890'
    scrollRight = 700;

    for (var k = 0; k < 3; k++) {
      scrollRight = (scrollRight) + parseInt("150")
      let scroll : any = scrollRight + 'px';
      cy.get(PageAction.campaignPage().agGridScroll).scrollTo(scroll);

      //add mandatory cell values
      if (k > 0) {
        cy.get('[row-index="' + (k - 1) + '"] > [col-id=' + mandColumns[1] + ']').should('have.class', 'ag-cell-value');
        cy.get('[row-index="' + (k - 1) + '"] > [col-id=' + mandColumns[0] + ']').should('have.class', 'ag-cell-value');
      }

      cy.get('[row-index="' + k + '"] > [col-id=' + mandColumns[1] + ']').should('have.class', 'invalidCell');

      cy.get('[row-index="' + k + '"] > [col-id=' + mandColumns[1] + ']').eq(0).click().type(faces[k]).focus().blur();
      cy.get('[row-index="' + k + '"] > [col-id=' + mandColumns[1] + ']').eq(0).should('contain', faces[k]);

      cy.get('[row-index="' + k + '"] > [col-id=' + mandColumns[1] + ']').should('have.class', 'ag-cell-value');

      for (var c = 2; c < mandColumns.length; c++) {
        cy.get('[row-index="' + k + '"] > [col-id=' + mandColumns[c] + ']').eq(0).should('have.class', 'invalidCell');

        cy.get('[row-index="' + k + '"] > [col-id=' + mandColumns[c] + ']').eq(0).trigger('mousedown', { button: 0 }).dblclick()
          .type(splString.substring((c * 6), ((c * 2) * 6))).focus().blur();
        cy.get('[row-index="' + k + '"] > [col-id=' + mandColumns[c] + ']').eq(0).should('contain', splString.substring((c * 6), ((c * 2) * 6)));
        cy.get('[row-index="' + k + '"] > [col-id=' + mandColumns[c] + ']').eq(0).should('have.class', 'ag-cell-value');
      }

      cy.get('[row-index="' + k + '"] > [col-id=' + mandColumns[0] + ']').eq(0).should('have.class', 'ag-cell-value')

      //add opional cell values
      for (var c = 0; c < optColumns.length; c++) {
        cy.get('[row-index="' + k + '"] > [col-id=' + optColumns[c] + ']').eq(0).should('have.class', 'ag-cell-value');

        cy.get('[row-index="' + k + '"] > [col-id=' + optColumns[c] + ']').eq(0).trigger('mousedown', { button: 0 }).dblclick()
          .type('{del}{selectall}{backspace}').type((k * 6).toString()).focus().blur();
        cy.get('[row-index="' + k + '"] > [col-id=' + optColumns[c] + ']').eq(0).should('contain', (k * 6).toString());
        cy.get('[row-index="' + k + '"] > [col-id=' + optColumns[c] + ']').eq(0).should('have.class', 'ag-cell-value');
      }

      cy.get('[row-index="' + k + '"] > [col-id=' + mandColumns[0] + ']').eq(0).should('have.class', 'ag-cell-value');

      k++
    }

    cy.get(rfpResponsePage.headerSave).click().wait(1000);

    cy.get('.cad-toast__title').should('contain', 'Saved as draft');
    cy.get(':nth-child(1) > .cad-toast').should('contain', 'Proposal Unit(s) have been saved');
  })

  it('E2E Data Set 1 - Verify custom columns for multi clients', () => {

    cy.get(rfpResponsePage.btnDecline)
      .should('not.be.disabled')
      .should('contain', 'Decline');
    cy.get(rfpResponsePage.btnSendRFP).eq(1)
      .should('not.be.disabled')
      .should('contain', 'Add Response')
      .click().wait(1000);

    cy.fixture('ooh/campaigns/custom_template.json').then((templates) => {
      cy.log("fixture - " + 'fixture')
      templates = JSON.stringify(templates);
      const jsonData = JSON.parse(templates);

      cy.get(PageAction.campaignPage().unitsSort).click();

      customColumns = jsonData.Templates[multi_Client]
      let scrollRight: number = 6000;

      for (var j = 0; j <= (customColumns.length - 1); j++) {
        scrollRight = (scrollRight) + parseInt("150")

        let scroll : any = scrollRight + 'px';
        cy.get(PageAction.campaignPage().agGridScroll).scrollTo(scroll);

        cy.get("[aria-colindex=" + (j + 40) + "]" + PageAction.campaignPage().headers)
          .should('be.visible')
          .should('contain', customColumns[j]);

        for (var z = 0; z < 5; z++) {
          cy.log(customColumns[j])
          cy.get('[row-index=' + z + '] > [aria-colindex=' + (j + 40) + ']')
            .should('be.visible')
            .should('contain', customColumns[j] + " " + (z + 1))
        }

      }
    })
  })

  it('E2E Data Set 1 - Delete units and add images', () => {
    cy.get(rfpResponsePage.btnDecline)
      .should('not.be.disabled')
      .should('contain', 'Decline');
    cy.get(rfpResponsePage.btnSendRFP).eq(1)
      .should('not.be.disabled')
      .should('contain', 'Add Response')
      .click().wait(1000);

    //delete added unit 
    cy.get('rfp-response-frames > .rfp-container__body-title').should('contain', 'Units');

    cy.get('[row-index="0"] > .ag-cell > .icons > .trash').click().wait(1000);
    cy.get('[row-index="9"] > .ag-cell > .icons > .trash').click().wait(1000);

    // cy.get(`ng-table.ng-star-inserted > ag-grid-angular > .ag-root-wrapper 
    //     > .ag-root-wrapper-body > .ag-root > .ag-body-viewport`).scrollTo('0%', '100%')

    cy.get(rfpResponsePage.responseUnitsCount).wait(1000)
      .then(($span) => {
        let unitsCount = parseInt($span.text().trim());
        if (unitsCount <= 10)
          cy.get('.ag-pinned-left-cols-container > .ag-row').should('have.length', unitsCount);
      });

    //attach images to non-audited units
    cy.get(`ng-table.ng-star-inserted > ag-grid-angular > .ag-root-wrapper > .ag-root-wrapper-body > .ag-root 
      > .ag-header > .ag-header-viewport > .ag-header-container > .ag-header-row > [aria-colindex="4"] 
      > .ag-cell-label-container > .ag-header-cell-label > .ag-header-cell-text`).click();

    for (var i = 0; i < imageName.length - 3; i++) {
      cy.get('[row-index="' + (i) + '"] > .ag-cell > .icons > .img').click();
      cy.get('.response__header').should('contain', 'Pictures')

      cy.get('body').then((body) => {
        if (body.find('img.ng-star-inserted').length > 0) {
          cy.get('.response__body > cad-icon.ng-star-inserted > .icon').click();
        }
      });

      cy.get('.uploader > .title_2').should('contain', 'Drop your picture here');
      cy.get('.title_6').should('contain', 'Only .jpg or .png files less than 5 MB are allowed.')

      cy.get('cad-modal-content > :nth-child(1) > cad-icon.ng-star-inserted > .icon')
        .should('not.be.disabled');
      cy.get(rfpResponsePage.imgBrowseBtn).should('not.be.disabled');
      cy.get(rfpResponsePage.imgDoneBtn).should('not.be.disabled');

      cy.get(rfpResponsePage.imgBrowseBtn).should('contain', 'Browse');
      cy.get(rfpResponsePage.imgDoneBtn).should('contain', 'Close');

      const imageFixturePath = testDataPath + imageName[i];
      cy.get('cad-button > input[type="file"]').attachFile(imageFixturePath).wait(1000)

      cy.get(rfpResponsePage.imgDoneBtn).should('not.be.disabled');
      cy.get(rfpResponsePage.imgDoneBtn).should('contain', 'Done')
      cy.get(rfpResponsePage.imgDoneBtn).click()
    }

    //attach images to audited units
    cy.get(`ng-table.ng-star-inserted > ag-grid-angular > .ag-root-wrapper > .ag-root-wrapper-body > .ag-root 
      > .ag-header > .ag-header-viewport > .ag-header-container > .ag-header-row > [aria-colindex="4"] 
      > .ag-cell-label-container > .ag-header-cell-label > .ag-header-cell-text`).click();

    for (var i = 0; i < imageName.length - 3; i++) {
      cy.get('[row-index="' + (i) + '"] > .ag-cell > .icons > .img').click();
      cy.get('.response__header').should('contain', 'Pictures')

      cy.get('body').then((body) => {
        if (body.find('img.ng-star-inserted').length > 0) {
          cy.get('.response__body > cad-icon.ng-star-inserted > .icon').click();
        }
      });

      cy.get('.uploader > .title_2').should('contain', 'Drop your picture here');
      cy.get('.title_6').should('contain', 'Only .jpg or .png files less than 5 MB are allowed.')

      cy.get('cad-modal-content > :nth-child(1) > cad-icon.ng-star-inserted > .icon')
        .should('not.be.disabled');
      cy.get(rfpResponsePage.imgBrowseBtn).should('not.be.disabled');
      cy.get(rfpResponsePage.imgDoneBtn).should('not.be.disabled');

      cy.get(rfpResponsePage.imgBrowseBtn).should('contain', 'Browse');
      cy.get(rfpResponsePage.imgDoneBtn).should('contain', 'Close');

      const imageFixturePath = testDataPath + imageName[i];
      cy.get('cad-button > input[type="file"]').attachFile(imageFixturePath).wait(1000)

      cy.get(rfpResponsePage.imgDoneBtn).should('not.be.disabled');
      cy.get(rfpResponsePage.imgDoneBtn).should('contain', 'Done')
      cy.get(rfpResponsePage.imgDoneBtn).click()
    }

    cy.get(rfpResponsePage.headerCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.headerSave).should('not.be.disabled');
    cy.get(rfpResponsePage.headerSendResponse).should('not.be.disabled');

    cy.get(rfpResponsePage.headerSave).click().wait(3000);
    cy.get('.cad-toast__title').should('contain', 'Saved as draft');
    cy.get(':nth-child(1) > .cad-toast').should('contain', ' Proposal Unit(s) have been saved');

    // cy.get(rfpResponsePage.btnDecline).should('not.be.disabled');
    // cy.get(rfpResponsePage.btnSendRFP).eq(1).eq(1).should('not.be.disabled');

    // cy.get(rfpResponsePage.btnSendRFP).eq(1).eq(1).click();

    // cy.get(rfpResponsePage.responseUnitsCount).wait(1000)
    //   .then(($span) => {
    //     let unitsCount = parseInt($span.text().trim());
    //     if (parseInt(Unitscount) <= 10)
    //       cy.get('.ag-pinned-left-cols-container > .ag-row').should('have.length', unitsCount);
    //   });
  })

  it('E2E Data Set 1 - Create package 1', () => {
    cy.get(rfpResponsePage.btnDecline)
      .should('not.be.disabled')
      .should('contain', 'Decline');
    cy.get(rfpResponsePage.btnSendRFP)
      .eq(1)
      .should('not.be.disabled')
      .should('contain', 'Add Response')
      .click()
      .wait(1000);

    //validate package count
    cy.get('.col-md-8 > .ng-star-inserted')
      .wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count))
          .should('be.gte', 0)
        if (parseInt(count) <= 10) {
          cy.get(`[data-automation="ooh-rfp-packages-table"] > ag-grid-angular > .ag-root-wrapper  
                   > .ag-root-wrapper-body > .ag-root > .ag-body-viewport > .ag-center-cols-clipper  
                   > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row`)
            .should('have.length', count);
        }
      });

    //create package 1
    cy.get('.pkg-btn > .cad-button')
      .should('not.be.disabled')
      .should('contain', 'Create Package')
      .click();

    cy.get('.rfp-container__header__holder__wrapper-title')
      .should('contain', 'New Package');

    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave)
      .should('be.disabled');

    cy.get(':nth-child(1) > .campaign-form__header > .title')
      .should('contain', 'General Information');

    cy.get(rfpResponsePage.packageTypeLabel)
      .should('contain', 'Type');
    cy.get(rfpResponsePage.selectType)
      .should('not.be.disabled')
      .should('contain', 'Select Type')
      .click()
      .wait(1000);
    cy.get(rfpResponsePage.responseFilterResults)
      .type(mediaType[0])
      .wait(1000);
    cy.get(rfpResponsePage.listItems)
      .click();

    cy.get(':nth-child(2) > :nth-child(2) > .title')
      .should('contain', 'Market');
    cy.get(rfpResponsePage.selectMarket)
      .should('not.be.disabled')
      .should('contain', 'Select Market')
      .click()
      .wait(1000);
    cy.get(rfpResponsePage.marketListItem)
      .eq(0)
      .click();

    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave)
      .should('be.disabled');

    cy.get(rfpResponsePage.packageSizeLabel)
      .should('contain', 'Size (Optional)');
    cy.get(rfpResponsePage.packageSize)
      .should('not.be.disabled')
      .type('400"x400"')
      .blur()
      .should('have.value', '400"x400"');

    cy.get(':nth-child(3) > :nth-child(1) > .title')
      .should('contain', 'Location Description');
    cy.get(rfpResponsePage.locationDesc)
      .should('not.be.disabled')
      .focus()
      .blur();
    cy.get('.rfp-container__body-message-error')
      .should('contain', 'Location Description is required');
    cy.get(rfpResponsePage.locationDesc)
      .type('Location Description 1')
      .blur()
      .should('have.value', 'Location Description 1');
    cy.get('.rfp-container__body-message-error')
      .should('not.exist');

    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave)
      .should('be.disabled');

    cy.get(rfpResponsePage.packageRationaleLabel)
      .should('contain', 'Rationale (Optional)');
    cy.get(rfpResponsePage.rationale)
      .should('not.be.disabled')
      .type('Rationale 1').blur()
      .should('have.value', 'Rationale 1');

    cy.get(rfpResponsePage.packageCancel)
      .click();

    cy.get('.unsaved-popup__title')
      .should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)')
      .should('contain', 'You have unsaved changes on this page.')
    cy.get('.unsaved-popup__text > :nth-child(2)')
      .should('contain', 'Are you sure you want to leave this page')

    cy.get('cad-icon.ng-star-inserted > .icon > use')
      .should('not.be.disabled');
    cy.get(rfpResponsePage.leaveBtn)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.stayBtn)
      .should('not.be.disabled')
      .click();

    cy.get(':nth-child(5) > .campaign-form__header > .title')
      .should('contain', 'Net Rates');

    cy.get(':nth-child(6) > :nth-child(1) > .title')
      .should('contain', 'Units');
    cy.get(rfpResponsePage.units)
      .should('not.be.disabled')
      .focus()
      .blur();
    cy.get('.rfp-container__body-message-error')
      .should('contain', 'Units is required');

    cy.get(rfpResponsePage.units)
      .type('ABC')
      .blur()
      .should('be.empty');
    cy.get('.rfp-container__body-message-error')
      .should('contain', 'Units is required');

    cy.get(rfpResponsePage.units)
      .type('1000')
      .blur()
      .should('have.value', '1000');
    cy.get('.rfp-container__body-message-error')
      .should('not.exist');

    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave)
      .should('be.disabled');

    cy.get(':nth-child(6) > :nth-child(2) > .title')
      .should('contain', 'Net Rate Card');
    cy.get(rfpResponsePage.netRateCard)
      .should('not.be.disabled');
    cy.get(`:nth-child(6) > :nth-child(2) > .field > cad-input-group > .cad-input-group 
    > .cad-input-group__label > .cad-input-group__addon > .cad-input-group__addon-icon`)
      .should('contain', '$');
    cy.get(rfpResponsePage.netRateCard)
      .focus()
      .blur();
    cy.get('.rfp-container__body-message-error')
      .should('contain', 'Net Rate Card is required');

    cy.get(rfpResponsePage.netRateCard)
      .type('ABC')
      .blur();
    cy.get(rfpResponsePage.netRateCard)
      .should('be.empty');
    cy.get('.rfp-container__body-message-error')
      .should('contain', 'Net Rate Card is required');

    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave)
      .should('be.disabled');

    cy.get(rfpResponsePage.netRateCard)
      .type('1500').blur();
    cy.get(rfpResponsePage.netRateCard)
      .should('have.value', '1,500.00');
    cy.get('.rfp-container__body-message-error')
      .should('not.exist');

    cy.get(':nth-child(6) > :nth-child(3) > .title')
      .should('contain', 'Net Negotiated Rate');
    cy.get(rfpResponsePage.netNegoRate)
      .should('not.be.disabled');
    cy.get(`:nth-child(3) > .field > cad-input-group > .cad-input-group > .cad-input-group__label 
            > .cad-input-group__addon > .cad-input-group__addon-icon`)
      .should('contain', '$');
    cy.get(rfpResponsePage.netNegoRate)
      .focus()
      .blur();
    cy.get('.rfp-container__body-message-error')
      .should('contain', 'Net Negotiated Rate is required');

    cy.get(rfpResponsePage.netNegoRate)
      .type('ABC').blur();
    cy.get(rfpResponsePage.netNegoRate)
      .should('be.empty');
    cy.get('.rfp-container__body-message-error')
      .should('contain', 'Net Negotiated Rate is required');

    cy.get(rfpResponsePage.netNegoRate)
      .type('1450').blur();
    cy.get(rfpResponsePage.netNegoRate)
      .should('have.value', '1,450.00');
    cy.get('.rfp-container__body-message-error')
      .should('not.exist');

    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave)
      .should('be.disabled');

    cy.get(rfpResponsePage.packageCancel)
      .click();

    cy.get('.unsaved-popup__title')
      .should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)')
      .should('contain', 'You have unsaved changes on this page.')
    cy.get('.unsaved-popup__text > :nth-child(2)')
      .should('contain', 'Are you sure you want to leave this page')

    cy.get('cad-icon.ng-star-inserted > .icon > use')
      .should('not.be.disabled');
    cy.get(rfpResponsePage.leaveBtn)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.stayBtn)
      .should('not.be.disabled');

    cy.get(rfpResponsePage.stayBtn)
      .click();

    cy.get(':nth-child(4) > .mb-15')
      .should('contain', '% Discount');
    cy.get(rfpResponsePage.discount)
      .should('contain', '3.33%');

    cy.get(':nth-child(8) > .campaign-form__header > .title')
      .should('contain', 'Flight Dates');
    cy.get(':nth-child(9) > :nth-child(1) > .title')
      .should('contain', 'Start Date');
    cy.get(rfpResponsePage.flightDateStart)
      .should('not.be.disabled');
    cy.get(`${rfpResponsePage.flightDateStart} > div > cad-dropdown > div > div > div 
    > div > .cad-datepicker__head > .cad-datepicker__input`)
      .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    cy.get(rfpResponsePage.flightDateStart)
      .click();
    cy.get('.rfp-container__body-message-error').should('contain', 'Start Date is required');
    cy.get(rfpResponsePage.packageCalanderDays)
      .click();
    cy.contains('10')
      .click();
    cy.get('.rfp-container__body-message-error')
      .should('not.exist');

    let startDate: string = "";
    var startDate_ = new Date();
    startDate_.setMonth(startDate_.getMonth() + 1);
    startDate = (parseInt(startDate_.getMonth().toString()) + 1) + '/' + "10" + '/' + startDate_.getFullYear()
    cy.log(startDate.toString())

    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave)
      .should('be.disabled');

    cy.get(':nth-child(9) > :nth-child(2) > .title')
      .should('contain', 'End Date');
    cy.get(rfpResponsePage.flightDateEnd)
      .should('not.be.disabled');
    cy.get(`${rfpResponsePage.flightDateEnd} > div > cad-dropdown > div > div > div 
          > div > .cad-datepicker__head > .cad-datepicker__input`)
      .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    cy.get(rfpResponsePage.flightDateEnd)
      .click();
    cy.get('.rfp-container__body-message-error')
      .should('contain', 'End Date is required');
    cy.get(rfpResponsePage.packageCalanderDays)
      .click();
    cy.get(rfpResponsePage.activeDates).contains('25').click();
    cy.get('.rfp-container__body-message-error')
      .should('not.exist');

    let endDate: string = "";
    var endDate_ = new Date();
    endDate_.setMonth(endDate_.getMonth() + 1);
    endDate = (parseInt(endDate_.getMonth().toString()) + 1) + '/' + "25" + '/' + endDate_.getFullYear()
    cy.log(endDate.toString())

    cy.get(rfpResponsePage.packageSave)
      .should('be.disabled');
    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled')
      .click();

    cy.get('.unsaved-popup__title')
      .should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)')
      .should('contain', 'You have unsaved changes on this page.')
    cy.get('.unsaved-popup__text > :nth-child(2)')
      .should('contain', 'Are you sure you want to leave this page')

    cy.get('cad-icon.ng-star-inserted > .icon > use')
      .should('not.be.disabled');
    cy.get(rfpResponsePage.leaveBtn)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.stayBtn)
      .should('not.be.disabled')
      .click();

    cy.get(':nth-child(11) > .campaign-form__header > .title')
      .should('contain', 'Media Cost');
    cy.get(':nth-child(12) > :nth-child(1) > .title')
      .should('contain', 'Cycle Type');
    cy.get(rfpResponsePage.cycleType).
      should('not.be.disabled')
      .should('contain', 'Select Cycle Type')
      .click();
    cy.get(rfpResponsePage.cycleTypeDaily)
      .click();

    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave)
      .should('be.disabled');

    cy.get(':nth-child(12) > :nth-child(2) > .title')
      .should('contain', 'Number of Cycles');
    cy.get(rfpResponsePage.NumberOfCycles)
      .should('not.be.disabled')
      .focus()
      .blur();
    cy.get('.rfp-container__body-message-error')
      .should('contain', 'Number of Cycles is required');

    cy.get(rfpResponsePage.NumberOfCycles)
      .type('ABC')
      .blur();
    cy.get(rfpResponsePage.NumberOfCycles)
      .should('be.empty');
    cy.get('.rfp-container__body-message-error')
      .should('contain', 'Number of Cycles is required');

    cy.get(rfpResponsePage.NumberOfCycles)
      .type('3.74')
      .blur();
    cy.get(rfpResponsePage.NumberOfCycles)
      .should('have.value', '3.74');
    cy.get('.rfp-container__body-message-error')
      .should('not.exist');

    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave)
      .should('be.disabled');

    cy.get(':nth-child(12) > :nth-child(3) > .mb-15')
      .should('contain', 'Total Net Media Cost');
    cy.get(rfpResponsePage.totalMediaCost)
      .should('contain', '$5,423.00')

    cy.get(':nth-child(14) > .campaign-form__header > .title')
      .should('contain', 'Program Cost');
    cy.get(':nth-child(15) > :nth-child(1) > .title')
      .should('contain', 'Net Install');
    cy.get(rfpResponsePage.netInstall)
      .should('not.be.disabled');
    cy.get(`:nth-child(1) > .field > cad-input-group > .cad-input-group > .cad-input-group__label 
    > .cad-input-group__addon > .cad-input-group__addon-icon`)
      .should('contain', '$');

    cy.get(rfpResponsePage.netInstall)
      .type('{del}{selectall}{backspace}')
      .focus()
      .blur();
    cy.get('.rfp-container__body-message-error')
      .should('contain', 'Net Install is required');

    cy.get(rfpResponsePage.netInstall)
      .type('ABC')
      .blur()
      .should('be.empty');
    cy.get('.rfp-container__body-message-error')
      .should('contain', 'Net Install is required');

    cy.get(rfpResponsePage.netInstall)
      .type('200')
      .blur()
      .should('have.value', '200.00');
    cy.get('.rfp-container__body-message-error')
      .should('not.exist');

    cy.get(rfpResponsePage.packageSave)
      .should('be.disabled');
    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled')
      .click();

    cy.get('.unsaved-popup__title')
      .should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)')
      .should('contain', 'You have unsaved changes on this page.')
    cy.get('.unsaved-popup__text > :nth-child(2)')
      .should('contain', 'Are you sure you want to leave this page')

    cy.get('cad-icon.ng-star-inserted > .icon > use')
      .should('not.be.disabled');

    cy.get(rfpResponsePage.leaveBtn)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.stayBtn)
      .should('not.be.disabled')
      .click();

    cy.get(':nth-child(15) > :nth-child(2) > .title')
      .should('contain', 'Production (Only if forced)');
    cy.get(rfpResponsePage.production)
      .should('not.be.disabled');
    cy.get(`:nth-child(15) > :nth-child(2) > .field > cad-input-group > .cad-input-group 
    > .cad-input-group__label > .cad-input-group__addon > .cad-input-group__addon-icon`)
      .should('contain', '$');

    cy.get(rfpResponsePage.production)
      .type('{del}{selectall}{backspace}')
      .focus()
      .blur();
    cy.get('.rfp-container__body-message-error')
      .should('contain', 'Production (Only if forced) is required');

    cy.get(rfpResponsePage.production)
      .type('ABC')
      .blur()
      .should('be.empty');
    cy.get('.rfp-container__body-message-error')
      .should('contain', 'Production (Only if forced) is required');

    cy.get(rfpResponsePage.production)
      .type('150')
      .blur()
      .should('have.value', '150.00');
    cy.get('.rfp-container__body-message-error')
      .should('not.exist');

    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave)
      .should('be.disabled');

    cy.get(':nth-child(15) > :nth-child(3) > .mb-15')
      .should('contain', 'Total Program Cost');
    cy.get(rfpResponsePage.programCost)
      .should('contain', '$5,773.00');

    cy.get(':nth-child(17) > .campaign-form__header > .title')
      .should('contain', 'Expires');
    cy.get(':nth-child(18) > .campaign-form__element > .title')
      .should('contain', 'Hold Expiration Date');
    cy.get(`${rfpResponsePage.holdExpireDate} .cad-datepicker__input`)
      .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    cy.get(rfpResponsePage.holdExpireDate)
      .should('not.be.disabled')
      .click();
    // cy.get('.rfp-container__body-message-error').should('contain', 'End Date is required');
    cy.get(rfpResponsePage.packageCalanderDays)
      .click();
    cy.get(rfpResponsePage.activeDates).contains('25').click();

    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave)
      .should('be.disabled');

    cy.get(':nth-child(20) > .campaign-form__header > .title')
      .should('contain', 'Methodology');

    cy.get(':nth-child(21) > :nth-child(1) > .title')
      .should('contain', 'Illuminated');

    cy.get(rfpResponsePage.illuminated)
      .should('not.be.disabled');

    cy.get(rfpResponsePage.illumYes)
      .should('contain', 'Yes')
      .should('be.visible')//.should('be.checked');

    cy.get(rfpResponsePage.illumNo)
      .should('contain', 'No')
      .should('be.visible').should('not.be.checked')
      .click({ force: true })//.wait(500).should('be.checked');

    cy.get(rfpResponsePage.various)
      .should('contain', 'Various')
      .should('be.visible').should('not.be.checked');

    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave)
      .should('be.disabled');

    cy.get(':nth-child(22) > :nth-child(1) > .title')
      .should('contain', 'Universe: 18+ yrs Weekly Geopath Impressions');
    cy.get(rfpResponsePage.Universe)
      .should('not.be.disabled')
      .focus()
      .blur();
    cy.get('.rfp-container__body-message-error')
      .should('contain', 'Universe: 18+ yrs Weekly Geopath Impressions is required');

    cy.get(rfpResponsePage.Universe)
      .type('ABC').blur()
      .should('be.empty');
    cy.get('.rfp-container__body-message-error')
      .should('contain', 'Universe: 18+ yrs Weekly Geopath Impressions is required');

    cy.get(rfpResponsePage.Universe)
      .type('1342356767').blur()
      .should('have.value', '1,342,356,767.00');
    cy.get('.rfp-container__body-message-error')
      .should('not.exist');

    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave)
      .should('be.disabled');
/* feature removed as enhancement
    cy.get(':nth-child(22) > :nth-child(2) > .title')
      .should('contain', 'All: Adults by Age-Group - 18-49 yrs Weekly Geopath Impressions')
    cy.get(rfpResponsePage.all)
      .should('not.be.disabled')
      .focus()
      .blur();
    cy.get('.rfp-container__body-message-error')
      .should('contain', 'All: Adults by Age-Group - 18-49 yrs Weekly Geopath Impressions is required');

    cy.get(rfpResponsePage.all)
      .type('ABC')
      .blur()
      .should('be.empty');
    cy.get('.rfp-container__body-message-error')
      .should('contain', 'All: Adults by Age-Group - 18-49 yrs Weekly Geopath Impressions is required');

    cy.get(rfpResponsePage.all)
      .type('87634537568')
      .blur()
      .should('have.value', '87,634,537,568.00');
    cy.get('.rfp-container__body-message-error')
      .should('not.exist');

    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave)
      .should('be.disabled');
*/
    cy.get(':nth-child(21) > :nth-child(2) > .title')
      .should('contain', 'Methodology of Measurement');

    cy.get(rfpResponsePage.geoPath)
      .should('contain', 'Geopath')
      .should('be.visible')//.should('be.checked');

    cy.get(rfpResponsePage.other)
      .should('contain', 'Other')
      .should('be.visible').should('not.be.checked')
      .click({ force: true })//.wait(500).should('be.checked');

    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave)
      .should('be.disabled');

    cy.get(':nth-child(22) > .campaign-form__element > .title')
      .should('contain', 'Weekly Non-Geopath Measurement');
    cy.get(rfpResponsePage.NonGeopath)
      .should('not.be.disabled')
      .focus()
      .blur();
    cy.get('.rfp-container__body-message-error')
      .should('contain', 'Weekly Non-Geopath Measurement is required');

    cy.get(rfpResponsePage.NonGeopath)
      .type('ABC')
      .blur()
      .should('be.empty');
    cy.get('.rfp-container__body-message-error')
      .should('contain', 'Weekly Non-Geopath Measurement is required');

    cy.get(rfpResponsePage.NonGeopath)
      .type('4654321654')
      .blur()
      .should('have.value', '4,654,321,654.00');
    cy.get('.rfp-container__body-message-error')
      .should('not.exist');

    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave)
      .should('not.be.disabled');

    cy.get(':nth-child(24) > .campaign-form__header > .title')
      .should('contain', 'Comments');
    cy.get(rfpResponsePage.comment)
      .should('not.be.disabled')
      .type('sample test comment 1')
      .should('have.value', 'sample test comment 1');

    cy.get('.rfp-response-packages-title')
      .should('contain', 'Units');
    cy.get('.uploader > .title_2')
      .should('contain', 'Drop your file here');

    cy.get(rfpResponsePage.packAddbyID)
      .should('contain', 'Add by ID')
      .should('not.be.disabled');

    cy.get(rfpResponsePage.browse)
      .should('not.be.disabled')
      .should('contain', 'Browse');

    cy.get('.title_6')
      .should('contain', 'Supported file format: .xlsm');
    cy.get('.mt-5')
      .should('contain', 'Template (package-frames-template)');

    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave)
      .should('not.be.disabled');

    // add by ID 
    cy.get(rfpResponsePage.packAddbyID)
      .click();
    cy.get('[data-automation="popup_close"] > .icon')
      .should('not.be.disabled');
    cy.get('.response__list__modal__header')
      .should('contain', 'Add by ID');

    cy.get(rfpResponsePage.addByIdSearch)
      .should('not.be.disabled')
      .should('have.attr', 'placeholder', 'Search by Unit ID or Geopath ID')
      .type(addByID[0]);
    cy.get(rfpResponsePage.addByIdSearchBtn)
      .should('not.be.disabled')
      .click()
      .wait(1000);

    cy.get(rfpResponsePage.copyErrors)
      .should('contain', 'Copy All Error Ids')
      .should('not.be.disabled');

    cy.get(rfpResponsePage.addByIDErrorTitle)
      .should('contain', 'IDs Not Found (1):');

    cy.get(rfpResponsePage.addByIDErrorList)
      .should('contain', 'abc123xyz');

    let idsLen: string[] = addByID[0].split(',');
    if (idsLen.length <= 10) {
      cy.get('.response__list__modal__body > .ng-star-inserted > tbody').find('tr')
        .should('have.length', (idsLen.length - 1));
    }
    if (idsLen.length > 0) {
      for (var i = 1; i <= (idsLen.length - 1); i++) {
        cy.get(':nth-child(' + i + ') > :nth-child(6) > cad-link > .cad-link')
          .should('not.be.disabled')
          .click();
      }
    }

    cy.get(rfpResponsePage.addByIdDone)
      .click();

    cy.get(rfpResponsePage.packAddbyID)
      .should('contain', 'Add by ID')
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packImport)
      .should('contain', 'Import from File')
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packDownloadTemp)
      .should('contain', 'Download Template')
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packDownloadUnits)
      .should('contain', 'Download Units')
      .should('not.be.disabled');

    cy.scrollTo('bottom');

    //mandatory field validation 
    for (var i = 0; i < 5; i++) {
      // for (var c = 1; c < packMandColumns.length - 7; c++) {
      cy.get('[row-index="' + i + '"] > [col-id=' + packMandColumns[0] + ']')
        .should('not.have.class', 'invalidCell');
      // .should('have.class', 'invalidCell');
      cy.get('[row-index="' + i + '"] > [col-id=startDate]')
        // .should('have.class', 'invalidCell');
        .should('contain', startDate)
      cy.get('[row-index="' + i + '"] > [col-id=endDate]')
        // .should('have.class', 'invalidCell');
        .should('contain', endDate)
      // }
    }

    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave)
      .should('not.be.disabled')
    //   .click()
    //   .wait(3000);

    // cy.get(rfpResponsePage.error)
    //   .should('contain', 'Errors in unit(s) record found.')
    //   .should('contain', 'To save the package, please correct the error(s)')

    // cy.get(rfpResponsePage.packageError)
    //   .should('contain', 'The row(s) with unit Id highlighted in red have error(s). Scroll right to identify the error(s) and apply the fix.');

    // cy.get(rfpResponsePage.collapsableErrors)
    //   .should('contain', 'Multiple Errors: Expand to see all errors.');
    // cy.get(rfpResponsePage.expandErrors)
    //   .click();
    // cy.get(rfpResponsePage.errorlist)
    //   .should('contain', 'Start Date is required for Unit ID:')
    //   .should('contain', 'End Date is required for Unit ID:');

    // let splString = 'asdfghjklPOIUYTREWQ~!@#,\'$%^&*()_+|}{":?><\/1234567890'
    // for (var i = 0; i < 5; i++) {
    //   for (var c = 1; c < packMandColumns.length - 7; c++) {
    //     cy.get('[row-index="' + i + '"] > [col-id=' + packMandColumns[c] + ']')
    //       .trigger('mousedown', { button: 0 })
    //       .dblclick()
    //       .type(splString.substring((i * 1), ((i + 1) * 2)));

    //     cy.get('[row-index="' + i + '"] > [aria-colindex="13"]')
    //       .click()

    //     cy.get('[row-index="' + i + '"] > [col-id=' + packMandColumns[c] + ']')
    //       .should('contain', splString.substring((i * 1), ((i + 1) * 2)));
    //   }
    // }

    cy.get(rfpResponsePage.packImport)
      .click();

    const packageFileName = packUnits[2].trim();
    const yourFixturePath = testDataPath + packageFileName;
    cy.fixture(yourFixturePath, 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.get("input[type='file']").attachFile({
          fileContent,
          fileName: packageFileName,
          mimeType: 'application/vnd.ms-excel.sheet.macroEnabled.12',
          encoding: 'utf-8',
          filePath: yourFixturePath
        });
      })
      .wait(1000);

    // cy.get('.cad-toast__title')
    //   .should('contain', 'Proposal Unit(s) have been added.');

    cy.get(rfpResponsePage.packAddbyID)
      .should('contain', 'Add by ID')
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packImport)
      .should('contain', 'Import from File')
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packDownloadTemp)
      .should('contain', 'Download Template')
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packDownloadUnits)
      .should('contain', 'Download Units')
      .should('not.be.disabled');

    //validate units count 
    cy.get(rfpResponsePage.responseUnitsCount)
      .wait(1000)
      .then(($span) => {
        var Unitscount = $span.text().trim();
        cy.wrap(parseInt(Unitscount))
          .should('be.gt', 0)

        if (parseInt(Unitscount) <= 10)
          cy.get(rfpResponsePage.packtablerows)
            .should('have.length', parseInt(Unitscount));

        if (parseInt(Unitscount) > 0) {
          cy.get(rfpResponsePage.packDownloadUnits)
            .should('contain', 'Download Units')
            .should('not.be.disabled')
            .click().wait(500);

          cy.get('.cad-toast')
            .should('contain', 'Proposal units downloaded')
        }
      });

    //mandatory field validation 
    cy.get(rfpResponsePage.responseUnitsCount)
      .wait(1000)
      .then(($span) => {
        var Unitscount = $span.text().trim();
        for (var i = 0; i < parseInt(Unitscount); i++) {
          for (var c = 1; c < packMandColumns.length; c++) {
            cy.get('[row-index="' + i + '"] > [col-id=' + packMandColumns[0] + ']')
              .should('not.have.class', 'invalidCell');

            cy.get('[row-index="' + i + '"] > [col-id=' + packMandColumns[c] + ']')
              .should('not.have.class', 'invalidCell');

            cy.get('[row-index="' + i + '"] > [col-id=' + packMandColumns[c] + ']')
              .should('not.be.empty')
          }
        }
      });

    ////Non-mandatory field validation 
    for (var i = 6; i <= 10; i++) {
      for (var c = 0; c < packNonMandColumnsEditable.length; c++) {
        cy.get('[row-index="' + i + '"] > [col-id=' + packNonMandColumnsEditable[c] + ']')
          .trigger('mousedown', { button: 0 })
          .dblclick()
          .type('{backspace}')
          .clear()

        cy.get('[row-index="' + i + '"] > [aria-colindex="1"]')
          .click()

        cy.get('[row-index="' + i + '"] > [col-id=' + packMandColumns[0] + ']')
          .should('not.have.class', 'invalidCell');

        cy.get('[row-index="' + i + '"] > [col-id=' + packNonMandColumnsEditable[c] + ']')
          .should('not.have.class', 'invalidCell');
      }
    }

    //validate units count 
    cy.get(rfpResponsePage.responseUnitsCount)
      .wait(1000)
      .then(($span) => {
        var Unitscount = $span.text().trim();
        cy.wrap(parseInt(Unitscount))
          .should('be.gt', 0)

        if (parseInt(Unitscount) <= 10)
          cy.get(rfpResponsePage.packtablerows)
            .should('have.length', parseInt(Unitscount));

        if (parseInt(Unitscount) > 0) {
          cy.get(rfpResponsePage.packDownloadUnits)
            .should('contain', 'Download Units')
            .should('not.be.disabled')
            .click().wait(500);

          cy.get('.cad-toast')
            .should('contain', 'Proposal units downloaded')
        }
      });

    cy.get(rfpResponsePage.responseFilterResults)
      .should('not.be.disabled');

    cy.get(rfpResponsePage.packageSave)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled')
      .click();

    cy.get('.unsaved-popup__title')
      .should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)')
      .should('contain', 'You have unsaved changes on this page.')
    cy.get('.unsaved-popup__text > :nth-child(2)')
      .should('contain', 'Are you sure you want to leave this page')

    cy.get('cad-icon.ng-star-inserted > .icon > use')
      .should('not.be.disabled');
    cy.get(rfpResponsePage.leaveBtn)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.stayBtn)
      .should('not.be.disabled')
      .click();

    //attach images to package frames
    for (var i = 0; i < (imageName.length - 5); i++) {
      cy.get('[row-index="' + (i) + '"] > .ag-cell > .icons > .img')
        .click();
      cy.get('.response__header')
        .should('contain', 'Pictures')

      cy.get('body')
        .then((body) => {
          if (body.find('img.ng-star-inserted').length > 0) {
            cy.get('.response__body > cad-icon.ng-star-inserted > .icon')
              .click();
          }
        });

      cy.get('.uploader > .title_2')
        .should('contain', 'Drop your picture here');
      cy.get('.title_6')
        .should('contain', 'Only .jpg or .png files less than 5 MB are allowed.')

      cy.get('cad-modal-content > :nth-child(1) > cad-icon.ng-star-inserted > .icon')
        .should('not.be.disabled');
      cy.get(rfpResponsePage.imgBrowseBtn)
        .should('not.be.disabled')
        .should('contain', 'Browse');
      cy.get(rfpResponsePage.imgDoneBtn)
        .should('contain', 'Done');

      const imageFixturePath = testDataPath + imageName[i];
      cy.get('cad-button > input[type="file"]')
        .attachFile(imageFixturePath)
        .wait(1000)

      cy.get(rfpResponsePage.imgDoneBtn)
        .should('not.be.disabled')
        .should('contain', 'Done')
        .click()
    }

    cy.get(rfpResponsePage.packageSave)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled')
      .click();

    cy.get('.unsaved-popup__title')
      .should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)')
      .should('contain', 'You have unsaved changes on this page.')
    cy.get('.unsaved-popup__text > :nth-child(2)')
      .should('contain', 'Are you sure you want to leave this page')

    cy.get('cad-icon.ng-star-inserted > .icon > use')
      .should('not.be.disabled');
    cy.get(rfpResponsePage.leaveBtn)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.stayBtn)
      .should('not.be.disabled')
      .click();


    cy.get(rfpResponsePage.packAddbyID)
      .should('contain', 'Add by ID')
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packImport)
      .should('contain', 'Import from File')
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packDownloadTemp)
      .should('contain', 'Download Template')
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packDownloadUnits)
      .should('contain', 'Download Units')
      .should('not.be.disabled');

    //validate units count 
    cy.get(rfpResponsePage.responseUnitsCount)
      .wait(1000)
      .then(($span) => {
        var Unitscount = $span.text().trim();
        cy.wrap(parseInt(Unitscount))
          .should('be.gt', 0)

        if (parseInt(Unitscount) <= 10)
          cy.get(rfpResponsePage.packtablerows)
            .should('have.length', parseInt(Unitscount));

        if (parseInt(Unitscount) > 0) {
          cy.get(rfpResponsePage.packDownloadUnits)
            .should('contain', 'Download Units')
            .should('not.be.disabled')
            .click()
            .wait(500);

          cy.get('.cad-toast')
            .should('contain', 'Proposal units downloaded')
        }
      });

    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave)
      .should('not.be.disabled')
      .click()
      .wait(3000);

    cy.get('.cad-toast__title')
      .should('contain', 'RFP Package successfully created')
      .wait(1000);

    cy.get('.col-md-8 > .ng-star-inserted')
      .wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        //     cy.wrap(parseInt(count)).should('be.gt', 0)
        if (parseInt(count) <= 10) {
          cy.get(`[data-automation="ooh-rfp-packages-table"] > ag-grid-angular > .ag-root-wrapper  
                 > .ag-root-wrapper-body > .ag-root > .ag-body-viewport > .ag-center-cols-clipper  
                 > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row`)
            .should('have.length', count);
        }
      });
  })

  //OOH-4561
  it("E2E Package Frame Date - Inherit from Package Form", () => {
    cy.get(rfpResponsePage.btnDecline)
      .should('not.be.disabled')
      .should('contain', 'Decline');
    cy.get(rfpResponsePage.btnSendRFP)
      .eq(1)
      .should('not.be.disabled')
      .should('contain', 'Add Response')
      .click()
      .wait(1000);

    //create package without date selection 
    cy.get(rfpResponsePage.createPackage)
      .should('not.be.disabled')
      .should('contain', 'Create Package')
      .click();

    cy.get(rfpResponsePage.heading)
      .should('contain', 'New Package');

    // add by ID 
    cy.get(rfpResponsePage.packAddbyID)
      .click();
    cy.get(rfpResponsePage.popupCloseButton)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.addByIdHeader)
      .should('contain', 'Add by ID');

    let AllIds: string[] = addByID[3].split(',').slice()
    cy.get(rfpResponsePage.addByIdSearch)
      .should('not.be.disabled')
      .should('have.attr', 'placeholder', 'Search by Unit ID or Geopath ID')
      .type(AllIds.slice(0, 2).toString());
    cy.get(rfpResponsePage.addByIdSearchBtn)
      .should('not.be.disabled')
      .click()
      .wait(1000);

    if (AllIds.length <= 10) {
      cy.get(rfpResponsePage.popupunitCount).find('tr')
        .should('have.length', (AllIds.slice(0, 2).length));
    }
    if (AllIds.length > 0) {
      for (var i = 1; i <= (AllIds.slice(0, 2).length); i++) {
        cy.get(':nth-child(' + i + ') > :nth-child(6) > cad-link > .cad-link')
          .should('not.be.disabled')
          .click();
      }
    }

    cy.get(rfpResponsePage.addByIdDone)
      .click();
    cy.scrollTo('bottom');

    //mandatory field validation 
    for (var i = 0; i < AllIds.slice(0, 2).length; i++) {
      cy.get('[row-index="' + i + '"] > [col-id=' + packMandColumns[0] + ']')
        .should('have.class', 'invalidCell');
      cy.get('[row-index="' + i + '"] > [col-id=startDate]')
        .should('be.empty')
        .should('have.class', 'invalidCell');
      cy.get('[row-index="' + i + '"] > [col-id=endDate]')
        .should('be.empty')
        .should('have.class', 'invalidCell');
    }

    cy.get(rfpResponsePage.packageFlightDates)
      .should('contain', 'Flight Dates');
    cy.get(rfpResponsePage.packageStartDate)
      .should('contain', 'Start Date');
    cy.get(rfpResponsePage.flightDateStart)
      .should('not.be.disabled');
    cy.get(`${rfpResponsePage.flightDateStart} > div > cad-dropdown > div > div > div 
            > div > .cad-datepicker__head > .cad-datepicker__input`)
      .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    cy.get(rfpResponsePage.flightDateStart)
      .click();
    cy.get(rfpResponsePage.errorMessage)
      .should('contain', 'Start Date is required');
    cy.get(rfpResponsePage.packageCalanderDays)
      .click();
    cy.contains('10')
      .click();
    cy.get(rfpResponsePage.errorMessage)
      .should('not.exist');

    let startDate: string = "";
    var startDate_1 = new Date();
    startDate_1.setMonth(startDate_1.getMonth() + 1);
    startDate = (parseInt(startDate_1.getMonth().toString()) + 1) + '/' + "10" + '/' + startDate_1.getFullYear()
    cy.log(startDate_1.toString())

    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave)
      .should('be.disabled');

    cy.get(rfpResponsePage.packageEndDate)
      .should('contain', 'End Date');
    cy.get(rfpResponsePage.flightDateEnd)
      .should('not.be.disabled');
    cy.get(`${rfpResponsePage.flightDateEnd} > div > cad-dropdown > div > div > div 
          > div > .cad-datepicker__head > .cad-datepicker__input`)
      .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    cy.get(rfpResponsePage.flightDateEnd)
      .click();
    cy.get(rfpResponsePage.errorMessage)
      .should('contain', 'End Date is required');
    cy.get(rfpResponsePage.packageCalanderDays)
      .click();
    cy.get(rfpResponsePage.activeDates).contains('25').click();
    cy.get(rfpResponsePage.errorMessage)
      .should('not.exist');

    let endDate: string = "";
    var endDate_1 = new Date();
    endDate_1.setMonth(endDate_1.getMonth() + 1);
    endDate = (parseInt(endDate_1.getMonth().toString()) + 1) + '/' + "25" + '/' + endDate_1.getFullYear()
    cy.log(endDate.toString())

    // add by ID 
    cy.get(rfpResponsePage.packAddbyID)
      .click();
    cy.get(rfpResponsePage.popupCloseButton)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.addByIdHeader)
      .should('contain', 'Add by ID');

    cy.get(rfpResponsePage.addByIdSearch)
      .should('not.be.disabled')
      .should('have.attr', 'placeholder', 'Search by Unit ID or Geopath ID')
      .type(AllIds.slice(2, 4).toString());
    cy.get(rfpResponsePage.addByIdSearchBtn)
      .should('not.be.disabled')
      .click()
      .wait(1000);

    if (AllIds.slice(2, 4).length <= 10) {
      cy.get(rfpResponsePage.popupunitCount).find('tr')
        .should('have.length', (AllIds.slice(2, 4).length));
    }
    if (AllIds.slice(2, 4).length > 0) {
      for (var i = 1; i <= (AllIds.slice(2, 4).length); i++) {
        cy.get(':nth-child(' + i + ') > :nth-child(6) > cad-link > .cad-link')
          .should('not.be.disabled')
          .click();
      }
    }

    cy.get(rfpResponsePage.addByIdDone)
      .click();
    cy.scrollTo('bottom');

    //mandatory field validation 
    for (var i = 0; i < AllIds.slice(2, 4).length; i++) {
      cy.get('[row-index="' + i + '"] > [col-id=' + packMandColumns[0] + ']')
        .should('not.have.class', 'invalidCell');
      cy.get('[row-index="' + i + '"] > [col-id=startDate]')
        .should('contain', startDate)
      cy.get('[row-index="' + i + '"] > [col-id=endDate]')
        .should('contain', endDate)
    }

    //validate with new date selecction 
    cy.get(rfpResponsePage.packageFlightDates)
      .should('contain', 'Flight Dates');
    cy.get(rfpResponsePage.packageStartDate)
      .should('contain', 'Start Date');
    cy.get(rfpResponsePage.flightDateStart)
      .should('not.be.disabled');
    cy.get(`${rfpResponsePage.flightDateStart} > div > cad-dropdown > div > div > div 
    > div > .cad-datepicker__head > .cad-datepicker__input`)
      .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    cy.get(rfpResponsePage.flightDateStart)
      .click();
    cy.contains('12')
      .click();
    cy.get(rfpResponsePage.errorMessage)
      .should('not.exist');

    let newStartDate: string = "";
    var startDate_ = new Date();
    startDate_.setMonth(startDate_.getMonth() + 1);
    newStartDate = (parseInt(startDate_.getMonth().toString()) + 1) + '/' + "12" + '/' + startDate_.getFullYear()
    cy.log(newStartDate.toString())

    cy.get(rfpResponsePage.packageCancel)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave)
      .should('be.disabled');

    cy.get(rfpResponsePage.packageEndDate)
      .should('contain', 'End Date');
    cy.get(rfpResponsePage.flightDateEnd)
      .should('not.be.disabled');
    cy.get(`${rfpResponsePage.flightDateEnd} > div > cad-dropdown > div > div > div 
          > div > .cad-datepicker__head > .cad-datepicker__input`)
      .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    cy.get(rfpResponsePage.flightDateEnd)
      .click();
    cy.contains('18')
      .click();
    cy.get(rfpResponsePage.errorMessage)
      .should('not.exist');

    let newEndDate: string = "";
    var endDate_ = new Date();
    endDate_.setMonth(endDate_.getMonth() + 1);
    newEndDate = (parseInt(endDate_.getMonth().toString()) + 1) + '/' + "18" + '/' + endDate_.getFullYear()
    cy.log(newEndDate.toString())

    // add by ID 
    cy.get(rfpResponsePage.packAddbyID)
      .click();
    cy.get(rfpResponsePage.popupCloseButton)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.addByIdHeader)
      .should('contain', 'Add by ID');

    cy.get(rfpResponsePage.addByIdSearch)
      .should('not.be.disabled')
      .should('have.attr', 'placeholder', 'Search by Unit ID or Geopath ID')
      .type(AllIds.slice(4, 6).toString());
    cy.get(rfpResponsePage.addByIdSearchBtn)
      .should('not.be.disabled')
      .click()
      .wait(1000);

    if (AllIds.slice(4, 6).length <= 10) {
      cy.get(rfpResponsePage.popupunitCount).find('tr')
        .should('have.length', (AllIds.slice(4, 6).length));
    }

    cy.get(rfpResponsePage.selectAll)
      .click()
    cy.get(rfpResponsePage.addByIdDone)
      .click();
    cy.scrollTo('bottom');

    //mandatory field validation with new date selection
    for (var i = 0; i <= 1; i++) {
      cy.get('[row-index="' + i + '"] > [col-id=' + packMandColumns[0] + ']')
        .should('not.have.class', 'invalidCell');
      cy.get('[row-index="' + i + '"] > [col-id=startDate]')
        .should('contain', newStartDate)
      cy.get('[row-index="' + i + '"] > [col-id=endDate]')
        .should('contain', newEndDate)
    }

    //mandatory field validation with date selection
    for (var i = 2; i <= 3; i++) {
      cy.get('[row-index="' + i + '"] > [col-id=' + packMandColumns[0] + ']')
        .should('not.have.class', 'invalidCell');
      cy.get('[row-index="' + i + '"] > [col-id=startDate]')
        .should('contain', startDate)
      cy.get('[row-index="' + i + '"] > [col-id=endDate]')
        .should('contain', endDate)
    }

    //mandatory field validation without date selection
    for (var i = 4; i <= 5; i++) {
      cy.get('[row-index="' + i + '"] > [col-id=' + packMandColumns[0] + ']')
        .should('have.class', 'invalidCell');
      cy.get('[row-index="' + i + '"] > [col-id=startDate]')
        .should('be.empty')
        .should('have.class', 'invalidCell');
      cy.get('[row-index="' + i + '"] > [col-id=endDate]')
        .should('be.empty')
        .should('have.class', 'invalidCell');
    }

  })

  it('E2E Data Set 1 - Create package 2', () => {
    cy.get(rfpResponsePage.btnDecline)
      .should('not.be.disabled')
      .should('contain', 'Decline');
    cy.get(rfpResponsePage.btnSendRFP).eq(1)
      .should('not.be.disabled')
      .should('contain', 'Add Response')
      .click().wait(1000);

    //create package 2
    cy.get('.pkg-btn > .cad-button').should('not.be.disabled');
    cy.get('.pkg-btn > .cad-button').should('contain', 'Create Package');
    cy.get('.pkg-btn > .cad-button').click();

    cy.get('.rfp-container__header__holder__wrapper-title').should('contain', 'New Package');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(1) > .campaign-form__header > .title').should('contain', 'General Information');

    cy.get(rfpResponsePage.packageTypeLabel).should('contain', 'Type');
    cy.get(rfpResponsePage.selectType).should('not.be.disabled');
    cy.get(rfpResponsePage.selectType).should('contain', 'Select Type');
    cy.get(rfpResponsePage.selectType).click().wait(1000);
    cy.get(rfpResponsePage.responseFilterResults).type(mediaType[1]).wait(1000);
    cy.get(rfpResponsePage.listItems).click();

    cy.get(':nth-child(2) > :nth-child(2) > .title').should('contain', 'Market');
    cy.get(rfpResponsePage.selectMarket).should('not.be.disabled');
    cy.get(rfpResponsePage.selectMarket).should('contain', 'Select Market');
    cy.get(rfpResponsePage.selectMarket).click().wait(1000);
    cy.get(rfpResponsePage.marketListItem).eq(1).click();

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(rfpResponsePage.packageSizeLabel).should('contain', 'Size (Optional)');
    cy.get(rfpResponsePage.packageSize).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSize).type('150"x170"').blur();
    cy.get(rfpResponsePage.packageSize).should('have.value', '150"x170"');

    cy.get(':nth-child(3) > :nth-child(1) > .title').should('contain', 'Location Description');
    cy.get(rfpResponsePage.locationDesc).should('not.be.disabled');
    cy.get(rfpResponsePage.locationDesc).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Location Description is required');
    cy.get(rfpResponsePage.locationDesc).type('Location Description 2').blur();
    cy.get(rfpResponsePage.locationDesc).should('have.value', 'Location Description 2');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(rfpResponsePage.packageRationaleLabel).should('contain', 'Rationale (Optional)');
    cy.get(rfpResponsePage.rationale).should('not.be.disabled');
    cy.get(rfpResponsePage.rationale).type('Rationale 2').blur();
    cy.get(rfpResponsePage.rationale).should('have.value', 'Rationale 2');

    cy.get(rfpResponsePage.packageCancel).click();

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(rfpResponsePage.leaveBtn).should('not.be.disabled');
    cy.get(rfpResponsePage.stayBtn).should('not.be.disabled');

    cy.get(rfpResponsePage.stayBtn).click();

    cy.get(':nth-child(5) > .campaign-form__header > .title').should('contain', 'Net Rates');

    cy.get(':nth-child(6) > :nth-child(1) > .title').should('contain', 'Units');
    cy.get(rfpResponsePage.units).should('not.be.disabled');
    cy.get(rfpResponsePage.units).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Units is required');

    cy.get(rfpResponsePage.units).type('ABC').blur();
    cy.get(rfpResponsePage.units).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Units is required');

    cy.get(rfpResponsePage.units).type('750').blur();
    cy.get(rfpResponsePage.units).should('have.value', '750');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(6) > :nth-child(2) > .title').should('contain', 'Net Rate Card');
    cy.get(rfpResponsePage.netRateCard).should('not.be.disabled');
    cy.get(`: nth - child(6) > : nth - child(2) > .field > cad - input - group > .cad - input - group
      > .cad - input - group__label > .cad - input - group__addon > .cad - input - group__addon - icon`)
      .should('contain', '$');
    cy.get(rfpResponsePage.netRateCard).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Rate Card is required');

    cy.get(rfpResponsePage.netRateCard).type('ABC').blur();
    cy.get(rfpResponsePage.netRateCard).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Rate Card is required');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(rfpResponsePage.netRateCard).type('130').blur();
    cy.get(rfpResponsePage.netRateCard).should('have.value', '130.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(':nth-child(6) > :nth-child(3) > .title').should('contain', 'Net Negotiated Rate');
    cy.get(rfpResponsePage.netNegoRate).should('not.be.disabled');
    cy.get(`: nth - child(3) > .field > cad - input - group > .cad - input - group > .cad - input - group__label
      > .cad - input - group__addon > .cad - input - group__addon - icon`)
      .should('contain', '$');
    cy.get(rfpResponsePage.netNegoRate).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Negotiated Rate is required');

    cy.get(rfpResponsePage.netNegoRate).type('ABC').blur();
    cy.get(rfpResponsePage.netNegoRate).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Negotiated Rate is required');

    cy.get(rfpResponsePage.netNegoRate).type('973').blur();
    cy.get(rfpResponsePage.netNegoRate).should('have.value', '973.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(rfpResponsePage.packageCancel).click();

    cy.get('.unsaved-popup__title')
      .should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)')
      .should('contain', 'You have unsaved changes on this page.')
    cy.get('.unsaved-popup__text > :nth-child(2)')
      .should('contain', 'Are you sure you want to leave this page')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(rfpResponsePage.leaveBtn).should('not.be.disabled');
    cy.get(rfpResponsePage.stayBtn).should('not.be.disabled');

    cy.get(rfpResponsePage.stayBtn).click();

    cy.get(':nth-child(4) > .mb-15').should('contain', '% Discount');
    cy.get(rfpResponsePage.discount).should('contain', '-648.46%');

    cy.get(':nth-child(8) > .campaign-form__header > .title').should('contain', 'Flight Dates');
    cy.get(':nth-child(9) > :nth-child(1) > .title').should('contain', 'Start Date');
    cy.get(rfpResponsePage.flightDateStart).should('not.be.disabled');
    cy.get(`${rfpResponsePage.flightDateStart} > div > cad - dropdown > div > div > div
      > div > .cad - datepicker__head > .cad - datepicker__input`)
      .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    cy.get(rfpResponsePage.flightDateStart).click();
    cy.get('.rfp-container__body-message-error').should('contain', 'Start Date is required');
    cy.get(`.cad - month - calendar__header__icon--right > cad - icon > .icon`).click();
    cy.contains('10').click();
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(9) > :nth-child(2) > .title').should('contain', 'End Date');
    cy.get(rfpResponsePage.flightDateEnd).should('not.be.disabled');
    cy.get(`${rfpResponsePage.flightDateEnd} > div > cad - dropdown > div > div > div
      > div > .cad - datepicker__head > .cad - datepicker__input`)
      .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    cy.get(rfpResponsePage.flightDateEnd).click();
    cy.get('.rfp-container__body-message-error').should('contain', 'End Date is required');
    cy.get(`.cad - month - calendar__header__icon--right > cad - icon > .icon`).click();
    cy.contains('25').click();
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(rfpResponsePage.packageCancel).click();

    cy.get('.unsaved-popup__title')
      .should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)')
      .should('contain', 'You have unsaved changes on this page.')
    cy.get('.unsaved-popup__text > :nth-child(2)')
      .should('contain', 'Are you sure you want to leave this page')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(rfpResponsePage.leaveBtn).should('not.be.disabled');
    cy.get(rfpResponsePage.stayBtn).should('not.be.disabled');

    cy.get(rfpResponsePage.stayBtn).click();

    cy.get(':nth-child(11) > .campaign-form__header > .title').should('contain', 'Media Cost');
    cy.get(':nth-child(12) > :nth-child(1) > .title').should('contain', 'Cycle Type');
    cy.get(rfpResponsePage.cycleType).should('not.be.disabled');
    cy.get(rfpResponsePage.cycleType).should('contain', 'Select Cycle Type');
    cy.get(rfpResponsePage.cycleType).click();
    cy.get(':nth-child(2) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').click();

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(12) > :nth-child(2) > .title').should('contain', 'Number of Cycles');
    cy.get(rfpResponsePage.NumberOfCycles).should('not.be.disabled');
    cy.get(rfpResponsePage.NumberOfCycles).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Number of Cycles is required');

    cy.get(rfpResponsePage.NumberOfCycles).type('ABC').blur();
    cy.get(rfpResponsePage.NumberOfCycles).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Number of Cycles is required');

    cy.get(rfpResponsePage.NumberOfCycles).type('1.24').blur();
    cy.get(rfpResponsePage.NumberOfCycles).should('have.value', '1.24');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(12) > :nth-child(3) > .mb-15').should('contain', 'Total Net Media Cost');
    cy.get(rfpResponsePage.totalMediaCost).should('contain', '$1,206.52')

    cy.get(':nth-child(14) > .campaign-form__header > .title').should('contain', 'Program Cost');
    cy.get(':nth-child(15) > :nth-child(1) > .title').should('contain', 'Net Install');
    cy.get(rfpResponsePage.netInstall).should('not.be.disabled');
    cy.get(`: nth - child(1) > .field > cad - input - group > .cad - input - group > .cad - input - group__label
      > .cad - input - group__addon > .cad - input - group__addon - icon`).should('contain', '$');

    cy.get(rfpResponsePage.netInstall).type('{del}{selectall}{backspace}').focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Install is required');

    cy.get(rfpResponsePage.netInstall).type('ABC').blur();
    cy.get(rfpResponsePage.netInstall).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Install is required');

    cy.get(rfpResponsePage.netInstall).type('153').blur();
    cy.get(rfpResponsePage.netInstall).should('have.value', '153.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(rfpResponsePage.packageCancel).click();

    cy.get('.unsaved-popup__title')
      .should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)')
      .should('contain', 'You have unsaved changes on this page.')
    cy.get('.unsaved-popup__text > :nth-child(2)')
      .should('contain', 'Are you sure you want to leave this page')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(rfpResponsePage.leaveBtn).should('not.be.disabled');
    cy.get(rfpResponsePage.stayBtn).should('not.be.disabled');

    cy.get(rfpResponsePage.stayBtn).click();

    cy.get(':nth-child(15) > :nth-child(2) > .title').should('contain', 'Production (Only if forced)');
    cy.get(rfpResponsePage.production).should('not.be.disabled');
    cy.get(`: nth - child(15) > : nth - child(2) > .field > cad - input - group > .cad - input - group
      > .cad - input - group__label > .cad - input - group__addon > .cad - input - group__addon - icon`).should('contain', '$');

    cy.get(rfpResponsePage.production).type('{del}{selectall}{backspace}').focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Production (Only if forced) is required');

    cy.get(rfpResponsePage.production).type('ABC').blur();
    cy.get(rfpResponsePage.production).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Production (Only if forced) is required');

    cy.get(rfpResponsePage.production).type('215').blur();
    cy.get(rfpResponsePage.production).should('have.value', '215.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(15) > :nth-child(3) > .mb-15').should('contain', 'Total Program Cost');
    cy.get(rfpResponsePage.programCost).should('contain', '$1,574.52 ');

    cy.get(':nth-child(17) > .campaign-form__header > .title').should('contain', 'Expires');
    cy.get(':nth-child(18) > .campaign-form__element > .title').should('contain', 'Hold Expiration Date');
    cy.get(rfpResponsePage.holdExpireDate).should('not.be.disabled');
    cy.get(`${rfpResponsePage.holdExpireDate}.cad - datepicker__input`)
      .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    cy.get(rfpResponsePage.holdExpireDate).click();
    // cy.get('.rfp-container__body-message-error').should('contain', 'End Date is required');
    cy.get(`.cad - month - calendar__header__icon--right > cad - icon > .icon`).click();
    cy.contains('25').click();

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(20) > .campaign-form__header > .title').should('contain', 'Methodology');

    cy.get(':nth-child(21) > :nth-child(1) > .title').should('contain', 'Illuminated');

    cy.get(rfpResponsePage.illuminated).should('not.be.disabled');

    cy.get(rfpResponsePage.illumYes).should('contain', 'Yes');
    cy.get(rfpResponsePage.illumYes)
      .should('be.visible')//.should('be.checked');

    cy.get(rfpResponsePage.illumNo).should('contain', 'No');
    cy.get(rfpResponsePage.illumNo)
      .should('be.visible').should('not.be.checked')
      .click({ force: true })//.should('be.checked');

    cy.get(rfpResponsePage.various).should('contain', 'Various');
    cy.get(rfpResponsePage.various)
      .should('be.visible').should('not.be.checked');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(22) > :nth-child(1) > .title').should('contain', 'Universe: 18+ yrs Weekly Geopath Impressions');
    cy.get(rfpResponsePage.Universe).should('not.be.disabled');
    cy.get(rfpResponsePage.Universe).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Universe: 18+ yrs Weekly Geopath Impressions is required');

    cy.get(rfpResponsePage.Universe).type('ABC').blur();
    cy.get(rfpResponsePage.Universe).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Universe: 18+ yrs Weekly Geopath Impressions is required');

    cy.get(rfpResponsePage.Universe).type('1342356767').blur();
    cy.get(rfpResponsePage.Universe).should('have.value', '1,342,356,767.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');
/* feature removed as enhancement
    cy.get(':nth-child(22) > :nth-child(2) > .title').should('contain', 'All: Adults by Age-Group - 18-49 yrs Weekly Geopath Impressions')
    cy.get(rfpResponsePage.all).should('not.be.disabled');
    cy.get(rfpResponsePage.all).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'All: Adults by Age-Group - 18-49 yrs Weekly Geopath Impressions is required');

    cy.get(rfpResponsePage.all).type('ABC').blur();
    cy.get(rfpResponsePage.all).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'All: Adults by Age-Group - 18-49 yrs Weekly Geopath Impressions is required');

    cy.get(rfpResponsePage.all).type('34565765').blur();
    cy.get(rfpResponsePage.all).should('have.value', '34,565,765.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');
*/
    cy.get(':nth-child(21) > :nth-child(2) > .title').should('contain', 'Methodology of Measurement');

    cy.get(rfpResponsePage.geoPath).should('contain', 'Geopath');
    cy.get(rfpResponsePage.geoPath)
      .should('be.visible')//.should('be.checked');

    cy.get(rfpResponsePage.other).should('contain', 'Other');
    cy.get(rfpResponsePage.other)
      .should('be.visible').should('not.be.checked')
      .click({ force: true })//.should('be.checked');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(22) > .campaign-form__element > .title').should('contain', 'Weekly Non-Geopath Measurement');
    cy.get(rfpResponsePage.NonGeopath).should('not.be.disabled');
    cy.get(rfpResponsePage.NonGeopath).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Weekly Non-Geopath Measurement is required');

    cy.get(rfpResponsePage.NonGeopath).type('ABC').blur();
    cy.get(rfpResponsePage.NonGeopath).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Weekly Non-Geopath Measurement is required');

    cy.get(rfpResponsePage.NonGeopath).type('2345567').blur();
    cy.get(rfpResponsePage.NonGeopath).should('have.value', '2,345,567.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('not.be.disabled');

    cy.get(':nth-child(24) > .campaign-form__header > .title').should('contain', 'Comments');
    cy.get(rfpResponsePage.comment).should('not.be.disabled');
    cy.get(rfpResponsePage.comment).type('sample test comment 2');
    cy.get(rfpResponsePage.comment).should('have.value', 'sample test comment 2');

    cy.get('.rfp-response-packages-title').should('contain', 'Units');
    cy.get('.uploader > .title_2').should('contain', 'Drop your file here');

    cy.get(rfpResponsePage.browse).should('not.be.disabled');
    cy.get(rfpResponsePage.browse).should('contain', 'Browse');

    cy.get('.title_6').should('contain', 'Supported file formats: .xls, .xlsx, .xlsm');
    cy.get('.mt-5').should('contain', 'Template (package-frames-template)');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('not.be.disabled');

    cy.get(rfpResponsePage.browse).click();

    // for (var i = 1; i < packUnits.length; i++) {
    const packageFileName = packUnits[1].trim();
    const yourFixturePath = testDataPath + packageFileName;
    cy.fixture(yourFixturePath, 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.get("input[type='file']").attachFile({
          fileContent,
          fileName: packageFileName,
          mimeType: 'application/vnd.ms-excel.sheet.macroEnabled.12',
          encoding: 'utf-8',
          filePath: yourFixturePath
        });
      })
      .wait(1000);

    cy.get('.cad-toast__title').should('contain', 'Proposal Unit(s) have been added.');

    cy.get('[data-automation="cad-link"]').first().should('not.be.disabled');
    cy.get('[data-automation="cad-link"]').first().should('contain', 'Import from File');

    cy.get('[data-automation="cad-link"]').last().should('not.be.disabled');
    cy.get('[data-automation="cad-link"]').last().should('contain', 'Download Template');

    cy.get(rfpResponsePage.responseFilterResults).should('not.be.disabled');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('not.be.disabled');

    cy.get(rfpResponsePage.packageCancel).click();

    cy.get('.unsaved-popup__title')
      .should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)')
      .should('contain', 'You have unsaved changes on this page.')
    cy.get('.unsaved-popup__text > :nth-child(2)')
      .should('contain', 'Are you sure you want to leave this page')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(rfpResponsePage.leaveBtn).should('not.be.disabled');
    cy.get(rfpResponsePage.stayBtn).should('not.be.disabled');

    cy.get(rfpResponsePage.stayBtn).click();

    //attach images to package frames
    for (var i = 0; i <= 2; i++) {
      cy.get('[row-index="' + (i) + '"] > .ag-cell > .icons > .img').click();
      cy.get('.response__header').should('contain', 'Pictures')

      cy.get('body').then((body) => {
        if (body.find('img.ng-star-inserted').length > 0) {
          cy.get('.response__body > cad-icon.ng-star-inserted > .icon').click();
        }
      });

      cy.get('.uploader > .title_2').should('contain', 'Drop your picture here');
      cy.get('.title_6').should('contain', 'Only .jpg or .png files less than 5 MB are allowed.')

      cy.get('cad-modal-content > :nth-child(1) > cad-icon.ng-star-inserted > .icon')
        .should('not.be.disabled');
      cy.get(rfpResponsePage.imgBrowseBtn).should('not.be.disabled');
      cy.get(rfpResponsePage.imgDoneBtn).should('not.be.disabled');

      cy.get(rfpResponsePage.imgBrowseBtn).should('contain', 'Browse');
      cy.get(rfpResponsePage.imgDoneBtn).should('contain', 'Done');

      const imageFixturePath = testDataPath + imageName[i];
      cy.get('cad-button > input[type="file"]').attachFile(imageFixturePath).wait(1000)

      cy.get(rfpResponsePage.imgDoneBtn).should('not.be.disabled');
      cy.get(rfpResponsePage.imgDoneBtn).should('contain', 'Done')
      cy.get(rfpResponsePage.imgDoneBtn).click()
    }

    cy.get(rfpResponsePage.packageCancel).click();

    cy.get('.unsaved-popup__title')
      .should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)')
      .should('contain', 'You have unsaved changes on this page.')
    cy.get('.unsaved-popup__text > :nth-child(2)')
      .should('contain', 'Are you sure you want to leave this page')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(rfpResponsePage.leaveBtn).should('not.be.disabled');
    cy.get(rfpResponsePage.stayBtn).should('not.be.disabled');

    cy.get(rfpResponsePage.stayBtn).click();

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).click().wait(3000);

    cy.get('.cad-toast__title').should('contain', ' RFP Package successfully created')
      .wait(1000);

    cy.get('.col-md-8 > .ng-star-inserted').wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        //     cy.wrap(parseInt(count)).should('be.gt', 0)
        if (parseInt(count) <= 10) {
          cy.get(`[data - automation="ooh-rfp-packages-table"] > ag - grid - angular > .ag - root - wrapper
      > .ag - root - wrapper - body > .ag - root > .ag - body - viewport > .ag - center - cols - clipper
      > .ag - center - cols - viewport > .ag - center - cols - container > .ag - row`)
            .should('have.length', count);
        }
      });
  })

  it('E2E Data Set 1 - Delete package', () => {
    cy.get(rfpResponsePage.btnDecline)
      .should('not.be.disabled')
      .should('contain', 'Decline');
    cy.get(rfpResponsePage.btnSendRFP).eq(1)
      .should('not.be.disabled')
      .should('contain', 'Add Response')
      .click().wait(1000);

    //delete package
    var count;
    cy.get('.col-md-8 > .ng-star-inserted').wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        //cy.wrap(parseInt(count)).should('be.gt', 0)
        if (parseInt(count) <= 10) {
          cy.get(`[data - automation="ooh-rfp-packages-table"] > ag - grid - angular > .ag - root - wrapper
      > .ag - root - wrapper - body > .ag - root > .ag - body - viewport > .ag - center - cols - clipper
      > .ag - center - cols - viewport > .ag - center - cols - container > .ag - row`)
            .should('have.length', count);
        }

        cy.get('[row-index="0"] > .ag-cell > .icons > .rfp-container__body-table__actions-edit')
          .should('not.be.disabled');
        cy.get(`.rfp - container__body - table > ag - grid - angular > .ag - root - wrapper > .ag - root - wrapper - body > .ag - root
      > .ag - body - viewport > .ag - pinned - right - cols - container > [row - index="0"] > .ag - cell > .icons > .trash`)
          .should('not.be.disabled');

        cy.get(`.rfp - container__body - table > ag - grid - angular > .ag - root - wrapper > .ag - root - wrapper - body > .ag - root
      > .ag - body - viewport > .ag - pinned - right - cols - container > [row - index="0"] > .ag - cell > .icons > .trash`).click();

        cy.get('.popup-title').should('contain', 'Delete Pacakge');
        cy.get('[data-automation="popup_close"] > .icon > use')
          .should('not.be.disabled');

        cy.get('.popup-description').should('contain',
          'Are you sure want to delete selected package(s)? This action will delete the package and saving is not required');

        cy.get(rfpResponsePage.deletaPackPopCancel)
          .should('not.be.disabled');
        cy.get(rfpResponsePage.deletaPackPopCancel)
          .should('contain', 'Cancel');
        cy.get(rfpResponsePage.deletaPackPopYes)
          .should('not.be.disabled');
        cy.get(rfpResponsePage.deletaPackPopYes)
          .should('contain', 'Yes');

        // Cancel first time
        cy.get(rfpResponsePage.deletaPackPopYes).click();

        cy.get('.col-md-8 > .ng-star-inserted').wait(1000)
          .then(($span) => {
            var count = $span.text().trim();
            //cy.wrap(parseInt(count)).should('be.gt', 0)
            if (parseInt(count) <= 10) {
              cy.get(`[data - automation="ooh-rfp-packages-table"] > ag - grid - angular > .ag - root - wrapper
      > .ag - root - wrapper - body > .ag - root > .ag - body - viewport > .ag - center - cols - clipper
      > .ag - center - cols - viewport > .ag - center - cols - container > .ag - row`)
                .should('have.length', count);
            }
          });

        cy.get('[row-index="0"] > .ag-cell > .icons > .rfp-container__body-table__actions-edit')
          .should('not.be.disabled');
        cy.get(`.rfp - container__body - table > ag - grid - angular > .ag - root - wrapper > .ag - root - wrapper - body > .ag - root
      > .ag - body - viewport > .ag - pinned - right - cols - container > [row - index="0"] > .ag - cell > .icons > .trash`)
          .should('not.be.disabled');

        cy.get(`.rfp - container__body - table > ag - grid - angular > .ag - root - wrapper > .ag - root - wrapper - body > .ag - root
      > .ag - body - viewport > .ag - pinned - right - cols - container > [row - index="0"] > .ag - cell > .icons > .trash`).click();

        cy.get('.popup-title').should('contain', 'Delete Pacakge');
        cy.get('[data-automation="popup_close"] > .icon > use')
          .should('not.be.disabled');

        cy.get('.popup-description').should('contain',
          'Are you sure want to delete selected package(s)? This action will delete the package and saving is not required');

        cy.get(rfpResponsePage.deletaPackPopCancel)
          .should('not.be.disabled');
        cy.get(rfpResponsePage.deletaPackPopCancel)
          .should('contain', 'Cancel');
        cy.get(rfpResponsePage.deletaPackPopYes)
          .should('not.be.disabled');
        cy.get(rfpResponsePage.deletaPackPopYes)
          .should('contain', 'Yes');

        cy.get(rfpResponsePage.deletaPackPopCancel).click();

      });

    cy.get('.col-md-8 > .ng-star-inserted').wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        //cy.wrap(parseInt(count)).should('be.gte', count)
        if (parseInt(count) <= 10) {
          cy.get(`[data - automation="ooh-rfp-packages-table"] > ag - grid - angular > .ag - root - wrapper
      > .ag - root - wrapper - body > .ag - root > .ag - body - viewport > .ag - center - cols - clipper
      > .ag - center - cols - viewport > .ag - center - cols - container > .ag - row`)
            .should('have.length', count);
        }
      });
  })

  it('E2E Data Set 1 - Create package 3', () => {
    cy.get(rfpResponsePage.btnDecline)
      .should('not.be.disabled')
      .should('contain', 'Decline');
    cy.get(rfpResponsePage.btnSendRFP).eq(1)
      .should('not.be.disabled')
      .should('contain', 'Add Response')
      .click().wait(1000);

    //create package 3
    cy.get('.pkg-btn > .cad-button').should('not.be.disabled');
    cy.get('.pkg-btn > .cad-button').should('contain', 'Create Package');
    cy.get('.pkg-btn > .cad-button').click();

    cy.get('.rfp-container__header__holder__wrapper-title').should('contain', 'New Package');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(1) > .campaign-form__header > .title').should('contain', 'General Information');

    cy.get(rfpResponsePage.packageTypeLabel).should('contain', 'Type');
    cy.get(rfpResponsePage.selectType).should('not.be.disabled');
    cy.get(rfpResponsePage.selectType).should('contain', 'Select Type');
    cy.get(rfpResponsePage.selectType).click().wait(1000);
    cy.get(rfpResponsePage.responseFilterResults).type(mediaType[2]).wait(1000);
    cy.get(rfpResponsePage.listItems).first().click();

    cy.get(':nth-child(2) > :nth-child(2) > .title').should('contain', 'Market');
    cy.get(rfpResponsePage.selectMarket).should('not.be.disabled');
    cy.get(rfpResponsePage.selectMarket).should('contain', 'Select Market');
    cy.get(rfpResponsePage.selectMarket).click().wait(1000);
    cy.get(rfpResponsePage.marketListItem).last().click();

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(rfpResponsePage.packageSizeLabel).should('contain', 'Size (Optional)');
    cy.get(rfpResponsePage.packageSize).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSize).type('200"x100"').blur();
    cy.get(rfpResponsePage.packageSize).should('have.value', '200"x100"');

    cy.get(':nth-child(3) > :nth-child(1) > .title').should('contain', 'Location Description');
    cy.get(rfpResponsePage.locationDesc).should('not.be.disabled');
    cy.get(rfpResponsePage.locationDesc).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Location Description is required');
    cy.get(rfpResponsePage.locationDesc).type('Location Description 3').blur();
    cy.get(rfpResponsePage.locationDesc).should('have.value', 'Location Description 3');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(rfpResponsePage.packageRationaleLabel).should('contain', 'Rationale (Optional)');
    cy.get(rfpResponsePage.rationale).should('not.be.disabled');
    cy.get(rfpResponsePage.rationale).type('Rationale 3').blur();
    cy.get(rfpResponsePage.rationale).should('have.value', 'Rationale 3');

    cy.get(rfpResponsePage.packageCancel).click();

    cy.get('.unsaved-popup__title')
      .should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)')
      .should('contain', 'You have unsaved changes on this page.')
    cy.get('.unsaved-popup__text > :nth-child(2)')
      .should('contain', 'Are you sure you want to leave this page')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(rfpResponsePage.leaveBtn).should('not.be.disabled');
    cy.get(rfpResponsePage.stayBtn).should('not.be.disabled');

    cy.get(rfpResponsePage.stayBtn).click();

    cy.get(':nth-child(5) > .campaign-form__header > .title').should('contain', 'Net Rates');

    cy.get(':nth-child(6) > :nth-child(1) > .title').should('contain', 'Units');
    cy.get(rfpResponsePage.units).should('not.be.disabled');
    cy.get(rfpResponsePage.units).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Units is required');

    cy.get(rfpResponsePage.units).type('ABC').blur();
    cy.get(rfpResponsePage.units).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Units is required');

    cy.get(rfpResponsePage.units).type('950').blur();
    cy.get(rfpResponsePage.units).should('have.value', '950');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(6) > :nth-child(2) > .title').should('contain', 'Net Rate Card');
    cy.get(rfpResponsePage.netRateCard).should('not.be.disabled');
    cy.get(`: nth - child(6) > : nth - child(2) > .field > cad - input - group > .cad - input - group
      > .cad - input - group__label > .cad - input - group__addon > .cad - input - group__addon - icon`)
      .should('contain', '$');
    cy.get(rfpResponsePage.netRateCard).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Rate Card is required');

    cy.get(rfpResponsePage.netRateCard).type('ABC').blur();
    cy.get(rfpResponsePage.netRateCard).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Rate Card is required');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(rfpResponsePage.netRateCard).type('1750').blur();
    cy.get(rfpResponsePage.netRateCard).should('have.value', '1,750.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(':nth-child(6) > :nth-child(3) > .title').should('contain', 'Net Negotiated Rate');
    cy.get(rfpResponsePage.netNegoRate).should('not.be.disabled');
    cy.get(`: nth - child(3) > .field > cad - input - group > .cad - input - group > .cad - input - group__label
      > .cad - input - group__addon > .cad - input - group__addon - icon`)
      .should('contain', '$');
    cy.get(rfpResponsePage.netNegoRate).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Negotiated Rate is required');

    cy.get(rfpResponsePage.netNegoRate).type('ABC').blur();
    cy.get(rfpResponsePage.netNegoRate).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Negotiated Rate is required');

    cy.get(rfpResponsePage.netNegoRate).type('1170').blur();
    cy.get(rfpResponsePage.netNegoRate).should('have.value', '1,170.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(rfpResponsePage.packageCancel).click();

    cy.get('.unsaved-popup__title')
      .should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)')
      .should('contain', 'You have unsaved changes on this page.')
    cy.get('.unsaved-popup__text > :nth-child(2)')
      .should('contain', 'Are you sure you want to leave this page')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(rfpResponsePage.leaveBtn).should('not.be.disabled');
    cy.get(rfpResponsePage.stayBtn).should('not.be.disabled');

    cy.get(rfpResponsePage.stayBtn).click();

    cy.get(':nth-child(4) > .mb-15').should('contain', '% Discount');
    cy.get(rfpResponsePage.discount).should('contain', '33.14%');

    cy.get(':nth-child(8) > .campaign-form__header > .title').should('contain', 'Flight Dates');
    cy.get(':nth-child(9) > :nth-child(1) > .title').should('contain', 'Start Date');
    cy.get(rfpResponsePage.flightDateStart).should('not.be.disabled');
    cy.get(`${rfpResponsePage.flightDateStart} > div > cad - dropdown > div > div > div
      > div > .cad - datepicker__head > .cad - datepicker__input`)
      .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    cy.get(rfpResponsePage.flightDateStart).click();
    cy.get('.rfp-container__body-message-error').should('contain', 'Start Date is required');
    cy.get(`.cad - month - calendar__header__icon--right > cad - icon > .icon`).click();
    cy.contains('12').click();
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(9) > :nth-child(2) > .title').should('contain', 'End Date');
    cy.get(rfpResponsePage.flightDateEnd).should('not.be.disabled');
    cy.get(`${rfpResponsePage.flightDateEnd} > div > cad - dropdown > div > div > div
      > div > .cad - datepicker__head > .cad - datepicker__input`)
      .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    cy.get(rfpResponsePage.flightDateEnd).click();
    cy.get('.rfp-container__body-message-error').should('contain', 'End Date is required');
    cy.get(`.cad - month - calendar__header__icon--right > cad - icon > .icon`).click();
    cy.contains('26').click();
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(rfpResponsePage.packageCancel).click();

    cy.get('.unsaved-popup__title')
      .should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)')
      .should('contain', 'You have unsaved changes on this page.')
    cy.get('.unsaved-popup__text > :nth-child(2)')
      .should('contain', 'Are you sure you want to leave this page')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(rfpResponsePage.leaveBtn).should('not.be.disabled');
    cy.get(rfpResponsePage.stayBtn).should('not.be.disabled');

    cy.get(rfpResponsePage.stayBtn).click();

    cy.get(':nth-child(11) > .campaign-form__header > .title').should('contain', 'Media Cost');
    cy.get(':nth-child(12) > :nth-child(1) > .title').should('contain', 'Cycle Type');
    cy.get(rfpResponsePage.cycleType).should('not.be.disabled');
    cy.get(rfpResponsePage.cycleType).should('contain', 'Select Cycle Type');
    cy.get(rfpResponsePage.cycleType).click();
    cy.get(':nth-child(3) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').click();

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(12) > :nth-child(2) > .title').should('contain', 'Number of Cycles');
    cy.get(rfpResponsePage.NumberOfCycles).should('not.be.disabled');
    cy.get(rfpResponsePage.NumberOfCycles).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Number of Cycles is required');

    cy.get(rfpResponsePage.NumberOfCycles).type('ABC').blur();
    cy.get(rfpResponsePage.NumberOfCycles).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Number of Cycles is required');

    cy.get(rfpResponsePage.NumberOfCycles).type('2.60').blur();
    cy.get(rfpResponsePage.NumberOfCycles).should('have.value', '2.60');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(12) > :nth-child(3) > .mb-15').should('contain', 'Total Net Media Cost');
    cy.get(rfpResponsePage.totalMediaCost).should('contain', '$3,042.00')

    cy.get(':nth-child(14) > .campaign-form__header > .title').should('contain', 'Program Cost');
    cy.get(':nth-child(15) > :nth-child(1) > .title').should('contain', 'Net Install');
    cy.get(rfpResponsePage.netInstall).should('not.be.disabled');
    cy.get(`: nth - child(1) > .field > cad - input - group > .cad - input - group > .cad - input - group__label
      > .cad - input - group__addon > .cad - input - group__addon - icon`).should('contain', '$');

    cy.get(rfpResponsePage.netInstall).type('{del}{selectall}{backspace}').focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Install is required');

    cy.get(rfpResponsePage.netInstall).type('ABC').blur();
    cy.get(rfpResponsePage.netInstall).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Net Install is required');

    cy.get(rfpResponsePage.netInstall).type('320').blur();
    cy.get(rfpResponsePage.netInstall).should('have.value', '320.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(rfpResponsePage.packageCancel).click();

    cy.get('.unsaved-popup__title')
      .should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)')
      .should('contain', 'You have unsaved changes on this page.')
    cy.get('.unsaved-popup__text > :nth-child(2)')
      .should('contain', 'Are you sure you want to leave this page')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(rfpResponsePage.leaveBtn).should('not.be.disabled');
    cy.get(rfpResponsePage.stayBtn).should('not.be.disabled');

    cy.get(rfpResponsePage.stayBtn).click();

    cy.get(':nth-child(15) > :nth-child(2) > .title').should('contain', 'Production (Only if forced)');
    cy.get(rfpResponsePage.production).should('not.be.disabled');
    cy.get(`: nth - child(15) > : nth - child(2) > .field > cad - input - group > .cad - input - group
      > .cad - input - group__label > .cad - input - group__addon > .cad - input - group__addon - icon`).should('contain', '$');

    cy.get(rfpResponsePage.production).type('{del}{selectall}{backspace}').focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Production (Only if forced) is required');

    cy.get(rfpResponsePage.production).type('ABC').blur();
    cy.get(rfpResponsePage.production).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Production (Only if forced) is required');

    cy.get(rfpResponsePage.production).type('270').blur();
    cy.get(rfpResponsePage.production).should('have.value', '270.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(15) > :nth-child(3) > .mb-15').should('contain', 'Total Program Cost');
    cy.get(rfpResponsePage.programCost).should('contain', '$3,632.00');

    cy.get(':nth-child(17) > .campaign-form__header > .title').should('contain', 'Expires');
    cy.get(':nth-child(18) > .campaign-form__element > .title').should('contain', 'Hold Expiration Date');
    cy.get(rfpResponsePage.holdExpireDate).should('not.be.disabled');
    cy.get(`${rfpResponsePage.holdExpireDate}.cad - datepicker__input`)
      .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    cy.get(rfpResponsePage.holdExpireDate).click();
    // cy.get('.rfp-container__body-message-error').should('contain', 'End Date is required');
    cy.get(`.cad - month - calendar__header__icon--right > cad - icon > .icon`).click();
    cy.contains('16').click();

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(20) > .campaign-form__header > .title').should('contain', 'Methodology');

    cy.get(':nth-child(21) > :nth-child(1) > .title').should('contain', 'Illuminated');

    cy.get(rfpResponsePage.illuminated).should('not.be.disabled');

    cy.get(rfpResponsePage.illumYes).should('contain', 'Yes');
    cy.get(rfpResponsePage.illumYes)
      .should('be.visible')//.should('be.checked');

    cy.get(rfpResponsePage.illumNo).should('contain', 'No');
    cy.get(rfpResponsePage.illumNo)
      .should('be.visible').should('not.be.checked')
    //.click({ force: true })//.should('be.checked');

    cy.get(rfpResponsePage.various).should('contain', 'Various');
    cy.get(rfpResponsePage.various)
      .should('be.visible').should('not.be.checked');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(22) > :nth-child(1) > .title').should('contain', 'Universe: 18+ yrs Weekly Geopath Impressions');
    cy.get(rfpResponsePage.Universe).should('not.be.disabled');
    cy.get(rfpResponsePage.Universe).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'Universe: 18+ yrs Weekly Geopath Impressions is required');

    cy.get(rfpResponsePage.Universe).type('ABC').blur();
    cy.get(rfpResponsePage.Universe).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'Universe: 18+ yrs Weekly Geopath Impressions is required');

    cy.get(rfpResponsePage.Universe).type('1342356767').blur();
    cy.get(rfpResponsePage.Universe).should('have.value', '1,342,356,767.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');
/* feature removed as enhancement
    cy.get(':nth-child(22) > :nth-child(2) > .title').should('contain', 'All: Adults by Age-Group - 18-49 yrs Weekly Geopath Impressions')
    cy.get(rfpResponsePage.all).should('not.be.disabled');
    cy.get(rfpResponsePage.all).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', 'All: Adults by Age-Group - 18-49 yrs Weekly Geopath Impressions is required');

    cy.get(rfpResponsePage.all).type('ABC').blur();
    cy.get(rfpResponsePage.all).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', 'All: Adults by Age-Group - 18-49 yrs Weekly Geopath Impressions is required');

    cy.get(rfpResponsePage.all).type('87634537568').blur();
    cy.get(rfpResponsePage.all).should('have.value', '87,634,537,568.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');
*/
    cy.get(':nth-child(21) > :nth-child(2) > .title').should('contain', 'Methodology of Measurement');

    cy.get(rfpResponsePage.geoPath).should('contain', 'Geopath');
    cy.get(rfpResponsePage.geoPath)
      .should('be.visible')//.should('be.checked');

    cy.get(rfpResponsePage.other).should('contain', 'Other');
    cy.get(rfpResponsePage.other)
      .should('be.visible').should('not.be.checked')

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(22) > :nth-child(3) > .title').should('contain', '(Target Demo) 4 Wk IMPs ');
    cy.get(rfpResponsePage.TargetDemo).should('not.be.disabled');
    cy.get(rfpResponsePage.TargetDemo).focus().blur();
    cy.get('.rfp-container__body-message-error').should('contain', '(Target Demo) 4 Wk IMPs is required');

    cy.get(rfpResponsePage.TargetDemo).type('ABC').blur();
    cy.get(rfpResponsePage.TargetDemo).should('be.empty');
    cy.get('.rfp-container__body-message-error').should('contain', '(Target Demo) 4 Wk IMPs is required');

    cy.get(rfpResponsePage.TargetDemo).type('4654321654').blur();
    cy.get(rfpResponsePage.TargetDemo).should('have.value', '4,654,321,654.00');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('not.be.disabled');

    cy.get(':nth-child(24) > .campaign-form__header > .title').should('contain', 'Comments');
    cy.get(rfpResponsePage.comment).should('not.be.disabled');
    cy.get(rfpResponsePage.comment).type('sample test comment 3');
    cy.get(rfpResponsePage.comment).should('have.value', 'sample test comment 3');

    cy.get('.rfp-response-packages-title').should('contain', 'Units');
    cy.get('.uploader > .title_2').should('contain', 'Drop your file here');

    cy.get(rfpResponsePage.browse).should('not.be.disabled');
    cy.get(rfpResponsePage.browse).should('contain', 'Browse');

    cy.get('.title_6').should('contain', 'Supported file formats: .xls, .xlsx, .xlsm');
    cy.get('.mt-5').should('contain', 'Template (package-frames-template)');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('not.be.disabled');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('not.be.disabled');

    cy.get(rfpResponsePage.packageCancel).click();

    cy.get('.unsaved-popup__title')
      .should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)')
      .should('contain', 'You have unsaved changes on this page.')
    cy.get('.unsaved-popup__text > :nth-child(2)')
      .should('contain', 'Are you sure you want to leave this page')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(rfpResponsePage.leaveBtn).should('not.be.disabled');
    cy.get(rfpResponsePage.stayBtn).should('not.be.disabled');

    cy.get(rfpResponsePage.stayBtn).click();

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).click().wait(3000);

    cy.get('.cad-toast__title').should('contain', ' RFP Package successfully created')
      .wait(1000);

    cy.get('.col-md-8 > .ng-star-inserted').wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        //     cy.wrap(parseInt(count)).should('be.gt', 0)
        if (parseInt(count) <= 10) {

          cy.get(`[data - automation="ooh-rfp-packages-table"] > ag - grid - angular > .ag - root - wrapper
      > .ag - root - wrapper - body > .ag - root > .ag - body - viewport > .ag - center - cols - clipper
      > .ag - center - cols - viewport > .ag - center - cols - container > .ag - row`)
            .should('have.length', count);
        }
      });
  })

  it('E2E Data Set 1 - Add Attachments', () => {
    cy.get(rfpResponsePage.btnDecline)
      .should('not.be.disabled')
      .should('contain', 'Decline');
    cy.get(rfpResponsePage.btnSendRFP).eq(1)
      .should('not.be.disabled')
      .should('contain', 'Add Response')
      .click().wait(1000);

    // Attachments  
    cy.get('.shared-attachment__header > .title_2').should('contain', 'Attachments')
    cy.get('.title_2 > .title')
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gte', 0)
      });

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

    cy.get('.title_2 > .title').wait(1000)
      .then(($span) => {
        var count = parseInt($span.text().trim());
        cy.wrap(count).should('be.gte', 0)
        if (count > 0) {

          var pages = (count / 5).toString().split('.')[0].trim()
          var rows = (count / 5).toString().split('.')[1].trim()
          cy.log(pages)
          cy.log(rows)
          if (count > 5)
            cy.get(rfpResponsePage.nextPage).last().should('not.be.disabled');

          for (var i = 0; i < parseInt(pages); i++)
            cy.get(rfpResponsePage.nextPage).last().click()

          cy.get(rfpResponsePage.attachemntsRows).should('have.length', (parseInt(rows) / 2));
        }
      });

    cy.get(':nth-child(5) > .rfp-container__body-title').should('contain', 'Comments');
    cy.get('.rfp-container__body__sections__section-white-wrapper > .ng-valid')
      .should('have.attr', 'placeholder', 'Maximum limit: 4000 Characters')
    cy.get('.rfp-container__body__sections__section-white-wrapper').should('not.be.disabled');
    cy.get('.maxCharsLabel').should('contain', '4000 Characters left');

    cy.get('.rfp-container__body__sections__section-white-wrapper').type("sample comment to response");

    cy.get('.maxCharsLabel').should('contain', '3974 Characters left');

    cy.get(rfpResponsePage.footerCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.footerSave).should('not.be.disabled');
    cy.get(rfpResponsePage.footerSendResponse).should('not.be.disabled');

    cy.get(rfpResponsePage.footerSave).click();

    cy.get('.cad-toast__title').should('contain', 'Saved as draft');

  })

  it('E2E Data Set 1 - Send Response', () => {
    cy.get(rfpResponsePage.btnDecline)
      .should('not.be.disabled')
      .should('contain', 'Decline');
    cy.get(rfpResponsePage.btnSendRFP).eq(1)
      .should('not.be.disabled')
      .should('contain', 'Add Response')
      .click().wait(1000);

    cy.get(rfpResponsePage.footerCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.footerSave).should('not.be.disabled');
    cy.get(rfpResponsePage.footerSendResponse).should('not.be.disabled');

    cy.get(rfpResponsePage.footerSendResponse).click();

    cy.get('.popup-title').should('contain', 'Send Response');
    cy.get('[data-automation="popup_close"] > .icon > use')
      .should('not.be.disabled');

    cy.get('.popup-description').should('contain',
      `Are you sure that you want to send the response ? After sending, you will be able to edit it only if the planner changes RFP`);

    cy.get(rfpResponsePage.deletaPackPopCancel)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.deletaPackPopCancel)
      .should('contain', 'Cancel');
    cy.get(rfpResponsePage.deletaPackPopYes)
      .should('not.be.disabled');
    cy.get(rfpResponsePage.deletaPackPopYes)
      .should('contain', 'Send');

    cy.get(rfpResponsePage.deletaPackPopYes).click();

    // cy.get('.cad-toast__title').should('contain', 'Proposal Unit(s) have been submitted.');
    cy.get('.cad-toast__title').should('contain', 'Proposal Sent');

    cy.get(rfpResponsePage.btnDecline).should('not.be.disabled');
    cy.get(rfpResponsePage.btnDecline).should('contain', 'Decline');
    cy.get(rfpResponsePage.viewResponse).eq(1).should('not.be.disabled');
    cy.get(rfpResponsePage.viewResponse).eq(1).should('contain', 'View Response');
    cy.get(rfpResponsePage.btnSendRFP).eq(1).eq(2).should('not.be.disabled');
    cy.get(rfpResponsePage.btnSendRFP).eq(1).eq(2).should('contain', 'Add Response');

    cy.get('.cad-status__text').should('contain', 'Proposal Sent');

    cy.get(rfpResponsePage.viewResponse).eq(1).click().wait(2000);
    cy.get(rfpResponsePage.viewRFP).should('not.be.disabled');
    cy.get(rfpResponsePage.viewRFP).should('contain', 'View Rfp');

    //validate units count
    cy.get(rfpResponsePage.responseUnitsCount).wait(1000)
      .then(($span) => {
        var Unitscount = $span.text().trim();
        cy.wrap(parseInt(Unitscount)).should('be.gt', 0)

        if (parseInt(Unitscount) <= 10)
          cy.get('.ag-pinned-left-cols-container > .ag-row').should('have.length', parseInt(Unitscount));

        if (parseInt(Unitscount) > 0) {
          cy.get(rfpResponsePage.deleteAll)
            .should('contain', ' Delete All ')
            .should('not.be.disabled');

          cy.get(rfpResponsePage.downloadUnits)
            .should('contain', ' Download Units ')
            .should('not.be.disabled')
            .click().wait(500);

          cy.get('.cad-toast').should('contain', 'Proposal units downloaded')
        }
      });

    cy.get(rfpResponsePage.viewResponseRFP).first().click().wait(2000);

    cy.get(rfpResponsePage.btnDecline).should('not.be.disabled');
    cy.get(rfpResponsePage.btnDecline).should('contain', 'Decline');
    cy.get(rfpResponsePage.viewResponse).eq(1).should('not.be.disabled');
    cy.get(rfpResponsePage.viewResponse).eq(1).should('contain', 'View Response');
    cy.get(rfpResponsePage.btnSendRFP).eq(1).eq(2).should('not.be.disabled');
    cy.get(rfpResponsePage.btnSendRFP).eq(1).eq(2).should('contain', 'Add Response');

  })

  //OOH-4599
  it('E2E Data set 1 - Package frames Delete All', () => {
    cy.get(rfpResponsePage.btnSendRFP)
      .eq(1)
      .click()
      .wait(1000);

    //create package 
    cy.get(rfpResponsePage.createPackage)
      .click();

    cy.get(rfpResponsePage.packageTypeLabel)
    cy.get(rfpResponsePage.selectType)
      .click()
      .wait(1000);
    cy.get(rfpResponsePage.responseFilterResults)
      .type(mediaType[0])
      .wait(1000);
    cy.get(rfpResponsePage.listItems)
      .click();

    cy.get(rfpResponsePage.selectMarket)
      .click()
      .wait(1000);
    cy.get(rfpResponsePage.marketListItem)
      .eq(0)
      .click();

    cy.get(rfpResponsePage.packageSize)
      .type('400"x400"')

    cy.get(rfpResponsePage.locationDesc)
      .type('Location Description 1')

    cy.get(rfpResponsePage.rationale)
      .type('Rationale 1').blur()

    cy.get(rfpResponsePage.units)
      .type('ABC')
      .blur()

    cy.get(rfpResponsePage.units)
      .type('1000')

    cy.get(rfpResponsePage.netRateCard)
      .type('ABC')

    cy.get(rfpResponsePage.netRateCard)
      .type('1500');

    cy.get(rfpResponsePage.netNegoRate)
      .type('1450').blur();

    cy.get(rfpResponsePage.flightDateStart)
      .click();
    cy.get(rfpResponsePage.packageCalanderDays)
      .click();
    cy.contains('10')
      .click();

    let startDate: string = "";
    var startDate_ = new Date();
    startDate_.setMonth(startDate_.getMonth() + 1);
    startDate = (parseInt(startDate_.getMonth().toString()) + 1) + '/' + "10" + '/' + startDate_.getFullYear()
    cy.log(startDate.toString())

    cy.get(`${rfpResponsePage.flightDateEnd} > div > cad-dropdown > div > div > div 
          > div > .cad-datepicker__head > .cad-datepicker__input`)
      .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    cy.get(rfpResponsePage.flightDateEnd)
      .click();
    cy.get(rfpResponsePage.packageCalanderDays)
      .click();
    cy.get(rfpResponsePage.activeDates).contains('25').click();

    let endDate: string = "";
    var endDate_ = new Date();
    endDate_.setMonth(endDate_.getMonth() + 1);
    endDate = (parseInt(endDate_.getMonth().toString()) + 1) + '/' + "25" + '/' + endDate_.getFullYear()
    cy.log(endDate.toString())

    cy.get(rfpResponsePage.cycleType)
      .click();
    cy.get(rfpResponsePage.cycleTypeDaily)
      .click();

    cy.get(rfpResponsePage.NumberOfCycles)
      .type('3.74')

    cy.get(rfpResponsePage.netInstall)
      .type('200')

    cy.get(rfpResponsePage.production)
      .type('150')

    cy.get(rfpResponsePage.holdExpireDate)
      .click();
    cy.get(rfpResponsePage.packageCalanderDays)
      .click();
    cy.get(rfpResponsePage.activeDates).contains('25').click();

    cy.get(rfpResponsePage.illumNo)
      .click({ force: true })

    cy.get(rfpResponsePage.Universe)
      .type('1342356767')
/* feature removed as enhancement
    cy.get(rfpResponsePage.all)
      .type('87634537568')
*/
    cy.get(rfpResponsePage.other)
      .click({ force: true })

    cy.get(rfpResponsePage.NonGeopath)
      .type('4654321654')

    cy.get(rfpResponsePage.comment)
      .type('sample test comment 1')

    //validate package count
    cy.get(rfpResponsePage.packUnitsCount).wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        cy.get(rfpResponsePage.responsePackageRows)
          .should('have.length', count);
      });

    let AllIds: string[] = addByID[3].split(',').slice()

    //add by ID 
    cy.get(rfpResponsePage.packAddbyID)
      .click();

    cy.get(rfpResponsePage.addByIdSearch)
      .type(AllIds.slice(0, 2).toString());

    cy.get(rfpResponsePage.addByIdSearchBtn)
      .click()
      .wait(1000);

    let idsLen: string[];
    idsLen = AllIds.slice(0, 2);
    if (idsLen.length <= 10) {
      cy.get(rfpResponsePage.popupunitCount)
        .find('tr')
        .should('have.length', (idsLen.length));
    }

    if (idsLen.length > 0) {
      for (var i = 1; i <= (idsLen.length); i++) {
        cy.get(':nth-child(' + i + ') > :nth-child(6) > cad-link > .cad-link')
          .click();
      }
    }

    cy.get(rfpResponsePage.addByIdDone)
      .click()
      .wait(2000);

    //validate package count
    cy.get(rfpResponsePage.packUnitsCount).wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        if (parseInt(count) > 0) {
          cy.get(rfpResponsePage.packUnitsRowsCount)
            .should('have.length', count);
        }
      });

    //save package
    cy.get(rfpResponsePage.packageSave)
      .click()
      .wait(2000);

    cy.get(rfpResponsePage.editLastPack)
      .click()
      .wait(2000);

    cy.scrollTo('bottom');

    var existUnitsCount: integer;
    cy.get(rfpResponsePage.packUnitsCount).wait(1000)
      .then(($span) => {
        existUnitsCount = parseInt($span.text().trim());
        cy.get(rfpResponsePage.packUnitsRowsCount)
          .should('have.length', existUnitsCount);
      })

    //add by ID 
    cy.get(rfpResponsePage.packAddbyID)
      .click();

    cy.get(rfpResponsePage.addByIdSearch)
      .should('not.be.disabled')
      .type(AllIds.slice(2, 4).toString());

    cy.get(rfpResponsePage.addByIdSearchBtn)
      .click()
      .wait(1000);

    // let idsLen: string[];
    idsLen = AllIds.slice(2, 4);
    if (idsLen.length <= 10) {
      cy.get(rfpResponsePage.popupunitCount)
        .find('tr')
        .should('have.length', (idsLen.length));
    }

    if (idsLen.length > 0) {
      for (var i = 1; i <= (idsLen.length); i++) {
        cy.get(':nth-child(' + i + ') > :nth-child(6) > cad-link > .cad-link')
          .click();
      }
    }

    cy.get(rfpResponsePage.addByIdDone)
      .click()
      .wait(2000);

    //validate package count
    cy.get(rfpResponsePage.packUnitsCount).wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        if (parseInt(count) > 0) {
          cy.get(rfpResponsePage.packUnitsRowsCount)
            .should('have.length', count);
        }
      });

    //delete button click
    cy.get(rfpResponsePage.packUnitsDeleteAll).click();

    cy.get(rfpResponsePage.deleteConfPopupTitle)
      .should('contain', 'Confirm Delete')

    cy.get(rfpResponsePage.deleteConfpopupmsg)
      .should('contain', 'Are you sure want to delete all records?')

    cy.get(rfpResponsePage.deleteConfpopupNo)
      .should('not.be.disabled')
      .should('contain', 'No')

    cy.get(rfpResponsePage.deleteConfpopupYes)
      .should('contain', 'Yes')
      .click()
      .wait(2000);

    // validate package count
    cy.get(rfpResponsePage.packUnitsCount).wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count))
          .should('be.lte', 0)
      });

    cy.get(rfpResponsePage.packageCancel)
      .click();

    cy.get(rfpResponsePage.leaveBtn)
      .click()
      .wait(2000);

    cy.get(rfpResponsePage.editLastPack)
      .click()
      .wait(2000);

    cy.scrollTo('bottom');

    //validate package count
    cy.get(rfpResponsePage.packUnitsCount).wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count))
          .should('be.lte', existUnitsCount)
        if (parseInt(count) > 0) {
          cy.get(rfpResponsePage.packUnitsRowsCount)
            .should('have.length', existUnitsCount);
        }
      });

    //Import from file 
    const packageFileName = packUnits[2].trim();
    const yourFixturePath = testDataPath + packageFileName;
    cy.fixture(yourFixturePath, 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.get("input[type='file']").attachFile({
          fileContent,
          fileName: packageFileName,
          mimeType: 'application/vnd.ms-excel.sheet.macroEnabled.12',
          encoding: 'utf-8',
          filePath: yourFixturePath
        });
      })
      .wait(1000);

    //validate package count
    cy.get(rfpResponsePage.packUnitsCount).wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        if (parseInt(count) > 0) {
          cy.get(rfpResponsePage.packUnitsRowsCount)
            .should('have.length', count);
        }
      });

    //delete button click
    cy.get(rfpResponsePage.packUnitsDeleteAll)
      .click();

    cy.get(rfpResponsePage.deleteConfPopupTitle)
      .should('contain', 'Confirm Delete')

    cy.get(rfpResponsePage.deleteConfpopupmsg)
      .should('contain', 'Are you sure want to delete all records?')

    cy.get(rfpResponsePage.deleteConfpopupNo)
      .should('contain', 'No')
      .click();

    //validate package count
    cy.get(rfpResponsePage.packUnitsCount).wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        if (parseInt(count) > 0) {
          cy.get(rfpResponsePage.packUnitsRowsCount)
            .should('have.length', count);
        }
      });

    cy.get(rfpResponsePage.packUnitsDeleteAll)
      .click();

    cy.get(rfpResponsePage.deleteConfpopupYes)
      .should('contain', 'Yes')
      .click()
      .wait(2000);

    cy.get(rfpResponsePage.packageCancel)
      .click();

    cy.get(rfpResponsePage.leaveBtn)
      .click()
      .wait(2000);

    cy.get(rfpResponsePage.editLastPack)
      .click()
      .wait(2000);

    cy.scrollTo('bottom');

    //validate package count
    cy.get(rfpResponsePage.packUnitsCount).wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count))
          .should('be.lte', existUnitsCount)
        if (parseInt(count) > 0) {
          cy.get(rfpResponsePage.packUnitsRowsCount)
            .should('have.length', existUnitsCount);
        }
      });

    //add by id and import from file 
    cy.get(rfpResponsePage.packAddbyID)
      .click();

    cy.get(rfpResponsePage.addByIdSearch)
      .should('not.be.disabled')
      .type(AllIds.slice(2, 4).toString());

    cy.get(rfpResponsePage.addByIdSearchBtn)
      .click()
      .wait(1000);

    idsLen = AllIds.slice(2, 4);
    if (idsLen.length <= 10) {
      cy.get(rfpResponsePage.popupunitCount)
        .find('tr')
        .should('have.length', (idsLen.length));
    }

    cy.get(rfpResponsePage.selectAll)
      .click();

    cy.get(rfpResponsePage.addByIdDone)
      .click()
      .wait(2000);

    //validate package count
    cy.get(rfpResponsePage.packUnitsCount).wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        if (parseInt(count) > 0) {
          cy.get(rfpResponsePage.packUnitsRowsCount)
            .should('have.length', count);
        }
      });

    //Import from file 
    cy.fixture(yourFixturePath, 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.get("input[type='file']").attachFile({
          fileContent,
          fileName: packageFileName,
          mimeType: 'application/vnd.ms-excel.sheet.macroEnabled.12',
          encoding: 'utf-8',
          filePath: yourFixturePath
        });
      })
      .wait(1000);

    //validate package count
    cy.get(rfpResponsePage.packUnitsCount).wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        if (parseInt(count) > 0) {
          cy.get(rfpResponsePage.packUnitsRowsCount)
            .should('have.length', count);
        }
      });

    //delete button click
    cy.get(rfpResponsePage.packUnitsDeleteAll)
      .click();

    cy.get(rfpResponsePage.deleteConfPopupTitle)
      .should('contain', 'Confirm Delete')

    cy.get(rfpResponsePage.deleteConfpopupmsg)
      .should('contain', 'Are you sure want to delete all records?')

    cy.get(rfpResponsePage.deleteConfpopupNo)
      .should('not.be.disabled')
      .should('contain', 'No')

    cy.get(rfpResponsePage.deleteConfpopupYes)
      .should('contain', 'Yes')
      .click()
      .wait(2000);

    // validate package count
    cy.get(rfpResponsePage.packUnitsCount).wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count))
          .should('be.lte', 0)

      });

    cy.get(rfpResponsePage.packageSave)
      .click()
      .wait(2000);

    cy.get(rfpResponsePage.editLastPack)
      .click()
      .wait(2000);

    cy.scrollTo('bottom');

    //validate package count
    cy.get(rfpResponsePage.packUnitsCount).wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count))
          .should('be.lte', 0)
        cy.get(rfpResponsePage.packUnitsRowsCount)
          .should('have.length', 0);
      });

  })

});


