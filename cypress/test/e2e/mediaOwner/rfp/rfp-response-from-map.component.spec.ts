import { PageAction } from '../../../../support/PageAction';
import { equal } from 'assert';
import { config } from 'cypress/types/bluebird';
import 'cypress-file-upload';
import { parse } from 'path';
import { eq, isInteger, toPairs } from 'cypress/types/lodash';
import { contains } from 'cypress/types/jquery';
import { integer } from 'aws-sdk/clients/cloudfront';
import { RfpListPage } from '@support/pages'

let epicName = 'RFP Response';
let featureName = 'Response to RFP\'s';
let tag = '';

const rfpListPage = new RfpListPage();
const rfpResponsePage = PageAction.rfpResponsePage();;

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

let index = -2;


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
      fileNamesUpload = config.fileNamesUpload;
      importFromFile = config.importFromFile;
      addByID = config.addByID;
      imageName = config.imageName;
      mediaType = config.mediaType;
      packUnits = config.packUnits
      campaignName = config.campaignName[2].name;

    })
  })

  beforeEach(() => {
    Report.testDetails(epicName, featureName, tag);
  });

  it('E2E Positive Scenario - Map - RFP View and Respond', () => {

    cy.loginAsMoLamarUS();
    rfpListPage.visit();
    rfpListPage.changeLocation('United States');
 
    //Basic details
    rfpListPage.getNavBarTitle().should('contain', 'RFPs');
    rfpListPage.searchAndSelectRfp(campaignName);
    

    cy.get(PageAction.rfpResponsePage().btnDecline).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().btnDecline).should('contain', 'Decline');
    cy.get(PageAction.rfpResponsePage().btnSendRFP).should('not.be.disabled');
    cy.get(PageAction.rfpResponsePage().btnSendRFP).should('contain', 'Add Response');
    cy.get('.campaign-container__title--holder > .title').should('contain', campaignName);

    cy.get(PageAction.rfpResponsePage().toggle).should('contain', 'Basic Details').should('contain', 'Inventory')

    cy.get('campaign-detail-basic.ng-star-inserted > :nth-child(1) > .col-md-12 > .title').should('contain', 'General Information')

    cy.get(':nth-child(2) > :nth-child(1) > .campaign-container__element > .campaign-container__element__label')
      .should('contain', 'Objective')
    cy.get(PageAction.rfpResponsePage().object).should('contain', Objective[4]);

    cy.get(PageAction.rfpResponsePage().agency).should('contain', Agency[5]);
    cy.get(':nth-child(2) > :nth-child(2) > .campaign-container__element > .campaign-container__element__label')
      .should('contain', 'Agency')

    cy.get(':nth-child(3) > .campaign-container__element > .campaign-container__element__label')
      .should('contain', 'Client')
    cy.get(PageAction.rfpResponsePage().client).should('contain', Client[5]);

    cy.get(':nth-child(3) > :nth-child(1) > .campaign-container__element > .campaign-container__element__label')
      .should('contain', 'Budget')
    cy.get(PageAction.rfpResponsePage().budget).should('contain', '$500,000.00')

    cy.get(':nth-child(3) > :nth-child(2) > .campaign-container__element > .campaign-container__element__label')
      .should('contain', 'Campaign Dates')

    var fromdate = new Date();
    fromdate.setMonth(fromdate.getMonth() + 2);
    const fromDate = fromdate.toLocaleString('default', { month: 'short' }) + " 12, " +
      fromdate.toLocaleString('default', { year: 'numeric' });

    var todate = new Date();
    todate.setMonth(todate.getMonth() + 2);
    const toDate = todate.toLocaleString('default', { month: 'short' }) + " 24, " +
      todate.toLocaleString('default', { year: 'numeric' });

    console.log(fromdate + '--' + todate)
    cy.log(fromdate + '--' + todate)

    cy.get(':nth-child(3) > :nth-child(2) > .campaign-container__element > .campaign-container__element__text')
      .should('contain', fromDate + ' - ' + toDate)

    cy.get(':nth-child(4) > .campaign-container__element > .campaign-container__element__label')
      .should('contain', 'Campaign Description')
    cy.get(':nth-child(4) > .campaign-container__element > .campaign-container__element__text')
      .should('contain', campaignName)

    cy.get('.content-market-table__pl-0').should('contain', 'Los Angeles, CA')
    cy.get('.content-market-table__tr > :nth-child(2)').should('contain', 'DMA')

    cy.get('.content-market-table__tr > :nth-child(3) > .ng-star-inserted').should('contain', fromDate)
    cy.get(':nth-child(4) > .ng-star-inserted').should('contain', toDate);

    cy.get('.campaign-market-view__header > .title > :nth-child(1)').should('contain', 'Markets');
    cy.get('.content-count')
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gt', 0)
        if (parseInt(count) > 10) {
          cy.get(rfpResponsePage.nextPage).should('not.be.disabled');
        }
        else
          cy.get('.table > tbody').find('tr').should('have.length', count);
      });

    cy.get('.col-md-8 > .title').should('contain', 'Demographics');
    cy.get('.mb-20 > :nth-child(1) > .campaign-container__element__label').should('contain', 'Primary Audience');
    cy.get('.mb-20 > :nth-child(1) > .campaign-container__element__text').should('contain', 'Adult 18+');

    cy.get(':nth-child(2) > .campaign-container__element__label').should('contain', 'Secondary Audience');
    cy.get(':nth-child(2) > .campaign-container__element__text').should('contain', campaignName);

    cy.get('.shared-attachment__header').should('contain', 'Attachments');
    cy.get('.title_2 > .title')
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gt', 0)
        if (parseInt(count) > 5)
          cy.get(rfpResponsePage.nextPage).should('not.be.disabled');
        else
          cy.get(rfpResponsePage.attachmentsrow).should('have.length', count);

      });
    cy.get(rfpResponsePage.download).should('not.be.disabled');

    cy.get(':nth-child(12) > .campaign-container__element > .title').should('contain', 'Comment')
    cy.get(':nth-child(12) > .campaign-container__element > .campaign-container__element__text')
      .should('contain', campaignName);

    //Inventory
    cy.get('[value="Inventory"] > .button-toggle > a').should('contain', 'Inventory').click().wait(1000);
    cy.get(rfpResponsePage.viewInMap).should('not.be.disabled');
    cy.get(rfpResponsePage.viewInMap).should('contain', 'VIEW IN MAP');

    cy.get('.campaign-container__media-formatwrap > .panel-head__text').should('contain', 'Media Formats')
    cy.get(rfpResponsePage.mediaFormatCount)
      .then(($span) => {
        var mediacount = $span.text().trim();
        cy.wrap(parseInt(mediacount)).should('be.gt', 0)
        if (parseInt(mediacount) > 10)
          cy.get(rfpResponsePage.nextPage).should('not.be.disabled');
        else
          cy.get(rfpResponsePage.mediaFormatRow).should('have.length', mediacount);


        cy.get('section.ng-star-inserted > :nth-child(1) > .panel-head__text').should('contain', 'Units');
        cy.get(rfpResponsePage.unitsCount).wait(1000)
          .then(($span) => {
            var count = $span.text().trim();
            cy.wrap(parseInt(count)).should('be.gt', 0)
            if (parseInt(count) > 10)
              cy.get(rfpResponsePage.nextPage).should('not.be.disabled');
            else {
              const mediaAndUnits = parseInt(count) + parseInt(mediacount)
              cy.get(rfpResponsePage.unitsRow).should('have.length', mediaAndUnits);
            }
          });
      });

    cy.get(rfpResponsePage.poiTitle).should('contain', 'Points of Interest');
    cy.get(rfpResponsePage.poiCount)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gt', 0)
        if (parseInt(count) > 10)
          cy.get(rfpResponsePage.nextPage).should('not.be.disabled');
        else
          cy.get(rfpResponsePage.poiRow).should('have.length', count);
      });

    //Add response
    cy.get(rfpResponsePage.btnDecline).should('not.be.disabled');
    cy.get(rfpResponsePage.btnSendRFP).should('not.be.disabled');

    cy.get(rfpResponsePage.btnSendRFP).click().wait(1000);
    //// cy.get('.cad-toast__title').should('contain', 'RFP Accepted');

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
    cy.get('.rfp-container__body-title > span').wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        assert.equal(parseInt(count), 0, 'units count should be 0')
      });

    cy.get('.col-md-8 > .ng-star-inserted').wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        if (parseInt(count) > 10) {
          cy.get(rfpResponsePage.nextPage).should('not.be.disabled');
        }
        else {
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

    cy.get(rfpResponsePage.addByID).should('not.be.disabled');

    cy.get(rfpResponsePage.importFromFile).should('not.be.disabled');
    cy.get(rfpResponsePage.importFromFile).should('contain', 'Import from File');

    cy.get(rfpResponsePage.downloadTemplate).should('not.be.disabled');
    cy.get(rfpResponsePage.downloadTemplate).should('contain', 'Download Template');


    cy.get('.col-md-8 > .ng-star-inserted').wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        if (parseInt(count) > 10) {
          cy.get(rfpResponsePage.nextPage).should('not.be.disabled');
        }
        else {
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

    cy.get(rfpResponsePage.footerCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.footerSave).should('not.be.disabled');
    cy.get(rfpResponsePage.footerSendResponse).should('be.disabled');

    //Add units by ID
    cy.get(rfpResponsePage.addByID).click();
    cy.get(`.response__list__modal__search-field > cad-search-input > .cad-search >
       .cad-search__input`).should('not.be.disabled');

    cy.get('[data-automation="popup_close"] > .icon').should('not.be.disabled');

    cy.get('.response__list__modal__header').should('contain', 'Add by ID');
    cy.get(`.response__list__modal__search-field > cad-search-input >
        .cad-search > .cad-search__input > .ng-pristine`)
      .should('have.attr', 'placeholder', 'Search by Unit ID or Geopath ID')

    cy.get(rfpResponsePage.addByIdSearchBtn)
      .should('not.be.disabled');
    cy.get('.response__list__modal__search-helptext').should('contain',
      'Key in ID\'s (multiple ID separated by a comma ‘,’ ) and hit Search button to browse the units.');
    cy.get('.response__list__modal__body-table-none-title').should('contain',
      'Use search to browse the units');
    cy.get('.response__list__modal__body-message').should('contain',
      'Please note: To propose Non-Audited Units, Please use Import from File Option');

    cy.get(rfpResponsePage.addByIdCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.addByIdDone).should('be.disabled');

    cy.get(`.response__list__modal__search-field > cad-search-input > .cad-search >
        .cad-search__input`).type(addByID[0]);
    cy.get(rfpResponsePage.addByIdSearchBtn).click();

    let idsLen: string[] = addByID[0].split(',');
    if (idsLen.length > 0) {
      if (idsLen.length > 10)
        cy.get(rfpResponsePage.nextPage).should('not.be.disabled');
      else
        cy.get('.response__list__modal__body > .ng-star-inserted > tbody').find('tr').should('have.length', (idsLen.length));
    }
    if (idsLen.length > 0) {
      for (var i = 1; i <= idsLen.length; i++) {
        cy.get(':nth-child(' + i + ') > :nth-child(6) > cad-link > .cad-link').should('not.be.disabled');
        cy.get(':nth-child(' + i + ') > :nth-child(6) > cad-link > .cad-link').click();
      }
    }

    cy.get(rfpResponsePage.addByIdDone).click();

    cy.get('.rfp-container__body-title > span').wait(1000)
      .then(($span) => {
        var Unitscount = $span.text().trim();
        cy.wrap(parseInt(Unitscount)).should('be.gt', 0)
        if (parseInt(Unitscount) > 200)
          cy.get(rfpResponsePage.nextPage).should('not.be.disabled');
        else
          cy.get('.ag-pinned-left-cols-container > .ag-row').should('have.length', Unitscount);
      });

    cy.get('.col-md-8 > .ng-star-inserted').wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        if (parseInt(count) > 10) {
          cy.get(rfpResponsePage.nextPage).should('not.be.disabled');
        }
        else {
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

    cy.get('.pkg-btn > .cad-button').should('not.be.disabled');
    cy.get('.pkg-btn > .cad-button').click();

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

    cy.get('cad-modal-content-pure > :nth-child(1) > cad-icon.ng-star-inserted > .icon').should('not.be.disabled');
    cy.get(rfpResponsePage.leaveBtn).should('not.be.disabled');
    cy.get(rfpResponsePage.stayBtn).should('not.be.disabled');

    cy.get(rfpResponsePage.stayBtn).click();

    // let rateCard: string[] = ['393', '433', '473', '513', '553'];
    // let netNegoatiable: string[] = ['394', '434', '474', '514', '554'];
    // let startDate: string[] = ['396', '436', '476', '516', '556'];
    // let endDate: string[] = ['397', '437', '477', '517', '557'];
    // let cycleType: string[] = ['398', '438', '478', '518', '558'];
    // let noCycles: string[] = ['399', '439', '479', '519', '559'];
    // let netInstall: string[] = ['401', '441', '481', '521', '561'];
    // let prodCost: string[] = ['402', '442', '482', '522', '562'];

    let rateCard: string[] = ['393', '433', '473', '513', '553'];
    let netNegoatiable: string[] = ['394', '434', '474', '514', '554'];
    let startDate: string[] = ['235', '275', '315', '355', '395'];
    let endDate: string[] = ['236', '276', '316', '356', '396'];
    let cycleType: string[] = ['237', '277', '317', '357', '397'];
    let noCycles: string[] = ['399', '439', '479', '519', '559'];
    let netInstall: string[] = ['401', '441', '481', '521', '561'];
    let prodCost: string[] = ['402', '442', '482', '522', '562'];

    let splString = 'asdfghjklPOIUYTREWQ~!@#,\'$%^&*()_+|}{":?><\/1234567890'

    for (var i = 0; i < idsLen.length; i++) {
      if (i == 0) {
        cy.get('[row-index="' + i + '"] > [aria-colindex="22"]').dblclick();
        cy.wait(500);
        cy.get('[row-index="' + i + '"] > [aria-colindex="22"]').type(splString.substring(0, 10)).focus().blur();																						  
        cy.get('[row-index="' + i + '"] > [aria-colindex="22"]').should('contain', splString.substring(0, 10));
        cy.get('[row-index="' + i + '"] > [aria-colindex="23"]').click().type(splString.substring(22, 35)).focus().blur();
        cy.get('[row-index="' + i + '"] > [aria-colindex="23"]').click().type(splString.substring(22, 35)).focus().blur();
        cy.get('[row-index="' + i + '"] > [aria-colindex="23"]').should('contain', splString.substring(22, 35));
        cy.get('[row-index="' + i + '"] > [aria-colindex="24"]').click().type(splString.substring(6, 14)).focus().blur();
        cy.get('[row-index="' + i + '"] > [aria-colindex="24"]').should('contain', splString.substring(6, 14));
      }
      else {
        cy.get('[row-index="' + i + '"] > [aria-colindex="22"]').click().type(splString.substring((i * 6), ((i * 2) * 6))).focus().blur();
        cy.get('[row-index="' + i + '"] > [aria-colindex="22"]').should('contain', splString.substring((i * 6), ((i * 2) * 6)));
        cy.get('[row-index="' + i + '"] > [aria-colindex="23"]').click().type(splString.substring((i * 3), ((i * 3) * 6))).focus().blur();
        cy.get('[row-index="' + i + '"] > [aria-colindex="23"]').should('contain', splString.substring((i * 3), ((i * 3) * 6)));
        cy.get('[row-index="' + i + '"] > [aria-colindex="24"]').click().type(splString.substring((i * 10), (i * 4))).focus().blur();
        cy.get('[row-index="' + i + '"] > [aria-colindex="24"]').should('contain', splString.substring((i * 10), (i * 4)));
      }
    }


    cy.get(rfpResponsePage.headerCancel).should('not.be.disabled');
   

    //cy.get('.cad-toast__title').should('contain', 'proposal unit(s) have been added');

    cy.get(rfpResponsePage.headerCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.headerSave).should('not.be.disabled');
    cy.get(rfpResponsePage.headerSendResponse).should('not.be.disabled');

    cy.get(rfpResponsePage.headerSave).click();
    // cy.get('.cad-toast__title').should('contain', 'Save as draft');

    cy.get('.cad-search__input').should('not.be.disabled');
    cy.get('.cad-search__input > .ng-pristine')
      .should('have.attr', 'placeholder', 'Filter Results');

    //delete added unit 
    cy.get('rfp-response-frames > .rfp-container__body-title').should('contain', 'Units');
    cy.wait(1000);
    cy.get('[row-index="0"] > .ag-cell > .icons > .trash').click();
    cy.get('[row-index="3"] > .ag-cell > .icons > .trash').click();

    cy.get('.rfp-container__body-title > span').wait(1000)
      .then(($span) => {
        let unitsCount = parseInt($span.text().trim());
        cy.get('.ag-pinned-left-cols-container > .ag-row').should('have.length', unitsCount);
      });
cy.get(rfpResponsePage.headerSave).click();

// Create Package 1
cy.get('.pkg-btn > .cad-button').should('not.be.disabled');
cy.get('.pkg-btn > .cad-button').should('contain', 'Create Package');
cy.get('.pkg-btn > .cad-button').click();

cy.get('.rfp-container__header__holder__wrapper-title').should('contain', 'New Package');

cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
cy.get(rfpResponsePage.packageSave).should('be.disabled');

cy.get(':nth-child(1) > .campaign-form__header > .title').should('contain', 'General Information');

cy.get('.cad-panel > :nth-child(2) > :nth-child(1) > .title').should('contain', 'Type');
cy.get(rfpResponsePage.selectType).should('not.be.disabled');
cy.get(rfpResponsePage.selectType).should('contain', 'Select Type');
cy.get(rfpResponsePage.selectType).click().wait(1000);
cy.get('.cad-search__input').type(mediaType[0]).wait(1000);
cy.get('.list-item').click();

cy.get(':nth-child(2) > :nth-child(2) > .title').should('contain', 'Market');
cy.get(rfpResponsePage.selectMarket).should('not.be.disabled');
cy.get(rfpResponsePage.selectMarket).should('contain', 'Select Market');
cy.get(rfpResponsePage.selectMarket).click().wait(1000);
cy.get('.list-item__text').eq(0).click();

cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
cy.get(rfpResponsePage.packageSave).should('be.disabled');

cy.get(':nth-child(2) > :nth-child(3) > .title').should('contain', 'Size (Optional)');
cy.get(rfpResponsePage.packageSize).should('not.be.disabled');
cy.get(rfpResponsePage.packageSize).type('400"x400"').blur();
cy.get(rfpResponsePage.packageSize).should('have.value', '400"x400"');

cy.get(':nth-child(3) > :nth-child(1) > .title').should('contain', 'Location Description');
cy.get(rfpResponsePage.locationDesc).should('not.be.disabled');
cy.get(rfpResponsePage.locationDesc).focus().blur();
cy.get('.rfp-container__body-message-error').should('contain', 'Location Description is required');
cy.get(rfpResponsePage.locationDesc).type('Location Description 1').blur();
cy.get(rfpResponsePage.locationDesc).should('have.value', 'Location Description 1');
cy.get('.rfp-container__body-message-error').should('not.exist');

cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
cy.get(rfpResponsePage.packageSave).should('be.disabled');

cy.get(':nth-child(3) > :nth-child(2) > .title').should('contain', 'Rationale (Optional)');
cy.get(rfpResponsePage.rationale).should('not.be.disabled');
cy.get(rfpResponsePage.rationale).type('Rationale 1').blur();
cy.get(rfpResponsePage.rationale).should('have.value', 'Rationale 1');

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

cy.get(rfpResponsePage.units).type('1000').blur();
cy.get(rfpResponsePage.units).should('have.value', '1000');
cy.get('.rfp-container__body-message-error').should('not.exist');

cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
cy.get(rfpResponsePage.packageSave).should('be.disabled');

cy.get(':nth-child(6) > :nth-child(2) > .title').should('contain', 'Net Rate Card');
cy.get(rfpResponsePage.netRateCard).should('not.be.disabled');
cy.get(`:nth-child(6) > :nth-child(2) > .field > cad-input-group > .cad-input-group 
> .cad-input-group__label > .cad-input-group__addon > .cad-input-group__addon-icon`)
  .should('contain', '$');
cy.get(rfpResponsePage.netRateCard).focus().blur();
cy.get('.rfp-container__body-message-error').should('contain', 'Net Rate Card is required');

cy.get(rfpResponsePage.netRateCard).type('ABC').blur();
cy.get(rfpResponsePage.netRateCard).should('be.empty');
cy.get('.rfp-container__body-message-error').should('contain', 'Net Rate Card is required');

cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
cy.get(rfpResponsePage.packageSave).should('be.disabled');

cy.get(rfpResponsePage.netRateCard).type('1500').blur();
cy.get(rfpResponsePage.netRateCard).should('have.value', '1,500.00');
cy.get('.rfp-container__body-message-error').should('not.exist');

cy.get(':nth-child(6) > :nth-child(3) > .title').should('contain', 'Net Negotiated Rate');
cy.get(rfpResponsePage.netNegoRate).should('not.be.disabled');
cy.get(`:nth-child(3) > .field > cad-input-group > .cad-input-group > .cad-input-group__label 
> .cad-input-group__addon > .cad-input-group__addon-icon`)
  .should('contain', '$');
cy.get(rfpResponsePage.netNegoRate).focus().blur();
cy.get('.rfp-container__body-message-error').should('contain', 'Net Negotiated Rate is required');

cy.get(rfpResponsePage.netNegoRate).type('ABC').blur();
cy.get(rfpResponsePage.netNegoRate).should('be.empty');
cy.get('.rfp-container__body-message-error').should('contain', 'Net Negotiated Rate is required');

cy.get(rfpResponsePage.netNegoRate).type('1450').blur();
cy.get(rfpResponsePage.netNegoRate).should('have.value', '1,450.00');
cy.get('.rfp-container__body-message-error').should('not.exist');

cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
cy.get(rfpResponsePage.packageSave).should('be.disabled');

cy.get(rfpResponsePage.packageCancel).click();

cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
cy.get(rfpResponsePage.leaveBtn).should('not.be.disabled');
cy.get(rfpResponsePage.stayBtn).should('not.be.disabled');

cy.get(rfpResponsePage.stayBtn).click();

cy.get(':nth-child(4) > .mb-15').should('contain', '% Discount');
cy.get(rfpResponsePage.discount).should('contain', '3.33%');

cy.get(':nth-child(8) > .campaign-form__header > .title').should('contain', 'Flight Dates');
cy.get(':nth-child(9) > :nth-child(1) > .title').should('contain', 'Start Date');
cy.get(rfpResponsePage.flightDateStart).should('not.be.disabled');
cy.get(`${rfpResponsePage.flightDateStart} > div > cad-dropdown > div > div > div 
> div > .cad-datepicker__head > .cad-datepicker__input`)
  .should('have.attr', 'placeholder', 'MM/DD/YYYY');
cy.get(rfpResponsePage.flightDateStart).click();
cy.get('.rfp-container__body-message-error').should('contain', 'Start Date is required');
cy.get(`.cad-month-calendar__header__icon--right > cad-icon > .icon`).click();
cy.contains('10').click();
cy.get('.rfp-container__body-message-error').should('not.exist');

cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
cy.get(rfpResponsePage.packageSave).should('be.disabled');

cy.get(':nth-child(9) > :nth-child(2) > .title').should('contain', 'End Date');
cy.get(`${rfpResponsePage.flightDateEnd} > div > cad-dropdown > div > div > div 
> div > .cad-datepicker__head > .cad-datepicker__input`)
  .should('have.attr', 'placeholder', 'MM/DD/YYYY');
cy.get(rfpResponsePage.flightDateEnd).click();
cy.get('.rfp-container__body-message-error').should('contain', 'End Date is required');
cy.get(`.cad-month-calendar__header__icon--right > cad-icon > .icon`).click();
cy.contains('25').click();
cy.get('.rfp-container__body-message-error').should('not.exist');

cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
cy.get(rfpResponsePage.packageSave).should('be.disabled');

cy.get(rfpResponsePage.packageCancel).click();

cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
cy.get(rfpResponsePage.leaveBtn).should('not.be.disabled');
cy.get(rfpResponsePage.stayBtn).should('not.be.disabled');

cy.get(rfpResponsePage.stayBtn).click();

cy.get(':nth-child(11) > .campaign-form__header > .title').should('contain', 'Media Cost');
cy.get(':nth-child(12) > :nth-child(1) > .title').should('contain', 'Cycle Type');
cy.get(rfpResponsePage.cycleType).should('not.be.disabled');
cy.get(rfpResponsePage.cycleType).should('contain', 'Select Cycle Type');
cy.get(rfpResponsePage.cycleType).click();
cy.get(':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item').click();

cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
cy.get(rfpResponsePage.packageSave).should('be.disabled');

cy.get(':nth-child(12) > :nth-child(2) > .title').should('contain', 'Number of Cycles');
cy.get(rfpResponsePage.NumberOfCycles).should('not.be.disabled');
cy.get(rfpResponsePage.NumberOfCycles).focus().blur();
cy.get('.rfp-container__body-message-error').should('contain', 'Number of Cycles is required');

cy.get(rfpResponsePage.NumberOfCycles).type('ABC').blur();
cy.get(rfpResponsePage.NumberOfCycles).should('be.empty');
cy.get('.rfp-container__body-message-error').should('contain', 'Number of Cycles is required');

cy.get(rfpResponsePage.NumberOfCycles).type('3.74').blur();
cy.get(rfpResponsePage.NumberOfCycles).should('have.value', '3.74');
cy.get('.rfp-container__body-message-error').should('not.exist');

cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
cy.get(rfpResponsePage.packageSave).should('be.disabled');

cy.get(':nth-child(12) > :nth-child(3) > .mb-15').should('contain', 'Total Net Media Cost');
cy.get(rfpResponsePage.totalMediaCost).should('contain', '$5,423.00')

cy.get(':nth-child(14) > .campaign-form__header > .title').should('contain', 'Program Cost');
cy.get(':nth-child(15) > :nth-child(1) > .title').should('contain', 'Net Install');
cy.get(rfpResponsePage.netInstall).should('not.be.disabled');
cy.get(`:nth-child(1) > .field > cad-input-group > .cad-input-group > .cad-input-group__label 
> .cad-input-group__addon > .cad-input-group__addon-icon`).should('contain', '$');

cy.get(rfpResponsePage.netInstall).type('{del}{selectall}{backspace}').focus().blur();
cy.get('.rfp-container__body-message-error').should('contain', 'Net Install is required');

cy.get(rfpResponsePage.netInstall).type('ABC').blur();
cy.get(rfpResponsePage.netInstall).should('be.empty');
cy.get('.rfp-container__body-message-error').should('contain', 'Net Install is required');

cy.get(rfpResponsePage.netInstall).type('200').blur();
cy.get(rfpResponsePage.netInstall).should('have.value', '200.00');
cy.get('.rfp-container__body-message-error').should('not.exist');

cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
cy.get(rfpResponsePage.packageSave).should('be.disabled');

cy.get(rfpResponsePage.packageCancel).click();

cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
cy.get(rfpResponsePage.leaveBtn).should('not.be.disabled');
cy.get(rfpResponsePage.stayBtn).should('not.be.disabled');

cy.get(rfpResponsePage.stayBtn).click();

cy.get(':nth-child(15) > :nth-child(2) > .title').should('contain', 'Production (Only if forced)');
cy.get(rfpResponsePage.production).should('not.be.disabled');
cy.get(`:nth-child(15) > :nth-child(2) > .field > cad-input-group > .cad-input-group 
> .cad-input-group__label > .cad-input-group__addon > .cad-input-group__addon-icon`).should('contain', '$');

cy.get(rfpResponsePage.production).type('{del}{selectall}{backspace}').focus().blur();
cy.get('.rfp-container__body-message-error').should('contain', 'Production (Only if forced) is required');

cy.get(rfpResponsePage.production).type('ABC').blur();
cy.get(rfpResponsePage.production).should('be.empty');
cy.get('.rfp-container__body-message-error').should('contain', 'Production (Only if forced) is required');

cy.get(rfpResponsePage.production).type('150').blur();
cy.get(rfpResponsePage.production).should('have.value', '150.00');
cy.get('.rfp-container__body-message-error').should('not.exist');

cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
cy.get(rfpResponsePage.packageSave).should('be.disabled');

cy.get(':nth-child(15) > :nth-child(3) > .mb-15').should('contain', 'Total Program Cost');
cy.get(rfpResponsePage.programCost).should('contain', '$5,773.00');

cy.get(':nth-child(17) > .campaign-form__header > .title').should('contain', 'Expires');
cy.get(':nth-child(18) > .campaign-form__element > .title').should('contain', 'Hold Expiration Date');
cy.get(rfpResponsePage.holdExpireDate).should('not.be.disabled');
cy.get(`${rfpResponsePage.holdExpireDate} .cad-datepicker__input`)
  .should('have.attr', 'placeholder', 'MM/DD/YYYY');
cy.get(rfpResponsePage.holdExpireDate).click();
// cy.get('.rfp-container__body-message-error').should('contain', 'End Date is required');
cy.get(`.cad-month-calendar__header__icon--right > cad-icon > .icon`).click();
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
  .click({ force: true })//.wait(500).should('be.checked');

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

cy.get(':nth-child(21) > :nth-child(2) > .title').should('contain', 'Methodology of Measurement');

cy.get(rfpResponsePage.geoPath).should('contain', 'Geopath');
cy.get(rfpResponsePage.geoPath)
  .should('be.visible')//.should('be.checked');

cy.get(rfpResponsePage.other).should('contain', 'Other');
cy.get(rfpResponsePage.other)
  .should('be.visible').should('not.be.checked')
  .click({ force: true })//.wait(500).should('be.checked');

cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
cy.get(rfpResponsePage.packageSave).should('be.disabled');

cy.get(':nth-child(22) > .campaign-form__element > .title').should('contain', 'Weekly Non-Geopath Measurement');
cy.get(rfpResponsePage.NonGeopath).should('not.be.disabled');
cy.get(rfpResponsePage.NonGeopath).focus().blur();
cy.get('.rfp-container__body-message-error').should('contain', 'Weekly Non-Geopath Measurement is required');

cy.get(rfpResponsePage.NonGeopath).type('ABC').blur();
cy.get(rfpResponsePage.NonGeopath).should('be.empty');
cy.get('.rfp-container__body-message-error').should('contain', 'Weekly Non-Geopath Measurement is required');

cy.get(rfpResponsePage.NonGeopath).type('4654321654').blur();
cy.get(rfpResponsePage.NonGeopath).should('have.value', '4,654,321,654.00');
cy.get('.rfp-container__body-message-error').should('not.exist');

cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
cy.get(rfpResponsePage.packageSave).should('not.be.disabled');

cy.get(':nth-child(24) > .campaign-form__header > .title').should('contain', 'Comments');
cy.get(rfpResponsePage.comment).should('not.be.disabled');
cy.get(rfpResponsePage.comment).type('sample test comment 1');
cy.get(rfpResponsePage.comment).should('have.value', 'sample test comment 1');

cy.get('.rfp-response-packages-title').should('contain', 'Units');
cy.get('.uploader > .title_2').should('contain', 'Drop your file here');

cy.get(rfpResponsePage.browse).should('not.be.disabled');
cy.get(rfpResponsePage.browse).should('contain', 'Browse');

cy.get('.title_6').should('contain', 'Supported file formats: .xls, .xlsx, .xlsm');
cy.get('.mt-5').should('contain', 'Template (package-frames-template)');

cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
cy.get(rfpResponsePage.packageSave).should('not.be.disabled');

cy.get(rfpResponsePage.browse).click();

for (var i = 0; i < packUnits.length; i++) {
  const imageFixturePath = testDataPath + packUnits[i];
  cy.get('cad-button > input[type="file"]').attachFile(imageFixturePath).wait(8000)
}
cy.get('.cad-toast__title').should('contain', 'Proposal Unit(s) have been added.');

cy.get('[data-automation="cad-link"]').should('not.be.disabled');
cy.get('[data-automation="cad-link"]').should('contain', 'Import from File');

cy.get('.cad-search__input').should('not.be.disabled');

cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
cy.get(rfpResponsePage.packageSave).should('not.be.disabled');

cy.get(rfpResponsePage.packageCancel).click();

cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

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
    if (parseInt(count) > 0) {
      if (parseInt(count) > 10) {
        cy.get(rfpResponsePage.nextPage).should('not.be.disabled');
      }
      else
        cy.get(`[data-automation="ooh-rfp-packages-table"] > ag-grid-angular > .ag-root-wrapper  
             > .ag-root-wrapper-body > .ag-root > .ag-body-viewport > .ag-center-cols-clipper  
             > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row`)
          .should('have.length', count);
    }
  });



    //attach images to audited units
    for (var i = 0; i < 2; i++) {
      cy.get('[row-index="' + (i) + '"] > .ag-cell > .icons > .img').click();

      cy.get('.response__header').should('contain', 'Pictures')
      cy.get('cad-modal-content > :nth-child(1) > cad-icon.ng-star-inserted > .icon')
        .should('not.be.disabled');
      cy.get('.response__body > cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');

      cy.get('.response__body > cad-icon.ng-star-inserted > .icon > use').click();

      cy.get('.uploader > .title_2').should('contain', 'Drop your picture here');
      cy.get('.title_6').should('contain', 'Only .jpg or .png files less than 5 MB are allowed.')

      cy.get(rfpResponsePage.imgBrowseBtn).should('not.be.disabled');
      cy.get('.uploader > :nth-child(3) > cad-button > .cad-button').should('contain', 'Browse');

      const imageFixturePath = testDataPath + imageName[i];
      cy.get('cad-button > input[type="file"]').attachFile(imageFixturePath).wait(1000)

      cy.get(rfpResponsePage.imgDoneBtn).should('not.be.disabled');
      cy.get(rfpResponsePage.imgDoneBtn).should('contain', 'Done')
      cy.get(rfpResponsePage.imgDoneBtn).click()
    }
    
/*
    //attach images to non-audited units
    for (var i = 0; i < 5; i++) {
      cy.get('[row-index="' + (i + 11) + '"] > .ag-cell > .icons > .img').click();

      cy.get('.response__header').should('contain', 'Pictures')
      cy.get('cad-modal-content > :nth-child(1) > cad-icon.ng-star-inserted > .icon')
        .should('not.be.disabled');

      cy.get('.uploader > .title_2').should('contain', 'Drop your picture here');
      cy.get('.title_6').should('contain', 'Only .jpg or .png files less than 5 MB are allowed.')

      cy.get(rfpResponsePage.imgBrowseBtn).should('not.be.disabled');
      cy.get('.uploader > :nth-child(3) > cad-button > .cad-button').should('contain', 'Browse');

      const imageFixturePath = testDataPath + imageName[i];
      cy.get('cad-button > input[type="file"]').attachFile(imageFixturePath).wait(1000)

      cy.get(rfpResponsePage.imgDoneBtn).should('not.be.disabled');
      cy.get(rfpResponsePage.imgDoneBtn).should('contain', 'Done')
      cy.get(rfpResponsePage.imgDoneBtn).click()
    }
*/

cy.get(rfpResponsePage.headerSave).click();

    //create package 2
    cy.get('.pkg-btn > .cad-button').should('not.be.disabled');
    cy.get('.pkg-btn > .cad-button').should('contain', 'Create Package');
    cy.get('.pkg-btn > .cad-button').click();

    cy.get('.rfp-container__header__holder__wrapper-title').should('contain', 'New Package');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(1) > .campaign-form__header > .title').should('contain', 'General Information');

    cy.get('.cad-panel > :nth-child(2) > :nth-child(1) > .title').should('contain', 'Type');
    cy.get(rfpResponsePage.selectType).should('not.be.disabled');
    cy.get(rfpResponsePage.selectType).should('contain', 'Select Type');
    cy.get(rfpResponsePage.selectType).click().wait(1000);
    cy.get('.cad-search__input').type(mediaType[1]).wait(1000);
    cy.get('.list-item').click();

    cy.get(':nth-child(2) > :nth-child(2) > .title').should('contain', 'Market');
    cy.get(rfpResponsePage.selectMarket).should('not.be.disabled');
    cy.get(rfpResponsePage.selectMarket).should('contain', 'Select Market');
    cy.get(rfpResponsePage.selectMarket).click().wait(1000);
    cy.get('.list-item__text').eq(0).click();

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(2) > :nth-child(3) > .title').should('contain', 'Size (Optional)');
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

    cy.get(':nth-child(3) > :nth-child(2) > .title').should('contain', 'Rationale (Optional)');
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
    cy.get(`:nth-child(6) > :nth-child(2) > .field > cad-input-group > .cad-input-group 
    > .cad-input-group__label > .cad-input-group__addon > .cad-input-group__addon-icon`)
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
    cy.get(`:nth-child(3) > .field > cad-input-group > .cad-input-group > .cad-input-group__label 
    > .cad-input-group__addon > .cad-input-group__addon-icon`)
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

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(rfpResponsePage.leaveBtn).should('not.be.disabled');
    cy.get(rfpResponsePage.stayBtn).should('not.be.disabled');

    cy.get(rfpResponsePage.stayBtn).click();

    cy.get(':nth-child(4) > .mb-15').should('contain', '% Discount');
    cy.get(rfpResponsePage.discount).should('contain', '-648.46%');

    cy.get(':nth-child(8) > .campaign-form__header > .title').should('contain', 'Flight Dates');
    cy.get(':nth-child(9) > :nth-child(1) > .title').should('contain', 'Start Date');
    cy.get(rfpResponsePage.flightDateStart).should('not.be.disabled');
    cy.get(`${rfpResponsePage.flightDateStart} > div > cad-dropdown > div > div > div 
    > div > .cad-datepicker__head > .cad-datepicker__input`)
      .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    cy.get(rfpResponsePage.flightDateStart).click();
    cy.get('.rfp-container__body-message-error').should('contain', 'Start Date is required');
    cy.get(`.cad-month-calendar__header__icon--right > cad-icon > .icon`).click();
    cy.contains('10').click();
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(9) > :nth-child(2) > .title').should('contain', 'End Date');
    // cy.get('.ng-tns-c25-7 > [cad-dropdown-head=""] > .cad-datepicker__head').should('not.be.disabled');
    cy.get(`${rfpResponsePage.flightDateEnd} > div > cad-dropdown > div > div > div 
    > div > .cad-datepicker__head > .cad-datepicker__input`)
      .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    cy.get(rfpResponsePage.flightDateEnd).click();
    cy.get('.rfp-container__body-message-error').should('contain', 'End Date is required');
    cy.get(`.cad-month-calendar__header__icon--right > cad-icon > .icon`).click();
    cy.contains('25').click();
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(rfpResponsePage.packageCancel).click();

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

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
    cy.get(`:nth-child(1) > .field > cad-input-group > .cad-input-group > .cad-input-group__label 
    > .cad-input-group__addon > .cad-input-group__addon-icon`).should('contain', '$');

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

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(rfpResponsePage.leaveBtn).should('not.be.disabled');
    cy.get(rfpResponsePage.stayBtn).should('not.be.disabled');

    cy.get(rfpResponsePage.stayBtn).click();

    cy.get(':nth-child(15) > :nth-child(2) > .title').should('contain', 'Production (Only if forced)');
    cy.get(rfpResponsePage.production).should('not.be.disabled');
    cy.get(`:nth-child(15) > :nth-child(2) > .field > cad-input-group > .cad-input-group 
    > .cad-input-group__label > .cad-input-group__addon > .cad-input-group__addon-icon`).should('contain', '$');

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
    cy.get(`${rfpResponsePage.holdExpireDate} .cad-datepicker__input`)
      .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    cy.get(rfpResponsePage.holdExpireDate).click();
    // cy.get('.rfp-container__body-message-error').should('contain', 'End Date is required');
    cy.get(`.cad-month-calendar__header__icon--right > cad-icon > .icon`).click();
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
    //cy.get(rfpResponsePage.packageSave).should('not.be.disabled');

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

    for (var i = 0; i < packUnits.length; i++) {
      const imageFixturePath = testDataPath + packUnits[i];
      cy.get('cad-button > input[type="file"]').attachFile(imageFixturePath).wait(8000)
    }
    cy.get('.cad-toast__title').should('contain', 'Proposal Unit(s) have been added.');

    cy.get('[data-automation="cad-link"]').should('not.be.disabled');
    cy.get('[data-automation="cad-link"]').should('contain', 'Import from File');

    cy.get('.cad-search__input').should('not.be.disabled');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('not.be.disabled');

    cy.get(rfpResponsePage.packageCancel).click();

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

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
        if (parseInt(count) > 10) {
          cy.get(rfpResponsePage.nextPage).should('not.be.disabled');
        }
        else {
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
        if (parseInt(count) > 10) {
          cy.get(rfpResponsePage.nextPage).should('not.be.disabled');
        }
        else {
          cy.get(`[data-automation="ooh-rfp-packages-table"] > ag-grid-angular > .ag-root-wrapper  
                  > .ag-root-wrapper-body > .ag-root > .ag-body-viewport > .ag-center-cols-clipper  
                  > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row`)
            .should('have.length', count);
        }

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

        cy.get(rfpResponsePage.deletaPackPopCancel)
          .should('not.be.disabled');
        cy.get(rfpResponsePage.deletaPackPopCancel)
          .should('contain', 'Cancel');
        cy.get(rfpResponsePage.deletaPackPopYes)
          .should('not.be.disabled');
        cy.get(rfpResponsePage.deletaPackPopYes)
          .should('contain', 'Yes');

        // Cancel first time
        cy.get(rfpResponsePage.deletaPackPopCancel).click();

        cy.get('.col-md-8 > .ng-star-inserted').wait(1000)
          .then(($span) => {
            var count = $span.text().trim();
            //cy.wrap(parseInt(count)).should('be.gt', 0)
            if (parseInt(count) > 10) {
              cy.get(rfpResponsePage.nextPage).should('not.be.disabled');
            }
            else {
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

        cy.get(rfpResponsePage.deletaPackPopCancel)
          .should('not.be.disabled');
        cy.get(rfpResponsePage.deletaPackPopCancel)
          .should('contain', 'Cancel');
        cy.get(rfpResponsePage.deletaPackPopYes)
          .should('not.be.disabled');
        cy.get(rfpResponsePage.deletaPackPopYes)
          .should('contain', 'Yes');

        cy.get(rfpResponsePage.deletaPackPopYes).click();
      });

    cy.get('.col-md-8 > .ng-star-inserted').wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        //cy.wrap(parseInt(count)).should('be.gte', count)
        if (parseInt(count) > 10) {
          cy.get(rfpResponsePage.nextPage).should('not.be.disabled');
        }
        else {
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

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(1) > .campaign-form__header > .title').should('contain', 'General Information');

    cy.get('.cad-panel > :nth-child(2) > :nth-child(1) > .title').should('contain', 'Type');
    cy.get(rfpResponsePage.selectType).should('not.be.disabled');
    cy.get(rfpResponsePage.selectType).should('contain', 'Select Type');
    cy.get(rfpResponsePage.selectType).click().wait(1000);
    cy.get('.cad-search__input').type(mediaType[2]).wait(1000);
    cy.get('.list-item').eq(0).click();

    cy.get(':nth-child(2) > :nth-child(2) > .title').should('contain', 'Market');
    cy.get(rfpResponsePage.selectMarket).should('not.be.disabled');
    cy.get(rfpResponsePage.selectMarket).should('contain', 'Select Market');
    cy.get(rfpResponsePage.selectMarket).click().wait(1000);
    cy.get('.list-item__text').eq(0).click();

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(2) > :nth-child(3) > .title').should('contain', 'Size (Optional)');
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

    cy.get(':nth-child(3) > :nth-child(2) > .title').should('contain', 'Rationale (Optional)');
    cy.get(rfpResponsePage.rationale).should('not.be.disabled');
    cy.get(rfpResponsePage.rationale).type('Rationale 3').blur();
    cy.get(rfpResponsePage.rationale).should('have.value', 'Rationale 3');

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

    cy.get(rfpResponsePage.units).type('950').blur();
    cy.get(rfpResponsePage.units).should('have.value', '950');
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(6) > :nth-child(2) > .title').should('contain', 'Net Rate Card');
    cy.get(rfpResponsePage.netRateCard).should('not.be.disabled');
    cy.get(`:nth-child(6) > :nth-child(2) > .field > cad-input-group > .cad-input-group 
    > .cad-input-group__label > .cad-input-group__addon > .cad-input-group__addon-icon`)
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
    cy.get(`:nth-child(3) > .field > cad-input-group > .cad-input-group > .cad-input-group__label 
    > .cad-input-group__addon > .cad-input-group__addon-icon`)
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

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(rfpResponsePage.leaveBtn).should('not.be.disabled');
    cy.get(rfpResponsePage.stayBtn).should('not.be.disabled');

    cy.get(rfpResponsePage.stayBtn).click();

    cy.get(':nth-child(4) > .mb-15').should('contain', '% Discount');
    cy.get(rfpResponsePage.discount).should('contain', '33.14%');

    cy.get(':nth-child(8) > .campaign-form__header > .title').should('contain', 'Flight Dates');
    cy.get(':nth-child(9) > :nth-child(1) > .title').should('contain', 'Start Date');
    cy.get(rfpResponsePage.flightDateStart).should('not.be.disabled');
    cy.get(`${rfpResponsePage.flightDateStart} > div > cad-dropdown > div > div > div 
    > div > .cad-datepicker__head > .cad-datepicker__input`)
      .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    cy.get(rfpResponsePage.flightDateStart).click();
    cy.get('.rfp-container__body-message-error').should('contain', 'Start Date is required');
    cy.get(`.cad-month-calendar__header__icon--right > cad-icon > .icon`).click();
    cy.contains('12').click();
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(':nth-child(9) > :nth-child(2) > .title').should('contain', 'End Date');
   // cy.get('.ng-tns-c25-7 > [cad-dropdown-head=""] > .cad-datepicker__head').should('not.be.disabled');
    cy.get(`${rfpResponsePage.flightDateEnd} > div > cad-dropdown > div > div > div 
    > div > .cad-datepicker__head > .cad-datepicker__input`)
      .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    cy.get(rfpResponsePage.flightDateEnd).click();
    cy.get('.rfp-container__body-message-error').should('contain', 'End Date is required');
    cy.get(`.cad-month-calendar__header__icon--right > cad-icon > .icon`).click();
    cy.contains('26').click();
    cy.get('.rfp-container__body-message-error').should('not.exist');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('be.disabled');

    cy.get(rfpResponsePage.packageCancel).click();

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

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
    cy.get(`:nth-child(1) > .field > cad-input-group > .cad-input-group > .cad-input-group__label 
    > .cad-input-group__addon > .cad-input-group__addon-icon`).should('contain', '$');

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

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

    cy.get('cad-icon.ng-star-inserted > .icon > use').should('not.be.disabled');
    cy.get(rfpResponsePage.leaveBtn).should('not.be.disabled');
    cy.get(rfpResponsePage.stayBtn).should('not.be.disabled');

    cy.get(rfpResponsePage.stayBtn).click();

    cy.get(':nth-child(15) > :nth-child(2) > .title').should('contain', 'Production (Only if forced)');
    cy.get(rfpResponsePage.production).should('not.be.disabled');
    cy.get(`:nth-child(15) > :nth-child(2) > .field > cad-input-group > .cad-input-group 
    > .cad-input-group__label > .cad-input-group__addon > .cad-input-group__addon-icon`).should('contain', '$');

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
    cy.get(`${rfpResponsePage.holdExpireDate} .cad-datepicker__input`)
      .should('have.attr', 'placeholder', 'MM/DD/YYYY');
    cy.get(rfpResponsePage.holdExpireDate).click();
    // cy.get('.rfp-container__body-message-error').should('contain', 'End Date is required');
    cy.get(`.cad-month-calendar__header__icon--right > cad-icon > .icon`).click();
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

    // cy.get(rfpResponsePage.browse).click();

    // for (var i = 0; i < packUnits.length; i++) {
    //   const imageFixturePath = testDataPath + packUnits[i];
    //   cy.get('cad-button > input[type="file"]').attachFile(imageFixturePath).wait(8000)
    // }
    // cy.get('.cad-toast__title').should('contain', 'Proposal Unit(s) have been added.');

    // cy.get('[data-automation="cad-link"]').should('not.be.disabled');
    // cy.get('[data-automation="cad-link"]').should('contain', 'Import from File');

    // cy.get('.cad-search__input').should('not.be.disabled');

    cy.get(rfpResponsePage.packageCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.packageSave).should('not.be.disabled');

    cy.get(rfpResponsePage.packageCancel).click();

    cy.get('.unsaved-popup__title').should('contain', 'Unsaved Changes')
    cy.get('.unsaved-popup__text > :nth-child(1)').should('contain', 'You have unsaved changes here.')
    cy.get('.unsaved-popup__text > :nth-child(2)').should('contain', 'Are you sure you want to leave this page and lose them?')

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
        if (parseInt(count) > 10) {
          cy.get(rfpResponsePage.nextPage).should('not.be.disabled');
        }
        else {
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

        for (var i = 0; i < 2; i++) {
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
        if (parseInt(count) > 5) {
          cy.get(`.shared-attachment__header-pag > cad-pagination.ng-star-inserted > .cad-pagination 
            > [data-automation="cad-pagination__btn_next"]`).should('not.be.disabled');
        }
        else {
          cy.get('.title_2 > .title').should('contain', count);
        }
      });

    cy.get(':nth-child(5) > .rfp-container__body-title').should('contain', 'Comments');
    cy.get('.rfp-container__body__sections__section-white-wrapper > .ng-valid')
      .should('have.attr', 'placeholder', 'Maximum limit: 4000 Characters')
    cy.get('.rfp-container__body__sections__section-white-wrapper').should('not.be.disabled');
    cy.get('.maxCharsLabel').should('contain', '3974 Characters left');

    cy.get('.rfp-container__body__sections__section-white-wrapper').type("sample comment to response");

    cy.get('.maxCharsLabel').should('contain', '3948 Characters left');

    cy.get(rfpResponsePage.footerCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.footerSave).should('not.be.disabled');
    cy.get(rfpResponsePage.footerSendResponse).should('not.be.disabled');

    cy.get(rfpResponsePage.footerSave).click();


    // cy.get('.cad-status__text').should('contain', 'Proposal Started');

    // cy.get(rfpResponsePage.btnDecline).should('not.be.disabled');
    // cy.get(rfpResponsePage.btnDecline).should('contain', 'Decline');
    // cy.get(rfpResponsePage.btnSendRFP).should('not.be.disabled');
    // cy.get(rfpResponsePage.btnSendRFP).should('contain', 'Add Response');

    // cy.get(rfpResponsePage.btnSendRFP).click();

    cy.get(rfpResponsePage.footerCancel).should('not.be.disabled');
    cy.get(rfpResponsePage.footerSave).should('not.be.disabled');
    cy.get(rfpResponsePage.footerSendResponse).should('not.be.disabled');

    cy.get(rfpResponsePage.footerSendResponse).click();

    cy.get('.popup-title').should('contain', 'Send Response');
    cy.get('[data-automation="popup_close"] > .icon > use')
      .should('not.be.disabled');

    cy.get('.popup-description').should('contain',
      'Are you sure that you want to send the response? After sending, you will be able to edit it only if the planner changes RFP');

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
    cy.get(rfpResponsePage.viewResponse).eq(4).should('contain', 'View Response');
    cy.get(rfpResponsePage.btnSendRFP).should('not.be.disabled');
    cy.get(rfpResponsePage.btnSendRFP).should('contain', 'Add Response');

    cy.get('.cad-status__text').should('contain', 'Proposal Sent');

    cy.get(rfpResponsePage.viewResponse).eq(4).click();
    cy.get(rfpResponsePage.viewRFP).should('not.be.disabled');
    cy.get(rfpResponsePage.viewRFP).should('contain', 'View Rfp');

    cy.get(rfpResponsePage.viewRFP).click();

    cy.get(rfpResponsePage.btnDecline).should('not.be.disabled');
    cy.get(rfpResponsePage.btnDecline).should('contain', 'Decline');

    cy.get(rfpResponsePage.viewResponse).eq(4).should('not.be.disabled');
    cy.get(rfpResponsePage.viewResponse).eq(4).should('contain', 'View Response');
    cy.get(rfpResponsePage.btnSendRFP).should('not.be.disabled');
    cy.get(rfpResponsePage.btnSendRFP).should('contain', 'Add Response');

  })

  it('E2E Positive Scenario - Image validation required for single frame', () => {
    cy.loginAsMoLamarUS();
    rfpListPage.visit();
    rfpListPage.changeLocation('United States');
    rfpListPage.searchAndSelectRfp(campaignName);
    cy.get(rfpResponsePage.btnSendRFP).click().wait(1000);
    
    cy.get(rfpResponsePage.addByID).click();
    cy.get(`.response__list__modal__search-field > cad-search-input > .cad-search >
       .cad-search__input`).should('not.be.disabled');

    cy.get('[data-automation="popup_close"] > .icon').should('not.be.disabled');

    cy.get('.response__list__modal__header').should('contain', 'Add by ID');
    cy.get(`.response__list__modal__search-field > cad-search-input >
        .cad-search > .cad-search__input > .ng-pristine`)
      .should('have.attr', 'placeholder', 'Search by Unit ID or Geopath ID')

    cy.get(rfpResponsePage.addByIdSearchBtn)
      .should('not.be.disabled');
    cy.get('.response__list__modal__search-helptext').should('contain',
      'Key in ID\'s (multiple ID separated by a comma ‘,’ ) and hit Search button to browse the units.');
    cy.get('.response__list__modal__body-table-none-title').should('contain',
      'Use search to browse the units');
    cy.get('.response__list__modal__body-message').should('contain',
      'Please note: To propose Non-Audited Units, Please use Import from File Option');

    cy.get(rfpResponsePage.addByIdCancel).should('not.be.disabled');

    cy.get(`.response__list__modal__search-field > cad-search-input > .cad-search >
        .cad-search__input`).type('1');
    cy.get(rfpResponsePage.addByIdSearchBtn).click();
  cy.get(':nth-child(1) > :nth-child(6) > cad-link > .cad-link').click();
  cy.get(':nth-child(2) > :nth-child(6) > cad-link > .cad-link').click();
  cy.get(rfpResponsePage.addByIdDone).click();
  cy.get(rfpResponsePage.headerSave).click();
  cy.get(rfpResponsePage.statusMessage).should('contain', 'Proposal Unit(s) have missing required field(s)');
  cy.get(rfpResponsePage.collapsableErrors).should('contain', 'Multiple Errors: Expand to see all errors.');
  cy.get(rfpResponsePage.expandErrors).click();
  // ERRORS should be displayed for units without image
  cy.get(rfpResponsePage.errorlist).should('contain', 'Unit Image is required for ');


  })

});
