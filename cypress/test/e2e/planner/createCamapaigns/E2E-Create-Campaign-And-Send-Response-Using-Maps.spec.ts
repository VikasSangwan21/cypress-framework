import { PageAction } from '../../../../support/PageAction';
import { equal } from 'assert';
import { any, config } from 'cypress/types/bluebird';
import 'cypress-file-upload';
import { parse } from 'path';
import { isInteger, toPairs } from 'cypress/types/lodash';
import { contains } from 'cypress/types/jquery';
import { exit } from 'process';
import { CampaignPage, CampaignCreatePage, RfpListPage, rfpResponsePage, HomePage, ViewResponsePage } from '@support/pages'; 

const campaignPage = new CampaignPage();
const createCampaignPage = new CampaignCreatePage();
const rfpListPage = new RfpListPage();
const rfpResponsepage = new rfpResponsePage();
const homePage = new HomePage();
const viewResopnse = new ViewResponsePage();

let epicName = 'Campaigns Create';
let featureName = 'E2E Create Campaign from Map';
let tag = '';
let Objective: string[] = [];
let Agency: string[] = [];
let Client: string[] = [];
let mo: string[] = [];
let loopCount: any;
let campaignName = '';
let dupcampaignName = '';
let testDataPath = '';
let cfileNamesUpload: string[] = [];
let moEmail: string[] = [];
let rfileNamesUpload: string[] = [];
let importFromFile: string[] = [];
let impressions: string[] = [];
let packageImpressions: string[] = [];
let addByID: string[] = [];
let addBySpotId: string[] = [];
let spotIdAndGeopathMapping: string[] = [];
let packageSpotIdAndGeopathMapping: string[] = [];
let packageAddBySpotId: string[] = [];
let imageName: string[] = [];
let mediaType: string[] = [];
let packUnits: string[] = [];
let fileNamesUpload: string[] = [];

// new
let responseCampaignName = '';

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
      cfileNamesUpload = config.cfileNamesUpload
      moEmail = config.moEmail
      rfileNamesUpload = config.cfileNamesUpload
      fileNamesUpload = config.fileNamesUpload;
      importFromFile = config.importFromFile;
      addByID = config.addByID;
      impressions = config.addBySpotId.impressions
      packageImpressions = config.packageAddBySpotId.impressions
      addBySpotId = config.addBySpotId.spotId;
      packageAddBySpotId = config.packageAddBySpotId.spotId;
      spotIdAndGeopathMapping = config.addBySpotId.geopathId;
      packageSpotIdAndGeopathMapping = config.packageAddBySpotId.geopathId;
      imageName = config.imageName;
      mediaType = config.mediaType;
      packUnits = config.packUnits;
      campaignName = config.campaignName[2].name;
      
    })
  })

  beforeEach(() => {
    Report.testDetails(epicName, featureName, tag);
  });

  // Create campaign
  it('E2E Create Campaign from Map', () => {
    campaignName = `e2e test - ${createCampaignPage.campaignNameSuffix()}`;
      cy.task('setCampaignName', campaignName);
      cy.readFile("cypress/fixtures/ooh/campaigns/campaign_config.json").then((data) => {
      data.campaignName[2].name = campaignName
      cy.writeFile("cypress/fixtures/ooh/campaigns/campaign_config.json", JSON.stringify(data))
    })
    campaignName = 'Regression test 1011';
    cy.loginAsPlanner();
    createCampaignPage.visit();
    //cy.get(campaignPage.toggleUI).click();
    campaignPage.selectContentDropDpwn('discover');

    // Select Locations
    createCampaignPage.selectLocation('Pasadena CA, US');
    cy.get(createCampaignPage.mediaOwner).click();
    createCampaignPage.selectLocations(mo);

    // select POI
    cy.get(createCampaignPage.POI).click();
    cy.get(createCampaignPage.SearchPOI).type('shopping{enter}').blur();
    createCampaignPage.selectPointOfInterest(loopCount);
   
    // Create Campaign with selection
    cy.get(createCampaignPage.MySelectionButton).click();
    cy.get(createCampaignPage.CreateCampaign).click();
    cy.get(createCampaignPage.CampaignName).type(campaignName).blur();
    cy.get(createCampaignPage.submitCampaign).click()
    cy.get(createCampaignPage.CampaignNameTitle).contains(campaignName);
    cy.get(createCampaignPage.campaignName).should('have.value', campaignName);
    cy.get(createCampaignPage.ValidationError).should('not.exist');
    cy.get(createCampaignPage.continueBtn).should('be.disabled');
    cy.get(createCampaignPage.campaignDesc).focus().blur();
    cy.get(createCampaignPage.ValidationError).should('contain', 'Campaign Description is Required.');
    cy.get(createCampaignPage.campaignDesc).type(campaignName).blur();
    cy.get(createCampaignPage.campaignDesc).should('have.value', campaignName);
    cy.get(createCampaignPage.ValidationError).should('not.exist');
    cy.get(createCampaignPage.objective).should('not.be.disabled');
    cy.get(createCampaignPage.objectiveSelect).should('contain', 'Select Objective')
    cy.get(createCampaignPage.objective).click();
    cy.get(createCampaignPage.Search)
      .should('have.attr', 'placeholder', 'Search').type(Objective[(Objective.length - 1)]).wait(1000);
    cy.get(createCampaignPage.FirstResultItem).first().click();
    cy.get(createCampaignPage.objective).click();
    cy.get(createCampaignPage.agency).should('not.be.disabled');
    cy.get(createCampaignPage.agencySelect).should('contain', 'Select Agency')
    cy.get(createCampaignPage.agency).click();
    cy.get(createCampaignPage.agencySearch)
      .should('have.attr', 'placeholder', 'Search').type(Agency[(Agency.length - 1)]).wait(1000);
    cy.get(createCampaignPage.FirstResultItem).last().click();
    cy.get(createCampaignPage.agency).click();
    cy.get(createCampaignPage.client).should('not.be.disabled');
    cy.get(createCampaignPage.clientSelect).should('contain', 'Select Client')
    cy.get(createCampaignPage.client).click();
    cy.get(createCampaignPage.clientSearch)
      .should('have.attr', 'placeholder', 'Search').type(Client[(Client.length - 1)]).wait(1000);
    cy.get(createCampaignPage.FirstResultItem).first().click();
    cy.get(createCampaignPage.client).click();
    cy.get(createCampaignPage.campaignBudget).type('500000').blur();
    cy.get(createCampaignPage.campaignBudget).should('have.value', '500,000.00');
    cy.get(createCampaignPage.ValidationError).should('not.exist');
    
    cy.get(createCampaignPage.campaignDateRange).click();
    cy.get(
      `${createCampaignPage.calendarLeft}
        > .cad-month-calendar
        > .cad-month-calendar__header
        > .cad-month-calendar__header__icon--right`
    ).click();
    cy.get(
      `${createCampaignPage.calendarLeft}
        > .cad-month-calendar
        > .cad-month-calendar__header
        > .cad-month-calendar__header__icon--right`
    ).click();
    cy.get(createCampaignPage.CalanderDays).contains('12').click();
    cy.get(createCampaignPage.CalanderDays).contains('24').click();

    cy.get(createCampaignPage.CalanderDays).get('.content-count')
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gt', 0)
      });

    cy.get(`${createCampaignPage.applyBtn}`).click();
    cy.get(createCampaignPage.campaignResDate).click();
    cy.get(createCampaignPage.ResDateNextMonth).click();
    cy.get(createCampaignPage.ResCalanderDays).contains('10').click();
    cy.get(createCampaignPage.CalApplyButton).click();   
    cy.get(createCampaignPage.primaryAudience).should('not.be.disabled');
    cy.get(createCampaignPage.primaryAudience).should('contain', 'Select Primary Audience')
    cy.get(createCampaignPage.primaryAudience).click();
    cy.get(createCampaignPage.Search).should('have.attr', 'placeholder', 'Search');
    cy.get(createCampaignPage.FirstResultItem).first().click();
    cy.get(createCampaignPage.primaryAudienceAfterSelection).click();

    // Add Attachments
    cy.get(createCampaignPage.NoOfAttachments)
      .then(($span) => {
        var count = $span.text().trim();
        if (parseInt(count) != 0) {
          for (var i = 0; i < parseInt(count); i++) {
            cy.get(createCampaignPage.delAttachment).click();
            cy.get(createCampaignPage.confirmAttachmentDelete).click().wait(1000);
            cy.get(createCampaignPage.messageStatus).should('contain', 'Attachment deleted');
          }
        }
        for (var i = 0; i < cfileNamesUpload.length; i++) {
          cy.get(createCampaignPage.addAttachmentBtn).click();
          const yourFixturePath = testDataPath + cfileNamesUpload[i];
          cy.get(createCampaignPage.browseFile).last().attachFile(yourFixturePath).wait(1000);
        }
      });

    cy.get(createCampaignPage.comment).type(campaignName);

    cy.get(createCampaignPage.savedraftBtn).should('not.be.disabled');
    cy.get(createCampaignPage.continueBtn).should('not.be.disabled');
    cy.get(createCampaignPage.continueBtn).click();

    // validate form focus on top
    cy.window().its('scrollY').should('equal', 0);
    cy.get(createCampaignPage.previousstepBtn).click();
    cy.window().its('scrollY').should('equal', 0);
    cy.get(createCampaignPage.continueBtn).click();
    cy.window().its('scrollY').should('equal', 0);


    cy.get(createCampaignPage.editInMap).should('not.be.disabled');
    cy.get(createCampaignPage.exportBtn).should('not.be.disabled');
    cy.get(createCampaignPage.digitalframe).click();
    cy.get(createCampaignPage.savedraftBtn).should('not.be.disabled');
    cy.get(createCampaignPage.previousstepBtn).should('not.be.disabled');
    cy.get(createCampaignPage.createCampaignBtn).should('not.be.disabled');
    cy.get(createCampaignPage.mediaFormatCount)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gt', 0)
      });

    cy.get(createCampaignPage.addMediaFormats).should('not.be.disabled');

    cy.get(createCampaignPage.mediaOwnerCount)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gt', 0)
      });

  //  cy.get(createCampaignPage.selectEmail).click();
  //  cy.get(createCampaignPage.moEmailList).contains(moEmail[1]).click();
    cy.get(PageAction.campaignCreatePage().email).eq(0)
    .click()
    cy.get(PageAction.campaignCreatePage().emailList)
      .contains(moEmail[0])
      .click();
      cy.get(PageAction.campaignCreatePage().mediaOwnerCount).click();
    cy.get(PageAction.campaignCreatePage().email).eq(0)
      .click()
    cy.get(PageAction.campaignCreatePage().emailList)
      .contains(moEmail[1])
      .click();
    cy.get(PageAction.campaignCreatePage().mediaOwnerCount).click();
    cy.get(createCampaignPage.selectEmail).click();
    cy.get(createCampaignPage.unitsCount)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gt', 0)
      });

    cy.get(createCampaignPage.poiCount)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gt', 0)
      });

    cy.get(createCampaignPage.savedraftBtn).should('not.be.disabled');
    cy.get(createCampaignPage.previousstepBtn).should('not.be.disabled');
    cy.get(createCampaignPage.createCampaignBtn).should('not.be.disabled');
    cy.get(createCampaignPage.createCampaignBtn).click();
    cy.get(createCampaignPage.messageStatus).should('contain', 'Campaign Saved Successfully');
    cy.get(createCampaignPage.pageTitleBlack).should('contain', campaignName);
    cy.get(createCampaignPage.statusMessage).should('contain', 'Draft');
    cy.get(createCampaignPage.deleteCampaign).should('not.be.disabled');
    cy.get(createCampaignPage.editCampaign).should('not.be.disabled');
    cy.get(createCampaignPage.prevCampaign).should('not.be.disabled');
    cy.get(createCampaignPage.prevCampaign).last().click();
    cy.get(createCampaignPage.cancelPreviewAndSendRFP).should('not.be.disabled');
    cy.get(createCampaignPage.previewRFP).should('not.be.disabled');
    cy.get(createCampaignPage.previewRFP).click();
    cy.get(createCampaignPage.rfpCancel).should('not.be.disabled');
    cy.get(createCampaignPage.sendRFPBtn).should('not.be.disabled');
    cy.get(createCampaignPage.sendRFPBtn).click();
    cy.get(createCampaignPage.messageStatus).should('contain', 'RFP Sent');
    cy.get(createCampaignPage.statusMessage).should('contain', 'RFP Sent');
    homePage.logout(); 

  });

  it('E2E MO Respond to RFP', () => {
    campaignName = 'Regression test 1011';
    /***********************************************************************************************/
    /******************** Media Owner View and Respond to RFP  *************************************/
    /***********************************************************************************************/
    //campaignName = 'e2e test - 81608'
    cy.loginAsMoLamarUS();
    rfpListPage.visit();
    cy.wait(2000);
    //cy.get(campaignPage.toggleUI).click();
    rfpListPage.changeLocation('United States');

    //Basic details
    rfpListPage.getNavBarTitle().should('contain', 'RFPs').wait(5000);
    rfpListPage.searchAndSelectRfp(campaignName);
    cy.get(rfpResponsepage.btnDecline).should('not.be.disabled');
    cy.get(rfpResponsepage.btnDecline).should('contain', 'Decline');
    cy.get(rfpResponsepage.btnSendRFP).should('not.be.disabled');
    cy.get(rfpResponsepage.btnSendRFP).should('contain', 'Add Response');
    cy.get(rfpResponsepage.campaignNameTitle).should('contain', campaignName);
    cy.get(rfpResponsepage.toggle).should('contain', 'Basic Details').should('contain', 'Inventory')
    cy.get(rfpResponsepage.generalInfoTitle).should('contain', 'General Information')
    cy.get(rfpResponsepage.objectiveTitle).should('contain', 'Objective')
    cy.get(rfpResponsepage.object).should('contain', Objective[4]);
    cy.get(rfpResponsepage.agency).should('contain', Agency[5]);
    cy.get(rfpResponsepage.agencyTitle).should('contain', 'Agency');
    cy.get(rfpResponsepage.clientTitle).should('contain', 'Client');
    cy.get(rfpResponsepage.client).should('contain', Client[6]);
    cy.get(rfpResponsepage.budgetTitle).should('contain', 'Budget');
    cy.get(rfpResponsepage.budget).should('contain', '$500,000.00');
    cy.get(rfpResponsepage.campaignDateTitle).should('contain', 'Campaign Dates');

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
    cy.get(rfpResponsepage.campaignDates).should('contain', fromDate + ' - ' + toDate)
    cy.get(rfpResponsepage.campaignDescriptionTitle).should('contain', 'Campaign Description')
    cy.get(rfpResponsepage.campaignNameTtl).should('contain', campaignName)
    cy.get(rfpResponsepage.marketName).should('contain', 'Los Angeles, CA')
    cy.get(rfpResponsepage.marketDMA).should('contain', 'DMA')
    cy.get(rfpResponsepage.marketFromDate).should('contain', fromDate)
    cy.get(rfpResponsepage.marketToDate).should('contain', toDate);
    cy.get(rfpResponsepage.marketsTitle).should('contain', 'Markets');
    cy.get(rfpResponsepage.marketCount)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gt', 0)
        if (parseInt(count) > 10) {
          cy.get(rfpResponsepage.nextPage).should('not.be.disabled');
        }
        else
          cy.get(rfpResponsepage.marketTable).find('tr').should('have.length', count);
      });

    cy.get(rfpResponsepage.demographicsTitle).should('contain', 'Demographics');
    cy.get(rfpResponsepage.primaryAudienceTitle).should('contain', 'Primary Audience');
    cy.get(rfpResponsepage.primaryAudience).should('contain', 'Adults 18+');
    cy.get(rfpResponsepage.secondaryAudienceTitle).should('contain', 'Secondary Audience');
    cy.get(rfpResponsepage.campaignDescription).should('contain', campaignName);
    cy.get(rfpResponsepage.attachmentsTitle).should('contain', 'Attachments');
    cy.get(rfpResponsepage.numberOfAttachments)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gt', 0)
        if (parseInt(count) > 5)
          cy.get(rfpResponsepage.nextPage).should('not.be.disabled');
        else
          cy.get(rfpResponsepage.attachmentsrow).should('have.length', count);

      });
    cy.get(rfpResponsepage.download).should('not.be.disabled');

    cy.get(rfpResponsepage.commentTitle).should('contain', 'Comment')
    cy.get(':nth-child(12) > .campaign-container__element > .campaign-container__element__text')
      .should('contain', campaignName);

    //Inventory
    cy.get(rfpResponsepage.inventoryTitle).should('contain', 'Inventory').click().wait(1000);
    cy.get(rfpResponsepage.viewInMap).should('not.be.disabled');
    cy.get(rfpResponsepage.viewInMap).should('contain', 'VIEW IN MAP');
    cy.get(rfpResponsepage.mediaFormatTitle).should('contain', 'Media Formats')
    cy.get(rfpResponsepage.mediaFormatCount)
      .then(($span) => {
        var mediacount = $span.text().trim();
        cy.wrap(parseInt(mediacount)).should('be.gt', 0)
        if (parseInt(mediacount) > 10)
          cy.get(rfpResponsepage.nextPage).should('not.be.disabled');
        else
          cy.get(rfpResponsepage.mediaFormatRow).should('have.length', mediacount);

        cy.get(rfpResponsepage.unitsTitle).should('contain', 'Units');
        cy.get(rfpResponsepage.unitsCount).wait(1000)
          .then(($span) => {
            var count = $span.text().trim();
            cy.wrap(parseInt(count)).should('be.gt', 0)
            if (parseInt(count) > 10)
              cy.get(rfpResponsepage.nextPage).should('not.be.disabled');
            else {
              const mediaAndUnits = parseInt(count) + parseInt(mediacount)
              cy.get(rfpResponsepage.unitsRow).should('have.length', mediaAndUnits);
            }
          });
      });

    cy.get(rfpResponsepage.poiTitle).should('contain', 'Points of Interest');
    cy.get(rfpResponsepage.poiCount)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gt', 0)
        if (parseInt(count) > 10)
          cy.get(rfpResponsepage.nextPage).should('not.be.disabled');
        else
          cy.get(rfpResponsepage.poiRow).should('have.length', count);
      });

    //Add response
    cy.get(rfpResponsepage.btnDecline).should('not.be.disabled');
    cy.get(rfpResponsepage.btnSendRFP).should('not.be.disabled');
    cy.get(rfpResponsepage.btnSendRFP).eq(1).click().wait(1000);
    cy.get(rfpResponsepage.backBtn).should('not.be.disabled');
    cy.get(rfpResponsepage.heading).should('contain', 'Response to ' + campaignName);
    cy.get(rfpResponsepage.headerCancel).should('not.be.disabled');
    cy.get(rfpResponsepage.headerSave).should('not.be.disabled');
    cy.get(rfpResponsepage.headerSendResponse).should('be.disabled');
    cy.get(rfpResponsepage.cancel).should('not.be.disabled');
    cy.get(rfpResponsepage.save).should('not.be.disabled');
    cy.get(rfpResponsepage.sendResponse).should('be.disabled');
    cy.get(rfpResponsepage.breadcrumbTitle).should('contain', 'Response to ' + campaignName);
    cy.get(rfpResponsepage.responseUnitsTitle).should('contain', 'Units');
    cy.get(rfpResponsepage.responseUnitCount).wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        assert.equal(parseInt(count), 0, 'units count should be 0')
      });

    cy.get(rfpResponsepage.responsePackageCount).wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        if (parseInt(count) > 10) {
          cy.get(rfpResponsepage.nextPage).should('not.be.disabled');
        }
        else {
          cy.get(rfpResponsepage.responsePackageRows).should('have.length', count);
        }
      });

    cy.get(rfpResponsepage.unitTemplateMessage)
      .should('contain', 'You can download a template and browse uploaded files below.');
    cy.get(rfpResponsepage.noUnitsMessage).should('contain', 'No units');
    cy.get(rfpResponsepage.addByID).should('not.be.disabled');
    cy.get(rfpResponsepage.importFromFile).should('not.be.disabled');
    cy.get(rfpResponsepage.importFromFile).should('contain', 'Import from File');
    cy.get(rfpResponsepage.downloadTemplate).should('not.be.disabled');
    cy.get(rfpResponsepage.downloadTemplate).should('contain', 'Download Template');
    cy.get(rfpResponsepage.responsePackageCount).wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        if (parseInt(count) > 10) {
          cy.get(rfpResponsepage.nextPage).should('not.be.disabled');
        }
        else {
          cy.get(rfpResponsepage.responsePackageRows)
            .should('have.length', count);
        }
      });

    cy.get(rfpResponsepage.createPackage).should('not.be.disabled');
    cy.get(rfpResponsepage.createPackage).should('contain', 'Create Package');
    cy.get(rfpResponsepage.attachmentsTitle).should('contain', 'Attachments')
    cy.get(rfpResponsepage.count)
      .then(($span) => {
        var count = $span.text().trim();
        assert.equal(parseInt(count), 0, 'Attachments count should be 0');
      });
    cy.get(rfpResponsepage.noAttachmentInfo).should('contain', 'No Attachments');
    cy.get(rfpResponsepage.addAttachment).should('not.be.disabled');
    cy.get(rfpResponsepage.addAttachment).should('contain', 'Add Attachments');
    cy.get(rfpResponsepage.responseCommentsTitle).should('contain', 'Comments');
    cy.get(rfpResponsepage.commentsTextbox).should('have.attr', 'placeholder', 'Maximum limit: 4000 Characters');
    cy.get(rfpResponsepage.commentsTextbox).should('not.be.disabled');
    cy.get(rfpResponsepage.maxCharLabel).should('contain', '4000 Characters left');
    cy.get(rfpResponsepage.footerCancel).should('not.be.disabled');
    cy.get(rfpResponsepage.footerSave).should('not.be.disabled');
    cy.get(rfpResponsepage.footerSendResponse).should('be.disabled');

    //Add units by ID
    cy.get(rfpResponsepage.addByID).click();
    cy.get(rfpResponsepage.searchByIdTxt).should('not.be.disabled');
    cy.get(rfpResponsepage.popupCloseButton).should('not.be.disabled');
    cy.get(rfpResponsepage.addByIdHeader).should('contain', 'Add by ID');
    cy.get(rfpResponsepage.searchByIdTxt).should('have.attr', 'placeholder', 'Search by Unit ID or Geopath ID')
    cy.get(rfpResponsepage.searchByIdTxt).type(addByID[0]);
    cy.get(rfpResponsepage.addByIdSearchBtn).click();
    let idsLen: string[] = addByID[0].split(',');
    cy.get(rfpResponsepage.popupunitCount).find('tr').should('have.length', (idsLen.length));
    
    if (idsLen.length > 0) {
      for (var i = 1; i <= idsLen.length; i++) {
        cy.get(':nth-child(' + i + ') > :nth-child(6) > cad-link > .cad-link').should('not.be.disabled').click();
      }
    }

    cy.get(rfpResponsepage.addByIdDone).click();
    cy.get(rfpResponsepage.responseUnitCount).wait(1000)
      .then(($span) => {
        var Unitscount = $span.text().trim();
        cy.wrap(parseInt(Unitscount)).should('be.gt', 0)
        if (parseInt(Unitscount) > 200)
          cy.get(rfpResponsepage.nextPage).should('not.be.disabled');
        else
          cy.get(rfpResponsepage.unitRows).should('have.length', Unitscount);
        
        // Validate POI and distance from POI column
        cy.get(rfpResponsepage.frameTableHeaders).each(($el, index) => {
          if($el.text() === 'POI'){
            for(let rowno = 0; rowno <parseInt(Unitscount); rowno++){
              cy.get('[row-index="'+rowno+'"] > [aria-colindex="'+(index+3)+'"]').should('not.be.empty');
            }
          }
          if($el.text() === 'Distance POI (miles)'){
            for(let rowno = 0; rowno <parseInt(Unitscount); rowno++){
              cy.get('[row-index="'+rowno+'"] > [aria-colindex="'+(index+3)+'"]').invoke('text').then(parseFloat).should('be.gt', 0)
            }
          }
        });
        
        
      });

    cy.get(rfpResponsepage.responsePackageCount).wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        if (parseInt(count) > 10) {
          cy.get(rfpResponsepage.nextPage).should('not.be.disabled');
        }
        else {
          cy.get(rfpResponsepage.responsePackageRows)
            .should('have.length', count);
        }
      });

    cy.get(rfpResponsepage.headerCancel).should('not.be.disabled');
    cy.get(rfpResponsepage.headerSave).should('not.be.disabled');
    cy.get(rfpResponsepage.headerSendResponse).should('not.be.disabled');
    cy.get(rfpResponsepage.headerSave).click();
    cy.get(rfpResponsepage.responseErrorInstructions)
      .should('contain', 'The row(s) with unit Id highlighted in red have error(s). Scroll right to identify the error(s) and apply the fix.');
    cy.get(rfpResponsepage.statusMessage).should('contain', 'Proposal Unit(s) have missing required field(s)');
    cy.get(rfpResponsepage.responseCollapsableErrorPanel).should('contain', 'Multiple Errors: Expand to see all errors.');
    // remove after adding data automation tag  
    // cy.get(rfpResponsepage.expandErrorPanel).should('not.be.disabled').click();
    // ERRORS should be displayed for units without image
    // rremove after adding data automation tag   cy.get(rfpResponsepage.errorlist).should('contain', 'Unit Image is required for ');
    // Add image to units without image 
    /*cy.get(rfpResponsepage.imageWithError).should('exist').click();
    cy.get(rfpResponsepage.addImagePopupTitle).should('contain', 'Pictures')
    cy.get(rfpResponsepage.addImagePopupClose).should('not.be.disabled');
    cy.get(rfpResponsepage.dropPictureMessage).should('contain', 'Drop your picture here');
    cy.get(rfpResponsepage.dropPictureInfo).should('contain', 'Only .jpg or .png files less than 5 MB are allowed.')
    cy.get(rfpResponsepage.imgBrowseBtn).should('not.be.disabled');
    cy.get(rfpResponsepage.addImagePopupBrowse).should('contain', 'Browse');
    const imageFixturePath = testDataPath + imageName[0];
    cy.get(rfpResponsepage.PopupAttachFile).attachFile(imageFixturePath).wait(1000)
    cy.get(rfpResponsepage.imgDoneBtn).should('not.be.disabled');
    cy.get(rfpResponsepage.imgDoneBtn).should('contain', 'Done')
    cy.get(rfpResponsepage.imgDoneBtn).click() */
    cy.get(rfpResponsepage.imageWithError).should('not.exist');
    cy.get(rfpResponsepage.createPackage).should('not.be.disabled');
    cy.get(rfpResponsepage.createPackage).click();
    cy.get(rfpResponsepage.unsavedPopupTitle).should('contain', 'Unsaved Changes')
    cy.get(rfpResponsepage.unsavedPopupMessage).should('contain', 'You have unsaved changes on this page.')
    cy.get(rfpResponsepage.unsavedPopupConfirmation).should('contain', 'Are you sure you want to leave this page?')
    cy.get('cad-modal-content-pure > :nth-child(1) > cad-icon.ng-star-inserted > .icon').should('not.be.disabled');
    cy.get(rfpResponsepage.leaveBtn).should('not.be.disabled');
    cy.get(rfpResponsepage.stayBtn).should('not.be.disabled');
    cy.get(rfpResponsepage.stayBtn).click();

    let rateCard: string[] = ['393', '433', '473', '513', '553'];
    let netNegoatiable: string[] = ['394', '434', '474', '514', '554'];
    let startDate: string[] = ['235', '275', '315', '355', '395'];
    let endDate: string[] = ['236', '276', '316', '356', '396'];
    let cycleType: string[] = ['237', '277', '317', '357', '397'];
    let noCycles: string[] = ['399', '439', '479', '519', '559'];
    let netInstall: string[] = ['401', '441', '481', '521', '561'];
    let prodCost: string[] = ['402', '442', '482', '522', '562'];

    let splString = 'asdfghjklPOIUYTREWQ~!@#,\'$%^&*()_+|}{":?><\/1234567890'

    rfpResponsepage.enterRequiredFileds(idsLen.length, splString);

    rfpResponsepage.enterRateCardAndNetNegotiableRate(idsLen.length, "100", "80");
    cy.get(rfpResponsepage.headerCancel).should('not.be.disabled');
    cy.get(rfpResponsepage.headerSave).should('not.be.disabled');
    cy.get(rfpResponsepage.headerSendResponse).should('not.be.disabled');
    cy.get(rfpResponsepage.headerSave).click();
    cy.get(rfpResponsepage.responseFilterResults).should('not.be.disabled');
    cy.get(rfpResponsepage.filterResultsLabel).should('have.attr', 'placeholder', 'Filter Results');

    //delete added unit 
    cy.get(rfpResponsepage.unitsLable).should('contain', 'Units');
    cy.wait(3000);
    cy.get(rfpResponsepage.deleteFirstUnit).click();
   // cy.get(rfpResponsepage.deleteUnitFour).click();

    cy.get(rfpResponsepage.responseUnitCount).wait(1000)
      .then(($span) => {
        let unitsCount = parseInt($span.text().trim());
        cy.get(rfpResponsepage.responseUnitRows).should('have.length', unitsCount);
      });
    cy.get(rfpResponsepage.headerSave).click().wait(5000);

/*
    // Add units by spot id for audited frames
    cy.get(rfpResponsepage.addByID).click();
    cy.get(rfpResponsepage.addByIdHeader).should('contain', 'Add by ID');
    cy.get(rfpResponsepage.searchByIdTxt).should('have.attr', 'placeholder', 'Search by Unit ID or Geopath ID')
    cy.get(rfpResponsepage.searchByIdTxt).type(addBySpotId[0]);
    cy.get(rfpResponsepage.addByIdSearchBtn).click();

    // verify spotId  are displayed along with geopath id's
    let geopsthIds: string[] = spotIdAndGeopathMapping[0].split(',');
    let spotidsLen: string[] = addBySpotId[0].split(',');
    for (var i = 1; i < spotidsLen.length ; i++) {
      cy.get('tbody > :nth-child('+i+') > .align-right').should('contain', geopsthIds[i-1] ).should('contain', '(Spot ID: '+spotidsLen[i-1]+')');
    }

    for (var i = spotidsLen.length; i > 0 ; i--) {
      cy.get(':nth-child(' + i + ') > :nth-child(6) > cad-link > .cad-link').click();
    }
    cy.get(rfpResponsepage.addByIdDone).click();
    let impression: string[] = impressions[0].split(',');
    // Validate SpotId is displayed along with geopath Id's
    // Validate correct impression values are displayed
    for (var i = 0; i < spotidsLen.length ; i++) {
      cy.get("[row-index='"+i+"'] >"+rfpResponsepage.geopathIdCol).should('contain', geopsthIds[i] ).should('contain', '(Spot ID: '+spotidsLen[i]+')');
      cy.get("[row-index='"+i+"'] >"+rfpResponsepage.eighteenPlusImpsCol).should('contain', impression[i] );

    }
    //let splString = 'asdfghjklPOIUYTREWQ~!@#,\'$%^&*()_+|}{":?><\/1234567890';
    rfpResponsepage.enterRequiredFileds(spotidsLen.length, splString);

    // Add units by geopath id for audited frames
    cy.get(rfpResponsepage.addByID).click();
    cy.get(rfpResponsepage.addByIdHeader).should('contain', 'Add by ID');
    cy.get(rfpResponsepage.searchByIdTxt).should('have.attr', 'placeholder', 'Search by Unit ID or Geopath ID')
    cy.get(rfpResponsepage.searchByIdTxt).type(spotIdAndGeopathMapping[1]);
    cy.get(rfpResponsepage.addByIdSearchBtn).click();
    geopsthIds = spotIdAndGeopathMapping[1].split(',');
    for (var i =1; i<=geopsthIds.length ; i++) {
      cy.get(':nth-child(' + i + ') > :nth-child(6) > cad-link > .cad-link').click();
    }
    cy.get(rfpResponsepage.addByIdDone).click();

    // verify minimum value of impressions is displayed for geopath id
    impression = impressions[1].split(',');
    // Validate SpotId is displayed along with geopath Id's
    // Validate correct impression values are displayed
    for (var i = 0; i < geopsthIds.length ; i++) {
      cy.get("[row-index='"+i+"'] >"+rfpResponsepage.eighteenPlusImpsCol).should('contain', impression[i] ); 
    }

    rfpResponsepage.enterRequiredFileds(geopsthIds.length, splString);
    
    cy.get(rfpResponsepage.headerSave).click().wait(5000);
*/
    // Attachments  
    cy.get(rfpResponsepage.attachmentsTitle).should('contain', 'Attachments')
    cy.get(rfpResponsepage.count)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gte', 0)
        cy.get(rfpResponsepage.noAttachmentInfo).should('contain', 'No Attachments');
        cy.get(rfpResponsepage.addAttachment).should('not.be.disabled');
        cy.get(rfpResponsepage.addAttachment).should('contain', 'Add Attachments');
        for (var i = 0; i < 2; i++) {
          const yourFixturePath = testDataPath + fileNamesUpload[i];
          if (i == 0)
            cy.get(rfpResponsepage.addAttachment).click();
          else
            cy.get(createCampaignPage.addAttachmentBtn).click();

          cy.get(rfpResponsepage.PopupAttachFile).last().attachFile(yourFixturePath).wait(1000);
          cy.get(createCampaignPage.messageStatus).should('contain', 'Attachment added');
        }
      });

    cy.get(rfpResponsepage.count).wait(1000)
      .then(($span) => {
        var count = $span.text().trim();
        if (parseInt(count) > 5) {
          cy.get(`.shared-attachment__header-pag > cad-pagination.ng-star-inserted > .cad-pagination 
            > [data-automation="cad-pagination__btn_next"]`).should('not.be.disabled');
        }
        else {
          cy.get(rfpResponsepage.count).should('contain', count);
        }
      });

    cy.get(rfpResponsepage.responseCommentsTitle).should('contain', 'Comments');
    cy.get(rfpResponsepage.commentsTextArea).should('have.attr', 'placeholder', 'Maximum limit: 4000 Characters')
    cy.get(rfpResponsepage.commentsTxt).should('not.be.disabled');
    cy.get(rfpResponsepage.commentsTxt).type("sample comment to response");
    cy.get(rfpResponsepage.commentsCharLeft).should('contain', '3974 Characters left');
    cy.get(rfpResponsepage.commentsTxt).type("sample comment to response");
    cy.get(rfpResponsepage.commentsCharLeft).should('contain', '3948 Characters left');
    cy.get(rfpResponsepage.footerCancel).should('not.be.disabled');
    cy.get(rfpResponsepage.footerSave).should('not.be.disabled');
    cy.get(rfpResponsepage.footerSendResponse).should('not.be.disabled');
    cy.get(rfpResponsepage.footerSave).click();
    cy.get(rfpResponsepage.footerCancel).should('not.be.disabled');
    cy.get(rfpResponsepage.footerSave).should('not.be.disabled');
    cy.get(rfpResponsepage.footerSendResponse).should('not.be.disabled');
    cy.get(rfpResponsepage.footerSendResponse).click();
    cy.get('.popup-title').should('contain', 'Send Response');
    cy.get(rfpResponsepage.closePopUp).should('not.be.disabled');
    cy.get(rfpResponsepage.popupDescription).should('contain',
      'Are you sure that you want to send the response? After sending, you will be able to edit it only if the planner changes RFP');
    cy.get(rfpResponsepage.deletaPackPopCancel).should('not.be.disabled');
    cy.get(rfpResponsepage.deletaPackPopCancel).should('contain', 'Cancel');
    cy.get(rfpResponsepage.deletaPackPopYes).should('not.be.disabled');
    cy.get(rfpResponsepage.deletaPackPopYes).should('contain', 'Send');
    cy.get(rfpResponsepage.deletaPackPopYes).click();
    cy.get(createCampaignPage.messageStatus).should('contain', 'Proposal Sent');
    cy.get(rfpResponsepage.btnDecline).should('not.be.disabled');
    cy.get(rfpResponsepage.btnDecline).should('contain', 'Decline');
    cy.get(rfpResponsepage.viewResponse).eq(1).should('contain', 'View Response');
    cy.get(rfpResponsepage.btnSAddResponse).should('not.be.disabled');
    cy.get(rfpResponsepage.btnSAddResponse).should('contain', 'Add Response');
    cy.get(createCampaignPage.statusMessage).should('contain', 'Proposal Sent');
    cy.get(rfpResponsepage.viewResponse).eq(1).click().wait(5000);
    cy.get(rfpResponsepage.viewRFP).should('not.be.disabled');
    cy.get(rfpResponsepage.viewRFP).should('contain', 'View Rfp');
    cy.get(rfpResponsepage.viewRFP).eq(1).click();
    cy.get(rfpResponsepage.btnDecline).should('not.be.disabled');
    cy.get(rfpResponsepage.btnDecline).should('contain', 'Decline');
    cy.get(rfpResponsepage.viewResponse).eq(1).should('not.be.disabled');
    cy.get(rfpResponsepage.viewResponse).eq(1).should('contain', 'View Response');
    cy.get(rfpResponsepage.btnSAddResponse).should('not.be.disabled');
    cy.get(rfpResponsepage.btnSAddResponse).should('contain', 'Add Response');

  });

  it('E2E Verify Create packages in response to RFP', () => {
  //  campaignName = 'e2e test - 69080'
    cy.loginAsMoLamarUS();
    rfpListPage.visit();
    //cy.get(campaignPage.toggleUI).click();
    cy.wait(2000);
    rfpListPage.changeLocation('United States');
    //Basic details
    rfpListPage.getNavBarTitle().should('contain', 'RFPs').wait(5000);
    rfpListPage.searchAndSelectRfp(campaignName);
    
    //Add response
    cy.get(rfpResponsepage.btnSAddResponse).click().wait(1000);


    // Create Package 1
  cy.get(rfpResponsepage.createPackage).should('contain', 'Create Package').click();
  cy.get(rfpResponsepage.heading).should('contain', 'New Package');
  cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
  cy.get(rfpResponsepage.packageSave).should('be.disabled');
  cy.get(rfpResponsepage.packageGeneralInfoLabel).should('contain', 'General Information');
  cy.get(rfpResponsepage.packageTypeLabel).should('contain', 'Type');
  cy.get(rfpResponsepage.selectType).should('contain', 'Select Type').click().wait(1000);
  cy.get(rfpResponsepage.responseFilterResults).type(mediaType[0]).wait(1000);
  cy.get(rfpResponsepage.listItems).click();

  //select market
  cy.get(rfpResponsepage.packageMarketLabel).should('contain', 'Market');
  cy.get(rfpResponsepage.selectMarket).should('contain', 'Select Market').click().wait(1000);
  cy.get(rfpResponsepage.marketListItem).eq(0).click();

  // select size
  cy.get(rfpResponsepage.packageSizeLabel).should('contain', 'Size (Optional)');
  cy.get(rfpResponsepage.packageSize).type('400"x400"').blur().should('have.value', '400"x400"');

  //select Location
  cy.get(rfpResponsepage.packageLocationLabel).should('contain', 'Location Description');
  cy.get(rfpResponsepage.locationDesc).focus().blur();
  cy.get(rfpResponsepage.errorMessage).should('contain', 'Location Description is required');
  cy.get(rfpResponsepage.locationDesc).type('Location Description 1').blur();
  cy.get(rfpResponsepage.locationDesc).should('have.value', 'Location Description 1');
  cy.get(rfpResponsepage.errorMessage).should('not.exist');
  cy.get(rfpResponsepage.packageRationaleLabel).should('contain', 'Rationale (Optional)');
  cy.get(rfpResponsepage.rationale).type('Rationale 1').blur().should('have.value', 'Rationale 1');
  cy.get(rfpResponsepage.packageCancel).click();
  cy.get(rfpResponsepage.unsavedPopupTitle).should('contain', 'Unsaved Changes')
  cy.get(rfpResponsepage.unsavedPopupMessage).should('contain', 'You have unsaved changes on this page.')
  cy.get(rfpResponsepage.unsavedPopupConfirmation).should('contain', 'Are you sure you want to leave this page?')
  cy.get(rfpResponsepage.closeLeavePopup).should('not.be.disabled');
  cy.get(rfpResponsepage.leaveBtn).should('not.be.disabled');
  cy.get(rfpResponsepage.stayBtn).click();
  cy.get(rfpResponsepage.pacakageNetRatesLabel).should('contain', 'Net Rates');

  // select units
  cy.get(rfpResponsepage.packageUnitsLabel).should('contain', 'Units');
  cy.get(rfpResponsepage.units).focus().blur();
  cy.get(rfpResponsepage.errorMessage).should('contain', 'Units is required');
  cy.get(rfpResponsepage.units).type('ABC').blur().should('be.empty');
  cy.get(rfpResponsepage.errorMessage).should('contain', 'Units is required');
  cy.get(rfpResponsepage.units).type('1000').blur().should('have.value', '1000');
  cy.get(rfpResponsepage.errorMessage).should('not.exist');
  cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
  cy.get(rfpResponsepage.packageSave).should('be.disabled');

  cy.get(rfpResponsepage.packageNetRatesLabel).should('contain', 'Net Rate Card');
  cy.get(rfpResponsepage.netRateCardSymbol).should('contain', '$');
  cy.get(rfpResponsepage.netRateCard).focus().blur();
  cy.get(rfpResponsepage.errorMessage).should('contain', 'Net Rate Card is required');
  cy.get(rfpResponsepage.netRateCard).type('ABC').blur().should('be.empty');
  cy.get(rfpResponsepage.errorMessage).should('contain', 'Net Rate Card is required');
  cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
  cy.get(rfpResponsepage.packageSave).should('be.disabled');
  cy.get(rfpResponsepage.netRateCard).type('1500').blur().should('have.value', '1,500.00');
  cy.get(rfpResponsepage.errorMessage).should('not.exist');

  cy.get(rfpResponsepage.packageNetNegotiatedRate).should('contain', 'Net Negotiated Rate');
  cy.get(rfpResponsepage.netNegoRateSymbol).should('contain', '$');
  cy.get(rfpResponsepage.netNegoRate).focus().blur();
  cy.get(rfpResponsepage.errorMessage).should('contain', 'Net Negotiated Rate is required');
  cy.get(rfpResponsepage.netNegoRate).type('ABC').blur().should('be.empty');
  cy.get(rfpResponsepage.errorMessage).should('contain', 'Net Negotiated Rate is required');
  cy.get(rfpResponsepage.netNegoRate).type('1450').blur().should('have.value', '1,450.00');
  cy.get(rfpResponsepage.discountTitle).should('contain', '% Discount');
  cy.get(rfpResponsepage.discount).should('contain', '3.33%');
  //select dates
  cy.get(rfpResponsepage.packageFlightDates).should('contain', 'Flight Dates');
  cy.get(rfpResponsepage.packageStartDate).should('contain', 'Start Date');
  cy.get(rfpResponsepage.flightDateStart).should('not.be.disabled');
  cy.get(`${rfpResponsepage.flightDateStart} > div > cad-dropdown > div > div > div 
  > div > .cad-datepicker__head > .cad-datepicker__input`)
    .should('have.attr', 'placeholder', 'MM/DD/YYYY');
  cy.get(rfpResponsepage.flightDateStart).click();
  cy.get(rfpResponsepage.errorMessage).should('contain', 'Start Date is required');
  cy.get(rfpResponsepage.packageCalanderDays).click();
  cy.contains('10').click();
  cy.get(rfpResponsepage.errorMessage).should('not.exist');
  cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
  cy.get(rfpResponsepage.packageSave).should('be.disabled');
  cy.get(rfpResponsepage.packageEndDate).should('contain', 'End Date');
  cy.get(`${rfpResponsepage.flightDateEnd} > div > cad-dropdown > div > div > div 
  > div > .cad-datepicker__head > .cad-datepicker__input`)
    .should('have.attr', 'placeholder', 'MM/DD/YYYY');
  cy.get(rfpResponsepage.flightDateEnd).click();
  cy.get(rfpResponsepage.errorMessage).should('contain', 'End Date is required');
  cy.get(rfpResponsepage.packageCalanderDays).click();
  cy.get(rfpResponsepage.activeDates).contains('25').click();
  cy.get(rfpResponsepage.errorMessage).should('not.exist');
  cy.get(rfpResponsepage.packageCancel).click();
  cy.get(rfpResponsepage.unsavedPopupTitle).should('contain', 'Unsaved Changes')
  cy.get(rfpResponsepage.unsavedPopupMessage).should('contain', 'You have unsaved changes on this page.')
  cy.get(rfpResponsepage.unsavedPopupConfirmation).should('contain', 'Are you sure you want to leave this page?')
  cy.get(rfpResponsepage.closeLeavePopup).should('not.be.disabled');
  cy.get(rfpResponsepage.leaveBtn).should('not.be.disabled');
  cy.get(rfpResponsepage.stayBtn).should('not.be.disabled');
  cy.get(rfpResponsepage.stayBtn).click();

  // Media Cost section
  cy.get(rfpResponsepage.pacakageMediaCost).should('contain', 'Media Cost');
  cy.get(rfpResponsepage.packageCycleType).should('contain', 'Cycle Type');
  cy.get(rfpResponsepage.cycleType).should('not.be.disabled').should('contain', 'Select Cycle Type').click();
  cy.get(rfpResponsepage.cycleTypeDaily).click();

  cy.get(rfpResponsepage.noOfCyclesTitle).should('contain', 'Number of Cycles');
  cy.get(rfpResponsepage.NumberOfCycles).should('not.be.disabled').focus().blur();
  cy.get(rfpResponsepage.errorMessage).should('contain', 'Number of Cycles is required');

  cy.get(rfpResponsepage.NumberOfCycles).type('ABC').blur().should('be.empty');
  cy.get(rfpResponsepage.errorMessage).should('contain', 'Number of Cycles is required');

  cy.get(rfpResponsepage.NumberOfCycles).type('3.74').blur();
  cy.get(rfpResponsepage.NumberOfCycles).should('have.value', '3.74');
  cy.get(rfpResponsepage.errorMessage).should('not.exist');

  cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
  cy.get(rfpResponsepage.packageSave).should('be.disabled');

  cy.get(rfpResponsepage.totalNetMediaCost).should('contain', 'Total Net Media Cost');
  cy.get(rfpResponsepage.totalMediaCost).should('contain', '$5,423.00')

  cy.get(rfpResponsepage.programCosttitle).should('contain', 'Program Cost');
  cy.get(rfpResponsepage.netInstallTitle).should('contain', 'Net Install');
  cy.get(rfpResponsepage.netInstall).should('not.be.disabled');
  cy.get(rfpResponsepage.netInstallSymbol).should('contain', '$');

  cy.get(rfpResponsepage.netInstall).type('{del}{selectall}{backspace}').focus().blur();
  cy.get(rfpResponsepage.errorMessage).should('contain', 'Net Install is required');

  cy.get(rfpResponsepage.netInstall).type('ABC').blur();
  cy.get(rfpResponsepage.netInstall).should('be.empty');
  cy.get(rfpResponsepage.errorMessage).should('contain', 'Net Install is required');

  cy.get(rfpResponsepage.netInstall).type('200').blur();
  cy.get(rfpResponsepage.netInstall).should('have.value', '200.00');
  cy.get(rfpResponsepage.errorMessage).should('not.exist');

  cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
  cy.get(rfpResponsepage.packageSave).should('be.disabled');

  cy.get(rfpResponsepage.packageCancel).click();

  cy.get(rfpResponsepage.unsavedPopupTitle).should('contain', 'Unsaved Changes')
  cy.get(rfpResponsepage.unsavedPopupMessage).should('contain', 'You have unsaved changes on this page.')
  cy.get(rfpResponsepage.unsavedPopupConfirmation).should('contain', 'Are you sure you want to leave this page?')

  cy.get(rfpResponsepage.closeLeavePopup).should('not.be.disabled');
  cy.get(rfpResponsepage.leaveBtn).should('not.be.disabled');
  cy.get(rfpResponsepage.stayBtn).should('not.be.disabled');

  cy.get(rfpResponsepage.stayBtn).click();

  cy.get(rfpResponsepage.productionTitle).should('contain', 'Production (Only if forced)');
  cy.get(rfpResponsepage.production).should('not.be.disabled');
  cy.get(rfpResponsepage.productionSymbol).should('contain', '$');

  cy.get(rfpResponsepage.production).type('{del}{selectall}{backspace}').focus().blur();
  cy.get(rfpResponsepage.errorMessage).should('contain', 'Production (Only if forced) is required');

  cy.get(rfpResponsepage.production).type('ABC').blur();
  cy.get(rfpResponsepage.production).should('be.empty');
  cy.get(rfpResponsepage.errorMessage).should('contain', 'Production (Only if forced) is required');

  cy.get(rfpResponsepage.production).type('150').blur();
  cy.get(rfpResponsepage.production).should('have.value', '150.00');
  cy.get(rfpResponsepage.errorMessage).should('not.exist');

  cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
  cy.get(rfpResponsepage.packageSave).should('be.disabled');

  cy.get(rfpResponsepage.totalProgramCostTile).should('contain', 'Total Program Cost');
  cy.get(rfpResponsepage.programCost).should('contain', '$5,773.00');

  cy.get(rfpResponsepage.expiresTitle).should('contain', 'Expires');
  cy.get(rfpResponsepage.holdExpirationDateTitle).should('contain', 'Hold Expiration Date');
  cy.get(rfpResponsepage.holdExpireDate).should('not.be.disabled');
  cy.get(`${rfpResponsepage.holdExpireDate} .cad-datepicker__input`)
    .should('have.attr', 'placeholder', 'MM/DD/YYYY');
  cy.get(rfpResponsepage.holdExpireDate).click();
  // cy.get(rfpResponsepage.errorMessage).should('contain', 'End Date is required');
  cy.get(rfpResponsepage.packageCalanderDays).click();
  cy.get(rfpResponsepage.activeDates).contains('25').click();

  cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
  cy.get(rfpResponsepage.packageSave).should('be.disabled');

  cy.get(rfpResponsepage.methodologyTitle).should('contain', 'Methodology');

  cy.get(rfpResponsepage.IlluminatedTitle).should('contain', 'Illuminated');

  cy.get(rfpResponsepage.illuminated).should('not.be.disabled');

  cy.get(rfpResponsepage.illumYes).should('contain', 'Yes');
  cy.get(rfpResponsepage.illumYes)
    .should('be.visible')//.should('be.checked');

  cy.get(rfpResponsepage.illumNo).should('contain', 'No');
  cy.get(rfpResponsepage.illumNo)
    .should('be.visible').should('not.be.checked')
    .click({ force: true })//.wait(500).should('be.checked');

  cy.get(rfpResponsepage.various).should('contain', 'Various');
  cy.get(rfpResponsepage.various)
    .should('be.visible').should('not.be.checked');

  cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
  cy.get(rfpResponsepage.packageSave).should('be.disabled');

  cy.get(rfpResponsepage.universeTitle).should('contain', 'Universe: 18+ yrs Weekly Geopath Impressions');
  cy.get(rfpResponsepage.Universe).should('not.be.disabled');
  cy.get(rfpResponsepage.Universe).focus().blur();
  cy.get(rfpResponsepage.errorMessage).should('contain', 'Universe: 18+ yrs Weekly Geopath Impressions is required');

  cy.get(rfpResponsepage.Universe).type('ABC').blur();
  cy.get(rfpResponsepage.Universe).should('be.empty');
  cy.get(rfpResponsepage.errorMessage).should('contain', 'Universe: 18+ yrs Weekly Geopath Impressions is required');

  cy.get(rfpResponsepage.Universe).type('1342356767').blur();
  cy.get(rfpResponsepage.Universe).should('have.value', '1,342,356,767.00');
  cy.get(rfpResponsepage.errorMessage).should('not.exist');

  cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
  cy.get(rfpResponsepage.packageSave).should('be.disabled');
/* feature removed as enhancement
  cy.get(rfpResponsepage.allAdultsTitle).should('contain', 'All: Adults by Age-Group - 18-49 yrs Weekly Geopath Impressions')
  cy.get(rfpResponsepage.all).should('not.be.disabled');
  cy.get(rfpResponsepage.all).focus().blur();
  cy.get(rfpResponsepage.errorMessage).should('contain', 'All: Adults by Age-Group - 18-49 yrs Weekly Geopath Impressions is required');

  cy.get(rfpResponsepage.all).type('ABC').blur();
  cy.get(rfpResponsepage.all).should('be.empty');
  cy.get(rfpResponsepage.errorMessage).should('contain', 'All: Adults by Age-Group - 18-49 yrs Weekly Geopath Impressions is required');

  cy.get(rfpResponsepage.all).type('87634537568').blur();
  cy.get(rfpResponsepage.all).should('have.value', '87,634,537,568.00');
  cy.get(rfpResponsepage.errorMessage).should('not.exist');
*/
  cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
  cy.get(rfpResponsepage.packageSave).should('be.disabled');

  cy.get(rfpResponsepage.methodolgoyOfMeasurementTitle).should('contain', 'Methodology of Measurement');

  cy.get(rfpResponsepage.geoPath).should('contain', 'Geopath');
  cy.get(rfpResponsepage.geoPath)
    .should('be.visible')//.should('be.checked');

  cy.get(rfpResponsepage.other).should('contain', 'Other');
  cy.get(rfpResponsepage.other)
    .should('be.visible').should('not.be.checked')
    .click({ force: true })//.wait(500).should('be.checked');

  cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
  cy.get(rfpResponsepage.packageSave).should('be.disabled');

  cy.get(rfpResponsepage.weeklyNonGeoMeasurementTitle).should('contain', 'Weekly Non-Geopath Measurement');
  cy.get(rfpResponsepage.NonGeopath).should('not.be.disabled');
  cy.get(rfpResponsepage.NonGeopath).focus().blur();
  cy.get(rfpResponsepage.errorMessage).should('contain', 'Weekly Non-Geopath Measurement is required');

  cy.get(rfpResponsepage.NonGeopath).type('ABC').blur();
  cy.get(rfpResponsepage.NonGeopath).should('be.empty');
  cy.get(rfpResponsepage.errorMessage).should('contain', 'Weekly Non-Geopath Measurement is required');

  cy.get(rfpResponsepage.NonGeopath).type('4654321654').blur();
  cy.get(rfpResponsepage.NonGeopath).should('have.value', '4,654,321,654.00');
  cy.get(rfpResponsepage.errorMessage).should('not.exist');

  cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
  cy.get(rfpResponsepage.packageSave).should('not.be.disabled');

  cy.get(rfpResponsepage.commnetsTitle).should('contain', 'Comments');
  cy.get(rfpResponsepage.comment).should('not.be.disabled');
  cy.get(rfpResponsepage.comment).type('sample test comment 1');
  cy.get(rfpResponsepage.comment).should('have.value', 'sample test comment 1');

  cy.get(rfpResponsepage.packageUnitsTitle).should('contain', 'Units');
  cy.get(rfpResponsepage.dropPictureMessage).should('contain', 'Drop your file here');

  cy.get(rfpResponsepage.browse).should('not.be.disabled');
  cy.get(rfpResponsepage.browse).should('contain', 'Browse');

  cy.get(rfpResponsepage.dropPictureInfo).should('contain', 'Supported file format: .xlsm');
  cy.get(rfpResponsepage.templateTitle).should('contain', 'Template (package-frames-template)');

  cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
  cy.get(rfpResponsepage.packageSave).should('not.be.disabled');

//  cy.get(rfpResponsepage.browse).click().wait(1000);

  for (var i = 0; i < packUnits.length; i++) {
    const imageFixturePath = testDataPath + packUnits[i];
    rfpResponsepage.importFramesFromFile(imageFixturePath);
    cy.wait(3000);
  }
  //cy.get(rfpResponsepage.messageTitle).should('contain', 'Proposal Unit(s) have been added.');

  cy.get(rfpResponsepage.import).should('not.be.disabled');
  cy.get(rfpResponsepage.import).should('contain', 'Import from File');

  cy.get(rfpResponsepage.responseFilterResults).should('not.be.disabled');

  cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
  cy.get(rfpResponsepage.packageSave).should('not.be.disabled');

  cy.get(rfpResponsepage.packageCancel).click();

  cy.get(rfpResponsepage.unsavedPopupTitle).should('contain', 'Unsaved Changes')
  cy.get(rfpResponsepage.unsavedPopupMessage).should('contain', 'You have unsaved changes on this page.')
  cy.get(rfpResponsepage.unsavedPopupConfirmation).should('contain', 'Are you sure you want to leave this page?')
  cy.get(rfpResponsepage.closeLeavePopup).should('not.be.disabled');
  cy.get(rfpResponsepage.leaveBtn).should('not.be.disabled');
  cy.get(rfpResponsepage.stayBtn).should('not.be.disabled');

  cy.get(rfpResponsepage.stayBtn).click();

  cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
  cy.get(rfpResponsepage.packageSave).should('not.be.disabled');
  cy.get(rfpResponsepage.packageSave).click().wait(2000);

  cy.get(rfpResponsepage.messageTitle).should('contain', ' RFP Package successfully created').wait(1000);

  cy.get(rfpResponsepage.responsePackageCount).wait(1000)
    .then(($span) => {
      var count = $span.text().trim();
      //     cy.wrap(parseInt(count)).should('be.gt', 0)
      if (parseInt(count) > 0) {
        if (parseInt(count) > 10) {
          cy.get(rfpResponsepage.nextPage).should('not.be.disabled');
        }
        else
          cy.get(`[data-automation="ooh-rfp-packages-table"] > ag-grid-angular > .ag-root-wrapper  
              > .ag-root-wrapper-body > .ag-root > .ag-body-viewport > .ag-center-cols-clipper  
              > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row`)
            .should('have.length', count);
      }
    });


    cy.get(rfpResponsepage.headerSave).click();
    cy.get(rfpResponsepage.footerSendResponse).click();
    cy.get('.popup-title').should('contain', 'Send Response');
    cy.get(rfpResponsepage.closePopUp).should('not.be.disabled');
    cy.get(rfpResponsepage.popupDescription).should('contain',
      'Are you sure that you want to send the response? After sending, you will be able to edit it only if the planner changes RFP');
    cy.get(rfpResponsepage.deletaPackPopCancel).should('not.be.disabled');
    cy.get(rfpResponsepage.deletaPackPopCancel).should('contain', 'Cancel');
    cy.get(rfpResponsepage.deletaPackPopYes).should('not.be.disabled').should('contain', 'Send').click();
    cy.get(createCampaignPage.messageStatus).should('contain', 'Proposal Sent');
    cy.get(rfpResponsepage.btnDecline).should('not.be.disabled');
    cy.get(rfpResponsepage.btnDecline).should('contain', 'Decline');
    cy.get(rfpResponsepage.viewResponse).eq(1).should('contain', 'View Response');
    cy.get(rfpResponsepage.btnSendRFP).should('not.be.disabled');
    cy.get(rfpResponsepage.btnSAddResponse).should('contain', 'Add Response');
    cy.get(createCampaignPage.statusMessage).should('contain', 'Proposal Sent');
  });
  
  it('E2E Verify Delete packages in response to RFP', () => {
      cy.loginAsMoLamarUS();
      rfpListPage.visit();
      //cy.get(campaignPage.toggleUI).click();
      cy.wait(2000);
      rfpListPage.changeLocation('United States');
      //Basic details
      rfpListPage.getNavBarTitle().should('contain', 'RFPs').wait(5000);
      rfpListPage.searchAndSelectRfp(campaignName);
      
      //Add response
      cy.get(rfpResponsepage.btnDecline).should('not.be.disabled');
      cy.get(rfpResponsepage.btnSAddResponse).click().wait(1000);
  
  
      //delete package
      var count;
      cy.get(rfpResponsepage.responsePackageCount).wait(1000)
        .then(($span) => {
          var count = $span.text().trim();
          //cy.wrap(parseInt(count)).should('be.gt', 0)
          if (parseInt(count) > 10) {
            cy.get(rfpResponsepage.nextPage).should('not.be.disabled');
          }
          else {
            cy.get(rfpResponsepage.packageRows)
              .should('have.length', count);
          }
  
          cy.get(rfpResponsepage.editPackage).should('not.be.disabled');
          cy.get(rfpResponsepage.deletePackage).should('not.be.disabled').click();
          cy.get(rfpResponsepage.deletePackageTitle).should('contain', 'Delete Pacakge');
          cy.get(rfpResponsepage.popupDescription).should('contain',
            'Are you sure want to delete selected package(s)? This action will delete the package and saving is not required');
          cy.get(rfpResponsepage.deletaPackPopCancel).should('not.be.disabled');
          cy.get(rfpResponsepage.deletaPackPopCancel).should('contain', 'Cancel');
          cy.get(rfpResponsepage.deletaPackPopYes).should('not.be.disabled');
          cy.get(rfpResponsepage.deletaPackPopYes).should('contain', 'Yes');
  
          // Cancel first time
          cy.get(rfpResponsepage.deletaPackPopCancel).click();
  
          cy.get(rfpResponsepage.responsePackageCount).wait(1000)
            .then(($span) => {
              var count = $span.text().trim();
              //cy.wrap(parseInt(count)).should('be.gt', 0)
              if (parseInt(count) > 10) {
                cy.get(rfpResponsepage.nextPage).should('not.be.disabled');
              }
              else {
                cy.get(rfpResponsepage.packageRows).should('have.length', count);
              }
            });
  
          cy.get(rfpResponsepage.editPackage).should('not.be.disabled');  
          cy.get(rfpResponsepage.deletePackage).click();
          cy.get(rfpResponsepage.deletePackageTitle).should('contain', 'Delete Pacakge');
          cy.get(rfpResponsepage.closePopUp).should('not.be.disabled');
          cy.get(rfpResponsepage.popupDescription).should('contain',
            'Are you sure want to delete selected package(s)? This action will delete the package and saving is not required');
          cy.get(rfpResponsepage.deletaPackPopCancel).should('not.be.disabled');
          cy.get(rfpResponsepage.deletaPackPopCancel).should('contain', 'Cancel');
          cy.get(rfpResponsepage.deletaPackPopYes).should('not.be.disabled');
          cy.get(rfpResponsepage.deletaPackPopYes).should('contain', 'Yes');
          cy.get(rfpResponsepage.deletaPackPopYes).click();
        });
  
      cy.get(rfpResponsepage.responsePackageCount).wait(1000)
        .then(($span) => {
          var count = $span.text().trim();
          //cy.wrap(parseInt(count)).should('be.gte', count)
          if (parseInt(count) > 10) {
            cy.get(rfpResponsepage.nextPage).should('not.be.disabled');
          }
          else {
            cy.get(rfpResponsepage.packageRows)
              .should('have.length', count);
          }
        });
  
      //create package 
      cy.get(rfpResponsepage.createPackage).should('not.be.disabled');
      cy.get(rfpResponsepage.createPackage).should('contain', 'Create Package');
      cy.get(rfpResponsepage.createPackage).click();
      cy.get(rfpResponsepage.heading).should('contain', 'New Package');
      cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
      cy.get(rfpResponsepage.packageSave).should('be.disabled');
      cy.get(rfpResponsepage.packageGeneralInfoLabel).should('contain', 'General Information');
      cy.get(rfpResponsepage.packageTypeLabel).should('contain', 'Type');
      cy.get(rfpResponsepage.selectType).should('not.be.disabled');
      cy.get(rfpResponsepage.selectType).should('contain', 'Select Type');
      cy.get(rfpResponsepage.selectType).click().wait(1000);
      cy.get(rfpResponsepage.responseFilterResults).type(mediaType[2]).wait(1000);
      cy.get(rfpResponsepage.listItems).eq(0).click();
      cy.get(rfpResponsepage.packageMarketLabel).should('contain', 'Market');
      cy.get(rfpResponsepage.selectMarket).should('not.be.disabled');
      cy.get(rfpResponsepage.selectMarket).should('contain', 'Select Market');
      cy.get(rfpResponsepage.selectMarket).click().wait(1000);
      cy.get(rfpResponsepage.marketListItem).eq(0).click();
      cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
      cy.get(rfpResponsepage.packageSave).should('be.disabled');
      cy.get(rfpResponsepage.packageSizeLabel).should('contain', 'Size (Optional)');
      cy.get(rfpResponsepage.packageSize).should('not.be.disabled');
      cy.get(rfpResponsepage.packageSize).type('200"x100"').blur();
      cy.get(rfpResponsepage.packageSize).should('have.value', '200"x100"');
      cy.get(rfpResponsepage.packageLocationLabel).should('contain', 'Location Description');
      cy.get(rfpResponsepage.locationDesc).should('not.be.disabled');
      cy.get(rfpResponsepage.locationDesc).focus().blur();
      cy.get(rfpResponsepage.errorMessage).should('contain', 'Location Description is required');
      cy.get(rfpResponsepage.locationDesc).type('Location Description 3').blur();
      cy.get(rfpResponsepage.locationDesc).should('have.value', 'Location Description 3');
      cy.get(rfpResponsepage.errorMessage).should('not.exist');
      cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
      cy.get(rfpResponsepage.packageSave).should('be.disabled');
      cy.get(rfpResponsepage.packageRationaleLabel).should('contain', 'Rationale (Optional)');
      cy.get(rfpResponsepage.rationale).should('not.be.disabled');
      cy.get(rfpResponsepage.rationale).type('Rationale 3').blur();
      cy.get(rfpResponsepage.rationale).should('have.value', 'Rationale 3');
      cy.get(rfpResponsepage.packageCancel).click();
      cy.get(rfpResponsepage.unsavedPopupTitle).should('contain', 'Unsaved Changes')
      cy.get(rfpResponsepage.unsavedPopupMessage).should('contain', 'You have unsaved changes on this page.')
      cy.get(rfpResponsepage.unsavedPopupConfirmation).should('contain', 'Are you sure you want to leave this page?')
  
      cy.get(rfpResponsepage.closeLeavePopup).should('not.be.disabled');
      cy.get(rfpResponsepage.leaveBtn).should('not.be.disabled');
      cy.get(rfpResponsepage.stayBtn).should('not.be.disabled');
      cy.get(rfpResponsepage.stayBtn).click();
      cy.get(rfpResponsepage.pacakageNetRatesLabel).should('contain', 'Net Rates');
      cy.get(rfpResponsepage.packageUnitsLabel).should('contain', 'Units');
      cy.get(rfpResponsepage.units).should('not.be.disabled');
      cy.get(rfpResponsepage.units).focus().blur();
      cy.get(rfpResponsepage.errorMessage).should('contain', 'Units is required');
  
      cy.get(rfpResponsepage.units).type('ABC').blur();
      cy.get(rfpResponsepage.units).should('be.empty');
      cy.get(rfpResponsepage.errorMessage).should('contain', 'Units is required');
      cy.get(rfpResponsepage.units).type('950').blur();
      cy.get(rfpResponsepage.units).should('have.value', '950');
      cy.get(rfpResponsepage.errorMessage).should('not.exist');
  
      cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
      cy.get(rfpResponsepage.packageSave).should('be.disabled');
      cy.get(rfpResponsepage.packageNetRatesLabel).should('contain', 'Net Rate Card');
      cy.get(rfpResponsepage.netRateCard).should('not.be.disabled');
      cy.get(rfpResponsepage.netRateCardSymbol)
        .should('contain', '$');
      cy.get(rfpResponsepage.netRateCard).focus().blur();
      cy.get(rfpResponsepage.errorMessage).should('contain', 'Net Rate Card is required');
      cy.get(rfpResponsepage.netRateCard).type('ABC').blur();
      cy.get(rfpResponsepage.netRateCard).should('be.empty');
      cy.get(rfpResponsepage.errorMessage).should('contain', 'Net Rate Card is required');
  
      cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
      cy.get(rfpResponsepage.packageSave).should('be.disabled');
      cy.get(rfpResponsepage.netRateCard).type('1750').blur();
      cy.get(rfpResponsepage.netRateCard).should('have.value', '1,750.00');
      cy.get(rfpResponsepage.errorMessage).should('not.exist');
      cy.get(rfpResponsepage.packageNetNegotiatedRate).should('contain', 'Net Negotiated Rate');
      cy.get(rfpResponsepage.netNegoRate).should('not.be.disabled');
      cy.get(rfpResponsepage.netNegoRateSymbol).should('contain', '$');
      cy.get(rfpResponsepage.netNegoRate).focus().blur();
      cy.get(rfpResponsepage.errorMessage).should('contain', 'Net Negotiated Rate is required');
      cy.get(rfpResponsepage.netNegoRate).type('ABC').blur();
      cy.get(rfpResponsepage.netNegoRate).should('be.empty');
      cy.get(rfpResponsepage.errorMessage).should('contain', 'Net Negotiated Rate is required');
  
      cy.get(rfpResponsepage.netNegoRate).type('1170').blur();
      cy.get(rfpResponsepage.netNegoRate).should('have.value', '1,170.00');
      cy.get(rfpResponsepage.errorMessage).should('not.exist');
      cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
      cy.get(rfpResponsepage.packageSave).should('be.disabled');
      cy.get(rfpResponsepage.packageCancel).click();
      cy.get(rfpResponsepage.unsavedPopupTitle).should('contain', 'Unsaved Changes')
      cy.get(rfpResponsepage.unsavedPopupMessage).should('contain', 'You have unsaved changes on this page.')
      cy.get(rfpResponsepage.unsavedPopupConfirmation).should('contain', 'Are you sure you want to leave this page?')
  
      cy.get(rfpResponsepage.closeLeavePopup).should('not.be.disabled');
      cy.get(rfpResponsepage.leaveBtn).should('not.be.disabled');
      cy.get(rfpResponsepage.stayBtn).should('not.be.disabled');
      cy.get(rfpResponsepage.stayBtn).click();
      cy.get(rfpResponsepage.discountTitle).should('contain', '% Discount');
      cy.get(rfpResponsepage.discount).should('contain', '33.14%');
      cy.get(rfpResponsepage.packageFlightDates).should('contain', 'Flight Dates');
      cy.get(rfpResponsepage.packageStartDate).should('contain', 'Start Date');
      cy.get(rfpResponsepage.flightDateStart).should('not.be.disabled');
      cy.get(`${rfpResponsepage.flightDateStart} > div > cad-dropdown > div > div > div 
      > div > .cad-datepicker__head > .cad-datepicker__input`)
        .should('have.attr', 'placeholder', 'MM/DD/YYYY');
      cy.get(rfpResponsepage.flightDateStart).click();
      cy.get(rfpResponsepage.errorMessage).should('contain', 'Start Date is required');
      cy.get(rfpResponsepage.packageCalanderDays).click();
      cy.contains('12').click();
      cy.get(rfpResponsepage.errorMessage).should('not.exist');
  
      cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
      cy.get(rfpResponsepage.packageSave).should('be.disabled');
      cy.get(rfpResponsepage.packageEndDate).should('contain', 'End Date');
     // cy.get('.ng-tns-c25-7 > [cad-dropdown-head=""] > .cad-datepicker__head').should('not.be.disabled');
      cy.get(`${rfpResponsepage.flightDateEnd} > div > cad-dropdown > div > div > div 
      > div > .cad-datepicker__head > .cad-datepicker__input`)
        .should('have.attr', 'placeholder', 'MM/DD/YYYY');
      cy.get(rfpResponsepage.flightDateEnd).click();
      cy.get(rfpResponsepage.errorMessage).should('contain', 'End Date is required');
      cy.get(rfpResponsepage.packageCalanderDays).click();
      cy.get(rfpResponsepage.activeDates).contains('26').click();
      cy.get(rfpResponsepage.errorMessage).should('not.exist');
      cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
      cy.get(rfpResponsepage.packageSave).should('be.disabled');
  
      cy.get(rfpResponsepage.packageCancel).click();
      cy.get(rfpResponsepage.unsavedPopupTitle).should('contain', 'Unsaved Changes')
      cy.get(rfpResponsepage.unsavedPopupMessage).should('contain', 'You have unsaved changes on this page.')
      cy.get(rfpResponsepage.unsavedPopupConfirmation).should('contain', 'Are you sure you want to leave this page?')
      cy.get(rfpResponsepage.closeLeavePopup).should('not.be.disabled');
      cy.get(rfpResponsepage.leaveBtn).should('not.be.disabled');
      cy.get(rfpResponsepage.stayBtn).should('not.be.disabled');
      cy.get(rfpResponsepage.stayBtn).click();
      cy.get(rfpResponsepage.pacakageMediaCost).should('contain', 'Media Cost');
      cy.get(rfpResponsepage.packageCycleType).should('contain', 'Cycle Type');
      cy.get(rfpResponsepage.cycleType).should('not.be.disabled');
      cy.get(rfpResponsepage.cycleType).should('contain', 'Select Cycle Type');
      cy.get(rfpResponsepage.cycleType).click();
      cy.get(rfpResponsepage.cycleTypeListItem).click();
  
      cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
      cy.get(rfpResponsepage.packageSave).should('be.disabled');
      cy.get(rfpResponsepage.noOfCyclesTitle).should('contain', 'Number of Cycles');
      cy.get(rfpResponsepage.NumberOfCycles).should('not.be.disabled');
      cy.get(rfpResponsepage.NumberOfCycles).focus().blur();
      cy.get(rfpResponsepage.errorMessage).should('contain', 'Number of Cycles is required');
      cy.get(rfpResponsepage.NumberOfCycles).type('ABC').blur();
      cy.get(rfpResponsepage.NumberOfCycles).should('be.empty');
      cy.get(rfpResponsepage.errorMessage).should('contain', 'Number of Cycles is required');
      cy.get(rfpResponsepage.NumberOfCycles).type('2.60').blur();
      cy.get(rfpResponsepage.NumberOfCycles).should('have.value', '2.60');
      cy.get(rfpResponsepage.errorMessage).should('not.exist');
      cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
      cy.get(rfpResponsepage.packageSave).should('be.disabled');
      cy.get(rfpResponsepage.totalNetMediaCost).should('contain', 'Total Net Media Cost');
      cy.get(rfpResponsepage.totalMediaCost).should('contain', '$3,042.00')
      cy.get(rfpResponsepage.programCosttitle).should('contain', 'Program Cost');
      cy.get(rfpResponsepage.netInstallTitle).should('contain', 'Net Install');
      cy.get(rfpResponsepage.netInstall).should('not.be.disabled');
      cy.get(rfpResponsepage.netInstallCurrencySymbol).should('contain', '$');
  
      cy.get(rfpResponsepage.netInstall).type('{del}{selectall}{backspace}').focus().blur();
      cy.get(rfpResponsepage.errorMessage).should('contain', 'Net Install is required');
      cy.get(rfpResponsepage.netInstall).type('ABC').blur();
      cy.get(rfpResponsepage.netInstall).should('be.empty');
      cy.get(rfpResponsepage.errorMessage).should('contain', 'Net Install is required');
      cy.get(rfpResponsepage.netInstall).type('320').blur();
      cy.get(rfpResponsepage.netInstall).should('have.value', '320.00');
      cy.get(rfpResponsepage.errorMessage).should('not.exist');
      cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
      cy.get(rfpResponsepage.packageSave).should('be.disabled');
      cy.get(rfpResponsepage.packageCancel).click();
      cy.get(rfpResponsepage.unsavedPopupTitle).should('contain', 'Unsaved Changes')
      cy.get(rfpResponsepage.unsavedPopupMessage).should('contain', 'You have unsaved changes on this page.')
      cy.get(rfpResponsepage.unsavedPopupConfirmation).should('contain', 'Are you sure you want to leave this page?')
      cy.get(rfpResponsepage.closeLeavePopup).should('not.be.disabled');
      cy.get(rfpResponsepage.leaveBtn).should('not.be.disabled');
      cy.get(rfpResponsepage.stayBtn).should('not.be.disabled');
  
      cy.get(rfpResponsepage.stayBtn).click();
      cy.get(rfpResponsepage.productionTitle).should('contain', 'Production (Only if forced)');
      cy.get(rfpResponsepage.productionSymbol).should('contain', '$');
      cy.get(rfpResponsepage.production).type('{del}{selectall}{backspace}').focus().blur();
      cy.get(rfpResponsepage.errorMessage).should('contain', 'Production (Only if forced) is required');
      cy.get(rfpResponsepage.production).type('ABC').blur();
      cy.get(rfpResponsepage.production).should('be.empty');
      cy.get(rfpResponsepage.errorMessage).should('contain', 'Production (Only if forced) is required');
      cy.get(rfpResponsepage.production).type('270').blur();
      cy.get(rfpResponsepage.production).should('have.value', '270.00');
      cy.get(rfpResponsepage.errorMessage).should('not.exist');
      cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
      cy.get(rfpResponsepage.packageSave).should('be.disabled');
  
      cy.get(rfpResponsepage.totalProgramCostTile).should('contain', 'Total Program Cost');
      cy.get(rfpResponsepage.programCost).should('contain', '$3,632.00');
      cy.get(rfpResponsepage.expiresTitle).should('contain', 'Expires');
      cy.get(rfpResponsepage.holdExpirationDateTitle).should('contain', 'Hold Expiration Date');
      cy.get(rfpResponsepage.holdExpireDate).should('not.be.disabled');
      cy.get(`${rfpResponsepage.holdExpireDate} .cad-datepicker__input`)
        .should('have.attr', 'placeholder', 'MM/DD/YYYY');
      cy.get(rfpResponsepage.holdExpireDate).click();
      // cy.get(rfpResponsepage.errorMessage).should('contain', 'End Date is required');
      cy.get(rfpResponsepage.packageCalanderDays).click();
      cy.contains('16').click();
      cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
      cy.get(rfpResponsepage.packageSave).should('be.disabled');
      cy.get(rfpResponsepage.methodologyTitle).should('contain', 'Methodology');
      cy.get(rfpResponsepage.IlluminatedTitle).should('contain', 'Illuminated');
      cy.get(rfpResponsepage.illuminated).should('not.be.disabled');
      cy.get(rfpResponsepage.illumYes).should('contain', 'Yes');
      cy.get(rfpResponsepage.illumYes)
        .should('be.visible')//.should('be.checked');
  
      cy.get(rfpResponsepage.illumNo).should('contain', 'No');
      cy.get(rfpResponsepage.illumNo)
        .should('be.visible').should('not.be.checked')
      cy.get(rfpResponsepage.various).should('contain', 'Various');
      cy.get(rfpResponsepage.various)
        .should('be.visible').should('not.be.checked');
      cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
      cy.get(rfpResponsepage.packageSave).should('be.disabled');
      cy.get(rfpResponsepage.universeTitle).should('contain', 'Universe: 18+ yrs Weekly Geopath Impressions');
      cy.get(rfpResponsepage.Universe).should('not.be.disabled');
      cy.get(rfpResponsepage.Universe).focus().blur();
      cy.get(rfpResponsepage.errorMessage).should('contain', 'Universe: 18+ yrs Weekly Geopath Impressions is required');
  
      cy.get(rfpResponsepage.Universe).type('ABC').blur();
      cy.get(rfpResponsepage.Universe).should('be.empty');
      cy.get(rfpResponsepage.errorMessage).should('contain', 'Universe: 18+ yrs Weekly Geopath Impressions is required');
      cy.get(rfpResponsepage.Universe).type('1342356767').blur();
      cy.get(rfpResponsepage.Universe).should('have.value', '1,342,356,767.00');
      cy.get(rfpResponsepage.errorMessage).should('not.exist');
      cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
      cy.get(rfpResponsepage.packageSave).should('be.disabled');
/* feature removed as enhancement      
      cy.get(rfpResponsepage.allAdultsTitle).should('contain', 'All: Adults by Age-Group - 18-49 yrs Weekly Geopath Impressions')
      cy.get(rfpResponsepage.all).should('not.be.disabled');
      cy.get(rfpResponsepage.all).focus().blur();
      cy.get(rfpResponsepage.errorMessage).should('contain', 'All: Adults by Age-Group - 18-49 yrs Weekly Geopath Impressions is required');
      cy.get(rfpResponsepage.all).type('ABC').blur();
      cy.get(rfpResponsepage.all).should('be.empty');
      cy.get(rfpResponsepage.errorMessage).should('contain', 'All: Adults by Age-Group - 18-49 yrs Weekly Geopath Impressions is required');
  
      cy.get(rfpResponsepage.all).type('87634537568').blur();
      cy.get(rfpResponsepage.all).should('have.value', '87,634,537,568.00');
      cy.get(rfpResponsepage.errorMessage).should('not.exist');
*/      
      cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
      cy.get(rfpResponsepage.packageSave).should('be.disabled');
      cy.get(rfpResponsepage.methodolgoyOfMeasurementTitle).should('contain', 'Methodology of Measurement');
      cy.get(rfpResponsepage.geoPath).should('contain', 'Geopath');
      cy.get(rfpResponsepage.geoPath)
        .should('be.visible')//.should('be.checked');
      cy.get(rfpResponsepage.other).should('contain', 'Other');
      cy.get(rfpResponsepage.other)
      cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
      cy.get(rfpResponsepage.packageSave).should('be.disabled');
  
      cy.get(':nth-child(22) > :nth-child(2) > .title').should('contain', '(Target Demo) 4 Wk IMPs ');
      cy.get(rfpResponsepage.TargetDemo).should('not.be.disabled');
      cy.get(rfpResponsepage.TargetDemo).focus().blur();
      cy.get(rfpResponsepage.errorMessage).should('contain', '(Target Demo) 4 Wk IMPs is required');
  
      cy.get(rfpResponsepage.TargetDemo).type('ABC').blur();
      cy.get(rfpResponsepage.TargetDemo).should('be.empty');
      cy.get(rfpResponsepage.errorMessage).should('contain', '(Target Demo) 4 Wk IMPs is required');
  
      cy.get(rfpResponsepage.TargetDemo).type('4654321654').blur();
      cy.get(rfpResponsepage.TargetDemo).should('have.value', '4,654,321,654.00');
      cy.get(rfpResponsepage.errorMessage).should('not.exist');
  
      cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
      cy.get(rfpResponsepage.packageSave).should('not.be.disabled');
  
      cy.get(rfpResponsepage.commnetsTitle).should('contain', 'Comments');
      cy.get(rfpResponsepage.comment).should('not.be.disabled');
      cy.get(rfpResponsepage.comment).type('sample test comment 3');
      cy.get(rfpResponsepage.comment).should('have.value', 'sample test comment 3');
  
      cy.get(rfpResponsepage.packageUnitsTitle).should('contain', 'Units');
      cy.get(rfpResponsepage.dropPictureMessage).should('contain', 'Drop your file here');
  
      cy.get(rfpResponsepage.browse).should('not.be.disabled');
      cy.get(rfpResponsepage.browse).should('contain', 'Browse');
  
      cy.get(rfpResponsepage.dropPictureInfo).should('contain', 'Supported file format: .xlsm');
      cy.get(rfpResponsepage.templateTitle).should('contain', 'Template (package-frames-template)');
  
      cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
      cy.get(rfpResponsepage.packageSave).should('not.be.disabled');
  
      cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
      cy.get(rfpResponsepage.packageSave).should('not.be.disabled');
  
      cy.get(rfpResponsepage.packageCancel).click();
  
      cy.get(rfpResponsepage.unsavedPopupTitle).should('contain', 'Unsaved Changes')
      cy.get(rfpResponsepage.unsavedPopupMessage).should('contain', 'You have unsaved changes on this page.')
      cy.get(rfpResponsepage.unsavedPopupConfirmation).should('contain', 'Are you sure you want to leave this page?')
  
      cy.get(rfpResponsepage.closeLeavePopup).should('not.be.disabled');
      cy.get(rfpResponsepage.leaveBtn).should('not.be.disabled');
      cy.get(rfpResponsepage.stayBtn).should('not.be.disabled');
  
      cy.get(rfpResponsepage.stayBtn).click();
  
      cy.get(rfpResponsepage.packageCancel).should('not.be.disabled');
      cy.get(rfpResponsepage.packageSave).should('not.be.disabled');
      cy.get(rfpResponsepage.packageSave).click().wait(3000);
  
      cy.get(rfpResponsepage.messageTitle).should('contain', ' RFP Package successfully created')
        .wait(1000);
  
      cy.get(rfpResponsepage.responsePackageCount).wait(1000)
        .then(($span) => {
          var count = $span.text().trim();
          //     cy.wrap(parseInt(count)).should('be.gt', 0)
          if (parseInt(count) > 10) {
            cy.get(rfpResponsepage.nextPage).should('not.be.disabled');
          }
          else {
            cy.get(`[data-automation="ooh-rfp-packages-table"] > ag-grid-angular > .ag-root-wrapper  
                   > .ag-root-wrapper-body > .ag-root > .ag-body-viewport > .ag-center-cols-clipper  
                   > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row`)
              .should('have.length', count);
          }
        });
      cy.get(rfpResponsepage.footerSendResponse).should('not.be.disabled');
      cy.get(rfpResponsepage.footerSendResponse).click();
      cy.get('.popup-title').should('contain', 'Send Response');
      cy.get(rfpResponsepage.closePopUp).should('not.be.disabled');
      cy.get(rfpResponsepage.popupDescription).should('contain',
        'Are you sure that you want to send the response? After sending, you will be able to edit it only if the planner changes RFP');
      cy.get(rfpResponsepage.deletaPackPopCancel).should('not.be.disabled');
      cy.get(rfpResponsepage.deletaPackPopCancel).should('contain', 'Cancel');
      cy.get(rfpResponsepage.deletaPackPopYes).should('not.be.disabled');
      cy.get(rfpResponsepage.deletaPackPopYes).should('contain', 'Send');
      cy.get(rfpResponsepage.deletaPackPopYes).click();
      cy.get(createCampaignPage.messageStatus).should('contain', 'Proposal Sent');
      cy.get(rfpResponsepage.btnDecline).should('not.be.disabled');
      cy.get(rfpResponsepage.btnDecline).should('contain', 'Decline');
  });
  
  it('E2E Verify View response as Planner', () =>{
    cy.loginAsPlanner();
    createCampaignPage.visit();
    cy.get(rfpListPage.searchIcon).click();
    cy.getByDataAutomation(rfpListPage.searchCampaign).type(campaignName).wait(1000);
    cy.get(rfpListPage.rfpListStatus).should('contain', 'Proposal Received');
    cy.get(rfpListPage.expandDetails).click();
    cy.get(rfpListPage.campaignStatus).should('contain', 'Proposal Received');
    cy.get(rfpListPage.campaignMO).should('contain', 'Lamar');
    cy.get(rfpListPage.campaignEmail).should('contain', 'mbwla.test1@mbww.com');
    cy.get(rfpListPage.CampaignProposedUnits).eq(1).should('contain', '5');
    cy.get(rfpListPage.CampaignCost).should('contain', '$3,632.00');
    cy.get(rfpListPage.viewResponseLink).click();
    
    // validate Response
    cy.get(viewResopnse.responseHeading).should('contain', campaignName);
    cy.get(viewResopnse.viewResponseStatus).should('contain', 'Proposal Received');
    cy.get(viewResopnse.openInMap).should('not.be.disabled');
    cy.get(viewResopnse.buttonExportExcel).should('be.disabled');
    cy.get(viewResopnse.buttonExportPPT).should('be.disabled');

    // validate Excel and PPT download
    cy.get(viewResopnse.moreActions).click();
    cy.get(viewResopnse.moreActionsExportPPT).should('not.be.disabled');
    cy.get(viewResopnse.moreActionsExportXLS).should('not.be.disabled');
    cy.get(viewResopnse.moreActionsExportXLS).click().wait(2000);
    cy.get(viewResopnse.excelDownloadSuccessMessage).should('contain', 'Proposal units downloaded');
    cy.get(viewResopnse.moreActions).click();
    cy.get(viewResopnse.moreActionsExportPPT).click().wait(2000);
    cy.get(viewResopnse.pptEmailSuccessMessage).should('contain', 'PPT will be sent via Email');

    // Validate Media Owners
    cy.get(viewResopnse.mediaOwnersTitle).should('contain', 'Media Owners');
    cy.get(viewResopnse.mediaOwnersCount).should('contain', '2');
    cy.get(viewResopnse.tableMediaOwner).should('contain', 'Lamar');
    cy.get(viewResopnse.MOEmail).should('contain', 'mbwla.test1@mbww.com');
    cy.get(viewResopnse.MOProposedUnit).eq(1).should('contain', '5');
    cy.get(viewResopnse.MOCost).should('contain', '$3,632.00');
    cy.get(viewResopnse.MOComments).should('contain', 'sample comment to responsesample comment to response');
    cy.get(viewResopnse.MOAttachments).should('contain', '2 Files');

    // Validate Units
    cy.get(viewResopnse.unitsTitle).should('contain', 'Units');
    cy.get(viewResopnse.selectedUnitsTitle).should('contain', 'Selected Units');
    cy.get(viewResopnse.unitsCount).should('contain', '4');
    cy.get(viewResopnse.selectedUnitsCount).should('contain', '0');
    cy.get(viewResopnse.filterButton).should('exist');
    cy.get(viewResopnse.searchFilter).should('exist');
    cy.get(viewResopnse.packagesTitle).should('contain', 'Packages');
    cy.get(viewResopnse.packagesCount).should('contain', '1');
    cy.get(viewResopnse.selectedPackages).should('contain', 'Selected Packages');
    cy.get(viewResopnse.selectedPackagesCount).should('contain', '0');

    // Download selected units
    cy.get(viewResopnse.selectAllUnits).click();
    cy.get(viewResopnse.buttonExportExcel).should('not.be.disabled');
    cy.get(viewResopnse.buttonExportPPT).should('not.be.disabled');
    cy.get(viewResopnse.buttonExportExcel).click().wait(2000);
    cy.get(viewResopnse.excelDownloadSuccessMessage).should('contain', 'Proposal units downloaded');
    cy.get(viewResopnse.moreActions).click();
    cy.get(viewResopnse.buttonExportPPT).click().wait(2000);
    cy.get(viewResopnse.pptEmailSuccessMessage).should('contain', 'PPT will be sent via Email');

    // Open in Maps
    cy.get(viewResopnse.openInMap).click();
    cy.get(viewResopnse.mapMediaOwnersTitle).should('contain', 'Media Owners');
    cy.get(viewResopnse.mapMediaOwnerCount).should('contain', '2');
    cy.get(viewResopnse.mapMediaOwner).should('contain', 'Lamar');
    cy.get(viewResopnse.amountOfUnits).should('contain', '4');

    homePage.logout();

  });

  it('E2E Add Response - Single Units (Import From Files) - Default', () => {
    cy.loginAsMoLamarUS();
    rfpListPage.visit();
    cy.wait(2000);
    rfpListPage.changeLocation('United States');
    //Basic details
    rfpListPage.getNavBarTitle().should('contain', 'RFPs').wait(5000);
    rfpListPage.searchAndSelectRfp(campaignName);
    cy.contains('Add Response').click();
    //cy.get(rfpResponsepage.btnSAddResponse).click().wait(1000);
    cy.get(rfpResponsepage.importFromFile).should('not.be.disabled');
    cy.intercept({
      method: "POST",
      url: "https://col.eum-appdynamics.com/eumcollector/beacons/browser/v1/AD-AAB-AAB-BZP/adrum",
    }).as("addUnits");

    // Delete existing frames
    cy.wait(3000).get(rfpResponsepage.responseUnitsCount).invoke('text').then(parseFloat).then((count) => {  
      cy.log(count.toString());
      if(count > 0){
        cy.get(rfpResponsepage.deleteAll).should('not.have.class', 'disabled');
        cy.get(rfpResponsepage.deleteAll).click();
        cy.get(rfpResponsepage.popupDescription).should('contain', 'Are you sure want to delete all records?');
        cy.get(rfpResponsepage.deletaPackPopCancel).should('not.be.disabled');
        cy.get(rfpResponsepage.deletaPackPopYes).click().wait(1000);
//        cy.get(rfpResponsepage.deleteAll).should('have.class', 'disabled');
      }else{
        cy.get(rfpResponsepage.deleteAll).should('have.class', 'disabled');
      }
    });
    
    cy.get(rfpResponsepage.headerSave).click().wait(2000);

    // Add units by ID before upload from file to test sorting
    cy.get(rfpResponsepage.addByID).click();
    cy.get(rfpResponsepage.searchByIdTxt).type(addByID[0]);
    cy.get(rfpResponsepage.addByIdSearchBtn).click();
    let idsLen = 2;
    for (var i = 1; i <= idsLen; i++) {
      cy.get(':nth-child(' + i + ') > :nth-child(6) > cad-link > .cad-link').click();
    }
    cy.get(rfpResponsepage.addByIdDone).click();
    const geopathIds = addByID[0].split(',');
    cy.get('[row-index="0"] > [aria-colindex="3"]').should('contain', geopathIds[0]);
    cy.get('[row-index="1"] > [aria-colindex="3"]').should('contain', geopathIds[2]);
/*    cy.get(rfpResponsepage.imageWithError).should('exist').click();
    cy.get(rfpResponsepage.addImagePopupTitle).should('contain', 'Pictures')
    const imageFixturePath = testDataPath + imageName[0];
    cy.get(rfpResponsepage.PopupAttachFile).attachFile(imageFixturePath).wait(1000)
    cy.get(rfpResponsepage.imgDoneBtn).click()
*/
    let splString = 'asdfghjklPOIUYTREWQ~!@#,\'$%^&*()_+|}{":?><\/1234567890'
    rfpResponsepage.enterRequiredFileds(idsLen, splString);
    cy.get(rfpResponsepage.headerSave).click();


    // Upload file with no data   
    rfpResponsepage.importFramesFromFile(testDataPath + "proposal_upload_template[Multiple-Clients].xlsm");
    cy.wait(3000);
    cy.get(rfpResponsepage.uploadMessage).eq(0).should('contain', 'There is no data in the uploaded file.');  
    cy.get(rfpResponsepage.messageCloseButton).eq(0).click();


    // Upload default template for multiple clients with data
    rfpResponsepage.importFramesFromFile(testDataPath + "proposal_upload_template[Multiple-Clients]-Lamar.xlsm");

    // validate and close upload messages
    cy.wait("@addUnits").wait(2000);
    cy.wait("@addUnits").wait(2000);
    cy.get(rfpResponsepage.uploadMessage).eq(0).should('contain', 'proposal unit(s) have been added');
    cy.get(rfpResponsepage.uploadMessage).eq(1).should('contain', 'Following Geopath Id does not exist: 45386, invalid, hence not imported.');
    cy.get(rfpResponsepage.messageCloseButton).eq(0).click(); 

    // validate file contents in ag-grid
    const FixturePath = "cypress/fixtures/ooh/campaigns/testData/proposal_upload_template[Multiple-Clients]-Lamar.xlsm";
    const sheet = "proposal_upload_template"; 
    cy.task("generateJSONFromExcel", {FixturePath, sheet}).then((units: any) => {
      units.forEach((object: any, index: any) => {
        let rowNo = index;
        if(rowNo<6){
          cy.fixture('ooh/campaigns/custom_template.json').then((data) => {
            // validate Audited frames 
            if(rfpResponsepage.processData(object['Audited*'], "") === 'Yes'){
              cy.get(rfpResponsepage.frameTableHeaders).each(($el, index) => {
                if(data.Templates.auditedColFromDB.includes($el.text())){
                  cy.get('[row-index="'+rowNo+'"] > [aria-colindex="'+(index+3)+'"]').should('not.be.empty');
                }
                if($el.text() === 'POI'){
                  cy.get('[row-index="'+rowNo+'"] > [aria-colindex="'+(index+3)+'"]').should('not.be.empty');
                }
                if($el.text() === 'Distance POI (miles)'){
                  cy.get('[row-index="'+rowNo+'"] > [aria-colindex="'+(index+3)+'"]').invoke('text').then(parseFloat).should('be.gt', 0);
                }
              });

            }else{
              // Validate Non audited frames common columns
              for (var index in data.Templates.commonColumns) {
                if(rowNo<6){
                  if(data.Templates.commonColumns[index]==='Longitude*' || data.Templates.commonColumns[index]==='Latitude*'){
                    if((rfpResponsepage.processData(object['Longitude*'], "upper").trim()==='N/A') ||
                        (rfpResponsepage.processData(object['Latitude*'], "upper").trim()==='N/A')){
                        cy.get('[row-index="'+rowNo+'"] > [aria-colindex="'+(parseInt(index)+2)+'"]').should('contain', 'N/A');
                    }else if(data.Templates.commonColumns[index].length > 9){
                      cy.get('[row-index="'+rowNo+'"] > [aria-colindex="'+(parseInt(index)+2)+'"]').should('contain', rfpResponsepage.processData(object[data.Templates.commonColumns[index]], "").toString().substring(0, 8));
                    }else{
                      cy.get('[row-index="'+rowNo+'"] > [aria-colindex="'+(parseInt(index)+2)+'"]').should('contain', rfpResponsepage.processData(object[data.Templates.commonColumns[index]], ""));
                    }
                  }else if(data.Templates.commonColumns[index]==='Face*'){
                    cy.get('[row-index="'+rowNo+'"] > [aria-colindex="'+(parseInt(index)+2)+'"]').should('contain', rfpResponsepage.processData(object[data.Templates.commonColumns[index]], "upper"));
                  }else if(data.Templates.commonColumns[index]==='Distance POI (Miles)'){
                    cy.get('[row-index="'+rowNo+'"] > [aria-colindex="'+(parseInt(index)+2)+'"]').should('contain', rfpResponsepage.processData(object[data.Templates.commonColumns[index]], "2decimals"));
                  }else if(data.Templates.commonColumns[index]==='Rate Card per Cycle*' || data.Templates.commonColumns[index]==='Net Negotiable Rate per Cycle*' || 
                            data.Templates.commonColumns[index]==='Net Install*' || data.Templates.commonColumns[index]==='Production*'){
                    cy.get('[row-index="'+rowNo+'"] > [aria-colindex="'+(parseInt(index)+2)+'"]').should('contain', rfpResponsepage.processData(object[data.Templates.commonColumns[index]], "cost"));
                  }else if(data.Templates.commonColumns[index]==='A18+ Weekly Impressions' || data.Templates.commonColumns[index]==='(Target Demo) 4 Wk IMPs' || data.Templates.commonColumns[index]==='Weekly Non-Geopath Measurement'){
                    cy.get('[row-index="'+rowNo+'"] > [aria-colindex="'+(parseInt(index)+2)+'"]').should('contain', rfpResponsepage.processData(object[data.Templates.commonColumns[index]], "numbersOnly"));
                  }else if(data.Templates.commonColumns[index]==='Illumination'){
                    cy.get('[row-index="'+rowNo+'"] > [aria-colindex="'+(parseInt(index)+2)+'"]').should('contain', rfpResponsepage.processData(object[data.Templates.commonColumns[index]], "trim"));
                  }else{
                    cy.get('[row-index="'+rowNo+'"] > [aria-colindex="'+(parseInt(index)+2)+'"]').should('contain', rfpResponsepage.processData(object[data.Templates.commonColumns[index]], ""));
                  }
                }
                
              }

              // Validate non audited frames client specific columns
              for (var index in data.Templates.multiClient) {
                if(rowNo<6){
                  let colNo = parseInt(index)+2+data.Templates.commonColumns.length;
                  if(data.Templates.multiClient[index]==='Longitude*' || data.Templates.multiClient[index]==='Latitude*'){
                    if((rfpResponsepage.processData(object['Longitude*'], "upper").trim()==='N/A') ||
                        (rfpResponsepage.processData(object['Latitude*'], "upper").trim()==='N/A')){
                        cy.get('[row-index="'+rowNo+'"] > [aria-colindex="'+colNo+'"]').should('contain', 'N/A');
                    }else if(data.Templates.multiClient[index].length > 9){
                      cy.get('[row-index="'+rowNo+'"] > [aria-colindex="'+colNo+'"]').should('contain', rfpResponsepage.processData(object[data.Templates.multiClient[index]], "").toString().substring(0, 8));
                    }else{
                      cy.get('[row-index="'+rowNo+'"] > [aria-colindex="'+colNo+'"]').should('contain', rfpResponsepage.processData(object[data.Templates.multiClient[index]], ""));
                    }
                  }else if(data.Templates.multiClient[index]==='Face*'){
                    cy.get('[row-index="'+rowNo+'"] > [aria-colindex="'+colNo+'"]').should('contain', rfpResponsepage.processData(object[data.Templates.multiClient[index]], "upper"));
                  }else if(data.Templates.multiClient[index]==='Distance POI (Miles)'){
                    cy.get('[row-index="'+rowNo+'"] > [aria-colindex="'+colNo+'"]').should('contain', rfpResponsepage.processData(object[data.Templates.multiClient[index]], "2decimals"));
                  }else if(data.Templates.multiClient[index]==='Rate Card per Cycle*' || data.Templates.multiClient[index]==='Net Negotiable Rate per Cycle*' || 
                            data.Templates.multiClient[index]==='Net Install*' || data.Templates.multiClient[index]==='Production*'){
                    cy.get('[row-index="'+rowNo+'"] > [aria-colindex="'+colNo+'"]').should('contain', rfpResponsepage.processData(object[data.Templates.multiClient[index]], "csot"));
                  }else if(data.Templates.multiClient[index]==='A18+ Weekly Impressions' || data.Templates.multiClient[index]==='(Target Demo) 4 Wk IMPs' || data.Templates.multiClient[index]==='Weekly Non-Geopath Measurement'){
                    cy.get('[row-index="'+rowNo+'"] > [aria-colindex="'+colNo+'"]').should('contain', rfpResponsepage.processData(object[data.Templates.multiClient[index]], "numbersOnly"));
                  }else if(data.Templates.multiClient[index]==='Illumination'){
                    cy.get('[row-index="'+rowNo+'"] > [aria-colindex="'+colNo+'"]').should('contain', rfpResponsepage.processData(object[data.Templates.multiClient[index]], "trim"));
                  }else{
                    cy.get('[row-index="'+rowNo+'"] > [aria-colindex="'+colNo+'"]').should('contain', rfpResponsepage.processData(object[data.Templates.multiClient[index]], ""));
                  }
                }
              }
            }
          }) 
        }  
      });
      cy.get(rfpResponsepage.headerSave).click();

      // add images to the frames
      for(let i = 0; i<4; i++){
        if(i===0){
          cy.get(rfpResponsepage.imageWithError).eq(0).should('exist').click();
        }else{
          cy.get(rfpResponsepage.imageWithError).eq(1).should('exist').click();
        }
        cy.get(rfpResponsepage.addImagePopupTitle).should('contain', 'Pictures')
        cy.get(rfpResponsepage.addImagePopupClose).should('not.be.disabled');
        cy.get(rfpResponsepage.dropPictureMessage).should('contain', 'Drop your picture here');
        cy.get(rfpResponsepage.dropPictureInfo).should('contain', 'Only .jpg or .png files less than 5 MB are allowed.')
        cy.get(rfpResponsepage.imgBrowseBtn).should('not.be.disabled');
        cy.get(rfpResponsepage.addImagePopupBrowse).should('contain', 'Browse');
        const imageFixturePath = testDataPath + imageName[0];
        cy.get(rfpResponsepage.PopupAttachFile).attachFile(imageFixturePath).wait(1000)
        cy.get(rfpResponsepage.imgDoneBtn).should('contain', 'Done').click();
      }
      // delete frame 
      cy.get(rfpResponsepage.deleteUnit).eq(1).click();
      cy.get(rfpResponsepage.headerSave).click();


      // Add units by ID after upload from file to test sorting
      cy.get(rfpResponsepage.addByID).click();
      cy.get(rfpResponsepage.searchByIdTxt).type(addByID[0]);
      cy.get(rfpResponsepage.addByIdSearchBtn).click();
      for (var i = 3; i <= idsLen+2; i++) {
        cy.get(':nth-child(' + i + ') > :nth-child(6) > cad-link > .cad-link').click();
      }
      cy.get(rfpResponsepage.addByIdDone).click();
      cy.get('[row-index="0"] > [aria-colindex="3"]').should('contain', geopathIds[1]);
      cy.get('[row-index="1"] > [aria-colindex="3"]').should('contain', geopathIds[3]);
      rfpResponsepage.enterRequiredFileds(idsLen, splString);

      //verify sort order
      units.forEach((object: any, index: any) => {
        if(index===0){
          cy.get('[row-index="'+(index+2)+'"] > [aria-colindex="3"]').should('contain', rfpResponsepage.processData(object['Geopath Id'], ""));
        }else if(index>1 && index<6){
          cy.get('[row-index="'+(index+1)+'"] > [aria-colindex="3"]').should('contain', rfpResponsepage.processData(object['Geopath Id'], ""));
        }
      });
      
      cy.get('[row-index="7"] > [aria-colindex="3"]').should('contain', geopathIds[0]);
      cy.get('[row-index="8"] > [aria-colindex="3"]').should('contain', geopathIds[2]);
    }); 
    

    // save response
     cy.get(rfpResponsepage.headerSave).click();
     cy.get(rfpResponsepage.uploadMessage).eq(1).should('contain', 'Saved as draft');
     
  });

  it.only('E2E Add Frames to package using Import from File', () => {
    cy.loginAsMoLamarUS();
    rfpListPage.visit();
    cy.wait(2000);
    rfpListPage.changeLocation('United States');
    rfpListPage.searchAndSelectRfp(campaignName);
    cy.contains('Add Response').click();

    // Create Package 1
    cy.get(rfpResponsepage.createPackage).click();
    cy.get(rfpResponsepage.selectType).click().wait(1000);
    cy.get(rfpResponsepage.responseFilterResults).type(mediaType[2]).wait(1000);
    cy.get(rfpResponsepage.listItems).eq(0).click();
    cy.get(rfpResponsepage.selectMarket).click().wait(1000);
    cy.get(rfpResponsepage.marketListItem).eq(0).click();
    cy.get(rfpResponsepage.packageSize).type('200"x100"').blur();
    cy.get(rfpResponsepage.locationDesc).type('Location Description 3').blur();
    cy.get(rfpResponsepage.rationale).type('Rationale 3').blur();
    cy.get(rfpResponsepage.units).type('950').blur();
    cy.get(rfpResponsepage.netRateCard).type('1750').blur();
    cy.get(rfpResponsepage.netNegoRate).type('1170').blur();
    cy.get(rfpResponsepage.flightDateStart).click();
    cy.get(rfpResponsepage.packageCalanderDays).click();
    cy.contains('12').click();
    cy.get(rfpResponsepage.flightDateEnd).click();
    cy.get(rfpResponsepage.packageCalanderDays).click();
    cy.contains('26').click();
    cy.get(rfpResponsepage.cycleType).click();
    cy.get(rfpResponsepage.cycleTypeListItem).click();
    cy.get(rfpResponsepage.NumberOfCycles).type('2.60').blur();
    cy.get(rfpResponsepage.netInstall).type('{del}{selectall}{backspace}').focus().blur();
    cy.get(rfpResponsepage.netInstall).type('320').blur();
    cy.get(rfpResponsepage.production).type('{del}{selectall}{backspace}').focus().blur();
    cy.get(rfpResponsepage.production).type('270').blur();
    cy.get(rfpResponsepage.holdExpireDate).click();
    cy.get(rfpResponsepage.packageCalanderDays).click();
    cy.contains('16').click();

    cy.get(rfpResponsepage.Universe).type('1342356767').blur();
    /* feature removed as enhancement
    cy.get(rfpResponsepage.all).focus().blur();
    cy.get(rfpResponsepage.all).type('87634537568').blur();
    */
    cy.get(rfpResponsepage.TargetDemo).focus().blur();
    cy.get(rfpResponsepage.TargetDemo).type('4654321654').blur();
    cy.get(rfpResponsepage.comment).type('sample test comment 3');

    
    // Upload file with no data   
    rfpResponsepage.importFramesFromFile(testDataPath + "package-frames-template.xlsm");
    cy.get(rfpResponsepage.uploadMessage).eq(0).should('contain', 'There is no data in the uploaded file.');  
    cy.get(rfpResponsepage.messageCloseButton).eq(0).click();

    // Upload default template for multiple clients with data
    rfpResponsepage.importFramesFromFile(testDataPath + "Multi-Client package-frames.xlsm");

    // validate and close upload messages
    cy.get(rfpResponsepage.uploadMessage).eq(0).should('contain', 'Following Geopath Id does not exist: 48243abc, hence not imported.');
    cy.get(rfpResponsepage.messageCloseButton).eq(0).click();

    // validate file contents in ag-grid non audited units
    const FixturePath = "cypress/fixtures/ooh/campaigns/testData/Multi-Client package-frames.xlsm";
    const sheet = "add frames to package"; 
    cy.task("generateJSONFromExcel", {FixturePath, sheet}).then((units: any) => {
      let i = 0;
      units.forEach((object: { [x: string]: string; }) => {
           cy.fixture('ooh/campaigns/package_upload_templates.json').then((data) => {
            if(i<2){
              cy.get('[row-index="'+i+'"]>[aria-colindex="1"]').should('contain', rfpResponsepage.processData(object['Unit #*'], ""));
              for (var index in data.Templates.packageMultiClient) {
                // update the excel file with one NA value for longitude and latitude on further implementaion
                if(data.Templates.packageMultiClient[index]==='Longitude*' || data.Templates.packageMultiClient[index]==='Latitude*'){
                  if((rfpResponsepage.processData(object['Longitude*'], "upper").trim()==='N/A') ||
                      (rfpResponsepage.processData(object['Latitude*'], "upper").trim()==='N/A')){
                      cy.get('[row-index="'+i+'"] > [aria-colindex="'+(parseInt(index)+2)+'"]').should('contain', 'N/A');
                  }else{
                    cy.get('[row-index="'+i+'"] > [aria-colindex="'+(parseInt(index)+2)+'"]').should('contain', rfpResponsepage.processData(object[data.Templates.packageMultiClient[index]], "upper"));
                  }
                }else{
                  cy.get('[row-index="'+i+'"] > [aria-colindex="'+(parseInt(index)+2)+'"]').should('contain', rfpResponsepage.processData(object[data.Templates.packageMultiClient[index]], ""));
                }
              }
              cy.get('[row-index="'+i+'"]>[aria-colindex="20"]>[class="icons"]').should('exist');
              i++;
            }
          })
      });
    }); 

    // validate Add by Id
    cy.get(rfpResponsepage.addByID).click();
    cy.get(rfpResponsepage.addByIdPopupTitle).should('contain', 'Add by ID');
    cy.get(rfpResponsepage.addByIdSubTitle).should('contain', 'Unit IDs');
    cy.get(rfpResponsepage.searchById).type('12');
    cy.get(rfpResponsepage.searchButton).click().wait(2000);
    cy.get(rfpResponsepage.addByIdPopupTitle).should('contain', 'Add by ID');
    cy.get(rfpResponsepage.addByIdUnitsLabel).should('contain', 'Units');
    cy.get(rfpResponsepage.selectedUnitsCount).should('contain', '0');
    cy.get(rfpResponsepage.addByIdTableHeaders).contains('Unit ID').should('exist');
    cy.get(rfpResponsepage.addByIdTableHeaders).contains('Geopath ID').should('exist');
    cy.get(rfpResponsepage.addByIdTableHeaders).contains('Media Format').should('exist');
    cy.get(rfpResponsepage.addByIdTableHeaders).contains('Location Description').should('exist');
    
    // select all and remove all units
    cy.get(rfpResponsepage.selectAll).click();
    cy.get(rfpResponsepage.selectedUnitsCount).should('contain', '17');
    cy.get(rfpResponsepage.removeAll).click();
    cy.get(rfpResponsepage.selectedUnitsCount).should('contain', '0');
    
    // add units by ID and validate audited unit imported from file
    cy.get('tr').each(($ele, index) =>{
      if($ele.text().includes('30704855') || $ele.text().includes('30996622')){
        cy.get(rfpResponsepage.addButton).eq(index-1).click();
      }
    })

    cy.get(rfpResponsepage.selectedUnitsCount).should('contain', '2');
    cy.get(rfpResponsepage.addByIdCancel).should('not.be.disabled');
    cy.get(rfpResponsepage.addByIdDone).click(); 

    let i = 2;
    cy.fixture('ooh/campaigns/custom_template.json').then((data) => {
    for(var frame in data.packageAuditedFrames){
      for (var index in data.packageAuditedFrames[frame]) {
       cy.get('[row-index="'+i+'"] > [aria-colindex="'+(parseInt(index)+1)+'"]').should('contain', data.packageAuditedFrames[frame][index]);
      }
      cy.get('[row-index="'+i+'"]>[aria-colindex="20"]>[class="icons"]').should('exist');
      i++;
    } 
  })
      

    cy.wait(5000);
    cy.get(rfpResponsepage.packageSave).click().wait(3000);
    cy.get(rfpResponsepage.uploadMessage).eq(0).should('contain','4 Errors in unit(s) record found.')
    .should('contain','To save the package, please correct the error(s)');
    cy.get(rfpResponsepage.responseErrorMessage).should('contain', 'The row(s) with unit Id highlighted in red have error(s). Scroll right to identify the error(s) and apply the fix.');
    
    cy.get('[row-index="3"] > [aria-colindex="14"]').dblclick().wait(1000);
    cy.get('[row-index="3"] > [aria-colindex="14"]').click().clear().type('start').type('{enter}');																						  
    cy.get('[row-index="3"] > [aria-colindex="14"]').should('contain', 'start');
    cy.get('[row-index="3"] > [aria-colindex="15"]').dblclick().clear().type('end').type('{enter}');																						  
    cy.get('[row-index="3"] > [aria-colindex="15"]').should('contain', 'end');
    cy.get('[row-index="4"] > [aria-colindex="14"]').dblclick().clear().type('test').type('{enter}');																						  
    cy.get('[row-index="4"] > [aria-colindex="14"]').should('contain', 'test');
    cy.get('[row-index="4"] > [aria-colindex="15"]').dblclick().clear().type('endtest').type('{enter}');																						  
    cy.get('[row-index="4"] > [aria-colindex="15"]').should('contain', 'endtest');															
    
    cy.get(rfpResponsepage.packageSave).click().wait(3000);

    cy.get(rfpResponsepage.messageTitle).should('contain', ' RFP Package successfully created').wait(1000);
  });

  it('E2E frame POI and distance from POI validation for campaign without POI', () => {
    campaignName = `e2e test - ${createCampaignPage.campaignNameSuffix()}`;
      cy.task('setCampaignName', campaignName);
      cy.readFile("cypress/fixtures/ooh/campaigns/campaign_config.json").then((data) => {
      data.campaignName[2].name = campaignName
    })

    cy.loginAsPlanner();
    createCampaignPage.visit();
    //cy.get(campaignPage.toggleUI).click();
    campaignPage.selectContentDropDpwn('discover');

    // Select Locations
    createCampaignPage.selectLocation('Pasadena CA, US');
    cy.get(createCampaignPage.mediaOwner).click();
    createCampaignPage.selectLocations(mo);
   
    // Create Campaign with selection
    cy.get(createCampaignPage.MySelectionButton).click();
    cy.get(createCampaignPage.CreateCampaign).click();
    cy.get(createCampaignPage.CampaignName).type(campaignName).blur();
    cy.get(createCampaignPage.submitCampaign).click()
    cy.get(createCampaignPage.CampaignNameTitle).contains(campaignName);
    cy.get(createCampaignPage.campaignDesc).type(campaignName).blur();
    cy.get(createCampaignPage.campaignDesc).should('have.value', campaignName);
    cy.get(createCampaignPage.objective).click();
    cy.get(createCampaignPage.Search)
      .should('have.attr', 'placeholder', 'Search').type(Objective[(Objective.length - 1)]).wait(1000);
    cy.get(createCampaignPage.FirstResultItem).first().click();
    cy.get(createCampaignPage.objective).click();
    cy.get(createCampaignPage.agencySelect).should('contain', 'Select Agency')
    cy.get(createCampaignPage.agency).click();
    cy.get(createCampaignPage.agencySearch)
      .should('have.attr', 'placeholder', 'Search').type(Agency[(Agency.length - 1)]).wait(1000);
    cy.get(createCampaignPage.FirstResultItem).last().click();
    cy.get(createCampaignPage.agency).click();
    cy.get(createCampaignPage.client).click();
    cy.get(createCampaignPage.clientSearch)
      .should('have.attr', 'placeholder', 'Search').type(Client[(Client.length - 1)]).wait(1000);
    cy.get(createCampaignPage.FirstResultItem).first().click();
    cy.get(createCampaignPage.client).click();
    cy.get(createCampaignPage.campaignBudget).type('500000').blur();
    cy.get(createCampaignPage.campaignBudget).should('have.value', '500,000.00');
    cy.get(createCampaignPage.campaignDateRange).click();
    cy.get(
      `${createCampaignPage.calendarLeft}
        > .cad-month-calendar
        > .cad-month-calendar__header
        > .cad-month-calendar__header__icon--right`
    ).click();
    cy.get(
      `${createCampaignPage.calendarLeft}
        > .cad-month-calendar
        > .cad-month-calendar__header
        > .cad-month-calendar__header__icon--right`
    ).click();
    cy.get(createCampaignPage.CalanderDays).contains('12').click();
    cy.get(createCampaignPage.CalanderDays).contains('24').click();

    cy.get(createCampaignPage.CalanderDays).get('.content-count')
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.gt', 0)
      });

    cy.get(`${createCampaignPage.applyBtn} > .cad-button`).click();
    cy.get(createCampaignPage.campaignResDate).click();
    cy.get(createCampaignPage.ResDateNextMonth).click();
    cy.get(createCampaignPage.ResCalanderDays).contains('10').click();
    cy.get(createCampaignPage.CalApplyButton).click();   
    cy.get(createCampaignPage.primaryAudience).should('not.be.disabled');
    cy.get(createCampaignPage.primaryAudience).should('contain', 'Select Primary Audience')
    cy.get(createCampaignPage.primaryAudience).click();
    cy.get(createCampaignPage.Search).should('have.attr', 'placeholder', 'Search');
    cy.get(createCampaignPage.FirstResultItem).first().click();
    cy.get(createCampaignPage.primaryAudience).click();
    cy.get(createCampaignPage.comment).type(campaignName);
    cy.get(createCampaignPage.continueBtn).click();

    cy.get(createCampaignPage.digitalframe).click();
    cy.get(createCampaignPage.selectEmail).click();
    cy.get(createCampaignPage.moEmailList).contains(moEmail[1]).click();
    cy.get(createCampaignPage.selectEmail).click();
    cy.get(createCampaignPage.createCampaignBtn).click();
    cy.contains('Preview and Send Rfp').click();
    // cy.get(createCampaignPage.prevCampaign).last().click();
    cy.get(createCampaignPage.previewRFP).click();
    cy.get(createCampaignPage.sendRFPBtn).click();
    cy.get(createCampaignPage.messageStatus).should('contain', 'RFP Sent');
    cy.get(createCampaignPage.statusMessage).should('contain', 'RFP Sent');
    homePage.logout(); 


    

    /***********************************************************************************************/
    /******************** Media Owner View and Respond to RFP  *************************************/
    /***********************************************************************************************/
    cy.loginAsMoLamarUS();
    rfpListPage.visit();
    cy.wait(2000);
    //cy.get(campaignPage.toggleUI).click();
    rfpListPage.changeLocation('United States');

    //Basic details
    rfpListPage.getNavBarTitle().should('contain', 'RFPs').wait(5000);
    rfpListPage.searchAndSelectRfp(campaignName);

    //Inventory
    cy.get(rfpResponsepage.inventoryTitle).should('contain', 'Inventory').click().wait(1000);
    cy.get(rfpResponsepage.poiTitle).should('contain', 'Points of Interest');
    cy.get(rfpResponsepage.poiCount)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count)).should('be.equal', 0);
      });

    //Add response
    cy.get(rfpResponsepage.btnSendRFP).eq(1).click().wait(1000);

    //Add units by ID
    cy.get(rfpResponsepage.addByID).click();
    cy.get(rfpResponsepage.searchByIdTxt).should('not.be.disabled');
    cy.get(rfpResponsepage.popupCloseButton).should('not.be.disabled');
    cy.get(rfpResponsepage.addByIdHeader).should('contain', 'Add by ID');
    cy.get(rfpResponsepage.searchByIdTxt).should('have.attr', 'placeholder', 'Search by Unit ID or Geopath ID')
    cy.get(rfpResponsepage.searchByIdTxt).type(addByID[0]);
    cy.get(rfpResponsepage.addByIdSearchBtn).click();
    let idsLen: string[] = addByID[0].split(',');
    if (idsLen.length > 0) {
      if (idsLen.length > 10)
        cy.get(rfpResponsepage.nextPage).should('not.be.disabled');
      else
        cy.get(rfpResponsepage.popupunitCount).find('tr').should('have.length', (idsLen.length));
    }
    if (idsLen.length > 0) {
      for (var i = 1; i <= idsLen.length; i++) {
        cy.get(':nth-child(' + i + ') > :nth-child(6) > cad-link > .cad-link').should('not.be.disabled').click();
      }
    }

    cy.get(rfpResponsepage.addByIdDone).click();
    cy.get(rfpResponsepage.responseUnitCount).wait(1000)
      .then(($span) => {
        var Unitscount = $span.text().trim();
        cy.wrap(parseInt(Unitscount)).should('be.gt', 0)
        if (parseInt(Unitscount) > 200)
          cy.get(rfpResponsepage.nextPage).should('not.be.disabled');
        else
          cy.get(rfpResponsepage.unitRows).should('have.length', Unitscount);
        
        // Validate POI and distance from POI column
        cy.get(rfpResponsepage.frameTableHeaders).each(($el, index) => {
          if($el.text() === 'POI'){
            for(let rowno = 0; rowno <parseInt(Unitscount); rowno++){
              cy.get('[row-index="'+rowno+'"] > [aria-colindex="'+(index+3)+'"]').should('be.empty');
            }
          }
          if($el.text() === 'Distance POI (miles)'){
            for(let rowno = 0; rowno <parseInt(Unitscount); rowno++){
              cy.get('[row-index="'+rowno+'"] > [aria-colindex="'+(index+3)+'"]').invoke('text').should('equal', '0.00');
            }
          }
        });
      });
  });

  it('E2E Cell Validation - Validate errors in units uploaded in Import from file', () => {
    cy.loginAsMoLamarUS();
    rfpListPage.visit();
    cy.wait(2000);
    rfpListPage.changeLocation('United States');
    rfpListPage.searchAndSelectRfp(campaignName);
    cy.contains('Add Response').click();
    cy.get(rfpResponsepage.importFromFile).should('not.be.disabled');
    cy.intercept({
      method: "POST",
      url: "https://col.eum-appdynamics.com/eumcollector/beacons/browser/v1/AD-AAB-AAB-BZP/adrum",
    }).as("addUnits");

    // Upload default template for multiple clients with missing mandatory data
    rfpResponsepage.importFramesFromFile(testDataPath + "Multiple_Clients_Lamar_missing_mandatory_fields.xlsm")
    cy.wait(5000);

    // validate error messages for missing mandatory fields
    cy.get(rfpResponsepage.uploadMessage).eq(0).should('contain', ' proposal unit(s) have been added');
    // Validate missing unit id message
    cy.get(rfpResponsepage.uploadMessage).eq(1).should('have.text', 'Unit Id is missing for 1 unit(s), hence not imported.');
    cy.get(rfpResponsepage.messageCloseButton).eq(0).click(); 
    
    
    cy.fixture('ooh/campaigns/custom_template.json').then((data) => {
      // Validate highlighted cells and tooltip
      for(let i=0; i<5; i++){
        cy.get("[row-index='"+i+"'] >"+rfpResponsepage.unitIdCol).should('have.class', 'invalidCell');
        switch(i){
          case 0 :
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.auditedCol).should('have.class', 'invalidCell').trigger('mouseenter') ;
            cy.get(rfpResponsepage.customTooltip).first().should('contain', rfpResponsepage.processData(data.ErrorList.Errors[0], 'tooltip'));
            break;
          case 1 :
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.marketDescCol).should('have.class', 'invalidCell').trigger('mouseenter');
          // cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.Errors[2], 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.formatCol).should('have.class', 'invalidCell').trigger('mouseenter');
          // cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.Errors[3], 'tooltip'));
            break;
          case 2 :
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.faceColNo).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.Errors[5], 'tooltip'));
            break;
          case 3 :
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.rateCardColNo).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.Errors[10].replace("card", "Card"), 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.netNegoRateColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter').wait(1000);
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.Errors[11].replace("negotiated rate", "Negotiated Rate"), 'tooltip'));
            break;
          case 4 :
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.startDateColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.Errors[7], 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.endDateColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.Errors[8], 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.cycleTypeColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.Errors[9], 'tooltip'));
            break;
        };
      }
    

      cy.get(rfpResponsepage.headerSave).click().wait(2000);
      cy.get(rfpResponsepage.responseErrorInstructions).should('contain', 'The row(s) with unit Id highlighted in red have error(s). Scroll right to identify the error(s) and apply the fix.');
      cy.get(rfpResponsepage.expandErrors).click();
      cy.get(rfpResponsepage.individualErrors).should('have.length', data.ErrorList.Errors.length);
      // validate Audited frames  
      cy.get(rfpResponsepage.individualErrors).each(($el, index) => {
        cy.wrap($el).should('have.text', data.ErrorList.Errors[index]);
      });
    })     

    // Validate parsed missing data
    cy.get("[row-index='2'] >"+rfpResponsepage.latColNo).eq(0).should('have.text', 'N/A');
    cy.get("[row-index='2'] >"+rfpResponsepage.longColNo).eq(0).should('have.text', 'N/A');
    cy.get("[row-index='3'] >"+rfpResponsepage.noOfUnitsColNo).eq(0).should('have.text', '1');
    cy.get("[row-index='3'] >"+rfpResponsepage.rateCardColNo).eq(0).should('have.text', '$0.00');
    cy.get("[row-index='3'] >"+rfpResponsepage.netNegoRateColNo).eq(0).should('have.text', '$0.00');
    cy.get("[row-index='3'] >"+rfpResponsepage.noOfCyclesColNo).eq(0).should('have.text', '0.00');
    cy.get("[row-index='3'] >"+rfpResponsepage.netInstallColNo).eq(0).should('have.text', '$0.00');
    cy.get("[row-index='3'] >"+rfpResponsepage.productionCostColNo).eq(0).should('have.text', '$0.00');

     // Delete existing frames
    cy.wait(3000).get(rfpResponsepage.responseUnitsCount).invoke('text').then(parseFloat).then((count) => {  
      cy.log(count.toString());
      if(count > 0){
        cy.get(rfpResponsepage.deleteAll).click();
        cy.get(rfpResponsepage.deletaPackPopYes).click().wait(1000);
      }
    });
    cy.get(rfpResponsepage.headerSave).click().wait(2000);

    // Upload default template for multiple clients with mandatory fields only
    rfpResponsepage.importFramesFromFile(testDataPath + "Multiple_Clients_Lamar_Mandatory_Fields_Only.xlsm")
    cy.wait(5000);

    // Validate no errors are displayed
    cy.get(rfpResponsepage.responseErrorInstructions).should('not.exist');
    cy.get(rfpResponsepage.expandErrors).should('not.exist');

    // Delete existing frames
    cy.wait(3000).get(rfpResponsepage.responseUnitsCount).invoke('text').then(parseFloat).then((count) => {  
      cy.log(count.toString());
      if(count > 0){
        cy.get(rfpResponsepage.deleteAll).click();
        cy.get(rfpResponsepage.deletaPackPopYes).click().wait(1000);
      }
    });
    cy.get(rfpResponsepage.headerSave).click().wait(2000);

    // Upload default template for multiple clients with wrong data
    rfpResponsepage.importFramesFromFile(testDataPath + "Multiple_Clients_Lamar_Wrong_Data.xlsm")
    cy.wait(5000);
    
    cy.fixture('ooh/campaigns/custom_template.json').then((data) => {
      // validate location description before saving
      cy.get("[row-index='0'] >"+rfpResponsepage.locationDesColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter') ;
      cy.get(rfpResponsepage.customTooltip).should('contain', 'Location description should not be more than 1000 characters');
    

    // Validate errors for wrong data
      cy.get(rfpResponsepage.headerSave).click().wait(2000);
      cy.get(rfpResponsepage.responseErrorInstructions).should('contain', 'The row(s) with unit Id highlighted in red have error(s). Scroll right to identify the error(s) and apply the fix.');
      cy.get(rfpResponsepage.expandErrors).click();
      cy.get(rfpResponsepage.individualErrors).should('have.length', data.ErrorList.WrongDataErrors.length);
      // validate Audited frames  
      cy.get(rfpResponsepage.individualErrors).each(($el, index) => {
        cy.wrap($el).should('have.text', data.ErrorList.WrongDataErrors[index]);
      });
    
     // Validate highlighted cells and tooltip
      for(let i=0; i<4; i++){
        cy.get("[row-index='"+i+"'] >"+rfpResponsepage.unitIdCol).should('have.class', 'invalidCell');
        switch(i){
          case 0 :
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.auditedCol).should('have.class', 'invalidCell').trigger('mouseenter') ;
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongDataErrors[0], 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.startDateColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongDataErrors[1], 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.cycleTypeColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongDataErrors[2], 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.latColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongDataErrors[4], 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.longColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongDataErrors[5], 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.holdExpDateColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongDataErrors[6], 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.postDateColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongDataErrors[7], 'tooltip'));
            break;
          case 1 :
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.auditedCol).should('have.class', 'invalidCell').trigger('mouseenter') ;
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongDataErrors[0], 'tooltip'));
            break;
          case 2 :
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.SizeColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongDataErrors[13], 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.pixelSizeColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongDataErrors[14], 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.poiColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongDataErrors[15], 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.takedownDateColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongDataErrors[16], 'tooltip'));
            break;
          case 3 :
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.rateCardColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongDataErrors[18], 'tooltip').replace("card", "Card"));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.netNegoRateColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongDataErrors[19], 'tooltip').replace("negotiated rate", "Negotiated Rate"));
            break;
        };
      }
    
    })

    // Delete existing frames
    cy.wait(3000).get(rfpResponsepage.responseUnitsCount).invoke('text').then(parseFloat).then((count) => {  
      cy.log(count.toString());
      if(count > 0){
        cy.get(rfpResponsepage.deleteAll).click();
        cy.get(rfpResponsepage.deletaPackPopYes).click().wait(1000);
      }
    });
    cy.get(rfpResponsepage.headerSave).click().wait(2000);

    // Upload default template for multiple clients with wrong data for only editable fields
    rfpResponsepage.importFramesFromFile(testDataPath + "Multiple_Clients_Lamar_Wrong_Editable_Data.xlsm")
    cy.wait(5000);

    // Validate errors for wrong editable data
    cy.get(rfpResponsepage.headerSave).click().wait(2000);
    cy.get(rfpResponsepage.responseErrorInstructions).should('contain', 'The row(s) with unit Id highlighted in red have error(s). Scroll right to identify the error(s) and apply the fix.');
    cy.get(rfpResponsepage.expandErrors).click();
    cy.fixture('ooh/campaigns/custom_template.json').then((data) => {
      cy.get(rfpResponsepage.individualErrors).should('have.length', data.ErrorList.WrongEditableDataErrors.length);
      // validate Audited frames  
      cy.get(rfpResponsepage.individualErrors).each(($el, index) => {
        cy.wrap($el).should('have.text', data.ErrorList.WrongEditableDataErrors[index]);
      }); 

      // Validate highlighted cells and tooltip
      for(let i=0; i<3; i++){
        cy.get("[row-index='"+i+"'] >"+rfpResponsepage.unitIdCol).should('have.class', 'invalidCell');
        switch(i){
          case 0 :
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.digitalDetailsColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter') ;
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongEditableDataErrors[3], 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.poiColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongEditableDataErrors[4], 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.startDateColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongEditableDataErrors[0], 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.cycleTypeColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongEditableDataErrors[1], 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.holdExpDateColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongEditableDataErrors[5], 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.postDateColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongEditableDataErrors[6], 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.takedownDateColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongEditableDataErrors[7], 'tooltip'));
            break;
          case 1 :
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.rateCardColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongEditableDataErrors[11].replace("card", "Card"), 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.netNegoRateColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongEditableDataErrors[12].replace("negotiated rate", "Negotiated Rate"), 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.endDateColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter') ;
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongEditableDataErrors[10], 'tooltip'));
            break;
          case 2 :
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.rateCardColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongEditableDataErrors[11].replace("card", "Card"), 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.netNegoRateColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongEditableDataErrors[12].replace("negotiated rate", "Negotiated Rate"), 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.startDateColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongEditableDataErrors[0], 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.cycleTypeColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter');
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongEditableDataErrors[1], 'tooltip'));
            cy.get("[row-index='"+i+"'] >"+rfpResponsepage.endDateColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter') ;
            cy.get(rfpResponsepage.customTooltip).should('contain', rfpResponsepage.processData(data.ErrorList.WrongEditableDataErrors[10], 'tooltip'));
            break;
        };
      }
    });


    // add images to the frames
    for(let i = 0; i<2; i++){
      cy.get(rfpResponsepage.imageWithError).eq(0).should('exist').click();
      cy.get(rfpResponsepage.addImagePopupTitle).should('contain', 'Pictures')
      cy.get(rfpResponsepage.addImagePopupClose).should('not.be.disabled');
      cy.get(rfpResponsepage.dropPictureMessage).should('contain', 'Drop your picture here');
      cy.get(rfpResponsepage.dropPictureInfo).should('contain', 'Only .jpg or .png files less than 5 MB are allowed.')
      cy.get(rfpResponsepage.imgBrowseBtn).should('not.be.disabled');
      cy.get(rfpResponsepage.addImagePopupBrowse).should('contain', 'Browse');
      const imageFixturePath = testDataPath + imageName[0];
      cy.get(rfpResponsepage.PopupAttachFile).attachFile(imageFixturePath).wait(1000)
      cy.get(rfpResponsepage.imgDoneBtn).should('contain', 'Done').click();
    }

    // enter valid data in the fields with error
    let splString = 'asdfghjklPOIUYTREWQ~!@#,\'$%^&*()_+|}{":?><\/1234567890'
    rfpResponsepage.enterRequiredFileds(3, splString);
    rfpResponsepage.sendText('0', rfpResponsepage.digitalDetailsColNo, "testfive", "");
    rfpResponsepage.sendText('0', rfpResponsepage.netInstallColNo, "55", "");
    rfpResponsepage.sendText('0', rfpResponsepage.poiColNo, "jfjkjfjfjfkj", "");
    rfpResponsepage.sendText('0', rfpResponsepage.holdExpDateColNo, "ghhg52", "");
    rfpResponsepage.sendText('0', rfpResponsepage.postDateColNo, "dsfgvsdfg", "");
    rfpResponsepage.sendText('0', rfpResponsepage.takedownDateColNo, "dsfgvsdfg", "");
    rfpResponsepage.sendText('1', rfpResponsepage.rateCardColNo, "55", "");
    rfpResponsepage.sendText('1', rfpResponsepage.netNegoRateColNo, "50", "");
    rfpResponsepage.sendText('1', rfpResponsepage.productionCostColNo, "20", "");
   // rfpResponsepage.sendText('1', rfpResponsepage.methodologyColNo, "Geopath", "");
    rfpResponsepage.sendText('2', rfpResponsepage.rateCardColNo, "55", "");
    rfpResponsepage.sendText('2', rfpResponsepage.netNegoRateColNo, "50", "");

    // save and validate the errors disappear
    cy.get(rfpResponsepage.headerSave).click().wait(2000);
    cy.get(rfpResponsepage.responseErrorInstructions).should('not.exist');
    cy.get(rfpResponsepage.expandErrors).should('not.exist');
    
  });

  it('E2E Cell Validation - Validate errors in frames Add by ID', () => {
    cy.loginAsMoLamarUS();
    rfpListPage.visit();
    cy.wait(2000);
    rfpListPage.changeLocation('United States');
    rfpListPage.searchAndSelectRfp(campaignName);
    cy.contains('Add Response').click();
    cy.get(rfpResponsepage.importFromFile).should('not.be.disabled');
    cy.intercept({
      method: "POST",
      url: "https://col.eum-appdynamics.com/eumcollector/beacons/browser/v1/AD-AAB-AAB-BZP/adrum",
    }).as("addUnits");

    // Delete existing frames
    cy.wait(3000).get(rfpResponsepage.responseUnitsCount).invoke('text').then(parseFloat).then((count) => {  
      cy.log(count.toString());
      if(count > 0){
        cy.get(rfpResponsepage.deleteAll).click();
        cy.get(rfpResponsepage.deletaPackPopYes).click().wait(1000);
      }
    });
    cy.get(rfpResponsepage.headerSave).click().wait(2000);

    // Add units by id for audited frames
    cy.get(rfpResponsepage.addByID).click();
    cy.get(rfpResponsepage.addByIdHeader).should('contain', 'Add by ID');
    cy.get(rfpResponsepage.searchByIdTxt).should('have.attr', 'placeholder', 'Search by Unit ID or Geopath ID')
    cy.get(rfpResponsepage.searchByIdTxt).type(addByID[0]);
    cy.get(rfpResponsepage.addByIdSearchBtn).click();
    let idsLen: string[] = addByID[0].split(',');
    if (idsLen.length > 0) {
      for (var i = 1; i <= 2; i++) {
        cy.get(':nth-child(' + i + ') > :nth-child(6) > cad-link > .cad-link').should('not.be.disabled').click();
      }
    }
    cy.get(rfpResponsepage.addByIdDone).click();
    let hundredChar = "qskiue7658qskiue7658qskiue7658qskiue7658qskiue7658qskiue7658qskiue7658qskiue7658qskiue7658qskiue7658";
    let thousandChar = hundredChar+hundredChar+hundredChar+hundredChar+hundredChar+hundredChar+hundredChar+hundredChar+hundredChar+hundredChar;
    let fiftyChar = "qskiue7658qskiue7658qskiue7658qskiue7658qskiue7658";

    // Enter wrong data in editable fields and validate parsing
    rfpResponsepage.sendText('0', rfpResponsepage.locationDesColNo, thousandChar+'test', "");
    rfpResponsepage.sendText('0', rfpResponsepage.zipCodeColNo, "455sses", "");
    rfpResponsepage.sendText('0', rfpResponsepage.rationaleColNo, thousandChar+'test', "");
    rfpResponsepage.sendText('0', rfpResponsepage.pixelSizeColNo, fiftyChar+'t', "");
    rfpResponsepage.sendText('0', rfpResponsepage.noOfUnitsColNo, "-25", "25");
    rfpResponsepage.sendText('0', rfpResponsepage.digitalDetailsColNo, hundredChar+hundredChar+fiftyChar+"testfive", "");
    rfpResponsepage.sendText('0', rfpResponsepage.poiColNo, hundredChar+hundredChar+hundredChar+hundredChar+hundredChar+"jfjkjfjfjfkj", "");
    rfpResponsepage.sendText('0', rfpResponsepage.distaoncePoiColNo, "lksdfhk", "0.00");
    rfpResponsepage.sendText('0', rfpResponsepage.rateCardColNo, "sdfgsdf", "$0.00");
    rfpResponsepage.sendText('0', rfpResponsepage.netNegoRateColNo, "sdfgsfdg", "$0.00");
    rfpResponsepage.sendText('0', rfpResponsepage.discountColNo, "asdfgdfsg", "0.00%");
    rfpResponsepage.sendText('0', rfpResponsepage.startDateColNo, "asdf", "");
    rfpResponsepage.sendText('0', rfpResponsepage.endDateColNo, fiftyChar+"asd", "");
    rfpResponsepage.sendText('0', rfpResponsepage.noOfCyclesColNo, "asdfa", "0.00");
    rfpResponsepage.sendText('0', rfpResponsepage.netInstallColNo, "asdfsdf", "$0.00");
    rfpResponsepage.sendText('0', rfpResponsepage.productionCostColNo, "sdfgasdf", "$0.00");
    rfpResponsepage.sendText('0', rfpResponsepage.commentsColNo, thousandChar+"test", "");
    rfpResponsepage.sendText('0', rfpResponsepage.holdExpDateColNo, "ghhg", "");
    rfpResponsepage.sendText('0', rfpResponsepage.materialShippingColNo, hundredChar+hundredChar+fiftyChar+"fiveeerr", "");
    rfpResponsepage.sendText('0', rfpResponsepage.postDateColNo, fiftyChar+"dsfgvsdfg", "");
    rfpResponsepage.sendText('0', rfpResponsepage.a18ColNo, "52514584562154785695", "");
    rfpResponsepage.sendText('0', rfpResponsepage.targetDemoColNo, "52514584562154785695", "");
    rfpResponsepage.sendText('0', rfpResponsepage.weeklyNonGeopathColNo, "52514584562154785695", "");
//    rfpResponsepage.sendText('0', rfpResponsepage.illuminationColNo, "sdfgdf", "");

    // validate errors description before saving
    cy.get("[row-index='0'] >"+rfpResponsepage.locationDesColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter') ;
    cy.get(rfpResponsepage.customTooltip).should('contain', 'Location description should not be more than 1000 characters');
    cy.get("[row-index='0'] >"+rfpResponsepage.commentsColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter') ;
    cy.get(rfpResponsepage.customTooltip).should('contain', 'Comments should not be more than 1000 characters');
    cy.get("[row-index='0'] >"+rfpResponsepage.materialShippingColNo).eq(0).should('have.class', 'invalidCell').trigger('mouseenter') ;
    cy.get(rfpResponsepage.customTooltip).should('contain', 'Material Shipping Address should not be more than 255 characters');


    // Valide error messages
    cy.get(rfpResponsepage.headerSave).click().wait(2000);
    cy.get(rfpResponsepage.responseErrorInstructions).should('contain', 'The row(s) with unit Id highlighted in red have error(s). Scroll right to identify the error(s) and apply the fix.');
    cy.get(rfpResponsepage.expandErrors).click();
    cy.fixture('ooh/campaigns/custom_template.json').then((data) => {
      cy.get(rfpResponsepage.individualErrors).should('have.length', data.ErrorList.ErrorPostEditingAudited.length);
      // validate Audited frames  
      cy.get(rfpResponsepage.individualErrors).each(($el, index) => {
        cy.wrap($el).should('have.text', data.ErrorList.ErrorPostEditingAudited[index]);
      });
    }) 

    cy.fixture('ooh/campaigns/custom_template.json').then((data) => {
      // validate Audited frames  
      for(let i =0; i<data.length; i++){
        if(!data.ErrorList.AuditedTooltip[i].equal("")){
          cy.get("[row-index='0'] > [aria-colindex='"+i+"']").eq(0).should('have.class', 'invalidCell').trigger('mouseenter');  
          cy.get(rfpResponsepage.customTooltip).should('contain', data.ErrorList.AuditedTooltip[i]);
        }
      }
       
    });
  });

  it('E2E Cell Validation - Validate Market and Media Format Cells', () => {
    cy.loginAsMoLamarUS();
    rfpListPage.visit();
    cy.wait(2000);
    rfpListPage.changeLocation('United States');
    rfpListPage.searchAndSelectRfp(campaignName);
    cy.contains('Add Response').click();
    cy.get(rfpResponsepage.importFromFile).should('not.be.disabled');
    cy.intercept({
      method: "POST",
      url: "https://col.eum-appdynamics.com/eumcollector/beacons/browser/v1/AD-AAB-AAB-BZP/adrum",
    }).as("addUnits");

     // Delete existing frames
     cy.wait(3000).get(rfpResponsepage.responseUnitsCount).invoke('text').then(parseFloat).then((count) => {  
      cy.log(count.toString());
      if(count > 0){
        cy.get(rfpResponsepage.deleteAll).click();
        cy.get(rfpResponsepage.deletaPackPopYes).click().wait(1000);
      }
    });
    cy.get(rfpResponsepage.headerSave).click().wait(2000);

    // Upload default template for multiple clients with mandatory fields only
    rfpResponsepage.importFramesFromFile(testDataPath + "Multiple_Clients_Lamar_Mandatory_Fields_Only.xlsm")
    cy.wait(5000);

    // Validate no errors are displayed
    cy.get(rfpResponsepage.responseErrorInstructions).should('not.exist');
    cy.get(rfpResponsepage.expandErrors).should('not.exist');

    for(let j = 1; j<3; j++){
      cy.get(rfpResponsepage.marketDescCol).eq(j).dblclick().wait(1000);
      cy.get(rfpResponsepage.dropDownSelected).should('contain', 'Salt Lake City, UT').wait(500);
      cy.get(rfpResponsepage.editTextbox).click().clear().wait(1000).click();
      cy.get(rfpResponsepage.dropdownOptions).find('div').should('have.length', 216);
      cy.get(rfpResponsepage.editTextbox).type('Albany, GA').wait(500);
      cy.get(rfpResponsepage.marketDescCol).eq(j).click();
//      cy.get(rfpResponsepage.dropdownOptions).its('length').should('be.gte', 1);
      cy.get(rfpResponsepage.dropdownOptions).eq(0).click();
      cy.get(rfpResponsepage.formatCol).eq(j).dblclick().wait(1000);
      cy.get(rfpResponsepage.dropDownSelected).should('contain', 'Bulletins');
      cy.get(rfpResponsepage.editTextbox).click().clear().wait(1000).click();
      cy.get(rfpResponsepage.dropdownOptions).find('div').should('have.length', 586);
      cy.get(rfpResponsepage.dropdownOptions).its('length').should('be.gte', 1);
      cy.get(rfpResponsepage.editTextbox).type('1-Sheet Rail Poster').wait(500);
      cy.get(rfpResponsepage.dropdownOptions).its('length').should('be.gte', 1);
      cy.get(rfpResponsepage.dropdownOptions).eq(0).click();
    }
    // add images to the frames
    for(let i = 0; i<3; i++){
      cy.get(rfpResponsepage.imageWithError).eq(0).should('exist').click();
      cy.get(rfpResponsepage.addImagePopupTitle).should('contain', 'Pictures')
      cy.get(rfpResponsepage.addImagePopupClose).should('not.be.disabled');
      cy.get(rfpResponsepage.dropPictureMessage).should('contain', 'Drop your picture here');
      cy.get(rfpResponsepage.dropPictureInfo).should('contain', 'Only .jpg or .png files less than 5 MB are allowed.')
      cy.get(rfpResponsepage.imgBrowseBtn).should('not.be.disabled');
      cy.get(rfpResponsepage.addImagePopupBrowse).should('contain', 'Browse');
      const imageFixturePath = testDataPath + imageName[0];
      cy.get(rfpResponsepage.PopupAttachFile).attachFile(imageFixturePath).wait(1000)
      cy.get(rfpResponsepage.imgDoneBtn).should('contain', 'Done').click();
    }

    cy.get(rfpResponsepage.marketDescCol).eq(4).dblclick().wait(1000);
    cy.get(rfpResponsepage.dropDownSelected).should('not.exist');
    cy.get(rfpResponsepage.formatCol).eq(4).dblclick().wait(1000);
    cy.get(rfpResponsepage.dropDownSelected).should('not.exist');

    cy.get(rfpResponsepage.headerSave).click().wait(2000);
    cy.get(rfpResponsepage.marketDescCol).eq(1).should('contain', 'Albany, GA');
    cy.get(rfpResponsepage.formatCol ).eq(1).should('contain', '1-Sheet Rail Poster');

     // Delete existing frames
     cy.wait(3000).get(rfpResponsepage.responseUnitsCount).invoke('text').then(parseFloat).then((count) => {  
      cy.log(count.toString());
      if(count > 0){
        cy.get(rfpResponsepage.deleteAll).click();
        cy.get(rfpResponsepage.deletaPackPopYes).click().wait(1000);
      }
    });
    cy.get(rfpResponsepage.headerSave).click().wait(2000);

    cy.get(rfpResponsepage.addByID).click();
    cy.get(rfpResponsepage.addByIdHeader).should('contain', 'Add by ID');
    cy.get(rfpResponsepage.searchByIdTxt).should('have.attr', 'placeholder', 'Search by Unit ID or Geopath ID')
    cy.get(rfpResponsepage.searchByIdTxt).type(addByID[0]);
    cy.get(rfpResponsepage.addByIdSearchBtn).click();
    let idsLen: string[] = addByID[0].split(',');
    if (idsLen.length > 0) {
      for (var i = 1; i <= 2; i++) {
        cy.get(':nth-child(' + i + ') > :nth-child(6) > cad-link > .cad-link').should('not.be.disabled').click();
      }
    }
    cy.get(rfpResponsepage.addByIdDone).click().wait(2000);
    cy.get(rfpResponsepage.marketDescCol).eq(1).dblclick().wait(1000);
    cy.get(rfpResponsepage.dropDownSelected).should('not.exist');
    cy.get(rfpResponsepage.formatCol).eq(1).dblclick().wait(1000);
    cy.get(rfpResponsepage.dropDownSelected).should('not.exist');
    
  }); 

  it('E2E -  Verify search by spot ID', () => {
    cy.loginAsMoLamarUS();
    rfpListPage.visit();
    cy.wait(2000);
    rfpListPage.changeLocation('United States');
    rfpListPage.searchAndSelectRfp(campaignName);
    cy.contains('Add Response').click();
    cy.get(rfpResponsepage.importFromFile).should('not.be.disabled');
    cy.intercept({
      method: "POST",
      url: "https://col.eum-appdynamics.com/eumcollector/beacons/browser/v1/AD-AAB-AAB-BZP/adrum",
    }).as("addUnits");
    // Delete existing frames
    cy.wait(3000).get(rfpResponsepage.responseUnitsCount).invoke('text').then(parseFloat).then((count) => {  
      cy.log(count.toString());
      if(count > 0){
        cy.get(rfpResponsepage.deleteAll).click();
        cy.get(rfpResponsepage.deletaPackPopYes).click().wait(1000);
      }
    });
    cy.get(rfpResponsepage.headerSave).click().wait(2000);

    // Add units by spot id for audited frames
    cy.get(rfpResponsepage.addByID).click();
    cy.get(rfpResponsepage.addByIdHeader).should('contain', 'Add by ID');
    cy.get(rfpResponsepage.searchByIdTxt).should('have.attr', 'placeholder', 'Search by Unit ID or Geopath ID')
    cy.get(rfpResponsepage.searchByIdTxt).type(addBySpotId[0]);
    cy.get(rfpResponsepage.addByIdSearchBtn).click();

    // verify spotId  are displayed along with geopath id's
    let geopsthIds: string[] = spotIdAndGeopathMapping[0].split(',');
    let spotidsLen: string[] = addBySpotId[0].split(',');
    for (var i = 1; i < spotidsLen.length ; i++) {
      cy.get('tbody > :nth-child('+i+') > .align-right').should('contain', geopsthIds[i-1] ).should('contain', '(Spot ID: '+spotidsLen[i-1]+')');
    }

    for (var i = spotidsLen.length; i > 0 ; i--) {
      cy.get(':nth-child(' + i + ') > :nth-child(6) > cad-link > .cad-link').click();
    }
    cy.get(rfpResponsepage.addByIdDone).click();
    let impression: string[] = impressions[0].split(',');
    // Validate SpotId is displayed along with geopath Id's
    // Validate correct impression values are displayed
    for (var i = 0; i < spotidsLen.length ; i++) {
      cy.get("[row-index='"+i+"'] >"+rfpResponsepage.geopathIdCol).should('contain', geopsthIds[i] ).should('contain', '(Spot ID: '+spotidsLen[i]+')');
      cy.get("[row-index='"+i+"'] >"+rfpResponsepage.eighteenPlusImpsCol).should('contain', impression[i] );
    
    }
    let splString = 'asdfghjklPOIUYTREWQ~!@#,\'$%^&*()_+|}{":?><\/1234567890'
    rfpResponsepage.enterRequiredFileds(geopsthIds.length, splString);
    cy.get(rfpResponsepage.headerSave).click().wait(5000);
    
   
    // Verify impression values on adding by geopath id

    // Add units by geopath id for audited frames
    cy.get(rfpResponsepage.addByID).click();
    cy.get(rfpResponsepage.addByIdHeader).should('contain', 'Add by ID');
    cy.get(rfpResponsepage.searchByIdTxt).should('have.attr', 'placeholder', 'Search by Unit ID or Geopath ID')
    cy.get(rfpResponsepage.searchByIdTxt).type(spotIdAndGeopathMapping[1]);
    cy.get(rfpResponsepage.addByIdSearchBtn).click();
    geopsthIds = spotIdAndGeopathMapping[1].split(',');
    for (var i =1; i<=geopsthIds.length ; i++) {
      cy.get(':nth-child(' + i + ') > :nth-child(6) > cad-link > .cad-link').click();
    }
    cy.get(rfpResponsepage.addByIdDone).click();

    // verify minimum value of impressions is displayed for geopath id
    impression = impressions[1].split(',');
    // Validate SpotId is displayed along with geopath Id's
    // Validate correct impression values are displayed
    for (var i = 0; i < geopsthIds.length ; i++) {
      cy.get("[row-index='"+i+"'] >"+rfpResponsepage.eighteenPlusImpsCol).should('contain', impression[i] ); 
    }

    rfpResponsepage.enterRequiredFileds(geopsthIds.length, splString);
    cy.get(rfpResponsepage.headerSave).click().wait(5000);
    

    // Upload from file Multiple_Clients_Lamar_Spot_Id
    rfpResponsepage.importFramesFromFile(testDataPath + "Multiple_Clients_Lamar_Spot_Id.xlsm")
    cy.wait(5000);

    // Validate SpotId is displayed along with geopath Id's and correct impression values are displayed
    
    impression = impressions[0].split(',');
    
    geopsthIds = spotIdAndGeopathMapping[0].split(',');
    for (var i = 0; i < spotidsLen.length-1 ; i++) {
      cy.get("[row-index='"+i+"'] >"+rfpResponsepage.geopathIdCol).should('contain', geopsthIds[i] ).should('contain', '(Spot ID: '+spotidsLen[i]+')');
      cy.get("[row-index='"+i+"'] >"+rfpResponsepage.eighteenPlusImpsCol).should('contain', impression[i] );
    }
    impression = impressions[1].split(',');
    for(var i = spotidsLen.length; i < spotidsLen.length+2  ; i++){
      cy.get("[row-index='"+i+"'] >"+rfpResponsepage.eighteenPlusImpsCol).should('contain', impression[i-spotidsLen.length] );
    }
    cy.get(rfpResponsepage.headerSave).click().wait(2000);

    cy.get(rfpResponsepage.headerSave).click().wait(5000);


   // Create package

      cy.get(rfpResponsepage.createPackage).click();
      cy.get(rfpResponsepage.selectType).click().wait(1000);
      cy.get(rfpResponsepage.responseFilterResults).type(mediaType[2]).wait(1000);
      cy.get(rfpResponsepage.listItems).eq(0).click();
      cy.get(rfpResponsepage.selectMarket).click().wait(1000);
      cy.get(rfpResponsepage.marketListItem).eq(0).click();
      cy.get(rfpResponsepage.packageSize).type('200"x100"').blur();
      cy.get(rfpResponsepage.locationDesc).type('Location Description 3').blur();
      cy.get(rfpResponsepage.rationale).type('Rationale 3').blur();
      cy.get(rfpResponsepage.units).type('1000').blur().should('have.value', '1000');
      cy.get(rfpResponsepage.netRateCard).type('1750').blur();
      cy.get(rfpResponsepage.netNegoRate).type('1170').blur();
      cy.get(rfpResponsepage.flightDateStart).click();
      cy.get(rfpResponsepage.packageCalanderDays).click();
      cy.contains('12').click();
      cy.get(rfpResponsepage.packageEndDate).should('contain', 'End Date');
      cy.get(rfpResponsepage.flightDateEnd).click();
      cy.get(rfpResponsepage.packageCalanderDays).click();
      cy.get(rfpResponsepage.activeMonth).contains('26').click();
      cy.get(rfpResponsepage.cycleType).click();
      cy.get(rfpResponsepage.cycleTypeListItem).click();
      cy.get(rfpResponsepage.NumberOfCycles).type('2.60').blur();
      cy.get(rfpResponsepage.netInstall).type('320').blur();
      cy.get(rfpResponsepage.production).type('270').blur();
      cy.get(rfpResponsepage.holdExpireDate).click();
      cy.get(rfpResponsepage.packageCalanderDays).click();
      cy.contains('16').click();
      cy.get(rfpResponsepage.Universe).type('1342356767').blur();
  
      cy.get(rfpResponsepage.TargetDemo).type('4654321654').blur();
      cy.get(rfpResponsepage.comment).type('sample test comment 3');
  
      
    cy.get(rfpResponsepage.addByID).click();
    cy.get(rfpResponsepage.addByIdHeader).should('contain', 'Add by ID');
    cy.get(rfpResponsepage.searchByIdTxt).should('have.attr', 'placeholder', 'Search by Unit ID or Geopath ID')
    cy.get(rfpResponsepage.searchByIdTxt).type(packageAddBySpotId[0]);
    cy.get(rfpResponsepage.addByIdSearchBtn).click();

    // verify spotId  are displayed along with geopath id's
    geopsthIds = packageSpotIdAndGeopathMapping[0].split(',');
    spotidsLen = packageAddBySpotId[0].split(',');
    for (var i = 1; i < spotidsLen.length ; i++) {
      cy.get('tbody > :nth-child('+i+') > .align-right').should('contain', geopsthIds[i-1] ).should('contain', '(Spot ID: '+spotidsLen[i-1]+')');
    }

    for (var i = spotidsLen.length; i > 0 ; i--) {
      cy.get(':nth-child(' + i + ') > :nth-child(6) > cad-link > .cad-link').click();
    }
    cy.get(rfpResponsepage.addByIdDone).click();
    impression = packageImpressions[0].split(',');
    // Validate SpotId is displayed along with geopath Id's
    // Validate correct impression values are displayed
    for (var i = 0; i < spotidsLen.length-1 ; i++) {
      cy.get("[aria-rowindex = '"+(+i+2)+"'] >"+rfpResponsepage.geopathIdCol).should('contain', geopsthIds[spotidsLen.length-i-1] ).should('contain', '(Spot ID: '+spotidsLen[spotidsLen.length-i-1]+')');
      cy.get("[aria-rowindex = '"+(+i+2)+"'] >"+rfpResponsepage.packageEighteenPlusImpsCol).should('contain', impression[spotidsLen.length-i-1] );
    
    }  
 
  // Verify impression values on adding by geopath id

  // Add units by geopath id for audited frames
  cy.get(rfpResponsepage.addByID).click();
  cy.get(rfpResponsepage.addByIdHeader).should('contain', 'Add by ID');
  cy.get(rfpResponsepage.searchByIdTxt).should('have.attr', 'placeholder', 'Search by Unit ID or Geopath ID')
  cy.get(rfpResponsepage.searchByIdTxt).type(packageSpotIdAndGeopathMapping[1]);
  cy.get(rfpResponsepage.addByIdSearchBtn).click();
  geopsthIds = packageSpotIdAndGeopathMapping[1].split(',');
  for (var i =1; i<=geopsthIds.length ; i++) {
    cy.get(':nth-child(' + i + ') > :nth-child(6) > cad-link > .cad-link').click();
  }
  cy.get(rfpResponsepage.addByIdDone).click();

  // verify minimum value of impressions is displayed for geopath id
  impression = packageImpressions[1].split(',');
  // Validate SpotId is displayed along with geopath Id's
  // Validate correct impression values are displayed
  for (var i = 0; i < geopsthIds.length ; i++) { 
      cy.get("[aria-rowindex = '"+(+i+2)+"'] >"+rfpResponsepage.packageEighteenPlusImpsCol).should('contain', impression[i] );   
  }
  
  rfpResponsepage.enterPackageRequiredFileds(spotidsLen.length+geopsthIds.length, 'asdfghjklPOIUYTREWQ~!@#,\'$%^&*()_+|}{":?><\/1234567890');

  // Upload from file Multiple_Clients_Lamar_Spot_Id
  rfpResponsepage.importFramesFromFile(testDataPath + "package-frames-Spot-Id.xlsm")
  cy.wait(5000);

  // Validate SpotId is displayed along with geopath Id's and correct impression values are displayed
  
  impression = packageImpressions[0].split(',');
  
  geopsthIds = packageSpotIdAndGeopathMapping[0].split(',');
  spotidsLen = packageAddBySpotId[0].split(',');
  cy.get("[row-index='1'] >"+rfpResponsepage.geopathIdCol).should('contain', geopsthIds[3] ).should('contain', '(Spot ID: '+spotidsLen[3]+')');
  cy.get("[row-index='1'] >"+rfpResponsepage.packageEighteenPlusImpsCol).should('contain', impression[3] );
  cy.get("[row-index='3'] >"+rfpResponsepage.geopathIdCol).should('contain', geopsthIds[2] ).should('contain', '(Spot ID: '+spotidsLen[2]+')');
  cy.get("[row-index='3'] >"+rfpResponsepage.packageEighteenPlusImpsCol).should('contain', impression[2] );
  cy.get("[row-index='4'] >"+rfpResponsepage.geopathIdCol).should('contain', geopsthIds[1] ).should('contain', '(Spot ID: '+spotidsLen[1]+')');
  cy.get("[row-index='4'] >"+rfpResponsepage.packageEighteenPlusImpsCol).should('contain', impression[1] );
  cy.get("[row-index='6'] >"+rfpResponsepage.geopathIdCol).should('contain', geopsthIds[1] ).should('contain', '(Spot ID: '+spotidsLen[1]+')');
  cy.get("[row-index='6'] >"+rfpResponsepage.packageEighteenPlusImpsCol).should('contain', impression[1] );
  cy.get("[row-index='8'] >"+rfpResponsepage.geopathIdCol).should('contain', geopsthIds[0] ).should('contain', '(Spot ID: '+spotidsLen[0]+')');
  cy.get("[row-index='8'] >"+rfpResponsepage.packageEighteenPlusImpsCol).should('contain', impression[0] );
  cy.get("[row-index='9'] >"+rfpResponsepage.geopathIdCol).should('contain', geopsthIds[0] ).should('contain', '(Spot ID: '+spotidsLen[0]+')');
  cy.get("[row-index='9'] >"+rfpResponsepage.packageEighteenPlusImpsCol).should('contain', impression[0] );

  impression = packageImpressions[2].split(',');
  cy.get("[row-index='7'] >"+rfpResponsepage.packageEighteenPlusImpsCol).should('contain', impression[1] );
  cy.get("[row-index='10'] >"+rfpResponsepage.packageEighteenPlusImpsCol).should('contain', impression[0] );
  


      cy.get(rfpResponsepage.packageSave).click().wait(3000);
  
      cy.get(rfpResponsepage.messageTitle).should('contain', ' RFP Package successfully created')
        .wait(1000);
  
      cy.get(rfpResponsepage.responsePackageCount).wait(1000)
        .then(($span) => {
          var count = $span.text().trim();
          //     cy.wrap(parseInt(count)).should('be.gt', 0)
          if (parseInt(count) > 10) {
            cy.get(rfpResponsepage.nextPage).should('not.be.disabled');
          }
          else {
            cy.get(`[data-automation="ooh-rfp-packages-table"] > ag-grid-angular > .ag-root-wrapper  
                   > .ag-root-wrapper-body > .ag-root > .ag-body-viewport > .ag-center-cols-clipper  
                   > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row`)
              .should('have.length', count);
          }
        });
      cy.get(rfpResponsepage.footerSendResponse).should('not.be.disabled');
      cy.get(rfpResponsepage.footerSendResponse).click();
      cy.get('.popup-title').should('contain', 'Send Response');
      cy.get(rfpResponsepage.closePopUp).should('not.be.disabled');
      cy.get(rfpResponsepage.popupDescription).should('contain',
        'Are you sure that you want to send the response? After sending, you will be able to edit it only if the planner changes RFP');
      cy.get(rfpResponsepage.deletaPackPopYes).click();
      cy.get(createCampaignPage.messageStatus).should('contain', 'Proposal Sent');
      cy.get(rfpResponsepage.btnDecline).should('not.be.disabled');



  });

});

