import { Component } from '../../helpers/component';
import { verify } from 'cypress/types/sinon';
import { Response } from 'aws-sdk/lib/response';
import {
  campaigns,
  countries,
  oohClients,
  oohObjectives,
  oohAgencies,
  oohDemographic,
  oohAudienceSegment,
  oohMarkets,
  oohMediaFormats,
  oohAttachments,
  oohInventory,
  oohRFP,
  oohCampaignMarket,
  oohInventoryMediaOwner,
  oohInventoryFrames,
  oohInventoryRfp,
  oohClient,
  oohObjective,
  oohAgency,
  oohCreateCampaign
} from '../../../fixtures/ooh/campaigns';

export class CampaignCreatePage {
  pageName = 'CampaignCreatePage';
  url = 'ooh/campaign';

  campaignsMarketGetApiUrl = '**/ooh/v1.0/api/marketRegion?*';

  submitCreateCampaignMarketPostApiUrl = '**/ooh/v1.0/api/campaigns/marketRegion';

  // DATA AUTOMATION TAGS
  createCmpbtn = '.cad-global-create-modern__button > .cad-button'
  formTtitle = '.cad-row_clear > .title'
  campaignName = 'input[data-automation="ooh-campaign-manage-form-name"]';
  campaignDesc = 'textarea[data-automation="ooh-campaign-manage-form-description"]';
  objective = '[data-automation="ooh-campaign-objective"]'
  objectiveSearch = `.smartWidth > cad-smart-search-list.ng-untouched > .smart-search-list 
    > .smart-search-list__search > .smart-search-list__search-input > .cad-search > .cad-search__input > .ng-untouched`
  objectiveSelect = '[data-automation="Select Objective"]'
  Search = `[data-automation="ooh-campaign-target-audience-action-list-audience"] > .smart-search-list 
    > .smart-search-list__search > .ng-untouched > .cad-search > .cad-search__input > .ng-untouched`;
  agency = '[data-automation="ooh-campaign-agency"]'
  agencySelect = '[data-automation="Select Agency"]'
  agencySearch = `[data-automation="ooh-campaign-target-audience-action-list-audience"] > .smart-search-list 
    > .smart-search-list__search > .ng-pristine > .cad-search > .cad-search__input > .ng-pristine`
  client = '[data-automation="ooh-campaign-client"]'
  clientSelect = '[data-automation="Select Client"]'
  // clientSearch = `[data-automation="ooh-campaign-client"] > 
  // .ng-tns-c32-14 > .cad-dropdown > .dropdown__body > .dropdown__body__content 
  // > .smartWidth > .ng-untouched > .smart-search-list > 
  // .smart-search-list__search > .ng-pristine > .cad-search > .cad-search__input`

  clientSearch = `.smartWidth > cad-smart-search-list.ng-untouched > .smart-search-list > .smart-search-list__search 
    > cad-search-input.ng-untouched > .cad-search > .cad-search__input > .ng-untouched`

  campaignBudget = 'input[data-automation="ooh-campaign-manage-form-budget"]';
  campaignResDate = '[data-automation="ooh-filter-date-range-from"]';
  campaignDateRange = '[data-automation="ooh-campaign-manage-form-datepicker"]';
  camDateNextMon = `[data-automation="calendar-right"] > .cad-month-calendar > .cad-month-calendar__header 
    > .cad-month-calendar__header__icon--right > cad-icon > .icon`
  calendarLeft = '[data-automation="calendar-left"]';
  // calenderRightrrow = '> .cad-month-calendar > .cad-month-calendar__header > .cad-month-calendar__header__icon--right'
  CalanderDays = '[data-automation="calendar-left"] > .cad-month-calendar > .cad-month-calendar__matrix'
  ResCalanderDays = '.cad-month-calendar__matrix';
  CalApplyButton = '[priority="primary"] > .cad-button';
  NoOfAttachments = '.shared-attachment__header > .title_2 > .title';

  demograpTitle = '.cad-panel_p-0-40.ng-star-inserted > .row > .col-md-12 > .title'
  primaryaudTitle = '.cad-panel_p-0-40.ng-star-inserted > .row > :nth-child(2) > .title'
  secAudTitle = '.cad-panel_p-0-40.ng-star-inserted > .row > :nth-child(3) > .title'
  primaryAudience = '[data-automation="Select Primary Audience"]';
  primaryAudienceAfterSelection = '[data-automation="ooh-campaign-primary-audience"]';
  primAudvalue = ':nth-child(2) > div.ng-star-inserted > cad-smart-search-list-item > .list-item';
  secAudence = '[data-automation="ooh-target-audience-secondary"]'

  ResDateNextMonth = '.cad-month-calendar__header__icon--right > cad-icon > .icon';
  saveBtn = '[data-automation="ooh-campaign-manage-form-submit-popup"] > .cad-button';
  savedraftBtn = '[data-automation="ooh-campaign-manage-form-draft"] .cad-button--secondary'
  previousstepBtn = '[data-automation="ooh-campaign-manage-form-previous"] > .cad-button'
  applyBtn = '[data-automation="apply-btn"] > .cad-button';
  continueBtn = '[data-automation="ooh-campaign-manage-form-bottom-continue"] :button';
  contentcontinueBtn = '[data-automation="cad-button"]';
  marketRegion = '[data-automation="ooh-campaign-manage-market-search"] > .smart-search-list';
  marketRegionList = 'div.ng-star-inserted > cad-smart-search-list-item > .list-item';
  mediaformat = 'provide css as required';
  unitsPagination = 'provide css as required';
  listItemSelect = ':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item';
  createDemographic = '.mr-10 > .cad-button';
  viewCampaignDate = '[data-automation="dates-value"]';
  messageStatus = '.cad-toast__title';
  delAttachment = ':nth-child(2) > .col-2 > .cad-flex > cad-link.ng-star-inserted > .cad-link > .cad-link__text';
  confirmAttachmentDelete ='[data-automation="ooh-confirm-popup-delete"] > .cad-button';
  addAttachment = '.shared-attachment__header > .title_2 > cad-link.ng-star-inserted > .cad-link > .cad-link__text';
  browseFile = "input[type='file']";
  addMediaFormats = '.pl-0 > .cad-button';
  selectEmail = `:nth-child(1) > :nth-child(2) > .display-inline > .cad-dropdown > .dropdown__head > .dropdown__head__content`;
  moEmailList = 'div.ng-star-inserted > cad-smart-search-list-item > .list-item';
  pageTitleBlack = '.title_black';
  cancelPreviewAndSendRFP ='[modal-footer=""] > [view="secondary"] > .cad-button';
  previewRFP = '[view="primary"] > .cad-button';
  exportBtn = '.pl-20 > .cad-button';
//  primaryAudience = 'ooh-audience[data-automation="ooh-campaign-primary-audience"]';
  secondaryAudience = 'input[data-automation="ooh-target-audience-secondary"]';

  addAttachmentBtn = '[data-automation="ooh-shared-attachment-add-attachment"] .primary > span';
  attachmentCount = '[data-automation="ooh-campaign-attachment-total"]'
  attachmentgrid = '[data-automation="ooh-shared-attachments-table-data"] > .ng-star-inserted'
  deleteAttachment = '[data-automation="ooh-shared-attachments-delete-action"] > .cad-link > .cad-link__text'
  fileType = 'input[type="file"]'

  comment = '.comments-textarea';
  digitalframe = ':nth-child(2) > .mb-15 > .cad-checkbox';
  addMediaFormatsbtn = '.pl-0 > .cad-button';
  staticframe = ':nth-child(1) > .mb-15 > .cad-checkbox';
  mediaformat_1 = `:nth-child(3) > div.ng-star-inserted > cad-smart-search-list-item > .list-item`;
  mediaformat_2 = `:nth-child(4) > div.ng-star-inserted > cad-smart-search-list-item > .list-item`;
  mediaFormatSearch = `.media-select-popup__list-in > .smart-search-list >
      .smart-search-list__search > cad-search-input.ng-pristine >
      .cad-search > .cad-search__input > .ng-pristine`
  mediaFormatResult = `.media-select-popup__list-in > .smart-search-list > .smart-search-list__list > :nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item`
  mediaFormatApplybtn = '.display-inline > .cad-button'
  mediaFormatCount_1 = ':nth-child(1) > .row > .col-3 > .input'
  mediaFormatCount_2 = ':nth-child(2) > .row > .col-3 > .input'
  mediaowner = '[data-automation="ooh-campaign-media-owner-search"] > .smart-search-list';
  email = '[data-automation="Select E-Mail"]'
  emailList = `.ooh-filter-control > .ng-valid > .smart-search-list > .smart-search-list__list > > div.ng-star-inserted > cad-smart-search-list-item > .list-item`;
  emailListClose = '.display-inline > .cad-dropdown > .dropdown__head > .dropdown__head__content'
  createCampaignBtn = '[data-automation="ooh-campaign-manage-form-submit-popup"]';
  toastMsg = '.cad-toast__title';
  camName = '.title_black'
  editBtn = '.campaign-container__actions > [data-automation="ooh-campaign-detail-action-edit"] > .cad-button';
  sendRFPBtn = '.ooh-header__pl-10 > .cad-button'

  editInMap = '[data-automation="ooh-campaign-manage-linktomap"] > .cad-button'
  statusMessage = '.cad-status__text';
  searchMedia = '.ooh-header--right > cad-button.ng-star-inserted > .cad-button'
  searchLocation = '[data-automation="ooh-map-typeahead"]';
  mediaOwner = '[value="Media_Owners"] > .button-toggle > a > .button-toggle__text'
  units = '[value="Frames"] > .button-toggle > a > .button-toggle__text'
  POI = '[value="POI"] > .button-toggle > a > .button-toggle__text'
  SearchPOI = '.col-md-7 > .input'
  MySelectionButton = '.ooh-header__button'
  CreateCampaign = '.sideSlidePanel__selectedMedia__header__right-save > .cad-button'
  CampaignName = '.input'
  CampaignNameTitle = '.cad-row_clear > .title'
  ValidationError = '.cad-validation-errors__item'
  FirstResultItem = ':nth-child(1) > div.ng-star-inserted > cad-smart-search-list-item > .list-item'
  poiSlider = '[data-automation="ooh-poi-slider"]'
  saveOwnerPOI = '.sideSlidePanel__frame-details__header__right-save > .cad-button'

  header_text = '.ooh-header__text'
  submitCampaign = '[data-automation="ooh-map-campaign-modal_submit"] > .cad-button'
  deleteCampaign = '[data-automation="ooh-campaign-detail-action-delete"] > .cad-button'
  editCampaign = '[data-automation="ooh-campaign-detail-action-edit"] > .cad-button'
  prevCampaign = '[data-automation="ooh-campaign-detail-action-send-rfp"] > .cad-button'
  RFPPrevTitle = '.popup-title'
  RFPPrevText = '.popup-text > .ng-star-inserted'
  RFPPrevCancel = '[view="secondary"] > .cad-button'
  RFPPrev = '[view="primary"] > .cad-button'
  closeDeletePopup = 'cad-modal-content > :nth-child(1) > cad-icon.ng-star-inserted > .icon'
  deletecamHeader = '[modal-header=""] > .title'
  deleteCamText = '.title_6.mb-3'
  deleteCamName = '.title_5'
  deleteConfText = '[style="width: 77%;"] > :nth-child(3)'

  mediaFormatCount = '[data-automation="ooh-campaign-manage-mediaformat-table_data"] > :nth-child(1) > .panel-head__text > .title'
  mediaOwnerCount = 'campaign-media-owner > .cad-panel > :nth-child(1) > :nth-child(1) > section > .pl-10 > .panel-head__text > .title'
  unitsCount = 'section.ng-star-inserted > .pl-10 > .panel-head__text > .title'
  poiCount = '.col-12 > section > :nth-child(1) > .panel-head__text > .title'
  targetAudience = '[data-automation="Select Target Audience"]'
  rfpCancel = '[data-automation="ooh-campaign-detail-action-cencel"] > .cad-button'

  serachIcon = 'cad-icon.icon-search > .icon'
  globalSearch = '[data-automation="cad-search-global__input"]'
  view = '[data-automation="context-menu-item-ooh.campaign.list.menu_items.view.title"] > .cad-context-menu-item'
  campaignMenu = '.cad-context-menu__dots'
  edit = '[data-automation="context-menu-item-ooh.campaign.list.menu_items.edit.title"] > .cad-context-menu-item'
  delete = '[data-automation="context-menu-item-ooh.campaign.list.menu_items.delete.title"] > .cad-context-menu-item'
  confirmCancel = '[data-automation="popup_cancel_button"] > .cad-button'
  confirmDelete = '[data-automation="popup_apply_button"] > .cad-button'

  headerDelete = '.campaign-container__actions > [data-automation="ooh-campaign-detail-action-delete"] > .cad-button'
  headerEdit = '.campaign-container__actions > [data-automation="ooh-campaign-detail-action-edit"] > .cad-button'
  headerPreview = '.campaign-container__actions > [data-automation="ooh-campaign-detail-action-send-rfp"] > .cad-button'

  footerDelete = '.campaign-container__actions--alignLeft > cad-button > .cad-button'
  footerEdit = '.campaign-container__actions--alignRight > [data-automation="ooh-campaign-detail-action-edit"] > .cad-button'
  footerPreview = '.campaign-container__actions--alignRight > [data-automation="ooh-campaign-detail-action-send-rfp"] > .cad-button'

  removeMO = '[data-automation="ooh-vendor_remove_all"]'
  removeUnits = '[data-automation="ooh-frames_remove_all"]'
  removePOI = '[data-automation="ooh-campaign-remove-all-poi"]'
  Pagination = '[data-automation="cad-pagination__btn_next"]'

  selectPOI = '[data-automation-marker="marker"]'
  enterPOIValue = '.cad-input-group__label > .ng-untouched'

  EditCampaignSave = '[data-automation="cad-button"]'

  sendRfpCancelBtn = '[data-automation="ooh-campaign-detail-action-cencel"] > .cad-button'
  sendRfpBtn = '[data-automation="ooh-campaign-detail-action-send-rfp"] > .cad-button'

  campaignsGetApiUrl = '**/ooh/v1.0/api/campaigns?*';
  demographicGetApiUrl = '**/ooh/v1.0/api/audienceSegment/config/demographic';
  audienceSegmentGetApiUrl = '**/ooh/v1.0/api/audienceSegment?*';
  marketRegionGetApiUrl = '**/ooh/v1.0/api/marketRegion?*';

  cleintGetApiUrl = '**/ooh/v1.0/api/clients?*';
  objectiveGetApiUrl = '**/ooh/v1.0/api/campaigns/configs/objective?*';
  agencyGetApiUrl = '**/ooh/v1.0/api/campaigns/configs/agency?*';

  CountryGetApiUrl = '**/shell/v1.0/api/clients?*';
  mediaformatsGetApiUrl = '**/ooh/v1.0/api/frames/configs/mediaformats';

  attachmentPostApiUrl = '**/ooh/v1.0/api/campaigns/attachment';
  inventoryPutApiUrl = '**/ooh/v1.0/api/campaigns/7744d7cf-e773-415e-8ae7-531b7e67ac6f/inventoryRfp';
  GetApiUrl = '**/ooh/v1.0/api/campaigns/7744d7cf-e773-415e-8ae7-531b7e67ac6f'

  inventoryRfpmediaOwnerGetApiUrl = '**/ooh/v1.0/api/campaigns/7744d7cf-e773-415e-8ae7-531b7e67ac6f/inventoryRfp/mediaOwner?';
  inventoryRfpframeGetApiUrl = '**/ooh/v1.0/api/campaigns/7744d7cf-e773-415e-8ae7-531b7e67ac6f/inventoryRfp/frame?';
  inventoryRfpGetApiUrl = '**/ooh/v1.0/api/campaigns/7744d7cf-e773-415e-8ae7-531b7e67ac6f/inventoryRfp'
  rfpClientGet = '**/ooh/v1.0/api/clients/8d09353d-2543-44b3-a9d7-0d8f583e9d73'
  rfpObjectiveGet = '**/ooh/v1.0/api/campaigns/configs/objective/fc0c8359-ed15-480e-8e59-ebec1f15ef20'
  rfpAgencyGet = '**/ooh/v1.0/api/campaigns/configs/agency/be715516-750e-4724-8fdb-4c242c67fe88'

  locationAutoCompleteOptions = '.pac-item'
  noOfMediaOwners = '.is-active > .button-toggle__label'

  selectLocation(location: string) {
    cy.get(this.searchLocation).type(location).click();
    cy.get(this.locationAutoCompleteOptions).first().click();
  }

  visit() {
    Report.Step(this.pageName);
    cy.visit(this.url);
    return this;
  }

  selectObjective(value: string) {
    Component.DropDown('[data-automation="ooh-campaign-objective"]').selectOptionByLabel(value);
    return this;
  }
  selectAgency(value: string) {
    Component.DropDown('[data-automation="ooh-campaign-agency"]').selectOptionByLabel(value);
    return this;
  }
  selectClient(value: string) {
    Component.DropDown('[data-automation="ooh-campaign-client"]').selectOptionByLabel(value);
    return this;
  }

  campaignNameSuffix() {
    let text = '';
    let possible = '0123456789';
    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  // Mocks
  loadCountryData() {
    cy.intercept(
      'GET', this.CountryGetApiUrl,
      { body: countries }
    ).as('loadCountryData');
    return this;
  }

  loadCampaignsWithData() {
    cy.intercept(
      'GET', this.campaignsGetApiUrl,
      { body: campaigns }

    ).as('loadCampaignsWithData');
    return this;
  }

  loadClientData() {
    cy.intercept(
      'GET', this.cleintGetApiUrl,
      { body: oohClients }
    ).as('loadClientData');
    return this;
  }

  loadobjectiveData() {
    cy.intercept(
      'GET', this.objectiveGetApiUrl,
      { body: oohObjectives }
    ).as('loadobjectiveData');
    return this;
  }

  loadagencyData() {
    cy.intercept(
      'GET', this.agencyGetApiUrl,
      { body: oohAgencies }
    ).as('loadagencyData');
    return this;
  }

  loadDemographicData() {
    cy.intercept(
      'GET', this.demographicGetApiUrl,
      { body: oohDemographic }
    ).as('loadDemographicData');
    return this;
  }

  loadaudienceSegmentData() {
    cy.intercept(
      'GET', this.audienceSegmentGetApiUrl,
      { body: oohAudienceSegment }
    ).as('loadaudienceSegmentData');
    return this;
  }

  loadMarketRegionData() {
    cy.intercept(
      'GET', this.marketRegionGetApiUrl,
      { body: oohMarkets }
    ).as('loadMarketRegionData');
    return this;
  }

  loadmediaformatsData() {
    cy.intercept(
      'GET', this.mediaformatsGetApiUrl,
      { body: oohMediaFormats }
    ).as('loadmediaformatsData');
    return this;
  }

  loadAttachmentsData() {
    cy.intercept(
      'POST', this.attachmentPostApiUrl,
      { body: oohAttachments }
    ).as('loadAttachmentsData');
    return this;
  }

  loadInventoryData() {
    cy.intercept(
      'PUT', this.inventoryPutApiUrl,
      { body: oohInventory }
    ).as('loadInventoryData');
    return this;
  }

  loadGetRFPData() {
    cy.intercept(
      'GET', this.GetApiUrl,
      { body: oohRFP }
    ).as('loadGetRFPData');
    return this;
  }

  loadinventoryRfpmediaOwnerData() {
    cy.intercept(
      'GET', this.inventoryRfpmediaOwnerGetApiUrl,
      { body: oohInventoryMediaOwner }
    ).as('loadinventoryRfpmediaOwnerData');
    return this;
  }

  loadinventoryRfpframeData() {
    cy.intercept(
      'GET', this.inventoryRfpframeGetApiUrl,
      { body: oohInventoryFrames }
    ).as('loadinventoryRfpframeData');
    return this;
  }

  loadinventoryRfpData() {
    cy.intercept(
      'GET', this.inventoryRfpGetApiUrl,
      { body: oohInventoryRfp }
    ).as('loadinventoryRfpData');
    return this;
  }

  loadRfpClientData() {
    cy.intercept(
      'GET', this.rfpClientGet,
      { body: oohClient }
    ).as('loadRfpClientData');
    return this;
  }

  loadRfpObjectiveData() {
    cy.intercept(
      'GET', this.rfpObjectiveGet,
      { body: oohObjective }
    ).as('loadRfpObjectiveData');
    return this;
  }

  loadRfpAgencyData() {
    cy.intercept(
      'GET', this.rfpAgencyGet,
      { body: oohAgency }
    ).as('loadRfpAgencyData');
    return this;
  }

  // loadAttachmentsData() {
  //   cy.intercept('POST', this.attachmentPostApiUrl)
  //     .as('loadAttachmentsData')
  //     .then(response => {
  //       // cy.log('Fixture loaded from API');
  //       cy.log(response.body)
  //       // cy.log('Fixture written to disk');}
  //     });
  //   return this;
  // }

  // loadAttachmentsData() {
  //   cy.intercept(
  //     'POST', this.attachmentPostApiUrl,
  //     { fixture: 'ooh/campaigns/Create_attachments.json' }
  //   ).then(res => {
  //     // cy.log(res.body)
  //   }).as('loadAttachmentsData');
  //   return this;
  // }

  // loadAttachmentsData() {
  //   cy.intercept({
  //     method: 'POST',
  //     url: this.attachmentPostApiUrl
  //   }).as('loadAttachmentsData').then(Response => {
  //     cy.log('Fixture loaded from API');
  //     cy.log(Response.body);
  //     cy.log('Fixture written to disk');
  //   });
  // }

  // cy.request({
  //   method: 'post',
  //   url: this.attachmentPostApiUrl,
  //   timeout: 50000
  // }).then(res => {
  //   cy.log('Fixture loaded from API');

  //   cy.writeFile('**/ooh/campaigns/Create_attachments.json', res.body);
  // });

  loadCampaignsMarket() {
    cy.intercept(
      'GET', this.campaignsMarketGetApiUrl,
      { body: oohCampaignMarket }
    ).as('loadCampaignsMarket');
    return this;
  }

  submitCampaignsMarket() {
    cy.intercept(
      'POST', this.submitCreateCampaignMarketPostApiUrl,
      { body: oohCreateCampaign }
    ).as('submitCampaignsMarket');
    return this;
  }

  selectMediaOwners(mo: String[]) {
    cy.get(this.noOfMediaOwners)
      .wait(2000)
      .then(($span) => {
        var count = $span.text().trim();
        for (var i = 1; i <= parseInt(count); i++) {
          cy.get(`:nth-child(` + i + `) > .sideSlidePanel__types__table__body__row-left > div`)
            .then(($span) => {
              var moName = $span.text().trim();
              if (moName.toString() == mo[0].toString()) {
                cy.get(`:nth-child(` + (i - 12) + `) > .sideSlidePanel__types__table__body__row-last 
              > :nth-child(2) > .bg-icon > .icon > use`).click();
              }
            });
        }
      });
  }

  selectLocations(mo: String[]) {
    cy.get(this.noOfMediaOwners).wait(2000)
      .then(($span) => {
        var count = $span.text().trim();
        for (var i = 1; i <= parseInt(count)-1; i++) {
          cy.get('.sideSlidePanel__types__table__body__row:nth-child('+i+')').then(($ele) =>{
            var moName = $ele.text().trim();
              if (moName.toString().startsWith(mo[0].toString()) || moName.toString().startsWith(mo[1].toString())
              || moName.toString().startsWith(mo[2].toString()) || moName.toString().startsWith(mo[3].toString())) {
                cy.wrap($ele).children('.sideSlidePanel__types__table__body__row-last').children('span').last().click();
              }
          });


 /*         cy.get(`:nth-child(` + i + `) > .sideSlidePanel__types__table__body__row-left > div`)
            .then(($span) => {
              var moName = $span.text().trim();
              if (moName.toString() == mo[1].toString()) {
                cy.get(`:nth-child(` + (i) + `) > .sideSlidePanel__types__table__body__row-last 
              > :nth-child(2) > .bg-icon > .icon > use`).click();
              }
            }); */
        }
      });
  }

  selectPOIInMap(loopCount: number) {
    for (var i = 1; i <= loopCount; i++) {
      cy.get(':nth-child(' + i + ') > .sideSlidePanel__types__table__body__row-last > span > .bg-icon > .icon').click()
    }
  }

  selectPointOfInterest(loopCount: number) {
    for (var i = 1; i <= loopCount * 4; i++) {
      cy.get(':nth-child(' + i + ') > .sideSlidePanel__types__table__body__row-last > span > .bg-icon > .icon').click()
    }
  }

}
