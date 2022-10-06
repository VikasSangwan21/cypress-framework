import { PageAction } from '../../../support/PageAction';
import 'cypress-file-upload';

let epicName = 'RFP Add Response';
let featureName = 'RFP Add Response Page';
let tag = '';

let fileNamesUpload: string[] = [];
let importPath = '';

describe.skip(featureName, () => {

  beforeEach(() => {
    Report.testDetails(epicName, featureName, tag);
    cy.loginAsMediaOwnerStub();

    cy.fixture('ooh/rfp/rfp_config.json').then((config) => {
      fileNamesUpload = config.importFileNamesUpload;
      importPath = config.testDataPath;
    })

  });

  tag = "C81774478";
  it(`${tag} - Add Frames by 'Add By Id'`, () => {
    Report.Issue("OOH-1894").Tag("C110987426").Feature('RFP');
    Report.Issue("OOH-1872").Tag("C81778097").Feature('RFP');
    Report.Issue("OOH-2028").Tag("C81778097").Feature('RFP');

    PageAction.RFPAddResponsePage()
      .loadCokeCampaign()
      .loadCokeRFP()
      .loadSearchRFPByIds()
      .loadCustomTemplateCokeRFP()
      .loadPackageRFP()
      .visit();

    cy.get(PageAction.RFPAddResponsePage().addByIDs).click();
    cy.get(PageAction.RFPAddResponsePage().popupsTitle_addByIDs).should('be.visible');
    cy.get(PageAction.RFPAddResponsePage().popupsTitle_addByIDs).should('contain.text', ' Add by ID ');
    cy.get(PageAction.RFPAddResponsePage().popupsButton_close).should('be.visible').click();
    cy.get(PageAction.RFPAddResponsePage().popupsTitle_addByIDs).should('not.exist');
  });

  tag = "C147534097";
  it(`${tag} - Verify adding frames does not belong to the MO`, () => {
    Report.Issue("OOH-2028").Tag("C147534097").Feature('RFP');

    PageAction.RFPAddResponsePage()
      .loadCokeCampaign()
      .loadCokeRFP()
      .loadCustomTemplateCokeRFP()
      .loadPackageRFP()
      .loadSearchEmptyFrames()
      .visit();

    cy.get(PageAction.RFPAddResponsePage().addByIDs).click();
    cy.get(PageAction.RFPAddResponsePage().popupsTitle_addByIDs).should('be.visible');

    cy.get(PageAction.RFPAddResponsePage().searchBox_addByIDs).type('2342523');
    cy.get(PageAction.RFPAddResponsePage().buttonSearch_addByIDs).click();

    cy.get(PageAction.RFPAddResponsePage().searchEmptyLogo).should('be.visible');
    cy.get(PageAction.RFPAddResponsePage().searchEmptyMsg).should('be.visible').should('contain.text', 'No Results');

    cy.get(PageAction.RFPAddResponsePage().popupsButton_close).should('be.visible').click();
    cy.get(PageAction.RFPAddResponsePage().popupsTitle_addByIDs).should('not.exist');

  });

  tag = "C146660148";
  it(`${tag} - Verify Coca Cola custom columns data and values from imported spreadsheet`, () => {
    Report.Issue("OOH-4191").Tag("C146660148").Feature('RFP');
    Report.Issue("OOH-4167").Tag("C146660148").Feature('RFP');

    PageAction.RFPAddResponsePage()
      .loadCokeCampaign()
      .loadCokeRFP()
      .loadCustomTemplateCokeRFP()
      .parseCokeFrames()
      .loadSearchEmptyFrames()
      .loadPackageRFP()
      .saveRFPCokeFrames()
      .visit();

    cy.log(fileNamesUpload[0]);
    cy.log(importPath);

    const yourFixturePath = importPath + fileNamesUpload[0];

    cy.log(yourFixturePath);

    cy.get("input[type='file']").attachFile(yourFixturePath);

    cy.get(PageAction.RFPAddResponsePage().addByImports).click();

    cy.get(PageAction.RFPAddResponsePage().toastMessage).should('be.visible');

    cy.wait(5000);

    PageAction.RFPAddResponsePage().verifyCustomizeColumns('4-Week DEC Imps (If EOI N/A)', '1000');
    PageAction.RFPAddResponsePage().verifyCustomizeColumns('Added Value', '1000');

    cy.wait(1000);

    cy.get(PageAction.RFPAddResponsePage().buttonSave).first().click();

    cy.get(PageAction.RFPAddResponsePage().toastMessage_Success)
      .first()
      .should('be.visible')
      .should('contain.text', 'Proposal Unit(s) have been saved.');

  });

  tag = "C146660150";
  it(`${tag} - Verify Spotify custom columns data and values from imported spreadsheet`, () => {
    Report.Issue("OOH-4191").Tag("C146660150").Feature('RFP');
    Report.Issue("OOH-4167").Tag("C146660150").Feature('RFP');

    PageAction.RFPAddResponsePage()
      .loadSpotifyCampaign()
      .loadSpotifyRFP()
      .loadCustomTemplateSpotifyRFP()
      .parseSpotifyFrames()
      .loadSearchEmptyFrames()
      .loadPackageRFP()
      .saveRFPSpotifyFrames()
      .visit();

    cy.log(fileNamesUpload[1]);
    cy.log(importPath);

    const yourFixturePath = importPath + fileNamesUpload[1];

    cy.log(yourFixturePath);

    cy.get("input[type='file']").attachFile(yourFixturePath);

    cy.get(PageAction.RFPAddResponsePage().addByImports).click();

    cy.get(PageAction.RFPAddResponsePage().toastMessage).should('be.visible');

    cy.wait(5000);

    PageAction.RFPAddResponsePage().verifyCustomizeColumns('Rapport Fee', '1000');
    PageAction.RFPAddResponsePage().verifyCustomizeColumns('IMPACT Production Cost', '1000');
    PageAction.RFPAddResponsePage().verifyCustomizeColumns('Total Impressions', '1534678');
    PageAction.RFPAddResponsePage().verifyCustomizeColumns('Frequency', '30');
    PageAction.RFPAddResponsePage().verifyCustomizeColumns('Currency Used', 'USD');
    PageAction.RFPAddResponsePage().verifyCustomizeColumns('Weekly Cost', '1000');
    PageAction.RFPAddResponsePage().verifyCustomizeColumns('Exchange Rate (AS OF DATE)', '3.142');
    //PageAction.RFPAddResponsePage().verifyCustomizeColumns('Creative Delivery Date', '8/1/2021');
    PageAction.RFPAddResponsePage().verifyCustomizeColumns('Specs', 'Specs 1');
    PageAction.RFPAddResponsePage().verifyCustomizeColumns('Orion Capital Applicable', 'Yes');
    PageAction.RFPAddResponsePage().verifyCustomizeColumns('Notes', 'Notes');
    PageAction.RFPAddResponsePage().verifyCustomizeColumns('Approved by Spotify', 'Yes');

    cy.wait(1000);

    cy.get(PageAction.RFPAddResponsePage().buttonSave).first().click();

    cy.get(PageAction.RFPAddResponsePage().toastMessage_Success)
      .first()
      .should('be.visible')
      .should('contain.text', 'Proposal Unit(s) have been saved.');
  });

  tag = "C146660151";
  it(`${tag} - Verify Default custom columns data and values from imported spreadsheet`, () => {
    Report.Issue("OOH-4191").Tag("C146660151").Feature('RFP');
    Report.Issue("OOH-4167").Tag("C146660151").Feature('RFP');

    PageAction.RFPAddResponsePage()
      .loadDefaultCampaign()
      .loadDefaultRFP()
      .loadCustomTemplateDefaultRFP()
      .parseDefaultFrames()
      .loadSearchEmptyFrames()
      .loadPackageRFP()
      .saveRFPDefaultFrames()
      .visit();

    cy.log(fileNamesUpload[2]);
    cy.log(importPath);

    const yourFixturePath = importPath + fileNamesUpload[2];

    cy.log(yourFixturePath);

    cy.get("input[type='file']").attachFile(yourFixturePath);

    cy.get(PageAction.RFPAddResponsePage().addByImports).click();

    cy.get(PageAction.RFPAddResponsePage().toastMessage).should('be.visible');

    cy.wait(5000);

    PageAction.RFPAddResponsePage().verifyCustomizeColumns('% SOV', '100');
    PageAction.RFPAddResponsePage().verifyCustomizeColumns('Static vs. Full Motion', 'Static');
    PageAction.RFPAddResponsePage().verifyCustomizeColumns('4-Week DEC Imps (If EOI N/A)', '1534678');
    PageAction.RFPAddResponsePage().verifyCustomizeColumns('Rapport Fee', '30');
    PageAction.RFPAddResponsePage().verifyCustomizeColumns('IMPACT Production Cost', 'USD');
    PageAction.RFPAddResponsePage().verifyCustomizeColumns('Added Value', '100');

    cy.wait(1000);

    cy.get(PageAction.RFPAddResponsePage().buttonSave).first().click();

    cy.get(PageAction.RFPAddResponsePage().toastMessage_Success)
      .first()
      .should('be.visible')
      .should('contain.text', 'Proposal Unit(s) have been saved.');
  });

});
