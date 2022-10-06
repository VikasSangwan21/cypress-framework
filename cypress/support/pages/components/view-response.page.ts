import { Component } from '../../helpers/component';
import { verify } from 'cypress/types/sinon';
import {
  campaigns,
  oohResponseFramesDefault,
  oohCustomHeadersDefault,
  oohResponseFramesCoke,
  oohCustomHeadersCoke,
  oohResponseFramesSpotify,
  oohCustomHeadersSpotify,
  oohResponseCampaign,
  oohResponseRfp,
  oohResponsePackage,
  oohResponseMediaOwner,
  oohResponseMarketRegion,
  oohResponseRfpPackageType,
  oohResponseCampaignFacing,
  oohResponseCampaignMediaOwner,
  oohResponseCampaignMediaFormat
} from '../../../fixtures/ooh/campaigns/';

export class ViewResponsePage {
  pageName = 'ViewResponsePage';
  url = 'ooh/campaign/proposal/viewall';
  proposalFramesGetSpotifyApiURL = '**/ooh/v1.0/api/rfp/campaign/*/frames*';
  proposalFramesGetDefaultApiURL = '**/ooh/v1.0/api/rfp/campaign/*/frames*';
  proposalFramesGetCokeApiURL = '**/ooh/v1.0/api/rfp/campaign/*/frames*';
  // proposalFramesGetApiURL = '**/ooh/v1.0/api/rfp/campaign/*/frames*';
  proposalCampaignGetApiURL = '**/ooh/v1.0/api/campaigns/*';
  proposalRFPResponseGetApiURL = '**/ooh/v1.0/api/rfp-response/?*';
  proposalRFPPackageGetApiURL =
    '**/ooh/v1.0/api/campaigns/*/rfp-item-packages?*';

  campaignsGetApiUrl = '**/ooh/v1.0/api/campaigns?*';

  proposalRFPMediaownerGetApiURL =
    '**/ooh/v1.0/api/rfp-item-packages/campaign/*/mediaOwner*';
  proposalRFPMarketRegionGetApiURL =
    '**/ooh/v1.0/api/rfp-item-packages/campaign/*/marketRegion*';
  proposalRFPPackageTypeGetApiURL =
    '**/ooh/v1.0/api/rfp-item-packages/campaign/*/packageType*';
  proposalCampaignFacingGetApiURL = '**/ooh/v1.0/api/rfp/campaign/*/facing*';
  proposalCampaignMediaOwnerGetApiURL =
    '**/ooh/v1.0/api/rfp/campaign/*/mediaOwner*';
  proposalCampaignMediaFormatGetApiURL =
    '**/ooh/v1.0/api/rfp/campaign/*/mediaFormat';

  proposalCustomFrameHeaderSpotifyApiURL =
    '**/ooh/v1.0/api/campaigns/*/uploading-template-fields';
  proposalCustomFrameHeaderDefaultApiURL =
    '**/ooh/v1.0/api/campaigns/*/uploading-template-fields';
  proposalCustomFrameHeaderCokeApiURL =
    '**/ooh/v1.0/api/campaigns/*/uploading-template-fields';

  globalSearch = '[data-automation="cad-search-global__input"]';
  viewResponseArrow = '[data-automation="ooh-proposal-accordion-btn"]';
  openInMap = '[data-automation="ooh-campaign-manage-linktomap"]';
  contextMenu = 'cad-button.ng-star-inserted > .cad-button';
  exportToxls = '[data-automation="context-menu-item-ooh.campaign.export_xls"]';
  exportToppt = '[data-automation="context-menu-item-ooh.campaign.export_ppt"]';
  openInTable = '[data-automation="ooh-rfp-response-open-in-table"]';
  paging = '[data-automation="cad-pagination__btn_next"]';
  frameCount = '[data-automation="ooh-proposal-FrameCount"]';
  responseStatus = 'ooh-status[data-automation="ooh-mediaowner-status"] > div.status_proposal_received';

  buttonExportExcel = '[data-automation="ooh-proposal-export-selected-xlsx"] > .cad-button'
  buttonExportPPT = '[data-automation="ooh-proposal-export-selected-ppt"] > .cad-button';
  toastMessage = '[data-automation="success"]'

  unitsgrid = '[data-automation="rfp-proposal__body__sections__section-table"] '
  packgrid = '[data-automation="ooh-rfp-packages-table"] '
  selectAllUnits = '.ag-pinned-left-header > .ag-header-row > .ag-header-cell > .ag-header-select-all'
  selectAllpack = '.ag-header-container > .ag-header-row > [aria-colindex="1"] > .ag-header-select-all'
  checkbox = ' > .ag-cell > .ag-cell-wrapper > .ag-selection-checkbox';

  selectedClass = ' > .ag-cell > .ag-cell-wrapper .ag-selection-checkbox .ag-input-field .ag-checked'
  unselectedClass = ' > .ag-cell > .ag-cell-wrapper .ag-selection-checkbox .ag-input-field .ag-checkbox-input-wrapper'
  SelectedUnitsCount = '.frames__body__header-title > :nth-child(3)'
  SelectedPackCount = '.proposal-container__body__header-title > :nth-child(3)'

  unitToggle = 'cad-button-toggle-group[data-automation="ooh-proposal-sideslide-tabs"] > ul > cad-button-toggle:nth-child(1)';
  packageToggle = 'cad-button-toggle-group[data-automation="ooh-proposal-sideslide-tabs"] > ul > cad-button-toggle[value="packages"] > li > a';

  Filter = '[data-automation="smart-filter-open-button"]'

  // unitsFaceFilter = '[data-automation="ooh-frames-facing-filter-dropdown"]'
  // unitsMediaOwnerFilter = '[data-automation="ooh-package-common-dropdown-filter"]'
  // unitsMediaFormatFilter = '[data-automation="ooh-frames-med-format-filter-dropdown"]'

  unitsFaceFilter = `ooh-frames-facing-filter.ng-star-inserted > .display-inline > .cad-dropdown 
        > .dropdown__head > .dropdown__head__content`
  FaceFilterApply = '[data-automation="ooh-frames-facing-filter-apply"]'
  FaceFilterClear = '[data-automation="ooh-frames-facing-filter-clearall"]'

  unitsMediaOwnerFilter = `ooh-frames-media-owner-filter.ng-star-inserted > .display-inline 
        > .cad-dropdown > .dropdown__head > .dropdown__head__content`
  MediaOwnerFilterApply = '[data-automation="ooh-frames-med-owner-filter-apply"]'
  MediaOwnerFilterClear = '[data-automation="ooh-frames-med-owner-filter-clearall"]'

  unitsMediaFormatFilter = `ooh-frames-media-format-filter.ng-star-inserted > .display-inline 
        > .cad-dropdown > .dropdown__head > .dropdown__head__content`
  MediaFormatFilterApply = '[data-automation="ooh-frames-med-format-filter-apply"]'
  MediaFormatFilterClear = '[data-automation="ooh-frames-med-format-filter-clearall"]'

  FilterApply = '[data-automation="smart-filter-modal_apply"] > .cad-button'
  FilterCancel = '[data-automation="smart-filter-modal_cancel"] > .cad-button'
  FilterClear = '[data-automation="smart-filter-modal_clear"] > .cad-button'

  SearchByText = '.smart-search-list__search-input > .cad-search > .cad-search__input'
  SearchResult = '.list-item'
  listItem = ':nth-child(4) > div.ng-star-inserted > cad-smart-search-list-item > .list-item'
  clearSearchText = '.cad-search__clear > .icon > use'

  unitsTotalCount = '.frames__body__header-title > [data-automation="total"]'
  packTotalCount = '.proposal-container__body__header-title > [data-automation="total"]'

  MediaFormatCells = `.ml-20 > ag-grid-angular > .ag-root-wrapper > .ag-root-wrapper-body > .ag-root 
      > .ag-body-viewport > .ag-center-cols-clipper > .ag-center-cols-viewport > .ag-center-cols-container > `

  packMOFilter = `[data-automation="ooh-packages-filter-media-owner"] > .smart-filter > .smart-filter__content 
      > ooh-packages-dropdown-filter.ng-star-inserted > .display-inline > .cad-dropdown > .dropdown__head 
      > .dropdown__head__content`

  packMarketFilter = `[data-automation="ooh-packages-filter-market"] > .smart-filter > .smart-filter__content 
      > ooh-packages-dropdown-filter.ng-star-inserted > .display-inline > .cad-dropdown > .dropdown__head 
      > .dropdown__head__content`

  packTypeFilter = `[data-automation="ooh-packages-filter-type"] > .smart-filter > .smart-filter__content 
      > ooh-packages-dropdown-filter.ng-star-inserted > .display-inline > .cad-dropdown > .dropdown__head 
      > .dropdown__head__content`

  packMarketCell = `.proposal-container__body-table > ag-grid-angular > .ag-root-wrapper > .ag-root-wrapper-body 
      > .ag-root > .ag-body-viewport > .ag-center-cols-clipper > .ag-center-cols-viewport > .ag-center-cols-container
      > .ag-row-even > [aria-colindex="2"]`

  packTypeCell = `.ag-center-cols-container > .ag-row > [aria-colindex="1"]`

  unitsAuditSort = `.ml-20 > ag-grid-angular > .ag-root-wrapper > .ag-root-wrapper-body > .ag-root > .ag-header 
      > .ag-header-viewport > .ag-header-container > .ag-header-row > [aria-colindex="3"] > .ag-cell-label-container 
      > .ag-header-cell-label > .ag-header-cell-text`

  responseHeading = '.campaign-container__title--holder > .title';
  viewResponseStatus = '.cad-status__text';
  moreActions = '.cad-context-menu__button--more-actions > .cad-button';
  moreActionsExportXLS = '[data-automation="context-menu-item-ooh.campaign.export_xls"] > .cad-context-menu-item';
  moreActionsExportPPT = '[data-automation="context-menu-item-ooh.campaign.export_ppt"] > .cad-context-menu-item';
  mediaOwnersTitle = '.content__header-title';
  mediaOwnersCount = '.content__header-title > span';
  tableMediaOwner = '.three-dots > .pl-10';
  MOEmail = '[data-automation="ooh-media-owner-contacts"]';
  MOProposedUnit = '.row.ng-star-inserted > .col-1';
  MOCost = '.row.ng-star-inserted > .col-2.align-right';
  MOComments = '.commentBox';
  MOAttachments = '[data-automation="2 Files"]';
  unitsTitle = '.frames__body__header-title';
  selectedUnitsTitle = '.frames__body__header-title > [style="color: unset"]';
  unitsCount = '.frames__body__header-title > [data-automation="total"]';
  selectedUnitsCount = '.frames__body__header-title > :nth-child(3)';
  filterButton = '.smart-filter-group__control > .cad-button';
  searchFilter = '.cad-search__input > .ng-untouched';
  packagesTitle = '.proposal-container__body__header-title';
  packagesCount = '.proposal-container__body__header-title > [data-automation="total"]';
  selectedPackages = '.proposal-container__body__header-title > [style="color: unset"]';
  selectedPackagesCount = '.proposal-container__body__header-title > :nth-child(3)';
  excelDownloadSuccessMessage = '.cad-toast.success';
  pptEmailSuccessMessage = '.cad-toast.success';
  mapMediaOwnersTitle = '.proposalResponseSide__proposal-details__header-title';
  mapMediaOwnerCount = '.proposalResponseSide__proposal-details__header-count';
  mapMediaOwner = ':nth-child(2) > div > a';
  amountOfUnits = '.proposalResponseSide__table__body__row-last';



      
  visit() {
    Report.Step(this.pageName);
    cy.visit(this.url);
    return this;
  }

  loadCampaignsWithData() {
    cy.intercept(
      'GET', this.campaignsGetApiUrl,
      { body: campaigns }
    ).as('loadCampaignsWithData');
    return this;
  }

  loadProposalFramesDefaultData() {
    cy.intercept('GET', this.proposalFramesGetDefaultApiURL, {
      body: oohResponseFramesDefault,
    }).as('loadProposalFramesDefaultData');
    return this;
  }

  loadProposalCustomFrameHeaderDefaultData() {
    cy.intercept('GET', this.proposalCustomFrameHeaderDefaultApiURL, {
      body: oohCustomHeadersDefault,
    }).as('loadProposalCustomFrameHeaderDefaultData');
    return this;
  }

  loadProposalFramesCokeData() {
    cy.intercept('GET', this.proposalFramesGetCokeApiURL, {
      body: oohResponseFramesCoke,
    }).as('loadProposalFramesCokeData');
    return this;
  }

  loadProposalCustomFrameHeaderCokeData() {
    cy.intercept('GET', this.proposalCustomFrameHeaderCokeApiURL, {
      body: oohCustomHeadersCoke,
    }).as('loadProposalCustomFrameHeaderCokeData');
    return this;
  }

  loadProposalFramesSpotifyData() {
    cy.intercept('GET', this.proposalFramesGetSpotifyApiURL, {
      body: oohResponseFramesSpotify
    }).as('loadProposalFramesspotifyData');
    return this;
  }

  loadProposalCustomFrameHeaderspotifyData() {
    cy.intercept('GET', this.proposalCustomFrameHeaderSpotifyApiURL, {
      body: oohCustomHeadersSpotify,
    }).as('loadProposalCustomFrameHeaderspotifyData');
    return this;
  }

  loadProposalCampaignData() {
    cy.intercept('GET', this.proposalCampaignGetApiURL, {
      body: oohResponseCampaign
    }).as('loadProposalCampaignData');
    return this;
  }

  loadProposalRFPData() {
    cy.intercept('GET', this.proposalRFPResponseGetApiURL, {
      body: oohResponseRfp,
    }).as('loadProposalRFPData');
    return this;
  }

  loadProposalRFPPackageData() {
    cy.intercept('GET', this.proposalRFPPackageGetApiURL, {
      body: oohResponsePackage,
    }).as('loadProposalRFPPackageData');
    return this;
  }

  loadProposalRFPMediaOwnerData() {
    cy.intercept('GET', this.proposalRFPMarketRegionGetApiURL, {
      body: oohResponseMediaOwner,
    }).as('loadProposalRFPMediaOwnerData');
    return this;
  }

  loadProposalRFPMarketRegionData() {
    cy.intercept('GET', this.proposalRFPMediaownerGetApiURL, {
      body: oohResponseMarketRegion,
    }).as('loadProposalRFPMarketRegionData');
    return this;
  }

  loadProposalRFPPackageTypeData() {
    cy.intercept('GET', this.proposalRFPPackageTypeGetApiURL, {
      body: oohResponseRfpPackageType,
    }).as('loadProposalRFPPackageTypeData');
    return this;
  }

  loadProposalCampaignFacingData() {
    cy.intercept('GET', this.proposalCampaignFacingGetApiURL, {
      body: oohResponseCampaignFacing,
    }).as('loadProposalCampaignFacingData');
    return this;
  }

  loadProposalCampaignMediaOwnerData() {
    cy.intercept('GET', this.proposalCampaignMediaOwnerGetApiURL, {
      body: oohResponseCampaignMediaOwner,
    }).as('loadProposalCampaignMediaOwnerData');
    return this;
  }

  loadProposalCampaignMediaFormatData() {
    cy.intercept('GET', this.proposalCampaignMediaFormatGetApiURL, {
      body: oohResponseCampaignMediaFormat,
    }).as('loadProposalCampaignMediaFormatData');
    return this;
  }
}
