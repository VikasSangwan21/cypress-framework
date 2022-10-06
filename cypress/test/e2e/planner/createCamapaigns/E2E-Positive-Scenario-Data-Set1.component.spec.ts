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
let featureName = 'E2E Positive Scenario - Data Set 1';
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
        data.campaignName[0].name = campaignName

        cy.writeFile("cypress/fixtures/ooh/campaigns/campaign_config.json", JSON.stringify(data))
      })

    })
  })

  beforeEach(() => {
    Report.testDetails(epicName, featureName, tag);
  });
/*
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
      fileNamesUpload = config.cfileNamesUpload
      moEmail = config.moEmail
      campaignName = `e2e test - ${PageAction.campaignCreatePage().campaignNameSuffix()}`;

      cy.readFile("cypress/fixtures/ooh/campaigns/campaign_config.json").then((data) => {
        data.campaignName[0].name = campaignName
        cy.writeFile("cypress/fixtures/ooh/campaigns/campaign_config.json", JSON.stringify(data))
      })
    })
  })
*/
  // Create campaign
  it('E2E Positive Scenario - Data Set 1', () => {
    cy.loginAsPlanner();
    PageAction.campaignCreatePage()
      .visit();

    cy.get(PageAction.campaignCreatePage().createCmpbtn)
      .click();
    cy.get(PageAction.campaignCreatePage().formTtitle)
      .contains('New Campaign');
    //campaign name
    cy.get(PageAction.campaignCreatePage().campaignName)
      .focus()
      .blur();
    cy.get(PageAction.campaignCreatePage().ValidationError)
      .should('contain', 'Campaign Name is Required.');
    cy.get(PageAction.campaignCreatePage().campaignName)
      .type(campaignName)
      .blur()
      .should('have.value', campaignName);
    cy.get(PageAction.campaignCreatePage().ValidationError)
      .should('not.exist');
    cy.get(PageAction.campaignCreatePage().continueBtn)
      .should('be.disabled');

    //campaign Desc
    cy.get(PageAction.campaignCreatePage().campaignDesc)
      .focus()
      .blur();
    cy.get(PageAction.campaignCreatePage().ValidationError)
      .should('contain', 'Campaign Description is Required.');
    cy.get(PageAction.campaignCreatePage().campaignDesc)
      .type(campaignName)
      .blur()
      .should('have.value', campaignName);
    cy.get(PageAction.campaignCreatePage().ValidationError)
      .should('not.exist');

    cy.get(PageAction.campaignCreatePage().continueBtn)
      .should('be.disabled');

    //select objective
    cy.get(PageAction.campaignCreatePage().objective)
      .should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().objectiveSelect)
      .should('contain', 'Select Objective')
    cy.get(PageAction.campaignCreatePage().objective)
      .click();
    cy.get(PageAction.campaignCreatePage().objectiveSearch)
      .should('have.attr', 'placeholder', 'Search')
      .type(Objective[0])
      .wait(1000);
    cy.get(PageAction.campaignCreatePage().listItemSelect)
      .first()
      .click();
    cy.get(PageAction.campaignCreatePage().objective)
      .click();

    //select agency
    cy.get(PageAction.campaignCreatePage().agency)
      .should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().agencySelect)
      .should('contain', 'Select Agency')
    cy.get(PageAction.campaignCreatePage().agency)
      .click();
    cy.get(PageAction.campaignCreatePage().agencySearch)
      .should('have.attr', 'placeholder', 'Search')
      .type(Agency[0])
      .wait(1000);
    cy.get(PageAction.campaignCreatePage().listItemSelect)
      .last()
      .click();
    cy.get(PageAction.campaignCreatePage().agency)
      .click();

    //select client
    cy.get(PageAction.campaignCreatePage().client)
      .should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().clientSelect)
      .should('contain', 'Select Client')
    cy.get(PageAction.campaignCreatePage().client)
      .click();
    cy.get(PageAction.campaignCreatePage().clientSearch)
      .should('have.attr', 'placeholder', 'Search')
      .type(Client[6])
      .wait(1000);
    cy.get(PageAction.campaignCreatePage().listItemSelect)
      .first()
      .click();
    cy.get(PageAction.campaignCreatePage().client)
      .click();

    cy.get(PageAction.campaignCreatePage().continueBtn)
      .should('be.disabled');

    //Budget value
    cy.get(PageAction.campaignCreatePage().campaignBudget)
      .focus()
      .blur();
    cy.get(PageAction.campaignCreatePage().ValidationError)
      .should('contain', 'Budget is Required.');
    cy.get(PageAction.campaignCreatePage().campaignBudget)
      .type('ABC')
      .blur()
      .should('be.empty');
    cy.get(PageAction.campaignCreatePage().ValidationError)
      .should('contain', 'Budget is Required.');
    cy.get(PageAction.campaignCreatePage().campaignBudget)
      .type('500000')
      .blur()
      .should('have.value', '500,000.00');
    cy.get(PageAction.campaignCreatePage().ValidationError)
      .should('not.exist');

    cy.get(PageAction.campaignCreatePage().continueBtn)
      .should('be.disabled');

    //campaign dates
    cy.get(PageAction.campaignCreatePage().campaignDateRange)
      .click();
    cy.get(PageAction.campaignCreatePage().camDateNextMon)
      .click();
    cy.get(PageAction.campaignCreatePage().CalanderDays)
      .contains('12')
      .click()
      
    cy.get(rfpResponsepage.activeDates).contains('27').click();
    cy.get(PageAction.campaignCreatePage().applyBtn)
      .click();

    cy.get(PageAction.campaignCreatePage().continueBtn)
      .should('be.disabled');

    //response date
    cy.get(PageAction.campaignCreatePage().campaignResDate)
      .click();
    cy.get(PageAction.campaignCreatePage().ResDateNextMonth)
      .click();
    cy.get(PageAction.campaignCreatePage().ResCalanderDays)
      .contains('10')
      .click();
    cy.get(PageAction.campaignCreatePage().CalApplyButton)
      .click();

    cy.get(PageAction.campaignCreatePage().continueBtn)
      .should('be.disabled');

    //market Region
    cy.get(PageAction.campaignCreatePage().marketRegion)
      .click()
      .last()
      .type('Washington, DC (Hagerstown, MD)');
    cy.get(PageAction.campaignCreatePage().listItemSelect)
      .last()
      .contains('Washington, DC (Hagerstown, MD)')
      .click();

    cy.get(PageAction.campaignCreatePage().contentcontinueBtn)
      .should('be.disabled');
    cy.get(PageAction.campaignCreatePage().continueBtn)
      .should('be.disabled');

    // primary Audience
    cy.get(PageAction.campaignCreatePage().demograpTitle)
      .should('contain', 'Demographics');
    cy.get(PageAction.campaignCreatePage().primaryaudTitle)
      .should('contain', ' Primary Audience');
    cy.get(PageAction.campaignCreatePage().primaryAudience)
      .contains(' Select Primary Audience ')
      .click();
    cy.get(PageAction.campaignCreatePage().primAudvalue)
      .click();

    //secondary Audience
    cy.get(PageAction.campaignCreatePage().secAudTitle)
      .should('contain', ' Secondary Audience');
    cy.get(PageAction.campaignCreatePage().secAudence)
      .should('be.enabled')
      .should('have.attr', 'placeholder', 'Secondary Audience')
      .type(campaignName)
      .blur()
      .should('have.value', campaignName);

    //campaign Name
    cy.get(PageAction.campaignCreatePage().comment)
      .type(campaignName)

    cy.get(PageAction.campaignCreatePage().continueBtn)
      .click();

    //media formats
    cy.get(PageAction.campaignCreatePage().digitalframe)
      .click();
    cy.get(PageAction.campaignCreatePage().addMediaFormatsbtn)
      .click();

    cy.get(PageAction.campaignCreatePage().savedraftBtn)
      .should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().previousstepBtn)
      .should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().createCampaignBtn)
      .should('not.be.disabled');

    cy.get(PageAction.campaignCreatePage().mediaformat_1)
      .click()
    cy.get(PageAction.campaignCreatePage().mediaformat_2)
      .click()
    cy.get(PageAction.campaignCreatePage().mediaFormatSearch)
      .type('Liveboards')
      .wait(1000)
    cy.get(PageAction.campaignCreatePage().mediaFormatResult)
      .should('contain', 'Liveboards')
      .click()

    cy.get(PageAction.campaignCreatePage().mediaFormatApplybtn)
      .click();
    cy.get(PageAction.campaignCreatePage().mediaFormatCount_1)
      .type('20');
    cy.get(PageAction.campaignCreatePage().mediaFormatCount_2)
      .type('40');

    cy.get(PageAction.campaignCreatePage().savedraftBtn)
      .should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().previousstepBtn)
      .should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().createCampaignBtn)
      .should('not.be.disabled');

    cy.get(PageAction.campaignCreatePage().createCampaignBtn)
      .click();

    cy.get(PageAction.campaignCreatePage().toastMsg)
      .should('contain', 'Campaign Created');

    cy.get(PageAction.campaignCreatePage().camName)
      .should('contain', campaignName);
    cy.get(PageAction.campaignCreatePage().statusMessage)
      .should('contain', 'Draft');

    cy.get(PageAction.campaignCreatePage().sendRfpCancelBtn)
      .should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().deleteCampaign)
      .should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().prevCampaign)
      .should('not.be.disabled');
  });

  //Edit campaign 
  it('Add Media Owners Inventory to Campaign (Frames Only)', () => {
    cy.loginAsPlanner();
    PageAction.campaignCreatePage()
      .visit();

    //serach camapaign
    cy.get(PageAction.campaignCreatePage().serachIcon)
      .click();
    cy.get(PageAction.campaignCreatePage().globalSearch)
      .type(campaignName)
      .wait(1000);

    cy.get(PageAction.campaignCreatePage().statusMessage)
      .should('contain', 'Draft')
    cy.get(PageAction.campaignCreatePage().campaignMenu)
      .last()
      .click();

    cy.get(PageAction.campaignCreatePage().view)
      .should('not.be.disabled');

    cy.get(PageAction.campaignCreatePage().delete)
      .should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().edit)
      .should('not.be.disabled')
      .click()
      .wait(1000);

    cy.get(PageAction.campaignCreatePage().contentcontinueBtn)
      .should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().continueBtn)
      .should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().savedraftBtn)
      .should('not.be.disabled');

    //add attachments
    for (var i = 0; i < fileNamesUpload.length; i++) {
      cy.get(PageAction.campaignCreatePage().addAttachment)
        .click();
      const yourFixturePath = testDataPath + fileNamesUpload[i];
      cy.get(PageAction.campaignCreatePage().fileType)
        .last()
        .attachFile(yourFixturePath)
        .wait(1000);
//      cy.get(PageAction.campaignCreatePage().toastMsg)
//        .should('contain', 'Attachment added');
    }

    cy.get(PageAction.campaignCreatePage().attachmentCount)
      .then(($span) => {
        var count = $span.text().trim();
        assert.equal(fileNamesUpload.length, parseInt(count));
        if (parseInt(count) > 5)
          cy.get(PageAction.campaignCreatePage().Pagination)
            .should('not.be.disabled');
      });

    cy.get(PageAction.campaignCreatePage().continueBtn)
      .click();

    cy.get(PageAction.campaignCreatePage().mediaOwnerCount)
      .then(($span) => {
        var count = $span.text().trim();
        if (parseInt(count) > 0)
          cy.get(PageAction.campaignCreatePage().removeMO)
            .click();
      });

    cy.get(PageAction.campaignCreatePage().poiCount)
      .then(($span) => {
        var count = $span.text().trim();
        if (parseInt(count) > 0)
          cy.get(PageAction.campaignCreatePage().removePOI)
            .click();
      });

    //edit campaign in map
    cy.get(PageAction.campaignCreatePage().editInMap)
      .click()
      .wait(1000);
    cy.get(PageAction.campaignCreatePage().searchMedia)
      .click();

    //search location
    cy.get(PageAction.campaignCreatePage().searchLocation)
      .type('Pasadena CA, US')
      .click()
      .wait(1000);
    cy.get(PageAction.campaignCreatePage().locationAutoCompleteOptions)
      .first()
      .click()
      .wait(1000);

    //select MO
    //PageAction.campaignCreatePage().selectMediaOwners(mo);
    createCampaignPage.selectLocations(mo);

    //select POI
    cy.get(PageAction.campaignCreatePage().POI)
      .click()
    cy.get(PageAction.campaignCreatePage().SearchPOI)
      .type('Shopping{enter}')
      .blur()
    PageAction.campaignCreatePage().selectPOIInMap(17);

    cy.get(PageAction.campaignCreatePage().MySelectionButton)
      .click()
      .wait(1000);

    //save MO and POI
    cy.get(PageAction.campaignCreatePage().saveOwnerPOI)
      .click();
    cy.get(PageAction.campaignCreatePage().toastMsg)
      .should('contain', 'has been successfully updated');

    cy.get(PageAction.campaignCreatePage().continueBtn)
      .click();

    //select MO email address
    cy.get(PageAction.campaignCreatePage().mediaOwnerCount)
      .wait(2000)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count))
          .should('be.gte', 1)
        assert.notEqual(parseInt(count), 0, 'Media owner count should be greater than 0');

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
      });

    cy.get(PageAction.campaignCreatePage().unitsCount)
      .then(($span) => {
        var count = $span.text().trim();
        cy.wrap(parseInt(count))
          .should('be.gt', 0)
        if (parseInt(count) > 10) {
          cy.get(PageAction.campaignCreatePage().Pagination)
            .should('not.be.disabled');
        }
      });

    //save campaign
    cy.get(PageAction.campaignCreatePage().saveBtn)
      .should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().savedraftBtn)
      .should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().previousstepBtn)
      .should('not.be.disabled');

    cy.get(PageAction.campaignCreatePage().saveBtn)
      .click();

    cy.get(PageAction.campaignCreatePage().toastMsg)
      .should('contain', 'Campaign Saved Successfully');

    //Edit campaign
    cy.get(PageAction.campaignCreatePage().headerEdit)
      .should('not.be.disabled')
      .should('contain', 'Edit');

    cy.get(PageAction.campaignCreatePage().footerEdit)
      .should('not.be.disabled')
      .should('contain', 'Edit');

    cy.get(PageAction.campaignCreatePage().footerDelete)
      .should('not.be.disabled')
      .should('contain', 'Delete');

    //delete campaign
    cy.get(PageAction.campaignCreatePage().headerDelete)
      .should('not.be.disabled')
      .should('contain', 'Delete')
      .click();

    cy.get(PageAction.campaignCreatePage().closeDeletePopup)
      .should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().deletecamHeader)
      .should('contain', 'Delete Campaign');
    cy.get(PageAction.campaignCreatePage().deleteCamText)
      .should('contain', 'You want to delete this campaign:');
    cy.get(PageAction.campaignCreatePage().deleteCamName)
      .should('contain', campaignName.toString());
    cy.get(PageAction.campaignCreatePage().deleteConfText)
      .should('contain', 'Please, confirm the deletion');

    cy.get(PageAction.campaignCreatePage().confirmDelete)
      .should('not.be.disabled')
      .should('contain', 'Delete');

    cy.get(PageAction.campaignCreatePage().confirmCancel)
      .should('not.be.disabled')
      .should('contain', 'Cancel')
      .click();

    //preview RFP
    cy.get(PageAction.campaignCreatePage().headerPreview)
      .should('not.be.disabled')
      .should('contain', 'Preview and Send Rfp');
    cy.get(PageAction.campaignCreatePage().footerPreview)
      .should('not.be.disabled')
      .should('contain', 'Preview and Send Rfp')
      .click();

    cy.get(PageAction.campaignCreatePage().prevCampaign)
      .should('not.be.disabled');
    cy.get(PageAction.campaignCreatePage().RFPPrevTitle)
      .should('contain', 'Preview and Send RFP');
    cy.get(PageAction.campaignCreatePage().RFPPrevText)
      .should('contain', `You will be now redirected to the RFP Preview screen to review all the information before sending.`);

    cy.get(PageAction.campaignCreatePage().RFPPrevCancel)
      .should('not.be.disabled')
      .should('contain', 'Cancel');

    cy.get(PageAction.campaignCreatePage().RFPPrev)
      .should('not.be.disabled')
      .should('contain', 'Preview RFP')
      .click();

    cy.get(PageAction.campaignCreatePage().header_text)
      .should('contain', 'This is a preview of how Media Owner will see your RFP. Check if everything is correct before sending')

    //send RFP
    cy.get(PageAction.campaignCreatePage().sendRfpCancelBtn)
      .should('not.be.disabled')
      .should('contain', 'Cancel');
    cy.get(PageAction.campaignCreatePage().sendRfpBtn)
      .should('not.be.disabled')
      .should('contain', 'Send Rfp')
      .click();

    cy.get(PageAction.campaignCreatePage().toastMsg)
      .should('contain', 'RFP Sent');
    cy.get(PageAction.campaignCreatePage().statusMessage)
      .should('contain', 'RFP Sent');
  })

});
