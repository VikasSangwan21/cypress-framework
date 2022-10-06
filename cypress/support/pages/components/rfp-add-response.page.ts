import {
  oohRfpCampaignCoke,
  oohRfpCampaignSpotify,
  oohRfpCampaignDefault,
  oohRfpCoke,
  oohRfpSpotify,
  oohRfpDefault,
  oohRfpTemplateCoke,
  oohRfpTemplateSpotify,
  oohRfpTemplateDefault,
  oohRfpParseFramesCoke,
  oohRfpParseFramesSpotify,
  oohRfpParseFramesDefault,
  oohRfpDetailsPackage,
  oohRfpSearchByIds,
  oohRfpSearchByIdsEmpty,
  oohRfpSaveSpotify,
  oohRfpSaveCoke,
  oohRfpSaveDefault
} from '../../../fixtures/ooh/rfp';
export class RfpAddResponse {
  pageName = 'RfpAddResponsePage';
  url = 'ooh/rfp';

  /* *Add Response EndPoints Collections */
  rfpDetailsGetApiUrl = '**/ooh/v1.0/api/rfp/*';
  rfpCampaignGetApiUrl = '**/ooh/v1.0/api/campaigns/*';
  rfpCustomeTemplateGetApiUrl =
    '**/ooh/v1.0/api/campaigns/*/uploading-template-fields*';
  rfpPackageGetApiUrl = '**/ooh/v1.0/api/rfp-items/*/package*';
  rfpSearchIDsApiUrl = '**/ooh/v1.0/api/frames/search?*';
  rfpParseImportApiUrl = '**/ooh/v1.0/api/rfp-items/*/frames/parse';
  rfpFramesApiUrl = '**/ooh/v1.0/api/rfp-items/*';

  /* *Add Response Elements */
  addByIDs =
    'cad-link[data-automation="ooh-rfp-response-frames-add-link"] > a > span';
  popupsTitle_addByIDs =
    'rfp-response-frames-modal > cad-modal-content > div > div > div[data-automation="popup_title"]';
  popupsButton_close = 'cad-icon[data-automation="popup_close"]';
  searchBox_addByIDs = 'cad-search-input[placeholder="ooh.rfp.search"]';
  buttonSearch_addByIDs = 'cad-button[text="search"]';
  addSearchID_addByIDs = 'cad-link[data-automation="ooh-rfp-add-select"]';
  addByImports =
    'cad-link[data-automation="ooh-rfp-response-frames-import-link"] > a.cad-link > span';
  buttonDone_addByIDs = 'cad-button[text="ooh.rfp.done"]';
  toastMessage = 'div.toast-container';
  toastMessage_Success =
    'div.toast-container > cad-toast > div[data-automation="success"]';
  buttonSave = 'cad-button[data-automation="ooh-rfp-detail-action-save"]';
  searchEmptyLogo = 'div.response__list__modal__body-table-none-icon';
  searchEmptyMsg = 'div.response__list__modal__body-table-none-title';
  addByIDsAdditionalInfo = 'div.response__list__modal__body-message';

  /**Mock Ups Endpoint Calls */
  visit() {
    Report.Step(this.pageName);
    cy.visit(this.url);
    return this;
  }

  loadCokeCampaign() {
    cy.intercept('GET', this.rfpCampaignGetApiUrl, {
      body: oohRfpCampaignCoke,
    }).as('loadCokeCampaign');
    return this;
  }

  loadSpotifyCampaign() {
    cy.intercept('GET', this.rfpCampaignGetApiUrl, {
      body: oohRfpCampaignSpotify,
    }).as('loadSpotifyCampaign');
    return this;
  }

  loadDefaultCampaign() {
    cy.intercept('GET', this.rfpCampaignGetApiUrl, {
      body: oohRfpCampaignDefault,
    }).as('loadDefaultCampaign');
    return this;
  }

  loadCokeRFP() {
    cy.intercept('GET', this.rfpDetailsGetApiUrl, {
      body: oohRfpCoke,
    }).as('loadCokeRFP');
    return this;
  }

  loadSpotifyRFP() {
    cy.intercept('GET', this.rfpDetailsGetApiUrl, {
      body: oohRfpSpotify,
    }).as('loadSpotifyRFP');
    return this;
  }

  loadDefaultRFP() {
    cy.intercept('GET', this.rfpDetailsGetApiUrl, {
      body: oohRfpDefault,
    }).as('loadDefaultRFP');
    return this;
  }

  loadCustomTemplateCokeRFP() {
    cy.intercept('GET', this.rfpCustomeTemplateGetApiUrl, {
      body: oohRfpTemplateCoke,
    }).as('loadCustomTemplateCokeRFP');
    return this;
  }

  loadCustomTemplateSpotifyRFP() {
    cy.intercept('GET', this.rfpCustomeTemplateGetApiUrl, {
      body: oohRfpTemplateSpotify,
    }).as('loadCustomTemplateSpotifyRFP');
    return this;
  }

  loadCustomTemplateDefaultRFP() {
    cy.intercept('GET', this.rfpCustomeTemplateGetApiUrl, {
      body: oohRfpTemplateDefault,
    }).as('loadCustomTemplateDefaultRFP');
    return this;
  }

  parseCokeFrames() {
    cy.intercept('POST', this.rfpParseImportApiUrl, {
      body: oohRfpParseFramesCoke,
    }).as('parseCokeFrames');
    return this;
  }

  parseSpotifyFrames() {
    cy.intercept('POST', this.rfpParseImportApiUrl, {
      body: oohRfpParseFramesSpotify,
    }).as('parseSpotifyFrames');
    return this;
  }

  parseDefaultFrames() {
    cy.intercept('POST', this.rfpParseImportApiUrl, {
      body: oohRfpParseFramesDefault,
    }).as('parseDefaultFrames');
    return this;
  }

  loadPackageRFP() {
    cy.intercept('GET', this.rfpPackageGetApiUrl, {
      body: oohRfpDetailsPackage,
    }).as('loadPackageRFP');
    return this;
  }

  loadSearchRFPByIds() {
    cy.intercept('GET', this.rfpSearchIDsApiUrl, {
      body: oohRfpSearchByIds,
    }).as('loadSearchRFPByIds');
    return this;
  }

  loadSearchEmptyFrames() {
    cy.intercept('GET', this.rfpSearchIDsApiUrl, {
      body: oohRfpSearchByIdsEmpty,
    }).as('loadSearchEmptyFrames');
    return this;
  }

  saveRFPSpotifyFrames() {
    cy.intercept('PUT', this.rfpFramesApiUrl, {
      body: oohRfpSaveSpotify,
    }).as('saveRFPSpotifyFrames');
    return this;
  }

  saveRFPCokeFrames() {
    cy.intercept('PUT', this.rfpFramesApiUrl, {
      body: oohRfpSaveCoke,
    }).as('saveRFPCokeFrames');
    return this;
  }

  saveRFPDefaultFrames() {
    cy.intercept('PUT', this.rfpFramesApiUrl, {
      body: oohRfpSaveDefault,
    }).as('saveRFPDefaultFrames');
    return this;
  }

  verifyCustomizeColumns(columnsName: string, value: string) {
    cy.get('.ag-header-container')
      .find('div.ag-header-row > div[col-id="' + columnsName + '"]')
      .should('exist');
    cy.get('div.ag-header-row > div[col-id="' + columnsName + '"]').should(
      'contain.text',
      columnsName
    );
    cy.get('div.ag-cell-value[col-id="' + columnsName + '"]').should(
      'contain.text',
      value
    );
    return true;
  }
}
